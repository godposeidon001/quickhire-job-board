"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type ApplicationFormProps = {
  jobId: string;
  jobTitle: string;
  company: string;
  defaultName?: string;
  defaultEmail?: string;
};

export default function ApplicationForm({
  jobId,
  jobTitle,
  company,
  defaultName = "",
  defaultEmail = "",
}: ApplicationFormProps) {
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [resumeLink, setResumeLink] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!resumeLink.trim()) {
      setError("Resume link is required.");
      return;
    }

    if (!coverNote.trim() || coverNote.trim().length < 10) {
      setError("Cover note must be at least 10 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          name: name.trim(),
          email: email.trim(),
          resumeLink: resumeLink.trim(),
          coverNote: coverNote.trim(),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setError(data?.error ?? "Failed to submit application.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-[var(--neutral-20)] bg-white p-6">
        <h2 className="font-heading text-3xl font-semibold text-[var(--neutral-100)]">
          Application submitted
        </h2>
        <p className="mt-3 text-[var(--neutral-80)]">
          Your application for <strong>{jobTitle}</strong> at{" "}
          <strong>{company}</strong> has been sent.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/jobs/${jobId}`}
            className="rounded-lg bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold text-white"
          >
            Back to job details
          </Link>
          <Link
            href="/jobs"
            className="rounded-lg border border-[var(--neutral-20)] px-5 py-3 text-sm font-semibold text-[var(--neutral-100)]"
          >
            Browse more jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      className="rounded-xl border border-[var(--neutral-20)] bg-white p-6"
      onSubmit={handleSubmit}
    >
      <h2 className="font-heading text-3xl font-semibold text-[var(--neutral-100)]">
        Apply for {jobTitle}
      </h2>
      <p className="mt-2 text-[var(--neutral-80)]">
        Complete the required details to submit your application.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-[var(--neutral-100)]"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="h-11 w-full rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[var(--neutral-100)]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="h-11 w-full rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="resumeLink"
            className="mb-2 block text-sm font-medium text-[var(--neutral-100)]"
          >
            Resume link
          </label>
          <input
            id="resumeLink"
            type="url"
            required
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            placeholder="https://..."
            className="h-11 w-full rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="coverNote"
            className="mb-2 block text-sm font-medium text-[var(--neutral-100)]"
          >
            Cover note
          </label>
          <textarea
            id="coverNote"
            required
            minLength={10}
            rows={6}
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            placeholder="Why are you a good fit for this role?"
            className="w-full rounded-lg border border-[var(--neutral-20)] px-3 py-2 text-sm outline-none focus:border-[var(--brand-primary)]"
          />
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-[#ff6550]">{error}</p> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold text-white disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
        <Link
          href={`/jobs/${jobId}`}
          className="rounded-lg border border-[var(--neutral-20)] px-5 py-3 text-sm font-semibold text-[var(--neutral-100)]"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
