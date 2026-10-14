"use client";

import { useEffect, useState } from "react";
import { bookingService } from "../../services/bookingService";
import Calendar from "../../components/Calendar";

interface Props {
  roomId: string;
}

export default function RoomCalendar({ roomId }: Props) {
  const [dates, setDates] = useState<{ start: string; end: string; role?: "student" | "staff" | "user" | "admin" }[]>([]);

  useEffect(() => {
    bookingService
      .listRoomBookings(roomId)
      .then((bookings) => {
        const approved = bookings.filter((b) => b.status === "approved");
        setDates(approved.map((b) => ({ start: b.start, end: b.end, role: b.userRole })));
      })
      .catch(() => {});
  }, [roomId]);

  return <Calendar dates={dates} />;
}
