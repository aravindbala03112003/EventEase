import { TimeSlot } from "../valueObjects/TimeSlot";
import { BookingStatus } from "../enums/BookingStatus";

export class Booking {
  constructor(
    public id: string,
    public userId: string,
    public roomId: string,
    public timeSlot: TimeSlot,
    public status: BookingStatus,
    public createdAt: Date,
    public title?: string,
    public attendees?: number,
    public description?: string
  ) {}
}
