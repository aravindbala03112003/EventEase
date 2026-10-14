import { Router } from "express";
import { PgRoomRepository } from "../../../infrastructure/repositories/PgRoomRepository";
import { PgBookingRepository } from "../../../infrastructure/repositories/PgBookingRepository";
import { ListRoomBookings } from "../../../application/usecases/ListRoomBookings";
import { RoomController } from "../controllers/RoomController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

export function roomRoutes() {
  const router = Router();

  const roomRepo = new PgRoomRepository();
  const bookingRepo = new PgBookingRepository();
  const listRoomBookings = new ListRoomBookings(bookingRepo);

  const controller = new RoomController(roomRepo, listRoomBookings);

  router.get("/", authMiddleware, controller.list);
  router.get("/:id", authMiddleware, controller.getById);
  router.get("/:id/bookings", authMiddleware, controller.bookings);
  router.post("/", authMiddleware, roleMiddleware("admin"), controller.create);
  router.put("/:id", authMiddleware, roleMiddleware("admin"), controller.update);
  router.delete("/:id", authMiddleware, roleMiddleware("admin"), controller.remove);

  return router;
}
