"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { useAuth } from "../../../features/auth/useAuth";
import { roomService } from "../../../services/roomService";
import { bookingService } from "../../../services/bookingService";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    const load = async () => {
      try {
        const [rs, bs] = await Promise.all([
          roomService.listRooms(),
          bookingService.listAllBookings()
        ]);
        setRooms(rs);
        setBookings(bs);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load admin data");
      }
    };
    load();
  }, [user]);

  async function approve(id: string) {
    const updated = await bookingService.approveBooking(id);
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
  }
  async function reject(id: string) {
    const updated = await bookingService.rejectBooking(id);
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
  }
  async function removeRoom(id: string) {
    await roomService.deleteRoom(id);
    setRooms((prev) => prev.filter((r) => String(r.id) !== String(id)));
  }

  if (!user || user.role !== "admin") {
    return (
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardBody className="text-center py-12">
            <p className="mb-4">Admin access required</p>
            <Link href="/admin/login">
              <Button>Go to Admin Login</Button>
            </Link>
          </CardBody>
        </Card>
      </main>
    );
  }

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/rooms/new">
          <Button>+ New Room</Button>
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">{error}</div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader title="Rooms" />
          <CardBody>
            {rooms.length === 0 ? (
              <p className="text-slate-600">No rooms</p>
            ) : (
              <div className="space-y-3">
                {rooms.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold">{r.name}</p>
                      <p className="text-sm text-slate-600">{r.capacity} people · {r.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/rooms/${r.id}/edit`}>
                        <Button size="sm" variant="outline">Edit</Button>
                      </Link>
                      <Button size="sm" variant="danger" onClick={() => removeRoom(String(r.id))}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="All Bookings" />
          <CardBody>
            {bookings.length === 0 ? (
              <p className="text-slate-600">No bookings</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div key={b.id} className="grid md:grid-cols-6 gap-4 items-center p-3 border rounded-lg">
                    <div className="md:col-span-2">
                      <p className="font-semibold">Room {b.roomId}</p>
                      <p className="text-sm text-slate-600">Requested by {b.userId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase">Date & Time</p>
                      <p className="font-medium text-slate-900 mt-1">{new Date(b.start).toLocaleString()}</p>
                      <p className="text-sm text-slate-600">{new Date(b.end).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase">Attendees</p>
                      <p className="font-medium text-slate-900 mt-1">{b.attendees ?? "—"}</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "approved" ? "bg-green-100 text-green-800" :
                        b.status === "pending" ? "bg-amber-100 text-amber-800" :
                        b.status === "rejected" ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-800"
                      }`}>{b.status.toUpperCase()}</span>
                    </div>
                    <div className="flex gap-2 justify-end">
                      {b.status === "pending" && (
                        <>
                          <Button size="sm" variant="success" onClick={() => approve(b.id)}>Approve</Button>
                          <Button size="sm" variant="danger" onClick={() => reject(b.id)}>Reject</Button>
                        </>
                      )}
                      {b.status === "approved" && (
                        <Button size="sm" variant="danger" onClick={() => reject(b.id)}>Reject</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
