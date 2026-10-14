export interface CreateBookingDTO {
  userId: string;
  roomId: string;
  start: string;
  end: string;
  title?: string;
  attendees?: number;
  description?: string;
}
