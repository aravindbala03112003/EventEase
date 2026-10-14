import { api } from "./api";
import { Room } from "../domain/Room";

export const roomService = {
  async listRooms(): Promise<Room[]> {
    const res = await api.get("/rooms");
    return res.data;
  },

  async getRoom(id: string): Promise<Room> {
    const res = await api.get(`/rooms/${id}`);
    return res.data;
  },

  async createRoom(params: { name: string; capacity: number; location: string }): Promise<Room> {
    const res = await api.post("/rooms", params);
    return res.data;
  },

  async updateRoom(id: string, params: { name?: string; capacity?: number; location?: string }): Promise<Room> {
    const res = await api.put(`/rooms/${id}`, params);
    return res.data;
  },

  async deleteRoom(id: string): Promise<void> {
    await api.delete(`/rooms/${id}`);
  }
};
