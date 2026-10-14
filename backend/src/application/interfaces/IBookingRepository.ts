import { Booking } from "../../domain/entities/Booking";
import { BookingStatus } from "../../domain/enums/BookingStatus";

export interface IBookingRepository {
  findById(id: string): Promise<Booking | null>;
  create(params: {
    userId: string;
    roomId: string;
    start: Date;
    end: Date;
    title?: string;
    attendees?: number;
    description?: string;
  }): Promise<Booking>;
  updateStatus(id: string, status: BookingStatus): Promise<Booking>;
  updateTimeSlot(id: string, start: Date, end: Date): Promise<Booking>;
  listByRoom(roomId: string): Promise<Booking[]>;
  listAll(): Promise<Booking[]>;
  listByUser(userId: string): Promise<Booking[]>;
  findOverlapping(params: {
    roomId: string;
    start: Date;
    end: Date;
  }): Promise<Booking[]>;
  findOverlappingActive(params: {
    roomId: string;
    start: Date;
    end: Date;
  }): Promise<Booking[]>;
}
