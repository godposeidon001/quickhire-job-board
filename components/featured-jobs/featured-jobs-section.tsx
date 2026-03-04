import { prisma } from "@/lib/prisma";
import Link from "next/link";

type FeaturedJob = {
  id: string;
  title: string;
  company: string;
  companyLogo: string | null;
  location: string;
  type: string;
  description: string;
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

function getTagColors(tagName: string) {
  const name = tagName.toLowerCase();

  if (name.includes("design")) {
    return { textColor: "#56CDAD", bgColor: "rgba(86,205,173,0.1)" };
  }
  if (name.includes("marketing")) {
    return { textColor: "#FFB836", bgColor: "rgba(235,133,51,0.1)" };
  }
  if (name.includes("business")) {
    return { textColor: "#4640DE", bgColor: "rgba(70,64,222,0.1)" };
  }
  if (name.includes("tech") || name.includes("engineering")) {
    return { textColor: "#FF6550", bgColor: "rgba(255,101,80,0.1)" };
  }

  return { textColor: "#515B6F", bgColor: "rgba(81,91,111,0.1)" };
}

function JobCard({ job }: { job: FeaturedJob }) {
  const preview = job.description.length > 68
    ? `${job.description.slice(0, 68)}...`
    : job.description;

  return (
    <article className="flex h-full flex-col gap-4 border border-[var(--neutral-20)] bg-white p-6">
      <div className="flex items-start justify-between">
        {job.companyLogo ? (
          <img
            alt={`${job.company} logo`}
            className="h-12 w-12 rounded object-contain"
            src={job.companyLogo}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded bg-[var(--brand-secondary)] text-sm font-bold text-[var(--brand-primary)]">
            {job.company.slice(0, 1).toUpperCase()}
          </div>
        )}

        <span className="border border-[var(--brand-primary)] px-3 py-1 text-base leading-[1.6] text-[var(--brand-primary)]">
          {job.type}
        </span>
      </div>

      <div className="space-y-[2px]">
        <h3 className="text-[18px] font-semibold leading-[1.6] text-[var(--neutral-100)]">
          {job.title}
        </h3>
        <p className="text-base leading-[1.6] text-[var(--neutral-80)]">
          {job.company}
          <span className="mx-2 inline-block h-1 w-1 rounded-full bg-[var(--neutral-80)] align-middle" />
          {job.location}
        </p>
      </div>

      <p className="text-base leading-[1.6] text-[var(--neutral-60)]">{preview}</p>

      <div className="mt-auto flex flex-wrap gap-2">
        {job.tags.map((tag) => {
          const colors = getTagColors(tag);
          return (
            <span
              key={tag}
              className="rounded-[80px] px-4 py-1 text-sm font-semibold leading-[1.6]"
              style={{ color: colors.textColor, backgroundColor: colors.bgColor }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      <Link
        href={`/jobs/${job.id}`}
        className="pt-2 text-sm font-semibold text-[var(--brand-primary)]"
      >
        View details
      </Link>
    </article>
  );
}

export async function FeaturedJobsSection() {
  const jobsRaw = await prisma.job.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: "desc" },
    take: 8,
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  const jobs: FeaturedJob[] = jobsRaw.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    companyLogo: job.companyLogo,
    location: job.location,
    type: job.type,
    description: job.description,
    tags: job.tags.map((t) => t.tag.name),
  }));

  return (
    <section className="bg-white pb-[72px]">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-heading text-[40px] font-semibold leading-[1.1] text-[var(--neutral-100)] lg:text-[48px]">
            Featured <span className="text-[var(--accent-blue)]">jobs</span>
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
          <div className="rounded-xl border border-[var(--neutral-20)] bg-[var(--surface-light)] p-8 text-center">
            <p className="text-[var(--neutral-80)]">
              No featured jobs available right now.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
