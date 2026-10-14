import { IBookingRepository } from "../interfaces/IBookingRepository";

export class ListBookings {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(userId?: string, isAdmin = false) {
    if (isAdmin && !userId) {
      return this.bookingRepo.listAll();
    }
    if (userId) {
      return this.bookingRepo.listByUser(userId);
    }
    return [];
  }
}
