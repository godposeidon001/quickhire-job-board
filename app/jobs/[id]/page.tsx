import { SiteFooter } from "@/components/footer/site-footer";
import TopNav from "@/components/top-nav";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/jobs/${id}`)}`);
  }
  const userId = session.user.id;

  const existingApplication = await prisma.application.findFirst({
    where: {
      jobId: id,
      userId,
    },
    select: {
      id: true,
    },
  });
  const hasApplied = Boolean(existingApplication);

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!job) {
    notFound();
  }

  const postedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(job.createdAt);

  return (
    <>
      <TopNav />

      <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
        <div className="mx-auto w-full max-w-[1160px]">
          <Link
            href="/jobs"
            className="inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]"
          >
            {'<-'} Back to jobs
          </Link>

          <section className="mt-5 rounded-2xl border border-[var(--neutral-20)] bg-white p-6 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-4">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    className="h-14 w-14 rounded-lg border border-[var(--neutral-20)] object-contain"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-lg bg-[var(--brand-secondary)]" />
                )}

                <div>
                  <p className="text-sm font-medium text-[var(--neutral-60)]">
                    {job.company}
                  </p>
                  <h1 className="mt-1 font-heading text-[30px] font-semibold leading-[1.15] text-[var(--neutral-100)] lg:text-[40px]">
                    {job.title}
                  </h1>
                  <p className="mt-2 text-sm text-[var(--neutral-80)]">
                    {job.location} | Posted {postedDate}
                  </p>
                </div>
              </div>

              {hasApplied ? (
                <span className="inline-flex h-12 items-center rounded-lg bg-[var(--neutral-20)] px-7 text-base font-bold text-[var(--neutral-80)]">
                  Applied
                </span>
              ) : (
                <Link
                  href={`/jobs/${job.id}/apply`}
                  className="inline-flex h-12 items-center rounded-lg bg-[var(--brand-primary)] px-7 text-base font-bold text-white transition-colors hover:bg-[#3e38ca]"
                >
                  Apply Now
                </Link>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-[var(--neutral-20)] bg-white px-3 py-1 text-xs font-medium text-[var(--neutral-80)]">
                {job.type}
              </span>
              <span className="rounded-full border border-[var(--neutral-20)] bg-white px-3 py-1 text-xs font-medium text-[var(--neutral-80)]">
                {job.category.name}
              </span>
              {job.tags.map((t) => (
                <span
                  key={t.tagId}
                  className="rounded-full border border-[var(--neutral-20)] bg-white px-3 py-1 text-xs font-medium text-[var(--neutral-80)]"
                >
                  {t.tag.name}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <article className="rounded-2xl border border-[var(--neutral-20)] bg-white p-6 lg:p-8">
              <h2 className="font-heading text-2xl font-semibold text-[var(--neutral-100)]">
                Job Description
              </h2>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.75] text-[var(--neutral-80)]">
                {job.description}
              </p>
            </article>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-[var(--neutral-20)] bg-white p-6">
                <h3 className="font-heading text-xl font-semibold text-[var(--neutral-100)]">
                  Job Overview
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--neutral-60)]">Company</dt>
                    <dd className="font-medium text-[var(--neutral-100)]">
                      {job.company}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--neutral-60)]">Location</dt>
                    <dd className="font-medium text-[var(--neutral-100)]">
                      {job.location}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--neutral-60)]">Type</dt>
                    <dd className="font-medium text-[var(--neutral-100)]">
                      {job.type}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-[var(--neutral-60)]">Category</dt>
                    <dd className="font-medium text-[var(--neutral-100)]">
                      {job.category.name}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-[var(--neutral-20)] bg-[var(--brand-secondary)] p-6">
                <h3 className="font-heading text-xl font-semibold text-[var(--neutral-100)]">
                  Ready to apply?
                </h3>
                <p className="mt-2 text-sm leading-[1.7] text-[var(--neutral-80)]">
                  Fill in your resume link and cover note to submit your
                  application.
                </p>
                {hasApplied ? (
                  <span className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[var(--neutral-20)] px-5 text-sm font-bold text-[var(--neutral-80)]">
                    Applied
                  </span>
                ) : (
                  <Link
                    href={`/jobs/${job.id}/apply`}
                    className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[var(--brand-primary)] px-5 text-sm font-bold text-white transition-colors hover:bg-[#3e38ca]"
                  >
                    Apply Now
                  </Link>
                )}
              </div>
            </aside>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
