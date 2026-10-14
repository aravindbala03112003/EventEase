import { api } from "./api";
import { Booking } from "../domain/Booking";

export const bookingService = {
  async createBooking(params: { roomId: string; start: string; end: string; title?: string; attendees?: number; description?: string }): Promise<Booking> {
    const res = await api.post("/bookings", params);
    return res.data;
  },

  async createDepartmentEvent(params: { roomId: string; start: string; end: string; title: "Workshop" | "Guest Lecture" | "Department Meeting" | "Lab Session"; attendees?: number; description?: string }): Promise<Booking> {
    const res = await api.post("/bookings/department", params);
    return res.data;
  },

  async listRoomBookings(roomId: string): Promise<Booking[]> {
    const res = await api.get(`/bookings/room/${roomId}`);
    return res.data;
  }
  ,
  async checkAvailability(params: { roomId: string; start: string; end: string }): Promise<boolean> {
    const res = await api.get(`/bookings/availability`, { params });
    return res.data.available;
  },
  async approveBooking(id: string): Promise<Booking> {
    const res = await api.post(`/bookings/${id}/approve`);
    return res.data;
  },
  async rejectBooking(id: string): Promise<Booking> {
    const res = await api.post(`/bookings/${id}/reject`);
    return res.data;
  },
  async cancelBooking(id: string): Promise<Booking> {
    const res = await api.post(`/bookings/${id}/cancel`);
    return res.data;
  },
  async listAllBookings(): Promise<Booking[]> {
    const res = await api.get(`/bookings`);
    return res.data;
  },
  async listUserBookings(userId?: string): Promise<Booking[]> {
    const res = await api.get(`/bookings` , { params: userId ? { userId } : {} });
    return res.data;
  }
};
