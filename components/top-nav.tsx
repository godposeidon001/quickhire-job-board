"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function LogoMark() {
  return (
    <div className="relative h-8 w-8 rounded-full bg-[var(--brand-primary)]">
      <div className="absolute left-[7px] top-[7px] h-[18px] w-[18px] rounded-full border-2 border-white" />
      <div className="absolute left-[14px] top-[14px] h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M4 7H20"
        stroke="#25324B"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M4 12H20"
        stroke="#25324B"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M4 17H14"
        stroke="#25324B"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function TopNav() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative w-full bg-white shadow-[inset_0_-1px_0_0_var(--neutral-20)] lg:shadow-none">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 pb-4 pt-2 lg:h-[78px] lg:px-[124px] lg:py-0">
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <span className="font-logo text-[24px] font-bold leading-none text-[var(--neutral-100)]">
            QuickHire
          </span>
        </Link>

        <button
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--neutral-20)] bg-white lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <MenuIcon />
        </button>

        <div className="hidden items-center gap-4 lg:flex">
          <nav className="mr-8 flex items-center gap-6 text-base font-medium text-[var(--neutral-80)]">
            <Link
              className="transition-colors hover:text-[var(--neutral-100)]"
              href="/jobs"
            >
              Find Jobs
            </Link>
            <Link
              className="transition-colors hover:text-[var(--neutral-100)]"
              href="/companies"
            >
              Browse Companies
            </Link>
          </nav>

          {/* Avoid UI flicker while loading */}
          {status === "loading" ? (
            <div className="h-10 w-40 animate-pulse rounded bg-[var(--neutral-20)]" />
          ) : user ? (
            <>
              <div className="text-sm font-medium text-[var(--neutral-80)]">
                Hi,{" "}
                <span className="text-[var(--neutral-100)]">
                  {user.name ?? user.email}
                </span>
              </div>

              {user.role === "USER" ? (
                <Link
                  className="px-3 py-2 text-sm font-bold text-[var(--brand-primary)]"
                  href="/applied-jobs"
                >
                  Applied Jobs
                </Link>
              ) : null}

              {/* Optional admin link */}
              {user.role === "ADMIN" ? (
                <Link
                  className="px-3 py-2 text-sm font-bold text-[var(--brand-primary)]"
                  href="/admin"
                >
                  Admin Panel
                </Link>
              ) : null}

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-[var(--neutral-100)] px-5 py-3 text-base font-bold text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="px-4 py-2 text-base font-bold text-[var(--brand-primary)]"
                href="/login"
              >
                Login
              </Link>
              <div className="h-12 w-px bg-[var(--neutral-20)]" />
              <Link
                className="bg-[var(--brand-primary)] px-6 py-3 text-base font-bold text-white"
                href="/signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--neutral-20)] bg-white px-4 pb-4 pt-3 lg:hidden">
          <nav className="flex flex-col gap-2 text-base font-medium text-[var(--neutral-80)]">
            <Link
              className="rounded-md px-2 py-2 transition-colors hover:bg-[var(--surface-light)] hover:text-[var(--neutral-100)]"
              href="/jobs"
              onClick={() => setMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              className="rounded-md px-2 py-2 transition-colors hover:bg-[var(--surface-light)] hover:text-[var(--neutral-100)]"
              href="/companies"
              onClick={() => setMenuOpen(false)}
            >
              Browse Companies
            </Link>
            {user?.role === "USER" ? (
              <Link
                className="rounded-md px-2 py-2 font-semibold text-[var(--brand-primary)]"
                href="/applied-jobs"
                onClick={() => setMenuOpen(false)}
              >
                Applied Jobs
              </Link>
            ) : null}
            {user?.role === "ADMIN" ? (
              <Link
                className="rounded-md px-2 py-2 font-semibold text-[var(--brand-primary)]"
                href="/admin"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            ) : null}
          </nav>

          <div className="mt-4 border-t border-[var(--neutral-20)] pt-3">
            {status === "loading" ? (
              <div className="h-10 w-40 animate-pulse rounded bg-[var(--neutral-20)]" />
            ) : user ? (
              <div className="space-y-3">
                <p className="text-sm text-[var(--neutral-80)]">
                  Hi,{" "}
                  <span className="font-medium text-[var(--neutral-100)]">
                    {user.name ?? user.email}
                  </span>
                </p>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="h-11 w-full rounded-md bg-[var(--neutral-100)] px-4 text-sm font-bold text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  className="flex h-11 items-center justify-center rounded-md border border-[var(--neutral-20)] text-sm font-bold text-[var(--brand-primary)]"
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="flex h-11 items-center justify-center rounded-md bg-[var(--brand-primary)] text-sm font-bold text-white"
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
