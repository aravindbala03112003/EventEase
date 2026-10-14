import { IBookingRepository } from "../interfaces/IBookingRepository";
import { BookingStatus } from "../../domain/enums/BookingStatus";

export class RejectBooking {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(id: string) {
    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      const error = new Error("Booking not found");
      (error as any).status = 404;
      throw error;
    }
    return this.bookingRepo.updateStatus(id, BookingStatus.Rejected);
  }
}
