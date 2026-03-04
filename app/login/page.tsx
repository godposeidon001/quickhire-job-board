"use client";

import { SiteFooter } from "@/components/footer/site-footer";
import TopNav from "@/components/top-nav";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg aria-hidden fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="M2.5 12C4.2 8.7 7.5 6.5 12 6.5C16.5 6.5 19.8 8.7 21.5 12C19.8 15.3 16.5 17.5 12 17.5C7.5 17.5 4.2 15.3 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ) : (
    <svg aria-hidden fill="none" height="18" viewBox="0 0 24 24" width="18">
      <path
        d="M2.5 12C4.2 8.7 7.5 6.5 12 6.5C16.5 6.5 19.8 8.7 21.5 12C19.8 15.3 16.5 17.5 12 17.5C7.5 17.5 4.2 15.3 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20L20 4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <>
      <TopNav />
      <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
        <div className="mx-auto w-full max-w-[480px] rounded-xl border border-[var(--neutral-20)] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h1 className="font-heading text-4xl font-semibold leading-[1.1] text-[var(--neutral-100)]">
              Login
            </h1>
            <Link
              className="rounded-lg border border-[var(--neutral-20)] px-3 py-2 text-sm font-semibold text-[var(--brand-primary)]"
              href="/"
            >
              Return to home
            </Link>
          </div>
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
              <div className="relative">
                <input
                  className="h-12 w-full border border-[var(--neutral-20)] px-4 pr-12 text-base text-[var(--neutral-100)] outline-none focus:border-[var(--brand-primary)]"
                  id="password"
                  minLength={6}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--neutral-60)] hover:text-[var(--neutral-100)]"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
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
      <SiteFooter />
    </>
  );
}
