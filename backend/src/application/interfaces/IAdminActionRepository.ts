export interface IAdminActionRepository {
  create(params: { adminId: string; bookingId: string; action: "approve" | "reject" }): Promise<void>;
}
