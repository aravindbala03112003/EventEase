"use client";

import { useState, FormEvent } from "react";

interface Props {
  onSubmit: (data: { roomId: string; start: string; end: string }) => Promise<void>;
  roomId?: string;
}

export default function BookingForm({ onSubmit, roomId: initialRoomId }: Props) {
  const [roomId, setRoomId] = useState(initialRoomId ?? "");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit({ roomId, start, end });
      setStart("");
      setEnd("");
    } catch (err: any) {
      setError(err?.message ?? "Failed to create booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 320 }}>
      <label>
        Room ID
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} required />
      </label>
      <label>
        Start
        <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} required />
      </label>
      <label>
        End
        <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} required />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create booking"}
      </button>
    </form>
  );
}
