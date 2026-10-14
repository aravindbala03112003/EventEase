"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardBody } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Form";
import { roomService } from "../../services/roomService";
import { Room } from "../../domain/Room";

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState<number | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    roomService
      .listRooms()
      .then((r) => setRooms(r))
      .catch((e: any) => setError(e?.response?.data?.message || "Failed to load rooms"))
      .finally(() => setLoading(false));
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCapacity = !capacityFilter || room.capacity >= capacityFilter;
    return matchesSearch && matchesCapacity;
  });

  return (
    <main className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Meeting Rooms</h1>
        <p className="text-slate-600 mt-2">Browse all rooms managed by Admin</p>
      </div>

      {/* Filters */}
      <div className="mb-8 grid md:grid-cols-3 gap-4">
        <Input
          placeholder="Search rooms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:col-span-2"
        />
        <select
          value={capacityFilter?.toString() || ""}
          onChange={(e) => setCapacityFilter(e.target.value ? parseInt(e.target.value) : null)}
          className="select input"
        >
          <option value="">All capacities</option>
          <option value="2">2+ people</option>
          <option value="5">5+ people</option>
          <option value="10">10+ people</option>
          <option value="15">15+ people</option>
        </select>
      </div>

      {/* Rooms Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <Card><CardBody>Loading...</CardBody></Card>
        ) : error ? (
          <Card><CardBody className="text-red-700">{error}</CardBody></Card>
        ) : filteredRooms.map((room) => (
          <Card key={room.id} hover className="group overflow-hidden">
            {/* Room Image/Placeholder */}
            <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 group-hover:from-primary-200 group-hover:to-secondary-200 transition-colors flex items-center justify-center">
              <span className="text-5xl">🏢</span>
            </div>

            <CardBody className="space-y-4">
              {/* Status Badge */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {room.name}
                  </h3>
                  <p className="text-sm text-slate-600">{room.location}</p>
                </div>
                <Badge variant="info">Managed</Badge>
              </div>

              {/* Capacity */}
              <div className="flex items-center gap-2">
                <span className="text-2xl">👥</span>
                <span className="font-semibold text-slate-900">
                  {room.capacity} people
                </span>
              </div>

              {/* Action */}
              <Link href={`/rooms/${room.id}`} className="block">
                <Button fullWidth variant="primary">
                  View Details
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>

      {!loading && filteredRooms.length === 0 && (
        <div className="text-center py-16">
          <p className="text-2xl text-slate-600 mb-4">No rooms found</p>
          <p className="text-slate-500 mb-6">Try adjusting your search filters</p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setCapacityFilter(null);
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </main>
  );
}
