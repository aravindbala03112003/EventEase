import { Router } from "express";
import { PgBookingRepository } from "../../../infrastructure/repositories/PgBookingRepository";
import { PgRoomRepository } from "../../../infrastructure/repositories/PgRoomRepository";
import { CreateBooking } from "../../../application/usecases/CreateBooking";
import { ApproveBooking } from "../../../application/usecases/ApproveBooking";
import { RejectBooking } from "../../../application/usecases/RejectBooking";
import { CancelBooking } from "../../../application/usecases/CancelBooking";
import { ListRoomBookings } from "../../../application/usecases/ListRoomBookings";
import { ListBookings } from "../../../application/usecases/ListBookings";
import { CheckRoomAvailability } from "../../../application/usecases/CheckRoomAvailability";
import { BookingController } from "../controllers/BookingController";
import { RescheduleOverlapping } from "../../../application/usecases/RescheduleOverlapping";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import { PgAdminActionRepository } from "../../../infrastructure/repositories/PgAdminActionRepository";
import { PgUserRepository } from "../../../infrastructure/repositories/PgUserRepository";

export function bookingRoutes() {
  const router = Router();

  const bookingRepo = new PgBookingRepository();
  const roomRepo = new PgRoomRepository();

  const createBooking = new CreateBooking(bookingRepo, roomRepo);
  const rescheduleOverlapping = new RescheduleOverlapping(bookingRepo);
  const approveBooking = new ApproveBooking(bookingRepo, rescheduleOverlapping);
  const rejectBooking = new RejectBooking(bookingRepo);
  const cancelBooking = new CancelBooking(bookingRepo);
  const listRoomBookings = new ListRoomBookings(bookingRepo);
  const listBookings = new ListBookings(bookingRepo);
  const checkRoomAvailability = new CheckRoomAvailability(bookingRepo);

  const adminActions = new PgAdminActionRepository();
  const userRepo = new PgUserRepository();
  const controller = new BookingController(
    createBooking,
    approveBooking,
    rejectBooking,
    cancelBooking,
    listRoomBookings,
    listBookings,
    checkRoomAvailability,
    adminActions,
    rescheduleOverlapping,
    userRepo
  );

  router.post("/", authMiddleware, controller.create);
  router.get("/", authMiddleware, controller.list);
  router.post("/department", authMiddleware, roleMiddleware("staff", "admin"), controller.deptEvent);
  router.post("/:id/approve", authMiddleware, roleMiddleware("admin"), controller.approve);
  router.post("/:id/reject", authMiddleware, roleMiddleware("admin"), controller.reject);
  router.post("/:id/cancel", authMiddleware, controller.cancel);
  router.get("/room/:roomId", authMiddleware, controller.listByRoom);
  router.get("/availability", controller.availability);

  return router;
}
