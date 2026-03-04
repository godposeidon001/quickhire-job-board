"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(result.url || callbackUrl);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
      <div className="mx-auto w-full max-w-[480px] rounded-xl border border-[var(--neutral-20)] bg-white p-8 shadow-sm">
        <h1 className="font-heading text-4xl font-semibold leading-[1.1] text-[var(--neutral-100)]">Login</h1>
        <p className="mt-3 text-base leading-[1.6] text-[var(--neutral-80)]">Access your QuickHire account.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--neutral-100)]" htmlFor="email">
              Email
            </label>
            <input
              className="h-12 w-full border border-[var(--neutral-20)] px-4 text-base text-[var(--neutral-100)] outline-none focus:border-[var(--brand-primary)]"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--neutral-100)]" htmlFor="password">
              Password
            </label>
            <input
              className="h-12 w-full border border-[var(--neutral-20)] px-4 text-base text-[var(--neutral-100)] outline-none focus:border-[var(--brand-primary)]"
              id="password"
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </div>

          {error ? <p className="text-sm text-[#ff6550]">{error}</p> : null}

          <button
            className="h-12 w-full bg-[var(--brand-primary)] text-base font-bold text-white disabled:opacity-70"
            disabled={loading}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-[var(--neutral-80)]">
          Don&apos;t have an account?{" "}
          <Link className="font-semibold text-[var(--brand-primary)]" href="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
