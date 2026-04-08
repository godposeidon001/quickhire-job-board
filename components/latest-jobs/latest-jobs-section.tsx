import { prisma } from "@/lib/prisma";
import Link from "next/link";

const patternAsset = "/images/latest-jobs-box.svg";

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
    <article className="h-full bg-white px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
      <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
          {job.companyLogo ? (
            <img
              alt={`${job.company} logo`}
              className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
              src={job.companyLogo}
            />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--brand-secondary)] text-base font-bold text-[var(--brand-primary)] sm:h-16 sm:w-16 sm:text-lg">
              {job.company.slice(0, 1).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="text-[18px] font-semibold leading-[1.25] text-[var(--neutral-100)] sm:text-[20px]">
              {job.title}
            </h3>
            <p className="mt-1 break-words text-sm leading-[1.6] text-[var(--neutral-80)] sm:text-base">
              {job.company}
              <span className="mx-2 inline-block h-1 w-1 rounded-full bg-[var(--neutral-80)] align-middle" />
              {job.location}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-[80px] bg-[rgba(86,205,173,0.1)] px-[10px] py-[6px] text-xs font-semibold leading-[1.6] text-[#56CDAD] sm:text-sm">
                {job.type}
              </span>
              <span className="hidden h-6 w-px bg-[var(--neutral-20)] sm:block" />
              <span className="rounded-[80px] border border-[#FFB836] px-[10px] py-[6px] text-xs font-semibold leading-[1.6] text-[#FFB836] sm:text-sm">
                {job.categoryName}
              </span>
              <span className="rounded-[80px] border border-[var(--brand-primary)] px-[10px] py-[6px] text-xs font-semibold leading-[1.6] text-[var(--brand-primary)] sm:text-sm">
                {secondaryTag}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/jobs/${job.id}`}
          className="shrink-0 text-sm font-semibold text-[var(--brand-primary)] sm:pt-1"
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

  return (
    <section className="relative overflow-hidden bg-[var(--surface-light)] pb-14 pt-14 lg:pb-[72px] lg:pt-[72px]">
      <div className="absolute left-0 top-0 z-10 h-0 w-0 border-r-[120px] border-t-[70px] border-r-transparent border-t-white hidden lg:block" />
      <img
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-16 top-10 hidden h-[794px] w-[860px] opacity-70 lg:block"
        src={patternAsset}
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 lg:px-[124px]">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
          <h2 className="font-heading text-[40px] font-semibold leading-[1.1] text-[var(--neutral-100)] lg:text-[48px]">
            Latest <span className="text-[var(--accent-blue)]">jobs open</span>
          </h2>

          <Link
            className="inline-flex items-center gap-3 text-sm font-semibold leading-[1.6] text-[var(--brand-primary)] sm:text-base"
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {jobs.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
