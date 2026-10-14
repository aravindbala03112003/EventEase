export type UserRole = "admin" | "staff" | "student" | "user";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public passwordHash: string,
    public role: UserRole,
    public createdAt: Date
  ) {}
}
