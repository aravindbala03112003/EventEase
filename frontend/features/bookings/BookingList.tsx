"use client";

import { useEffect, useState } from "react";
import { bookingService } from "../../services/bookingService";
import { Booking } from "../../domain/Booking";

interface Props {
  roomId: string;
}

export default function BookingList({ roomId }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    bookingService
      .listRoomBookings(roomId)
      .then(setBookings)
      .catch(() => {});
  }, [roomId]);

  return (
    <ul>
      {bookings.map((b) => (
        <li key={b.id}>
          {new Date(b.start).toLocaleString()} – {new Date(b.end).toLocaleString()} ({b.status})
        </li>
      ))}
    </ul>
  );
}
