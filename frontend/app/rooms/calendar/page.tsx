"use client";

import { useEffect, useState, FormEvent } from "react";
import RoomCalendar from "../../../features/rooms/RoomCalendar";
import { roomService } from "../../../services/roomService";
import { Card, CardBody } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input, Select, TextArea } from "../../../components/ui/Form";
import { useAuth } from "../../../features/auth/useAuth";
import { bookingService } from "../../../services/bookingService";

export default function RoomsCalendarPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [refreshNonce, setRefreshNonce] = useState(0);

  const allowedTitles = ["Workshop", "Guest Lecture", "Department Meeting", "Lab Session"] as const;
  type AllowedTitle = typeof allowedTitles[number];

  const [form, setForm] = useState<{ title: AllowedTitle | ""; roomId: string; date: string; startTime: string; endTime: string; description: string }>({
    title: "",
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    roomService
      .listRooms()
      .then((r) => {
        const seen = new Set<string>();
        const unique = r.filter((x: any) => {
          const key = `${x.name}-${x.capacity}-${x.location}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setRooms(unique);
      })
      .catch(() => {});
  }, []);

  function resetForm() {
    setForm({ title: "", roomId: "", date: "", startTime: "", endTime: "", description: "" });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.title || !form.roomId || !form.date || !form.startTime || !form.endTime) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const start = new Date(`${form.date}T${form.startTime}`);
      const end = new Date(`${form.date}T${form.endTime}`);
      await bookingService.createDepartmentEvent({
        roomId: form.roomId,
        start: start.toISOString(),
        end: end.toISOString(),
        title: form.title as AllowedTitle,
        description: form.description || undefined
      });
      setSuccess("Department event submitted for admin approval");
      setShowForm(false);
      resetForm();
      setRefreshNonce((n) => n + 1);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to create department event";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Room Calendar</h1>
          <p className="text-slate-600">View bookings across rooms to check availability.</p>
        </div>
        {user?.role === "staff" && (
          <Button onClick={() => setShowForm((s) => !s)}>
            {showForm ? "Close" : "Create Dept Event"}
          </Button>
        )}
      </div>

      {showForm && user?.role === "staff" && (
        <Card className="mb-6 border-purple-200 bg-purple-50">
          <CardBody>
            {error && <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">{error}</div>}
            {success && <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">{success}</div>}
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <Select
                label="Event Type"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value as AllowedTitle })}
                options={allowedTitles.map((t) => ({ value: t, label: t }))}
                required
              />
              <Select
                label="Room"
                value={form.roomId}
                onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                options={rooms.map((r) => ({ value: String(r.id), label: r.name }))}
                required
              />
              <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Start Time" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required />
                <Input label="End Time" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} required />
              </div>
              <div className="md:col-span-2">
                <TextArea label="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" isLoading={loading}>{loading ? "Creating..." : "Create Dept Event"}</Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); resetForm(); setError(null); setSuccess(null); }}>Cancel</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      <div className="grid gap-6">
        {rooms.map((room) => (
          <Card key={room.id}>
            <CardBody>
              <h3 className="font-semibold text-slate-900 mb-4">{room.name}</h3>
              <RoomCalendar key={`${room.id}-${refreshNonce}`} roomId={String(room.id)} />
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
