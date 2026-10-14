import { IRoomRepository } from "../../application/interfaces/IRoomRepository";
import { Room } from "../../domain/entities/Room";
import { query } from "../db/postgresClient";

export class PgRoomRepository implements IRoomRepository {
  private mapRow(row: any): Room {
    return new Room(String(row.id), row.name, row.capacity, row.location, row.created_at);
  }

  async findById(id: string): Promise<Room | null> {
    const result = await query("SELECT * FROM rooms WHERE id = $1", [id]);
    const row = result.rows[0];
    return row ? this.mapRow(row) : null;
  }

  async list(): Promise<Room[]> {
    const result = await query("SELECT * FROM rooms ORDER BY name");
    return result.rows.map((r: any) => this.mapRow(r));
  }

  async create(params: { name: string; capacity: number; location: string }): Promise<Room> {
    const result = await query(
      "INSERT INTO rooms (name, capacity, location) VALUES ($1, $2, $3) RETURNING *",
      [params.name, params.capacity, params.location]
    );
    return this.mapRow((result as any).rows[0]);
  }

  async update(id: string, params: { name?: string; capacity?: number; location?: string }): Promise<Room> {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;
    if (params.name !== undefined) {
      fields.push(`name = $${idx++}`);
      values.push(params.name);
    }
    if (params.capacity !== undefined) {
      fields.push(`capacity = $${idx++}`);
      values.push(params.capacity);
    }
    if (params.location !== undefined) {
      fields.push(`location = $${idx++}`);
      values.push(params.location);
    }
    values.push(id);
    const sql = `UPDATE rooms SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`;
    const result = await query(sql, values);
    return this.mapRow((result as any).rows[0]);
  }

  async delete(id: string): Promise<void> {
    await query("DELETE FROM rooms WHERE id = $1", [id]);
  }
}
