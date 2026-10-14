import { api } from "./api";
import { User } from "../domain/User";

export const userService = {
  async me(): Promise<User> {
    const res = await api.get("/auth/me");
    return res.data;
  }
};
