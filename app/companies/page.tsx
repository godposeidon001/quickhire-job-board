import { SiteFooter } from "@/components/footer/site-footer";
import TopNav from "@/components/top-nav";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

type CompanyFilterParams = {
  company?: string | string[];
};

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<CompanyFilterParams>;
}) {
  const params = await searchParams;
  const companyQuery = (Array.isArray(params.company) ? params.company[0] : params.company)?.trim();

  const companiesRaw = await prisma.job.groupBy({
    by: ["company", "companyLogo"],
    _count: { _all: true },
    orderBy: { company: "asc" },
  });

  const companies = companiesRaw.map((c) => ({
    name: c.company,
    logo: c.companyLogo,
    jobCount: c._count._all,
  }));

  const selectedCompany = companyQuery
    ? companies.find((c) => c.name === companyQuery)?.name ?? null
    : null;

  const companyJobs = selectedCompany
    ? await prisma.job.findMany({
        where: { company: selectedCompany },
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
          tags: { include: { tag: true } },
        },
      })
    : [];

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-[var(--surface-light)] px-4 py-10">
        <div className="mx-auto w-full max-w-[1200px]">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-heading text-4xl font-semibold text-[var(--neutral-100)] lg:text-5xl">
                Browse Companies
              </h1>
              <p className="mt-2 text-[var(--neutral-80)]">
                Explore companies and check all jobs under each company.
              </p>
            </div>

            {selectedCompany ? (
              <Link
                href="/companies"
                className="rounded-lg border border-[var(--neutral-20)] bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-primary)]"
              >
                Clear company filter
              </Link>
            ) : null}
          </header>

          {companies.length === 0 ? (
            <div className="rounded-xl border border-[var(--neutral-20)] bg-white p-8 text-center text-[var(--neutral-80)]">
              No companies found.
            </div>
          ) : (
            <section className="rounded-xl border border-[var(--neutral-20)] bg-white p-5 lg:p-6">
              <h2 className="text-lg font-semibold text-[var(--neutral-100)]">
                Companies
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {companies.map((company) => {
                  const isActive = selectedCompany === company.name;

                  return (
                    <Link
                      key={`${company.name}-${company.logo ?? "no-logo"}`}
                      href={`/companies?company=${encodeURIComponent(company.name)}`}
                      className={[
                        "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                        isActive
                          ? "border-[var(--brand-primary)] bg-[rgba(70,64,222,0.08)]"
                          : "border-[var(--neutral-20)] bg-white hover:bg-[var(--surface-light)]",
                      ].join(" ")}
                    >
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="h-11 w-11 rounded object-contain"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded bg-[var(--brand-secondary)] text-sm font-bold text-[var(--brand-primary)]">
                          {company.name.slice(0, 1).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-[var(--neutral-100)]">
                          {company.name}
                        </p>
                        <p className="text-sm text-[var(--neutral-80)]">
                          {company.jobCount} job
                          {company.jobCount === 1 ? "" : "s"}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <section className="mt-8">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="font-heading text-3xl font-semibold text-[var(--neutral-100)]">
                {selectedCompany ? `${selectedCompany} Jobs` : "Select a company"}
              </h2>
              {selectedCompany ? (
                <p className="text-sm text-[var(--neutral-80)]">
                  {companyJobs.length} job{companyJobs.length === 1 ? "" : "s"} found
                </p>
              ) : null}
            </div>

            {!selectedCompany ? (
              <div className="rounded-xl border border-[var(--neutral-20)] bg-white p-8 text-center text-[var(--neutral-80)]">
                Choose a company above to view its jobs.
              </div>
            ) : companyJobs.length === 0 ? (
              <div className="rounded-xl border border-[var(--neutral-20)] bg-white p-8 text-center text-[var(--neutral-80)]">
                No jobs available for this company right now.
              </div>
            ) : (
              <div className="grid gap-5">
                {companyJobs.map((job) => (
                  <article
                    key={job.id}
                    className="rounded-xl border border-[var(--neutral-20)] bg-white p-5 lg:p-6"
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
                          <h3 className="text-xl font-semibold text-[var(--neutral-100)]">
                            {job.title}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--neutral-80)]">
                            {job.company} | {job.location}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-[var(--neutral-20)] px-3 py-1 text-xs font-medium text-[var(--neutral-80)]">
                              {job.type}
                            </span>
                            <span className="rounded-full border border-[var(--neutral-20)] px-3 py-1 text-xs font-medium text-[var(--neutral-80)]">
                              {job.category.name}
                            </span>
                            {job.tags.slice(0, 3).map((tag) => (
                              <span
                                key={`${job.id}-${tag.tagId}`}
                                className="rounded-full border border-[var(--neutral-20)] px-3 py-1 text-xs font-medium text-[var(--neutral-80)]"
                              >
                                {tag.tag.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/jobs/${job.id}`}
                        className="flex h-10 items-center rounded bg-[var(--brand-primary)] px-5 text-sm font-bold text-white"
                      >
                        View details
                      </Link>
                    </div>

                    <p className="mt-4 text-sm leading-[1.6] text-[var(--neutral-80)]">
                      {job.description}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
