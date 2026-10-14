import { IBookingRepository } from "../interfaces/IBookingRepository";

export class RescheduleOverlapping {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(params: { roomId: string; start: Date; end: Date; excludeBookingId?: string }) {
    const overlaps = await this.bookingRepo.findOverlappingActive(params);
    const toMove = params.excludeBookingId ? overlaps.filter((b) => b.id !== params.excludeBookingId) : overlaps;
    for (const booking of toMove) {
      let newStart = new Date(params.start);
      let newEnd = new Date(params.end);
      // Move day by day until the slot is free (considering approved bookings)
      while (true) {
        newStart.setDate(newStart.getDate() + 1);
        newEnd.setDate(newEnd.getDate() + 1);
        const conflicts = await this.bookingRepo.findOverlapping({ roomId: booking.roomId, start: newStart, end: newEnd });
        if (conflicts.length === 0) {
          await this.bookingRepo.updateTimeSlot(booking.id, newStart, newEnd);
          break;
        }
      }
    }
  }
}
