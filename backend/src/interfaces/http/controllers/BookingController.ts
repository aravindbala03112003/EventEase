import { Request, Response, NextFunction } from "express";
import { CreateBooking } from "../../../application/usecases/CreateBooking";
import { ApproveBooking } from "../../../application/usecases/ApproveBooking";
import { RejectBooking } from "../../../application/usecases/RejectBooking";
import { CancelBooking } from "../../../application/usecases/CancelBooking";
import { ListRoomBookings } from "../../../application/usecases/ListRoomBookings";
import { CheckRoomAvailability } from "../../../application/usecases/CheckRoomAvailability";
import { ListBookings } from "../../../application/usecases/ListBookings";
import { BookingPresenter } from "../../presenters/BookingPresenter";
import { IAdminActionRepository } from "../../../application/interfaces/IAdminActionRepository";
import { IUserRepository } from "../../../application/interfaces/IUserRepository";
import { RescheduleOverlapping } from "../../../application/usecases/RescheduleOverlapping";

export class BookingController {
  constructor(
    private createBooking: CreateBooking,
    private approveBooking: ApproveBooking,
    private rejectBooking: RejectBooking,
    private cancelBooking: CancelBooking,
    private listRoomBookings: ListRoomBookings,
    private listBookings: ListBookings,
    private checkRoomAvailability: CheckRoomAvailability,
    private adminActions?: IAdminActionRepository,
    private rescheduleOverlapping?: RescheduleOverlapping,
    private users?: IUserRepository
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      const booking = await this.createBooking.execute({
        ...req.body,
        userId: user.sub
      });
      res.status(201).json(BookingPresenter.toDTO(booking));
    } catch (err) {
      next(err);
    }
  };

  approve = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await this.approveBooking.execute(req.params.id);
      const actor = (req as any).user;
      if (this.adminActions && actor?.role === "admin") {
        try {
          await this.adminActions.create({ adminId: actor.sub, bookingId: updated.id, action: "approve" });
        } catch {}
      }
      res.json(BookingPresenter.toDTO(updated));
    } catch (err) {
      next(err);
    }
  };

  reject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await this.rejectBooking.execute(req.params.id);
      const actor = (req as any).user;
      if (this.adminActions && actor?.role === "admin") {
        try {
          await this.adminActions.create({ adminId: actor.sub, bookingId: updated.id, action: "reject" });
        } catch {}
      }
      res.json(BookingPresenter.toDTO(updated));
    } catch (err) {
      next(err);
    }
  };

  cancel = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = await this.cancelBooking.execute(req.params.id);
      res.json(BookingPresenter.toDTO(updated));
    } catch (err) {
      next(err);
    }
  };

  deptEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actor = (req as any).user;
      const allowed = ["Workshop", "Guest Lecture", "Department Meeting", "Lab Session"];
      const title = req.body?.title;
      if (!allowed.includes(title)) {
        const error = new Error("title must be one of: " + allowed.join(", "));
        (error as any).status = 400;
        throw error;
      }
      const start = new Date(req.body?.start);
      const end = new Date(req.body?.end);
      const roomId = req.body?.roomId;
      if (!roomId || isNaN(start.getTime()) || isNaN(end.getTime())) {
        const error = new Error("roomId, start and end are required");
        (error as any).status = 400;
        throw error;
      }
      if (this.rescheduleOverlapping) {
        await this.rescheduleOverlapping.execute({ roomId, start, end });
      }
      const created = await this.createBooking.execute({
        ...req.body,
        userId: actor.sub,
        title
      });
      res.status(201).json(BookingPresenter.toDTO(created));
    } catch (err) {
      next(err);
    }
  };

  listByRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.listRoomBookings.execute(req.params.roomId);
      const dtos = BookingPresenter.toDTOList(bookings);
      if (this.users) {
        const ids = Array.from(new Set(dtos.map((b) => b.userId)));
        const roleMap: Record<string, string> = {};
        for (const id of ids) {
          const u = await this.users.findById(id);
          if (u) roleMap[id] = u.role;
        }
        res.json(dtos.map((b) => ({ ...b, userRole: roleMap[b.userId] })));
        return;
      }
      res.json(dtos);
    } catch (err) {
      next(err);
    }
  };

  availability = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roomId, start, end } = req.query as any;
      const available = await this.checkRoomAvailability.execute({
        roomId,
        start: new Date(start),
        end: new Date(end)
      });
      res.json({ available });
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      const { userId } = req.query as any;
      const isAdmin = user && user.role === "admin";
      const uid = isAdmin && !userId ? undefined : (userId || user.sub);
      const bookings = await this.listBookings.execute(uid, Boolean(isAdmin));
      const dtos = BookingPresenter.toDTOList(bookings);
      if (this.users) {
        const ids = Array.from(new Set(dtos.map((b) => b.userId)));
        const roleMap: Record<string, string> = {};
        for (const id of ids) {
          const u = await this.users.findById(id);
          if (u) roleMap[id] = u.role;
        }
        res.json(dtos.map((b) => ({ ...b, userRole: roleMap[b.userId] })));
        return;
      }
      res.json(dtos);
    } catch (err) {
      next(err);
    }
  };
}
