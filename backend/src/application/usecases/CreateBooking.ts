import { IBookingRepository } from "../interfaces/IBookingRepository";
import { IRoomRepository } from "../interfaces/IRoomRepository";
import { validateCreateBookingDTO } from "../validators/bookingValidators";

export class CreateBooking {
  constructor(
    private bookingRepo: IBookingRepository,
    private roomRepo: IRoomRepository
  ) {}

  async execute(input: any) {
    const dto = validateCreateBookingDTO(input);
    const room = await this.roomRepo.findById(dto.roomId);
    if (!room) {
      const error = new Error("Room not found");
      (error as any).status = 404;
      throw error;
    }
    const start = new Date(dto.start);
    const end = new Date(dto.end);

    const overlapping = await this.bookingRepo.findOverlapping({
      roomId: dto.roomId,
      start,
      end
    });
    if (overlapping.length > 0) {
      const error = new Error("Time slot not available");
      (error as any).status = 409;
      throw error;
    }

    const booking = await this.bookingRepo.create({
      userId: dto.userId,
      roomId: dto.roomId,
      start,
      end,
      title: dto.title,
      attendees: dto.attendees,
      description: dto.description
    });

    return booking;
  }
}
