import { Booking } from "../../domain/entities/Booking";
import { BookingDTO } from "../../application/dtos/BookingDTO";

function toDTO(booking: Booking): BookingDTO {
  return {
    id: booking.id,
    userId: booking.userId,
    roomId: booking.roomId,
    start: booking.timeSlot.start.toISOString(),
    end: booking.timeSlot.end.toISOString(),
    status: booking.status,
    createdAt: booking.createdAt.toISOString(),
    title: booking.title,
    attendees: booking.attendees,
    description: booking.description
  };
}

function toDTOList(bookings: Booking[]): BookingDTO[] {
  return bookings.map(toDTO);
}

export const BookingPresenter = {
  toDTO,
  toDTOList
};
