"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data?.error || "Unable to sign in.");
      }

      router.push("/secret-admin/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-24 sm:px-8 lg:px-12">
      <section className="rounded-[2rem] border border-[#1C1B1A]/10 bg-[#FFFDF9] p-10 shadow-[0_28px_50px_rgba(28,27,26,0.08)]">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#8A6F52]">Secure admin access</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.03em] text-[#1C1B1A] sm:text-5xl">NileCotton hidden editor</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#1C1B1A]/75">
              Sign in with your email and password to access the hidden content management portal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
              <span className="font-semibold">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-[#1C1B1A]">
              <span className="font-semibold">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="rounded-2xl border border-[#1C1B1A]/10 bg-white px-4 py-3 text-sm text-[#1C1B1A] outline-none transition focus:border-[#8A6F52]/80"
              />
            </label>

            {error ? <p className="text-sm text-[#B00020]">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[56px] w-full items-center justify-center rounded-full bg-[#1C1B1A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#FFFDF9] transition hover:bg-[#1C1B1A]/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-sm text-[#1C1B1A]/70">This page is hidden and only available with the admin URL and your sign-in credentials.</p>
        </div>
      </section>
    </main>
  );
}
