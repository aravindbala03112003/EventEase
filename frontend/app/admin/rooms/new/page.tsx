"use client";

import { useEffect, useState, FormEvent } from "react";
import { Card, CardBody, CardHeader } from "../../../../components/ui/Card";
import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../features/auth/useAuth";
import { roomService } from "../../../../services/roomService";

export default function AdminCreateRoomPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin") {
      router.replace("/admin/login");
    }
  }, [user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const cap = typeof capacity === "string" ? parseInt(capacity || "0", 10) : capacity;
      await roomService.createRoom({ name, capacity: cap || 0, location });
      setSuccess("Room created successfully");
      setName("");
      setCapacity("");
      setLocation("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Room</h1>
        <Link href="/admin/dashboard">
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <Card>
        <CardHeader title="New Room" />
        <CardBody>
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">{success}</div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <Input
              label="Capacity"
              type="number"
              required
              value={capacity === "" ? "" : Number(capacity)}
              onChange={(e) => setCapacity(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
            />
            <Input label="Location" required value={location} onChange={(e) => setLocation(e.target.value)} />

            <div className="flex gap-2">
              <Button type="submit" isLoading={loading}>Create</Button>
              <Link href="/rooms">
                <Button variant="outline">View Rooms</Button>
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </main>
  );
}
