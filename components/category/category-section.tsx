type CategoryItem = {
  name: string;
  jobs: string;
  featured?: boolean;
  icon: (className: string) => React.JSX.Element;
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
      <path d="M2 8H13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="M8.5 3L13.5 8L8.5 13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

const categories: CategoryItem[] = [
  {
    name: "Design",
    jobs: "235 jobs available",
    icon: (className) => (
      <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20L10 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M14 10L20 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M6.5 11.5L12.5 17.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M10 4L20 14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Sales",
    jobs: "756 jobs available",
    icon: (className) => (
      <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 20V10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M10 20V6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M16 20V12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M20 20V8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <circle cx="6" cy="6" fill="currentColor" r="2" />
      </svg>
    ),
  },
  {
    name: "Marketing",
    jobs: "140 jobs available",
    featured: true,
    icon: (className) => (
      <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12H8L16 8V16L8 12H4V12Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
        <path d="M8 12V18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M18.5 9.5C19.3 10.2 19.8 11.1 19.8 12C19.8 12.9 19.3 13.8 18.5 14.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Finance",
    jobs: "325 jobs available",
    icon: (className) => (
      <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect height="11" rx="2" stroke="currentColor" strokeWidth="1.8" width="17" x="3.5" y="7" />
        <circle cx="12" cy="12.5" fill="currentColor" r="1.8" />
      </svg>
    ),
  },
  {
    name: "Technology",
    jobs: "436 jobs available",
    icon: (className) => (
      <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect height="13" rx="1.8" stroke="currentColor" strokeWidth="1.8" width="18" x="3" y="4" />
        <path d="M8 20H16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Engineering",
    jobs: "542 jobs available",
    icon: (className) => (
      <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 7L4 12L8 17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M16 7L20 12L16 17" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M13 5L11 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Business",
    jobs: "211 jobs available",
    icon: (className) => (
      <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect height="13" rx="2" stroke="currentColor" strokeWidth="1.8" width="18" x="3" y="8" />
        <path d="M8 8V6C8 4.9 8.9 4 10 4H14C15.1 4 16 4.9 16 6V8" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: "Human Resource",
    jobs: "346 jobs available",
    icon: (className) => (
      <svg aria-hidden className={className} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="10" r="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 19C4.4 16.8 6.1 15.5 8.2 15.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M16 15.5C18.1 15.5 19.8 16.8 20.2 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        <path d="M8.5 19C8.9 16.7 10.1 15.5 12 15.5C13.9 15.5 15.1 16.7 15.5 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    ),
  },
];

export function CategorySection() {
  return (
    <section className="bg-white pb-16 pt-14 lg:pb-[72px] lg:pt-[72px]">
      <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-[124px]">
        <div className="mb-10 flex items-end justify-between lg:mb-12">
          <h2 className="font-heading text-[40px] font-semibold leading-[1.1] text-[var(--neutral-100)] lg:text-[48px]">
            Explore by <span className="text-[var(--accent-blue)]">category</span>
          </h2>

          <button
            className="hidden items-center gap-3 text-base font-semibold leading-[1.6] text-[var(--brand-primary)] lg:flex"
            type="button"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {categories.map((category) => {
            const featured = Boolean(category.featured);

            return (
              <article
                key={category.name}
                className={[
                  "flex h-[214px] flex-col justify-between border p-8",
                  featured
                    ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white"
                    : "border-[var(--neutral-20)] bg-white text-[var(--neutral-100)]",
                ].join(" ")}
              >
                <div
                  className={[
                    "h-12 w-12",
                    featured ? "text-white" : "text-[var(--brand-primary)]",
                  ].join(" ")}
                >
                  {category.icon("h-12 w-12")}
                </div>

                <div>
                  <h3
                    className={[
                      "font-heading text-[24px] font-semibold leading-[1.2]",
                      featured ? "text-white" : "text-[var(--neutral-100)]",
                    ].join(" ")}
                  >
                    {category.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-4">
                    <p
                      className={[
                        "text-[18px] font-normal leading-[1.6]",
                        featured ? "text-white" : "text-[var(--neutral-60)]",
                      ].join(" ")}
                    >
                      {category.jobs}
                    </p>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
