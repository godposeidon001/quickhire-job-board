"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data: { error?: string } = await response.json().catch(() => ({}));

    if (!response.ok) {
      setLoading(false);
      setError(data.error || "Could not create account.");
      return;
    }

    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    setLoading(false);

    if (!signInResult || signInResult.error) {
      router.push("/login");
      return;
    }

    router.push(signInResult.url || "/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
      <div className="mx-auto w-full max-w-[480px] rounded-xl border border-[var(--neutral-20)] bg-white p-8 shadow-sm">
        <h1 className="font-heading text-4xl font-semibold leading-[1.1] text-[var(--neutral-100)]">Create account</h1>
        <p className="mt-3 text-base leading-[1.6] text-[var(--neutral-80)]">Join QuickHire and start applying faster.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--neutral-100)]" htmlFor="name">
              Name
            </label>
            <input
              className="h-12 w-full border border-[var(--neutral-20)] px-4 text-base text-[var(--neutral-100)] outline-none focus:border-[var(--brand-primary)]"
              id="name"
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              type="text"
              value={name}
            />
          </div>

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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-[var(--neutral-80)]">
          Already have an account?{" "}
          <Link className="font-semibold text-[var(--brand-primary)]" href="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
