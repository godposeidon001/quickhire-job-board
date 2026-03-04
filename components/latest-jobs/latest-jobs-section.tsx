import { prisma } from "@/lib/prisma";
import Link from "next/link";

const bgAsset = "https://www.figma.com/api/mcp/asset/49ab169c-6e4a-4021-88cf-f15c90814475";
const patternAsset =
  "https://www.figma.com/api/mcp/asset/5b6e35fc-f2f1-40bb-b53b-3d3393158451";

type LatestJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  companyLogo: string | null;
  categoryName: string;
  tags: string[];
};

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height="16"
      viewBox="0 0 16 16"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8H13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 3L13.5 8L8.5 13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function JobRow({ job }: { job: LatestJob }) {
  const secondaryTag = job.tags[0] ?? job.categoryName;

  return (
    <article className="bg-white px-6 py-5 lg:px-10 lg:py-6">
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-start gap-6">
          {job.companyLogo ? (
            <img
              alt={`${job.company} logo`}
              className="h-16 w-16 shrink-0 rounded-full object-cover"
              src={job.companyLogo}
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--brand-secondary)] text-lg font-bold text-[var(--brand-primary)]">
              {job.company.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="truncate text-[20px] font-semibold leading-[1.2] text-[var(--neutral-100)]">
              {job.title}
            </h3>
            <p className="mt-1 text-base leading-[1.6] text-[var(--neutral-80)]">
              {job.company}
              <span className="mx-2 inline-block h-1 w-1 rounded-full bg-[var(--neutral-80)] align-middle" />
              {job.location}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-[80px] bg-[rgba(86,205,173,0.1)] px-[10px] py-[6px] text-sm font-semibold leading-[1.6] text-[#56CDAD]">
                {job.type}
              </span>
              <span className="h-6 w-px bg-[var(--neutral-20)]" />
              <span className="rounded-[80px] border border-[#FFB836] px-[10px] py-[6px] text-sm font-semibold leading-[1.6] text-[#FFB836]">
                {job.categoryName}
              </span>
              <span className="rounded-[80px] border border-[var(--brand-primary)] px-[10px] py-[6px] text-sm font-semibold leading-[1.6] text-[var(--brand-primary)]">
                {secondaryTag}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/jobs/${job.id}`}
          className="shrink-0 text-sm font-semibold text-[var(--brand-primary)]"
        >
          View
        </Link>
      </div>
    </article>
  );
}

export async function LatestJobsSection() {
  const jobsRaw = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  const jobs: LatestJob[] = jobsRaw.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    companyLogo: job.companyLogo,
    categoryName: job.category.name,
    tags: job.tags.map((t) => t.tag.name),
  }));

  const leftJobs = jobs.filter((_, idx) => idx % 2 === 0);
  const rightJobs = jobs.filter((_, idx) => idx % 2 === 1);

  return (
    <section className="relative overflow-hidden bg-[var(--surface-light)] pb-14 pt-14 lg:pb-[72px] lg:pt-[72px]">
      <img
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        src={bgAsset}
      />
      <img
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 top-10 hidden h-[794px] w-[860px] opacity-70 lg:block"
        src={patternAsset}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 lg:px-[124px]">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-heading text-[40px] font-semibold leading-[1.1] text-[var(--neutral-100)] lg:text-[48px]">
            Latest <span className="text-[var(--accent-blue)]">jobs open</span>
          </h2>

          <Link
            className="hidden items-center gap-4 text-base font-semibold leading-[1.6] text-[var(--brand-primary)] lg:flex"
            href="/jobs"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="rounded-xl border border-[var(--neutral-20)] bg-white p-8 text-center">
            <p className="text-[var(--neutral-80)]">No jobs available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-4">
              {leftJobs.map((job) => (
                <JobRow key={job.id} job={job} />
              ))}
            </div>

            <div className="space-y-4">
              {rightJobs.map((job) => (
                <JobRow key={job.id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
