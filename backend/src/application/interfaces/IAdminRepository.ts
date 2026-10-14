import { Admin } from "../../domain/entities/Admin";

export interface IAdminRepository {
  findById(id: string): Promise<Admin | null>;
  findByEmail(email: string): Promise<Admin | null>;
  create(admin: Omit<Admin, "id" | "createdAt">): Promise<Admin>;
}
