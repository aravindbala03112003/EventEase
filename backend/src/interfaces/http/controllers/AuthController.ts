import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "../../../application/interfaces/IUserRepository";
import { hashPassword, comparePassword } from "../../../infrastructure/utils/hashUtils";
import { signToken } from "../../../infrastructure/auth/jwt";
import { UserRole } from "../../../domain/entities/User";

export class AuthController {
  constructor(private users: IUserRepository) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        const error = new Error("name, email and password are required");
        (error as any).status = 400;
        throw error;
      }
      const existing = await this.users.findByEmail(email);
      if (existing) {
        const error = new Error("Email already in use");
        (error as any).status = 409;
        throw error;
      }
      const passwordHash = await hashPassword(password);
      const user = await this.users.create({
        name,
        email,
        passwordHash,
        role: (role as UserRole) || "user"
      });
      res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        const error = new Error("email and password are required");
        (error as any).status = 400;
        throw error;
      }
      const user = await this.users.findByEmail(email);
      if (!user) {
        const error = new Error("Invalid credentials");
        (error as any).status = 401;
        throw error;
      }
      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) {
        const error = new Error("Invalid credentials");
        (error as any).status = 401;
        throw error;
      }
      const token = signToken({ sub: user.id, email: user.email, role: user.role });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
      next(err);
    }
  };
}
