"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input, Select, TextArea } from "../../../components/ui/Form";
import { bookingService } from "../../../services/bookingService";
import { Badge } from "../../../components/ui/Badge";
import { useAuth } from "../../../features/auth/useAuth";
import { roomService } from "../../../services/roomService";


export default function NewBookingPage() {
  const { token } = useAuth();
  const router = useRouter();

  const [rooms, setRooms] = useState<{ id: string; name: string; capacity: number; location: string }[]>([]);
  const [formData, setFormData] = useState({
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    attendees: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    roomService
      .listRooms()
      .then((r) => {
        const mapped = r.map((x: any) => ({ id: String(x.id), name: x.name, capacity: x.capacity, location: x.location }));
        const seen = new Set<string>();
        const unique = mapped.filter((x) => {
          const key = `${x.name}-${x.capacity}-${x.location}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setRooms(unique);
      })
      .catch(() => {});
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.roomId) newErrors.roomId = "Please select a room";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.title) newErrors.title = "Meeting title is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!token) {
      setErrors({ submit: "You must be logged in to create a booking." });
      return;
    }

    setLoading(true);
    try {
      // Check availability first
      const start = `${formData.date}T${formData.startTime}`;
      const end = `${formData.date}T${formData.endTime}`;
      const available = await bookingService.checkAvailability({ roomId: formData.roomId, start, end });
      if (!available) {
        setErrors({ submit: 'Selected time slot is not available. Please choose another time.' });
        setLoading(false);
        return;
      }

      const attendeesNumber = formData.attendees ? Number(formData.attendees) : undefined;
      await bookingService.createBooking({
        roomId: formData.roomId,
        start,
        end,
        title: formData.title || undefined,
        attendees: attendeesNumber,
        description: formData.description || undefined
      });
      setSuccess(true);

      // Reset form
      setFormData({
        roomId: "",
        date: "",
        startTime: "",
        endTime: "",
        title: "",
        attendees: "",
        description: "",
      });

      setTimeout(() => setSuccess(false), 500);
      router.push("/bookings");
    } catch (error: any) {
      console.error("Booking failed:", error);
      const message =
        error?.response?.data?.message ||
        (error?.response?.status === 401
          ? "Your session has expired or you are not logged in. Please log in again."
          : "Failed to create booking. Please try again.");
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Book a Room</h1>
        <p className="text-slate-600 mt-2">
          Create a new booking for your meeting
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody>
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-green-900">
                      Booking confirmed!
                    </h4>
                    <p className="text-sm text-green-800 mt-1">
                      Your meeting room has been booked. Check your email for confirmation.
                    </p>
                  </div>
                </div>
              )}

              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Selection */}
                <Select
                  label="Select Room"
                  required
                  options={rooms.map((r) => ({ value: String(r.id), label: `${r.name} (${r.capacity} people)` }))}
                  value={formData.roomId}
                  onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                  error={errors.roomId}
                />

                {/* Date */}
                <Input
                  label="Date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  error={errors.date}
                />

                {/* Time Slots */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Start Time"
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    error={errors.startTime}
                  />
                  <Input
                    label="End Time"
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    error={errors.endTime}
                  />
                </div>

                {/* Meeting Title */}
                <Input
                  label="Meeting Title"
                  placeholder="e.g., Q1 Planning Meeting"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  error={errors.title}
                />

                {/* Attendees */}
                <Input
                  label="Number of Attendees"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.attendees}
                  onChange={(e) =>
                    setFormData({ ...formData, attendees: e.target.value })
                  }
                />

                {/* Description */}
                <TextArea
                  label="Description"
                  placeholder="Add any additional details or agenda items..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" fullWidth isLoading={loading}>
                    {loading ? "Booking..." : "Confirm Booking"}
                  </Button>
                  <Link href="/dashboard" className="block">
                    <Button variant="outline" fullWidth>
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader title="Booking Summary" />
            <CardBody className="space-y-4">
              {formData.roomId && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">
                    Room
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {(() => { const rr = rooms.find((r) => String(r.id) === formData.roomId); return rr ? `${rr.name} (${rr.capacity} people)` : "—"; })()}
                  </p>
                </div>
              )}

              {formData.date && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">
                    Date
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {new Date(formData.date).toLocaleDateString()}
                  </p>
                </div>
              )}

              {formData.startTime && formData.endTime && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">
                    Time
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {formData.startTime} - {formData.endTime}
                  </p>
                </div>
              )}

              {formData.title && (
                <div>
                  <p className="text-xs font-semibold text-slate-600 uppercase">
                    Title
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">
                    {formData.title}
                  </p>
                </div>
              )}

              {!(formData.roomId && formData.date && formData.startTime) && (
                <p className="text-xs text-slate-500 italic">
                  Fill in the form to see booking summary
                </p>
              )}
            </CardBody>
          </Card>

          {/* Tips */}
          <Card className="bg-amber-50 border-amber-200">
            <CardBody className="space-y-3">
              <div className="text-2xl">⭐</div>
              <h4 className="font-semibold text-amber-900">Tips</h4>
              <ul className="text-xs text-amber-800 space-y-2">
                <li>✓ Book at least 1 hour in advance</li>
                <li>✓ Check room amenities before booking</li>
                <li>✓ Cancel if your meeting is cancelled</li>
                <li>✓ Invite attendees via email</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
