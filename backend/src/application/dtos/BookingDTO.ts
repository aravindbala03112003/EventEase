import { BookingStatus } from "../../domain/enums/BookingStatus";

export interface BookingDTO {
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
  userRole?: string;
}
