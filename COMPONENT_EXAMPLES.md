# EventEase - Component Implementation Examples

## 🧩 Common Patterns

### 1. Simple Data List

```tsx
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function RoomsList() {
  const rooms = [
    { id: 1, name: "Conference Room A", available: true },
    { id: 2, name: "Meeting Room B", available: false },
  ];

  return (
    <Card>
      <CardHeader title="Available Rooms" />
      <CardBody>
        <div className="space-y-2">
          {rooms.map((room) => (
            <div key={room.id} className="flex items-center justify-between p-3 bg-slate-50 rounded">
              <span className="font-medium">{room.name}</span>
              <Badge variant={room.available ? "success" : "warning"}>
                {room.available ? "Available" : "Booked"}
              </Badge>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
```

### 2. Form with Validation

```tsx
"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form";

export function BookingForm() {
  const [formData, setFormData] = useState({ title: "", date: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.date) newErrors.date = "Date is required";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Submit
    setLoading(true);
    try {
      // API call here
      console.log("Submitting:", formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Meeting Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            required
          />

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
            required
          />

          <Button type="submit" fullWidth isLoading={loading}>
            {loading ? "Booking..." : "Book Now"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
```

### 3. Stats Dashboard

```tsx
import { Card, CardBody } from "@/components/ui/Card";

export function Dashboard() {
  const stats = [
    { label: "Total Bookings", value: "24", color: "bg-primary-100" },
    { label: "Upcoming", value: "3", color: "bg-secondary-100" },
    { label: "Hours Booked", value: "48h", color: "bg-green-100" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardBody className="space-y-2">
            <div className={`w-12 h-12 ${stat.color} rounded-lg`}></div>
            <p className="text-slate-600">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
```

### 4. Filter with Search

```tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Form";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function FilteredRoomsList() {
  const [search, setSearch] = useState("");
  const [capacity, setCapacity] = useState<number | null>(null);

  const allRooms = [
    { id: 1, name: "Conference Room A", capacity: 10 },
    { id: 2, name: "Meeting Room B", capacity: 6 },
    { id: 3, name: "Boardroom", capacity: 15 },
  ];

  const filtered = allRooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
    const matchesCapacity = !capacity || room.capacity >= capacity;
    return matchesSearch && matchesCapacity;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search rooms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={capacity?.toString() || ""}
          onChange={(e) => setCapacity(e.target.value ? parseInt(e.target.value) : null)}
          className="select input"
        >
          <option value="">All sizes</option>
          <option value="5">5+ people</option>
          <option value="10">10+ people</option>
        </select>
      </div>

      <div className="space-y-2">
        {filtered.map((room) => (
          <Card key={room.id} hover>
            <CardBody className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">{room.name}</h3>
                <p className="text-sm text-slate-600">👥 {room.capacity} people</p>
              </div>
              <Button size="sm">View</Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

### 5. Status-based Rendering

```tsx
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

interface BookingProps {
  status: "confirmed" | "pending" | "cancelled";
}

export function BookingCard({ status }: BookingProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "info";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return "✓";
      case "pending":
        return "⏳";
      case "cancelled":
        return "✕";
      default:
        return "•";
    }
  };

  return (
    <Card>
      <CardBody className="flex items-center justify-between">
        <div>
          <h3 className="font-bold">Conference Room A</h3>
          <p className="text-sm text-slate-600">Jan 15, 2025 - 10:00 AM</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={getStatusColor(status) as any}>
            {getStatusIcon(status)} {status.toUpperCase()}
          </Badge>

          {status !== "cancelled" && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                Edit
              </Button>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
```

### 6. Modal-like Overlay

```tsx
"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete Booking</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md animate-slide-in">
            <CardHeader title="Confirm Action" />
            <CardBody className="space-y-4">
              <p className="text-slate-600">
                Are you sure you want to delete this booking? This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => {
                    console.log("Deleted");
                    setIsOpen(false);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
```

### 7. Responsive Grid Layout

```tsx
import { Card, CardBody } from "@/components/ui/Card";

export function ResponsiveGallery() {
  const items = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
  }));

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.id} hover>
          <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <span className="text-3xl">📦</span>
          </div>
          <CardBody>
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-slate-600">Card content</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
```

### 8. Loading States

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";

export function AsyncOperation() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleClick = async () => {
    setLoading(true);
    setStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatus("success");
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardBody className="space-y-4">
        {status === "success" && (
          <Alert type="success" title="Success!" message="Operation completed" />
        )}

        {status === "error" && (
          <Alert type="error" title="Error" message="Something went wrong" />
        )}

        <Button onClick={handleClick} isLoading={loading} fullWidth>
          {loading ? "Processing..." : "Submit"}
        </Button>
      </CardBody>
    </Card>
  );
}
```

### 9. Tab Navigation

```tsx
"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/Card";

export function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    { id: "tab1", label: "Upcoming", content: "Your upcoming bookings" },
    { id: "tab2", label: "Past", content: "Your past bookings" },
    { id: "tab3", label: "Cancelled", content: "Your cancelled bookings" },
  ];

  return (
    <Card>
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <CardBody>
        {tabs.find((t) => t.id === activeTab)?.content}
      </CardBody>
    </Card>
  );
}
```

### 10. Empty State

```tsx
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function EmptyState() {
  return (
    <Card>
      <CardBody className="text-center py-12 space-y-4">
        <div className="text-5xl">📭</div>
        <h3 className="text-xl font-bold text-slate-900">No bookings yet</h3>
        <p className="text-slate-600">
          Start booking meeting rooms to organize your team meetings
        </p>
        <Button>Create First Booking</Button>
      </CardBody>
    </Card>
  );
}
```

## 🎯 Implementation Tips

1. **Always use the component library** - Don't create inline styles when components exist
2. **Compose components** - Use Card + Button + Badge together
3. **Handle loading states** - Use `isLoading` prop on buttons
4. **Show validation errors** - Use error props on inputs
5. **Provide feedback** - Use alerts for confirmations
6. **Responsive first** - Test on mobile before desktop
7. **Type everything** - Use TypeScript for safety
8. **Test accessibility** - Use keyboard navigation

## 📦 Export Components Properly

```tsx
// components/index.ts
export * from "./ui/Button";
export * from "./ui/Card";
export * from "./ui/Form";
export * from "./ui/Badge";
export * from "./ui/Alert";
export { Navigation } from "./Navigation";
```

Then import like:
```tsx
import { Button, Card, CardBody, Input } from "@/components";
```

---

These patterns cover most common use cases. Adapt and combine them as needed for your specific requirements.
