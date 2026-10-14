export class TimeSlot {
  constructor(public start: Date, public end: Date) {
    if (end <= start) {
      throw new Error("End must be after start");
    }
  }
}
