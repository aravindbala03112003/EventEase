"use client";

import { Room } from "../domain/Room";

interface Props {
  room: Room;
  onClick?: () => void;
}

export default function RoomCard({ room, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 12,
        cursor: onClick ? "pointer" : "default",
        backgroundColor: "#ffffff",
        marginBottom: 8
      }}
    >
      <h3>{room.name}</h3>
      <p>
        Capacity: {room.capacity} · {room.location}
      </p>
    </div>
  );
}
