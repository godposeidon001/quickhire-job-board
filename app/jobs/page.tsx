import { SiteFooter } from "@/components/footer/site-footer";
import TopNav from "@/components/top-nav";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

type JobDto = {
  id: string;
  title: string;
  company: string;
  companyLogo: string | null;
  location: string;
  type: string;
  description: string;
  createdAt: Date;
  category: {
    id: string;
    name: string;
  };
  tags: string[];
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string | string[] }>;
}) {
  const params = await searchParams;
  const categoryId = Array.isArray(params.categoryId)
    ? params.categoryId[0]
    : params.categoryId;

  const jobsRaw = await prisma.job.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  const jobs: JobDto[] = jobsRaw.map((j) => ({
    id: j.id,
    title: j.title,
    company: j.company,
    companyLogo: j.companyLogo,
    location: j.location,
    type: j.type,
    description: j.description,
    createdAt: j.createdAt,
    category: {
      id: j.category.id,
      name: j.category.name,
    },
    tags: j.tags.map((t) => t.tag.name),
  }));

  const activeCategoryName =
    categoryId && jobs.length > 0 ? jobs[0].category.name : undefined;

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
        <div className="mx-auto w-full max-w-[1100px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-heading text-4xl font-semibold text-[var(--neutral-100)]">
              {activeCategoryName ? `${activeCategoryName} Jobs` : "All Jobs"}
            </h1>

            <p className="mt-2 text-[var(--neutral-80)]">
              {jobs.length} job{jobs.length === 1 ? "" : "s"} found
            </p>
          </div>

          {categoryId && (
            <Link
              href="/jobs"
              className="text-sm font-semibold text-[var(--brand-primary)]"
            >
              Clear filter
            </Link>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-xl border border-[var(--neutral-20)] bg-white p-10 text-center">
            <p className="text-[var(--neutral-80)]">No jobs found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-xl border border-[var(--neutral-20)] bg-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {job.companyLogo ? (
                      <img
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        className="h-12 w-12 rounded object-contain"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded bg-[var(--neutral-20)]" />
                    )}

                    <div>
                      <h2 className="text-xl font-semibold text-[var(--neutral-100)]">
                        {job.title}
                      </h2>

                      <p className="mt-1 text-sm text-[var(--neutral-80)]">
                        {job.company} • {job.location}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border px-3 py-1 text-xs font-medium text-[var(--neutral-80)]">
                          {job.type}
                        </span>

                        <span className="rounded-full border px-3 py-1 text-xs font-medium text-[var(--neutral-80)]">
                          {job.category.name}
                        </span>

                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border px-3 py-1 text-xs font-medium text-[var(--neutral-80)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/jobs/${job.id}`}
                    className="flex h-10 items-center rounded bg-[var(--brand-primary)] px-5 text-sm font-bold text-white"
                  >
                    View
                  </Link>
                </div>

                <p className="mt-4 text-sm leading-[1.6] text-[var(--neutral-80)]">
                  {job.description}
                </p>
              </article>
            ))}
          </div>
        )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
