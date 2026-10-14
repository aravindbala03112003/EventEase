"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Form";
import { authService } from "../../../services/authService";

export default function AdminSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await authService.registerAdmin({ name, email, password });
      setSuccess("Admin account created. You can sign in now.");
      setTimeout(() => router.replace("/admin/login"), 800);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create admin account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container max-w-md mx-auto px-4 py-12">
      <Card>
        <CardHeader title="Create Admin" description="Register a new admin account" />
        <CardBody>
          {success && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">{success}</div>}
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" fullWidth isLoading={loading}>{loading ? "Creating..." : "Create Admin"}</Button>
          </form>
          <div className="text-center mt-4 text-sm">
            <p>
              Already have an admin account? <Link href="/admin/login" className="text-primary-600 font-semibold">Sign in</Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
