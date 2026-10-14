export class Room {
  constructor(
    public id: string,
    public name: string,
    public capacity: number,
    public location: string,
    public createdAt: Date
  ) {}
}
