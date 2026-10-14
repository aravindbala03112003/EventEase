"use client";

import { useMemo } from "react";

interface Props {
  dates: { start: string; end: string; role?: "student" | "staff" | "user" | "admin" }[];
}

function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export default function Calendar({ dates }: Props) {
  const week = useMemo(() => {
    const days: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push(d);
    }
    return days;
  }, []);

  function bookingsForDay(day: Date) {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    return dates.filter((b) => {
      const s = new Date(b.start);
      const e = new Date(b.end);
      return s < dayEnd && e > dayStart;
    }).map((b) => ({ start: new Date(b.start), end: new Date(b.end), role: b.role }));
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-2">
        {week.map((day) => (
          <div key={day.toISOString()} className="border rounded-lg p-2 bg-white">
            <div className="text-xs font-semibold text-slate-600 mb-2">{formatDay(day)}</div>
            <div className="space-y-2">
              {bookingsForDay(day).length === 0 ? (
                <div className="text-xs text-slate-400">No bookings</div>
              ) : (
                bookingsForDay(day).map((b, i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded text-xs border ${
                      b.role === "staff"
                        ? "bg-purple-50 border-purple-100"
                        : "bg-blue-50 border-blue-100"
                    }`}
                  >
                    <div className={`font-medium ${b.role === "staff" ? "text-purple-700" : "text-blue-700"}`}>
                      {b.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {b.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
