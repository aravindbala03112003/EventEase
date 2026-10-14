import { Request, Response, NextFunction } from "express";
import { IRoomRepository } from "../../../application/interfaces/IRoomRepository";
import { ListRoomBookings } from "../../../application/usecases/ListRoomBookings";
import { BookingPresenter } from "../../presenters/BookingPresenter";

export class RoomController {
  constructor(private rooms: IRoomRepository, private listRoomBookings: ListRoomBookings) {}

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await this.rooms.list();
      res.json(rooms);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const room = await this.rooms.findById(req.params.id);
      if (!room) {
        const error = new Error("Room not found");
        (error as any).status = 404;
        throw error;
      }
      res.json(room);
    } catch (err) {
      next(err);
    }
  };

  bookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookings = await this.listRoomBookings.execute(req.params.id);
      res.json(BookingPresenter.toDTOList(bookings));
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, capacity, location } = req.body;
      if (!name || typeof capacity !== "number" || !location) {
        const error = new Error("name, capacity and location are required");
        (error as any).status = 400;
        throw error;
      }
      const room = await this.rooms.create({ name, capacity, location });
      res.status(201).json(room);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, capacity, location } = req.body;
      const existing = await this.rooms.findById(req.params.id);
      if (!existing) {
        const error = new Error("Room not found");
        (error as any).status = 404;
        throw error;
      }
      if (capacity !== undefined && typeof capacity !== "number") {
        const error = new Error("capacity must be a number");
        (error as any).status = 400;
        throw error;
      }
      const room = await this.rooms.update(req.params.id, { name, capacity, location });
      res.json(room);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existing = await this.rooms.findById(req.params.id);
      if (!existing) {
        const error = new Error("Room not found");
        (error as any).status = 404;
        throw error;
      }
      await this.rooms.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
