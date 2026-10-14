import { Router } from "express";
import { AdminAuthController } from "../controllers/AdminAuthController";
import { PgAdminRepository } from "../../../infrastructure/repositories/PgAdminRepository";

export function adminAuthRoutes() {
  const router = Router();
  const adminRepo = new PgAdminRepository();
  const controller = new AdminAuthController(adminRepo);

  router.post("/register", controller.register);
  router.post("/login", controller.login);

  return router;
}
