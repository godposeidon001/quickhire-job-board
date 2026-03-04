import ApplicationForm from "@/components/apply/application-form";
import { SiteFooter } from "@/components/footer/site-footer";
import TopNav from "@/components/top-nav";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function JobApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/jobs/${id}/apply`)}`);
  }

  const job = await prisma.job.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      company: true,
      location: true,
      type: true,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
        <div className="mx-auto w-full max-w-[900px]">
          <Link
            href={`/jobs/${job.id}`}
            className="inline-flex items-center text-sm font-semibold text-[var(--brand-primary)]"
          >
            {"<-"} Back to details
          </Link>

          <div className="mt-5 rounded-xl border border-[var(--neutral-20)] bg-[var(--brand-secondary)] p-5">
            <p className="text-sm text-[var(--neutral-80)]">Applying for</p>
            <h1 className="mt-1 font-heading text-3xl font-semibold text-[var(--neutral-100)]">
              {job.title}
            </h1>
            <p className="mt-1 text-sm text-[var(--neutral-80)]">
              {job.company} | {job.location} | {job.type}
            </p>
          </div>

          <div className="mt-5">
            <ApplicationForm
              jobId={job.id}
              jobTitle={job.title}
              company={job.company}
              defaultName={session.user.name ?? ""}
              defaultEmail={session.user.email ?? ""}
            />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
