import Link from "next/link";
import { Button } from "../components/ui/Button";
import { Card, CardBody } from "../components/ui/Card";

export default function HomePage() {
  const features = [
    {
      icon: "📅",
      title: "Easy Booking",
      description: "Book your preferred meeting room in just a few clicks",
    },
    {
      icon: "🏢",
      title: "Multiple Rooms",
      description: "Choose from a variety of meeting rooms with different capacities",
    },
    {
      icon: "⏰",
      title: "Real-time Availability",
      description: "Check room availability and book your desired time slot instantly",
    },
    {
      icon: "🔔",
      title: "Instant Notifications",
      description: "Get instant confirmations and reminders for your bookings",
    },
    {
      icon: "👥",
      title: "Team Management",
      description: "Manage team bookings and invite colleagues to meetings",
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Track your booking history and room utilization statistics",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Users" },
    { number: "500+", label: "Meeting Rooms" },
    { number: "50K+", label: "Bookings Monthly" },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="section-title">
                Book Meeting Rooms <span className="text-gradient">Effortlessly</span>
              </h1>
              <p className="section-subtitle">
                EventEase makes scheduling and managing meeting rooms simple, efficient, and stress-free. Find available rooms, book instantly, and collaborate better.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bookings/new">
                <Button size="lg">
                  Start Booking
                  <span className="text-xl">→</span>
                </Button>
              </Link>
              <Link href="/rooms">
                <Button variant="outline" size="lg">
                  Browse Rooms
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="pt-8 grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl font-bold text-primary-600">
                    {stat.number}
                  </div>
                  <p className="text-xs text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-3xl opacity-30 blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 border border-primary-100 shadow-xl">
              <div className="space-y-4">
                <div className="h-12 bg-primary-200 rounded-lg opacity-30"></div>
                <div className="h-32 bg-primary-100 rounded-lg opacity-40"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-16 bg-secondary-200 rounded-lg opacity-30"></div>
                  <div className="h-16 bg-secondary-100 rounded-lg opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Powerful Features</h2>
            <p className="section-subtitle mt-4">
              Everything you need to manage and book meeting rooms efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card key={i} hover className="group">
                <CardBody className="space-y-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Simplify Room Booking?
            </h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              Join thousands of teams already using EventEase to book meeting rooms and schedule their time effectively.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/bookings/new">
              <Button
                className="bg-white text-primary-600 hover:bg-slate-50 font-semibold"
                size="lg"
              >
                Start Booking Now
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-700">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">EventEase</h4>
              <p className="text-sm">
                Making meeting room booking simple, efficient, and stress-free.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white">Rooms</Link></li>
                <li><Link href="/" className="hover:text-white">Bookings</Link></li>
                <li><Link href="/" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white">About</Link></li>
                <li><Link href="/" className="hover:text-white">Blog</Link></li>
                <li><Link href="/" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/" className="hover:text-white">Terms</Link></li>
                <li><Link href="/" className="hover:text-white">Cookie</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 EventEase. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
