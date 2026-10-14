"use client";

import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { useAuth } from "../../features/auth/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { bookingService } from "../../services/bookingService";

function formatTimeRange(startIso: string, endIso: string) {
  const s = new Date(startIso);
  const e = new Date(endIso);
  const date = s.toLocaleDateString();
  const st = s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const et = e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${date} ${st} - ${et}`;
}

const stats = [
  { label: "Total Bookings", value: "24", trend: "+4 this month", color: "bg-primary-100" },
  { label: "Upcoming Events", value: "3", trend: "Next: Today at 10:00", color: "bg-secondary-100" },
  { label: "Hours Booked", value: "48h", trend: "+12h this month", color: "bg-green-100" },
  { label: "Rooms Booked", value: "6", trend: "Out of 12 available", color: "bg-amber-100" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);

  useEffect(() => {
    if (user?.role === "admin") {
      router.replace("/admin/dashboard");
      return;
    }
    async function load() {
      try {
        const now = new Date();
        const list = await bookingService.listUserBookings();
        const upcoming = list
          .filter(b => new Date(b.start) > now)
          .slice(0, 5)
          .map(b => ({
            id: b.id,
            room: `Room ${b.roomId}`,
            time: formatTimeRange(b.start, b.end),
            attendees: b.attendees ?? 0,
            status: b.status === "approved" ? "confirmed" : b.status
          }));
        setUpcomingBookings(upcoming);
      } catch {}
    }
    load();
  }, [user, router]);

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
          {user ? `Welcome back, ${user.name}!` : "Dashboard"}
        </h1>
        <p className="text-slate-600 mt-2">Here&apos;s your booking overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardBody className="space-y-3">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-2">{stat.trend}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Upcoming Bookings"
              description="Your next scheduled bookings"
            />
            <CardBody>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">
                          {booking.room}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1">
                          📅 {booking.time}
                        </p>
                        <p className="text-sm text-slate-600">
                          👥 {booking.attendees} attendees
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {booking.status === "confirmed"
                            ? "✓ Confirmed"
                            : "⏳ Pending"}
                        </span>
                        <Button variant="ghost" size="sm">
                          •••
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-600 mb-4">No upcoming bookings</p>
                  <Link href="/bookings/new">
                    <Button size="sm">Book a Room</Button>
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Quick Actions" />
            <CardBody className="space-y-3">
              <Link href="/bookings/new" className="block">
                <Button fullWidth>
                  📅 Book a Room
                </Button>
              </Link>
              <Link href="/rooms" className="block">
                <Button variant="secondary" fullWidth>
                  🏢 Browse Rooms
                </Button>
              </Link>
              <Link href="/bookings" className="block">
                <Button variant="outline" fullWidth>
                  📋 All Bookings
                </Button>
              </Link>
            </CardBody>
          </Card>

          {/* Schedule Tip */}
          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200">
            <CardBody className="space-y-3">
              <div className="text-2xl">💡</div>
              <h4 className="font-semibold text-slate-900">Pro Tip</h4>
              <p className="text-sm text-slate-700">
                Book your recurring meetings to save time and ensure your preferred room is always available.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
