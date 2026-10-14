export type UserRole = "admin" | "staff" | "student" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
