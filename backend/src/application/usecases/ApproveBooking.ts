import { IBookingRepository } from "../interfaces/IBookingRepository";
import { BookingStatus } from "../../domain/enums/BookingStatus";
import { RescheduleOverlapping } from "./RescheduleOverlapping";

export class ApproveBooking {
  constructor(private bookingRepo: IBookingRepository, private rescheduler?: RescheduleOverlapping) {}

  async execute(id: string) {
    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      const error = new Error("Booking not found");
      (error as any).status = 404;
      throw error;
    }
    if (this.rescheduler) {
      await this.rescheduler.execute({ roomId: booking.roomId, start: booking.timeSlot.start, end: booking.timeSlot.end, excludeBookingId: booking.id });
    }
    return this.bookingRepo.updateStatus(id, BookingStatus.Approved);
  }
}
