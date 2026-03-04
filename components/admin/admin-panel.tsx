"use client";

import { useMemo, useState } from "react";

type CategoryItem = {
  id: string;
  name: string;
};

type JobItem = {
  id: string;
  title: string;
  company: string;
  companyLogo: string | null;
  location: string;
  type: string;
  description: string;
  isFeatured: boolean;
  createdAt: string | Date;
  category: {
    id: string;
    name: string;
  };
  tags: string[];
};

type JobFormState = {
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  description: string;
  categoryId: string;
  tagsInput: string;
  isFeatured: boolean;
};

const EMPTY_FORM: JobFormState = {
  title: "",
  company: "",
  companyLogo: "",
  location: "",
  type: "Full Time",
  description: "",
  categoryId: "",
  tagsInput: "",
  isFeatured: false,
};

function parseTags(input: string) {
  return [...new Set(input.split(",").map((t) => t.trim()).filter(Boolean))];
}

function toFormState(job: JobItem): JobFormState {
  return {
    title: job.title,
    company: job.company,
    companyLogo: job.companyLogo ?? "",
    location: job.location,
    type: job.type,
    description: job.description,
    categoryId: job.category.id,
    tagsInput: job.tags.join(", "),
    isFeatured: job.isFeatured,
  };
}

type AdminPanelProps = {
  initialJobs: JobItem[];
  categories: CategoryItem[];
};

export default function AdminPanel({ initialJobs, categories }: AdminPanelProps) {
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [form, setForm] = useState<JobFormState>({
    ...EMPTY_FORM,
    categoryId: categories[0]?.id ?? "",
  });
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sortedJobs = useMemo(
    () =>
      [...jobs].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [jobs],
  );

  async function refreshJobs() {
    const res = await fetch("/api/jobs", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to refresh jobs");
    const data = (await res.json()) as JobItem[];
    setJobs(data);
  }

  function resetForm() {
    setForm({ ...EMPTY_FORM, categoryId: categories[0]?.id ?? "" });
    setEditingJobId(null);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = {
        title: form.title,
        company: form.company,
        companyLogo: form.companyLogo.trim(),
        location: form.location,
        type: form.type,
        description: form.description,
        categoryId: form.categoryId,
        tags: parseTags(form.tagsInput),
        isFeatured: form.isFeatured,
      };

      const url = editingJobId ? `/api/jobs/${editingJobId}` : "/api/jobs";
      const method = editingJobId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Failed to save job");
      }

      await refreshJobs();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(jobId: string) {
    const confirmed = window.confirm("Delete this job permanently?");
    if (!confirmed) return;

    setError(null);
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Failed to delete job");
      }
      await refreshJobs();
      if (editingJobId === jobId) resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function startEdit(job: JobItem) {
    setEditingJobId(job.id);
    setForm(toFormState(job));
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1.45fr]">
      <section className="rounded-2xl border border-[var(--neutral-20)] bg-white p-6 lg:sticky lg:top-8 lg:h-fit lg:p-7">
        <div className="mb-5">
          <h2 className="font-heading text-3xl font-semibold text-[var(--neutral-100)]">
            {editingJobId ? "Edit Job" : "Add New Job"}
          </h2>
          <p className="mt-2 text-sm text-[var(--neutral-80)]">
            Manage posting details, tags, category, and featured status.
          </p>
        </div>

        {error ? (
          <p className="mb-4 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            required
            value={form.title}
            onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
            placeholder="Job title"
            className="h-11 w-full rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
          />
          <input
            required
            value={form.company}
            onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
            placeholder="Company name"
            className="h-11 w-full rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
          />
          <input
            value={form.companyLogo}
            onChange={(e) => setForm((s) => ({ ...s, companyLogo: e.target.value }))}
            placeholder="Company logo URL (optional)"
            className="h-11 w-full rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              required
              value={form.location}
              onChange={(e) => setForm((s) => ({ ...s, location: e.target.value }))}
              placeholder="Location"
              className="h-11 rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
            <input
              required
              value={form.type}
              onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}
              placeholder="Type (e.g. Full Time)"
              className="h-11 rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
            />
          </div>

          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm((s) => ({ ...s, categoryId: e.target.value }))}
            className="h-11 w-full rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            value={form.tagsInput}
            onChange={(e) => setForm((s) => ({ ...s, tagsInput: e.target.value }))}
            placeholder="Tags (comma separated)"
            className="h-11 w-full rounded-lg border border-[var(--neutral-20)] px-3 text-sm outline-none focus:border-[var(--brand-primary)]"
          />

          <textarea
            required
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            placeholder="Job description"
            rows={6}
            className="w-full rounded-lg border border-[var(--neutral-20)] px-3 py-2 text-sm outline-none focus:border-[var(--brand-primary)]"
          />

          <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--neutral-100)]">
            <input
              checked={form.isFeatured}
              onChange={(e) =>
                setForm((s) => ({ ...s, isFeatured: e.target.checked }))
              }
              type="checkbox"
            />
            Mark as featured
          </label>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              disabled={saving}
              type="submit"
              className="h-11 rounded-lg bg-[var(--brand-primary)] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : editingJobId ? "Update Job" : "Create Job"}
            </button>
            {editingJobId ? (
              <button
                disabled={saving}
                type="button"
                onClick={resetForm}
                className="h-11 rounded-lg border border-[var(--neutral-20)] px-5 text-sm font-semibold text-[var(--neutral-100)]"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-[var(--neutral-100)]">
              Existing Jobs
            </h2>
            <p className="mt-1 text-sm text-[var(--neutral-80)]">
              {sortedJobs.length} total job{sortedJobs.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {sortedJobs.length === 0 ? (
          <div className="rounded-2xl border border-[var(--neutral-20)] bg-white p-8 text-center text-[var(--neutral-80)]">
            No jobs found.
          </div>
        ) : (
          sortedJobs.map((job) => (
            <article
              key={job.id}
              className="rounded-2xl border border-[var(--neutral-20)] bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold text-[var(--neutral-100)]">
                      {job.title}
                    </h3>
                    {job.isFeatured ? (
                      <span className="rounded-full bg-[rgba(70,64,222,0.1)] px-2.5 py-1 text-xs font-bold text-[var(--brand-primary)]">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-[var(--neutral-80)]">
                    {job.company} | {job.location} | {job.type}
                  </p>
                  <p className="mt-1 text-xs text-[var(--neutral-60)]">
                    Category: {job.category.name}
                  </p>
                  {job.tags.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span
                          key={`${job.id}-${tag}`}
                          className="rounded-full border border-[var(--neutral-20)] px-2.5 py-1 text-xs text-[var(--neutral-80)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(job)}
                    className="h-9 rounded-lg border border-[var(--brand-primary)] px-3 text-sm font-semibold text-[var(--brand-primary)]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(job.id)}
                    className="h-9 rounded-lg border border-red-300 px-3 text-sm font-semibold text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
