"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { roomService } from "../../../services/roomService";
import { Room } from "../../../domain/Room";

interface RoomDetailsPageProps {
  params: { id: string };
}

export default function RoomPage({ params }: RoomDetailsPageProps) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    roomService
      .getRoom(params.id)
      .then((r) => setRoom(r))
      .catch((e: any) => setError(e?.response?.data?.message || "Failed to load room"))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <Link href="/rooms" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
        <span>←</span> Back to Rooms
      </Link>

      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">{room?.name || (loading ? "Loading..." : "Room")}</h1>
            {room && <p className="text-slate-600 mt-2">{room.location}</p>}
          </div>
          {room && <Badge variant="info">Managed</Badge>}
        </div>
        {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">{error}</div>}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Room Image/Visual */}
          <Card>
            <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
              <span className="text-9xl">🏢</span>
            </div>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader title="About this Room" />
            <CardBody>
              <p className="text-slate-700 leading-relaxed">
                {room ? `${room.name} located at ${room.location} with capacity for ${room.capacity} people.` : "Loading..."}
              </p>
            </CardBody>
          </Card>

          {/* Info */}
          <Card>
            <CardHeader title="Room Info" />
            <CardBody>
              {room ? (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <p className="font-medium text-slate-900">{room.capacity} people</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-3xl mb-2">📍</div>
                    <p className="font-medium text-slate-900">{room.location}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg text-center">
                    <div className="text-3xl mb-2">🕒</div>
                    <p className="font-medium text-slate-900">Updated by Admin</p>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader title="Quick Info" />
            <CardBody className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase">
                  Capacity
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{room ? `👥 ${room.capacity} people` : "—"}</p>
              </div>
              <div className="divider" />
              <div>
                <p className="text-xs font-semibold text-slate-600 uppercase">
                  Location
                </p>
                <p className="font-medium text-slate-900 mt-1">{room?.location || "—"}</p>
              </div>
            </CardBody>
          </Card>

          {/* Booking Actions */}
          <Card className="border-primary-200 bg-primary-50">
            <CardBody className="space-y-3">
              <h3 className="font-bold text-slate-900">Ready to book?</h3>
              <p className="text-sm text-slate-700">
                Reserve this room for your next meeting
              </p>
              <Link href={room ? `/bookings/new?roomId=${room.id}` : "/bookings/new"} className="block">
                <Button fullWidth>
                  📅 Book This Room
                </Button>
              </Link>
              <Link href="/rooms" className="block">
                <Button variant="outline" fullWidth>
                  Compare Rooms
                </Button>
              </Link>
            </CardBody>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardBody className="space-y-3">
              <h4 className="font-semibold text-slate-900">Have Questions?</h4>
              <p className="text-sm text-slate-700">
                Our support team is here to help you book the perfect room.
              </p>
              <Button variant="ghost" fullWidth>
                📧 Contact Support
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
