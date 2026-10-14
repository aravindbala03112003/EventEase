import { IBookingRepository } from "../interfaces/IBookingRepository";

export class CheckRoomAvailability {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(params: { roomId: string; start: Date; end: Date }) {
    const overlapping = await this.bookingRepo.findOverlapping(params);
    return overlapping.length === 0;
  }
}
