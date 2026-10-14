import { Room } from "../../domain/entities/Room";

export interface IRoomRepository {
  findById(id: string): Promise<Room | null>;
  list(): Promise<Room[]>;
  create(params: { name: string; capacity: number; location: string }): Promise<Room>;
  update(id: string, params: { name?: string; capacity?: number; location?: string }): Promise<Room>;
  delete(id: string): Promise<void>;
}
