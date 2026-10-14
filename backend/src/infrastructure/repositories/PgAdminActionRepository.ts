import { IAdminActionRepository } from "../../application/interfaces/IAdminActionRepository";
import { query } from "../db/postgresClient";

export class PgAdminActionRepository implements IAdminActionRepository {
  async create(params: { adminId: string; bookingId: string; action: "approve" | "reject" }): Promise<void> {
    await query(
      "INSERT INTO admin_actions (admin_id, booking_id, action) VALUES ($1, $2, $3)",
      [params.adminId, params.bookingId, params.action]
    );
  }
}
