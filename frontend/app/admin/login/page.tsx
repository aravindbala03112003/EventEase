"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Form";
import { useAuth } from "../../../features/auth/useAuth";
import { authService } from "../../../services/authService";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await authService.loginAdmin({ email, password });
      if (typeof window !== "undefined") {
        localStorage.setItem("eventease_auth", JSON.stringify({ user: data.user, token: data.token }));
      }
      setAuth(data.user, data.token);
      await new Promise((r) => setTimeout(r, 100));
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container max-w-md mx-auto px-4 py-12">
      <Card>
        <CardHeader title="Admin Sign In" description="Access the admin dashboard" />
        <CardBody>
          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" fullWidth isLoading={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
          </form>
          <div className="text-center mt-4 text-sm">
            <p>
              Need an admin account? <Link href="/admin/signup" className="text-primary-600 font-semibold">Create one</Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}

