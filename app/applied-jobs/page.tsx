import { SiteFooter } from "@/components/footer/site-footer";
import TopNav from "@/components/top-nav";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AppliedJobsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/applied-jobs");
  }

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      job: {
        include: {
          category: true,
        },
      },
    },
  });

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
        <div className="mx-auto w-full max-w-[1100px]">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="font-heading text-4xl font-semibold text-[var(--neutral-100)]">
                Applied Jobs
              </h1>
              <p className="mt-2 text-[var(--neutral-80)]">
                You have applied to {applications.length} job
                {applications.length === 1 ? "" : "s"}.
              </p>
            </div>

            <Link
              href="/jobs"
              className="rounded-lg border border-[var(--neutral-20)] bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-primary)]"
            >
              Browse jobs
            </Link>
          </header>

          {applications.length === 0 ? (
            <div className="rounded-xl border border-[var(--neutral-20)] bg-white p-10 text-center">
              <p className="text-[var(--neutral-80)]">
                You have not applied to any jobs yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {applications.map((application) => (
                <article
                  key={application.id}
                  className="rounded-xl border border-[var(--neutral-20)] bg-white p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--neutral-100)]">
                        {application.job.title}
                      </h2>
                      <p className="mt-1 text-sm text-[var(--neutral-80)]">
                        {application.job.company} | {application.job.location}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full border border-[var(--neutral-20)] px-3 py-1 text-xs font-medium text-[var(--neutral-80)]">
                          {application.job.type}
                        </span>
                        <span className="rounded-full border border-[var(--neutral-20)] px-3 py-1 text-xs font-medium text-[var(--neutral-80)]">
                          {application.job.category.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-2 sm:items-end">
                      <span className="text-xs text-[var(--neutral-60)]">
                        Applied on{" "}
                        {new Date(application.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <Link
                        href={`/jobs/${application.job.id}`}
                        className="rounded-lg bg-[var(--brand-primary)] px-4 py-2 text-sm font-bold text-white"
                      >
                        View job
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-[var(--neutral-20)] bg-[var(--surface-light)] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--neutral-60)]">
                      Your cover note
                    </p>
                    <p className="mt-2 whitespace-pre-line text-sm leading-[1.7] text-[var(--neutral-80)]">
                      {application.coverNote}
                    </p>
                    <p className="mt-3 text-xs text-[var(--neutral-60)]">
                      Resume:{" "}
                      <a
                        href={application.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[var(--brand-primary)]"
                      >
                        Open link
                      </a>
                    </p>
                  </div>
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
