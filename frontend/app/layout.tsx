import "./globals.css";
import type { ReactNode } from "react";
import { Navigation } from "../components/Navigation";

export const metadata = {
  title: "EventEase - Meeting Room Booking",
  description: "Simple and efficient meeting room booking and scheduling",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
