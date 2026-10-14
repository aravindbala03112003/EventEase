"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Form";
import { useAuth } from "../../features/auth/useAuth";
import { authService } from "../../services/authService";

export default function LoginPage() {
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
      const data = await authService.login({ email, password });
      
      // Directly write to localStorage to ensure it's persisted before redirect
      if (typeof window !== "undefined") {
        localStorage.setItem("eventease_auth", JSON.stringify({
          user: data.user,
          token: data.token
        }));
      }
      
      // Also update the auth hook state
      setAuth(data.user, data.token);
      
      // Give localStorage time to persist before redirect
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg mb-4">
            <span className="text-white font-bold">E</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-600 mt-2">Sign in to EventEase</p>
        </div>

        {/* Login Card */}
        <Card className="mb-6">
          <CardHeader title="" />
          <CardBody className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <span className="text-red-600 font-semibold flex-shrink-0">⚠</span>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-slate-700">Remember me</span>
                </label>
                <Link href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={loading}
                className="mt-6"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary-600 hover:text-primary-700">
              Create one now
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
          <p className="text-xs text-blue-800">Email: <code className="font-mono">demo@example.com</code></p>
          <p className="text-xs text-blue-800">Password: <code className="font-mono">demo123</code></p>
        </div>
      </div>
    </main>
  );
}
