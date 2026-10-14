import express, { Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./interfaces/http/routes/authRoutes";
import { adminAuthRoutes } from "./interfaces/http/routes/adminAuthRoutes";
import { bookingRoutes } from "./interfaces/http/routes/bookingRoutes";
import { roomRoutes } from "./interfaces/http/routes/roomRoutes";
import { errorHandler } from "./interfaces/http/middleware/errorHandler";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes());
app.use("/api/admin/auth", adminAuthRoutes());
app.use("/api/bookings", bookingRoutes());
app.use("/api/rooms", roomRoutes());

app.use(errorHandler);
