export type BookingStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  start: string;
  end: string;
  status: BookingStatus;
  createdAt: string;
  title?: string;
  attendees?: number;
  description?: string;
  userRole?: "student" | "staff" | "user" | "admin";
}
