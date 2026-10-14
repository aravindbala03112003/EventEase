import { Request, Response, NextFunction } from "express";
import { IAdminRepository } from "../../../application/interfaces/IAdminRepository";
import { hashPassword, comparePassword } from "../../../infrastructure/utils/hashUtils";
import { signToken } from "../../../infrastructure/auth/jwt";

export class AdminAuthController {
  constructor(private admins: IAdminRepository) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        const error = new Error("name, email and password are required");
        (error as any).status = 400;
        throw error;
      }
      const existing = await this.admins.findByEmail(email);
      if (existing) {
        const error = new Error("Email already in use");
        (error as any).status = 409;
        throw error;
      }
      const passwordHash = await hashPassword(password);
      const admin = await this.admins.create({ name, email, passwordHash });
      res.status(201).json({ id: admin.id, name: admin.name, email: admin.email });
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
      const admin = await this.admins.findByEmail(email);
      if (!admin) {
        const error = new Error("Invalid credentials");
        (error as any).status = 401;
        throw error;
      }
      const valid = await comparePassword(password, admin.passwordHash);
      if (!valid) {
        const error = new Error("Invalid credentials");
        (error as any).status = 401;
        throw error;
      }
      const token = signToken({ sub: admin.id, email: admin.email, role: "admin" });
      res.json({ token, user: { id: admin.id, name: admin.name, email: admin.email, role: "admin" } });
    } catch (err) {
      next(err);
    }
  };
}
