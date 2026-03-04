import AdminPanel from "@/components/admin/admin-panel";
import { SiteFooter } from "@/components/footer/site-footer";
import TopNav from "@/components/top-nav";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const [categoriesRaw, jobsRaw] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
      },
    }),
    prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    }),
  ]);

  const jobs = jobsRaw.map((job) => ({
    id: job.id,
    title: job.title,
    company: job.company,
    companyLogo: job.companyLogo,
    location: job.location,
    type: job.type,
    description: job.description,
    isFeatured: job.isFeatured,
    createdAt: job.createdAt.toISOString(),
    category: {
      id: job.category.id,
      name: job.category.name,
    },
    tags: job.tags.map((t) => t.tag.name),
  }));

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <header className="mb-8">
            <h1 className="font-heading text-4xl font-semibold text-[var(--neutral-100)] lg:text-5xl">
              Admin Panel
            </h1>
            <p className="mt-3 max-w-2xl text-base text-[var(--neutral-80)]">
              Add new jobs, update existing listings, and delete jobs when needed.
            </p>
          </header>

          <AdminPanel categories={categoriesRaw} initialJobs={jobs} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
