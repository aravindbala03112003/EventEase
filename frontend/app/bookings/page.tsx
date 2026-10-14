"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { bookingService } from "../../services/bookingService";
import { useAuth } from "../../features/auth/useAuth";

export default function BookingsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetch = async () => {
      try {
        const data = user?.role === "admin"
          ? await bookingService.listAllBookings()
          : await bookingService.listUserBookings();
        setBookings(data);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const handleApprove = async (id: string) => {
    try {
      await bookingService.approveBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "approved" } : b)));
    } catch (e) {}
  };

  const handleReject = async (id: string) => {
    try {
      await bookingService.rejectBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "rejected" } : b)));
    } catch (e) {}
  };

  const handleCancel = async (id: string) => {
    try {
      await bookingService.cancelBooking(id);
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)));
    } catch (e) {}
  };

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Bookings</h1>
          <p className="text-slate-600 mt-2">Manage all your meeting room bookings</p>
        </div>
        <Link href="/bookings/new">
          <Button size="lg">+ New Booking</Button>
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {[("all" as const), ("pending" as const), ("approved" as const), ("rejected" as const)].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === tab ? "bg-primary-600 text-white shadow-md" : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-red-700">{error}</p>
            </CardBody>
          </Card>
        ) : filtered.length > 0 ? (
          filtered.map((booking) => (
            <Card key={booking.id} hover>
              <CardBody>
                <div className="grid md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h3 className="font-bold text-slate-900">
                      {booking.title || `Room ${booking.roomId}`}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">Requested by {booking.userId}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-600 uppercase">Date & Time</p>
                    <p className="font-medium text-slate-900 mt-1">{new Date(booking.start).toLocaleString()}</p>
                    <p className="text-sm text-slate-600">{new Date(booking.end).toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-600 uppercase">Attendees</p>
                    <p className="font-medium text-slate-900 mt-1">{booking.attendees ?? "—"}</p>
                  </div>

                  <div>
                    <Badge variant={booking.status === "approved" ? "success" : booking.status === "pending" ? "warning" : "danger" as any}>
                      {booking.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    {booking.userRole && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.userRole === "staff"
                          ? "bg-purple-100 text-purple-800"
                          : booking.userRole === "student"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-800"
                      }`}>{booking.userRole.charAt(0).toUpperCase() + booking.userRole.slice(1)}</span>
                    )}
                  </div>

                  <div className="flex gap-2 justify-end">
                    {user?.role === "admin" && booking.status === "pending" && (
                      <>
                        <Button size="sm" variant="success" onClick={() => handleApprove(booking.id)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleReject(booking.id)}>
                          Reject
                        </Button>
                      </>
                    )}
                    {user && booking.userId === user.id && booking.status === "pending" && (
                      <Button size="sm" variant="outline" onClick={() => handleCancel(booking.id)}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-2xl text-slate-600 mb-4">No bookings found</p>
              <p className="text-slate-500 mb-6">You don&apos;t have any bookings yet</p>
              <Link href="/bookings/new">
                <Button>Create First Booking</Button>
              </Link>
            </CardBody>
          </Card>
        )}
      </div>
    </main>
  );
}
