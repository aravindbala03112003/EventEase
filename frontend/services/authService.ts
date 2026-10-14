import { api } from "./api";
import { User } from "../domain/User";

export const authService = {
  async login(params: { email: string; password: string }): Promise<{ user: User; token: string }> {
    const res = await api.post("/auth/login", params);
    return res.data;
  },

  async register(params: { name: string; email: string; password: string }): Promise<User> {
    const res = await api.post("/auth/register", params);
    return res.data;
  },

  async registerAdmin(params: { name: string; email: string; password: string }): Promise<User> {
    const res = await api.post("/admin/auth/register", params);
    return res.data;
  },

  async loginAdmin(params: { email: string; password: string }): Promise<{ user: User; token: string }> {
    const res = await api.post("/admin/auth/login", params);
    return res.data;
  }
};
