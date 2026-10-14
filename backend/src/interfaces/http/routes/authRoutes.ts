import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { PgUserRepository } from "../../../infrastructure/repositories/PgUserRepository";

export function authRoutes() {
  const router = Router();
  const userRepo = new PgUserRepository();
  const controller = new AuthController(userRepo);

  router.post("/register", controller.register);
  router.post("/login", controller.login);

  return router;
}
