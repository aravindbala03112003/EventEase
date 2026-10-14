"use client";

import BookingForm from "../../components/BookingForm";
import { bookingService } from "../../services/bookingService";

export default function CreateBookingForm() {
  async function handleSubmit(data: { roomId: string; start: string; end: string }) {
    await bookingService.createBooking(data);
  }

  return <BookingForm onSubmit={handleSubmit} />;
}
