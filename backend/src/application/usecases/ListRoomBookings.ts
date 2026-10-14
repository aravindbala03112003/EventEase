import { IBookingRepository } from "../interfaces/IBookingRepository";

export class ListRoomBookings {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(roomId: string) {
    return this.bookingRepo.listByRoom(roomId);
  }
}
