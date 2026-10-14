import { IUserRepository } from "../../application/interfaces/IUserRepository";
import { User, UserRole } from "../../domain/entities/User";
import { query } from "../db/postgresClient";

export class PgUserRepository implements IUserRepository {
  private mapRow(row: any): User {
    return new User(
      String(row.id),
      row.name,
      row.email,
      row.password_hash,
      row.role as UserRole,
      row.created_at
    );
  }

  async findById(id: string): Promise<User | null> {
    const result = await query("SELECT * FROM users WHERE id = $1", [id]);
    const row = result.rows[0];
    return row ? this.mapRow(row) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);
    const row = result.rows[0];
    return row ? this.mapRow(row) : null;
  }

  async create(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const result = await query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.name, user.email, user.passwordHash, user.role]
    );
    return this.mapRow(result.rows[0]);
  }
}
