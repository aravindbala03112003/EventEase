"use client";

import { useEffect, useState } from "react";
import { roomService } from "../../services/roomService";
import { Room } from "../../domain/Room";
import RoomCard from "../../components/RoomCard";
import Link from "next/link";

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    roomService
      .listRooms()
      .then(setRooms)
      .catch(() => {});
  }, []);

  return (
    <div>
      {rooms.map((room) => (
        <Link key={room.id} href={`/rooms/${room.id}`}>
          <RoomCard room={room} />
        </Link>
      ))}
    </div>
  );
}
