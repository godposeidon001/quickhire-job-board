const bgAsset = "https://www.figma.com/api/mcp/asset/49ab169c-6e4a-4021-88cf-f15c90814475";
const patternAsset = "https://www.figma.com/api/mcp/asset/5b6e35fc-f2f1-40bb-b53b-3d3393158451";

const logoNomad = "https://www.figma.com/api/mcp/asset/f4b950af-5a99-4241-81b2-fb0b4409e841";
const logoDropbox = "https://www.figma.com/api/mcp/asset/878bb229-7659-42b5-800c-379bd9a756b1";
const logoTerraform = "https://www.figma.com/api/mcp/asset/5f7e9c40-2b70-4b1b-8902-cef99fb8535a";
const logoPacker = "https://www.figma.com/api/mcp/asset/514f04ad-cbfe-490b-8c89-993aa4ca4b0d";
const logoNetlify = "https://www.figma.com/api/mcp/asset/5094a55f-cd7b-400e-b526-e388432e140b";
const logoMaze = "https://www.figma.com/api/mcp/asset/2ce5d816-35d4-434f-9a40-ed0ea2eb9b4e";
const logoUdacity = "https://www.figma.com/api/mcp/asset/158f0863-6b4c-4204-bf99-5f59eacfb157";
const logoWebflow = "https://www.figma.com/api/mcp/asset/e5ab0235-0c92-4ee5-91eb-e57ccbe8b529";

type JobOpen = {
  title: string;
  company: string;
  location: string;
  logo: string;
};

const leftJobs: JobOpen[] = [
  { title: "Social Media Assistant", company: "Nomad", location: "Paris, France", logo: logoNomad },
  { title: "Brand Designer", company: "Dropbox", location: "San Fransisco, USA", logo: logoDropbox },
  { title: "Interactive Developer", company: "Terraform", location: "Hamburg, Germany", logo: logoTerraform },
  { title: "HR Manager", company: "Packer", location: "Lucern, Switzerland", logo: logoPacker },
];

const rightJobs: JobOpen[] = [
  { title: "Social Media Assistant", company: "Netlify", location: "Paris, France", logo: logoNetlify },
  { title: "Brand Designer", company: "Maze", location: "San Fransisco, USA", logo: logoMaze },
  { title: "Interactive Developer", company: "Udacity", location: "Hamburg, Germany", logo: logoUdacity },
  { title: "HR Manager", company: "Webflow", location: "Lucern, Switzerland", logo: logoWebflow },
];

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

function JobRow({ job }: { job: JobOpen }) {
  return (
    <article className="flex items-start gap-6 bg-white px-6 py-5 lg:px-10 lg:py-6">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white">
        <img alt={job.company} className="h-16 w-16 object-cover" src={job.logo} />
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-[20px] font-semibold leading-[1.2] text-[var(--neutral-100)]">{job.title}</h3>
        <p className="mt-1 text-base leading-[1.6] text-[var(--neutral-80)]">
          {job.company}
          <span className="mx-2 inline-block h-1 w-1 rounded-full bg-[var(--neutral-80)] align-middle" />
          {job.location}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-[80px] bg-[rgba(86,205,173,0.1)] px-[10px] py-[6px] text-sm font-semibold leading-[1.6] text-[#56CDAD]">
            Full-Time
          </span>
          <span className="h-6 w-px bg-[var(--neutral-20)]" />
          <span className="rounded-[80px] border border-[#FFB836] px-[10px] py-[6px] text-sm font-semibold leading-[1.6] text-[#FFB836]">
            Marketing
          </span>
          <span className="rounded-[80px] border border-[var(--brand-primary)] px-[10px] py-[6px] text-sm font-semibold leading-[1.6] text-[var(--brand-primary)]">
            Design
          </span>
        </div>
      </div>
    </article>
  );
}

export function LatestJobsSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--surface-light)] pb-14 pt-14 lg:pb-[72px] lg:pt-[72px]">
      <img alt="" aria-hidden className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" src={bgAsset} />
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

          <button
            className="hidden items-center gap-4 text-base font-semibold leading-[1.6] text-[var(--brand-primary)] lg:flex"
            type="button"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="space-y-4">
            {leftJobs.map((job) => (
              <JobRow key={`${job.title}-${job.company}`} job={job} />
            ))}
          </div>

          <div className="space-y-4">
            {rightJobs.map((job) => (
              <JobRow key={`${job.title}-${job.company}`} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
