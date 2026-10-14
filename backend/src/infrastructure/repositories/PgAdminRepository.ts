import { IAdminRepository } from "../../application/interfaces/IAdminRepository";
import { Admin } from "../../domain/entities/Admin";
import { query } from "../db/postgresClient";

export class PgAdminRepository implements IAdminRepository {
  private mapRow(row: any): Admin {
    return new Admin(String(row.id), row.name, row.email, row.password_hash, row.created_at);
  }

  async findById(id: string): Promise<Admin | null> {
    const result = await query("SELECT * FROM admins WHERE id = $1", [id]);
    const row = (result as any).rows?.[0];
    return row ? this.mapRow(row) : null;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const result = await query("SELECT * FROM admins WHERE email = $1", [email]);
    const row = (result as any).rows?.[0];
    return row ? this.mapRow(row) : null;
  }

  async create(admin: Omit<Admin, "id" | "createdAt">): Promise<Admin> {
    const result = await query(
      "INSERT INTO admins (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [admin.name, admin.email, admin.passwordHash]
    );
    return this.mapRow((result as any).rows[0]);
  }
}
