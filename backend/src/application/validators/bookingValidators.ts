import { CreateBookingDTO } from "../dtos/CreateBookingDTO";

export function validateCreateBookingDTO(input: any): CreateBookingDTO {
  const { userId, roomId, start, end, title, attendees, description } = input ?? {};
  if (!userId || !roomId || !start || !end) {
    const error = new Error("userId, roomId, start and end are required");
    (error as any).status = 400;
    throw error;
  }
  if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
    const error = new Error("start and end must be valid dates");
    (error as any).status = 400;
    throw error;
  }
  if (new Date(end) <= new Date(start)) {
    const error = new Error("End must be after start");
    (error as any).status = 400;
    throw error;
  }
  return { userId, roomId, start, end, title, attendees, description };
}
