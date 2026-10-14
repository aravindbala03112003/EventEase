import { IBookingRepository } from "../../application/interfaces/IBookingRepository";
import { Booking } from "../../domain/entities/Booking";
import { TimeSlot } from "../../domain/valueObjects/TimeSlot";
import { BookingStatus } from "../../domain/enums/BookingStatus";
import { query } from "../db/postgresClient";

export class PgBookingRepository implements IBookingRepository {
  private mapRow(row: any): Booking {
    const slot = new TimeSlot(row.start_time, row.end_time);
    return new Booking(
      String(row.id),
      String(row.user_id),
      String(row.room_id),
      slot,
      row.status as BookingStatus,
      row.created_at,
      row.title ?? undefined,
      typeof row.attendees === "number" ? row.attendees : undefined,
      row.description ?? undefined
    );
  }

  async findById(id: string): Promise<Booking | null> {
    const result = await query("SELECT * FROM bookings WHERE id = $1", [id]);
    const row = (result as any).rows?.[0];
    if (!row) return null;
    try {
      return this.mapRow(row);
    } catch {
      return null;
    }
  }

  async create(params: { userId: string; roomId: string; start: Date; end: Date; title?: string; attendees?: number; description?: string }): Promise<Booking> {
    const result = await query(
      "INSERT INTO bookings (user_id, room_id, start_time, end_time, title, attendees, description, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        params.userId,
        params.roomId,
        params.start,
        params.end,
        params.title ?? null,
        params.attendees ?? null,
        params.description ?? null,
        BookingStatus.Pending
      ]
    );
    return this.mapRow(result.rows[0]);
  }

  async updateStatus(id: string, status: BookingStatus): Promise<Booking> {
    const result = await query("UPDATE bookings SET status = $2 WHERE id = $1 RETURNING *", [id, status]);
    return this.mapRow(result.rows[0]);
  }

  async updateTimeSlot(id: string, start: Date, end: Date): Promise<Booking> {
    const result = await query("UPDATE bookings SET start_time = $2, end_time = $3 WHERE id = $1 RETURNING *", [id, start, end]);
    return this.mapRow(result.rows[0]);
  }

  async listByRoom(roomId: string): Promise<Booking[]> {
    const result = await query("SELECT * FROM bookings WHERE room_id = $1 ORDER BY start_time", [roomId]);
    const rows = (result as any).rows ?? [];
    const bookings: Booking[] = [];
    for (const r of rows) {
      try {
        bookings.push(this.mapRow(r));
      } catch {}
    }
    return bookings;
  }

  async listAll(): Promise<Booking[]> {
    const result = await query("SELECT * FROM bookings ORDER BY start_time");
    const rows = (result as any).rows ?? [];
    const bookings: Booking[] = [];
    for (const r of rows) {
      try {
        bookings.push(this.mapRow(r));
      } catch {}
    }
    return bookings;
  }

  async listByUser(userId: string): Promise<Booking[]> {
    const result = await query("SELECT * FROM bookings WHERE user_id = $1 ORDER BY start_time", [userId]);
    const rows = (result as any).rows ?? [];
    const bookings: Booking[] = [];
    for (const r of rows) {
      try {
        bookings.push(this.mapRow(r));
      } catch {}
    }
    return bookings;
  }

  async findOverlapping(params: { roomId: string; start: Date; end: Date }): Promise<Booking[]> {
    const result = await query(
      "SELECT * FROM bookings WHERE room_id = $1 AND status = $4 AND start_time < $3 AND end_time > $2",
      [params.roomId, params.start, params.end, BookingStatus.Approved]
    );
    const rows = (result as any).rows ?? [];
    const bookings: Booking[] = [];
    for (const r of rows) {
      try {
        bookings.push(this.mapRow(r));
      } catch {}
    }
    return bookings;
  }

  async findOverlappingActive(params: { roomId: string; start: Date; end: Date }): Promise<Booking[]> {
    const result = await query(
      "SELECT * FROM bookings WHERE room_id = $1 AND status IN ($4, $5) AND start_time < $3 AND end_time > $2",
      [params.roomId, params.start, params.end, BookingStatus.Approved, BookingStatus.Pending]
    );
    const rows = (result as any).rows ?? [];
    const bookings: Booking[] = [];
    for (const r of rows) {
      try {
        bookings.push(this.mapRow(r));
      } catch {}
    }
    return bookings;
  }
}
