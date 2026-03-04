const logoRevolut =
  "https://www.figma.com/api/mcp/asset/b20911f8-0e76-400e-aa4f-72b41c9ad6b4";
const logoDropboxBase =
  "https://www.figma.com/api/mcp/asset/a2754883-c372-40b3-9a83-8c6359c68f6a";
const logoDropboxMark =
  "https://www.figma.com/api/mcp/asset/0862cbd7-faf0-4529-8fbe-7e6804e69771";
const logoPitch =
  "https://www.figma.com/api/mcp/asset/6ca05d84-f5ba-4c7a-b02f-18f05b02710d";
const logoBlinkist =
  "https://www.figma.com/api/mcp/asset/3613d5f8-e311-44f3-8990-628185b37aee";
const logoClassPass =
  "https://www.figma.com/api/mcp/asset/18518181-bc2f-4942-a633-cb20a0f07816";
const logoCanva =
  "https://www.figma.com/api/mcp/asset/5f9de790-5aa7-4cb2-9967-096b7bb060d6";
const logoGoDaddy =
  "https://www.figma.com/api/mcp/asset/bbe61b25-8e03-480a-917f-74be7e1adbab";
const logoTwitter =
  "https://www.figma.com/api/mcp/asset/59935672-8625-4d9a-b4b6-53f8b932d9e9";

type JobTag = {
  name: string;
  textColor: string;
  bgColor: string;
};

type JobItem = {
  title: string;
  company: string;
  location: string;
  description: string;
  logoType?: "dropbox";
  logo: string;
  tags: JobTag[];
};

const jobs: JobItem[] = [
  {
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    description: "Revolut is looking for Email Marketing to help team ma ...",
    logo: logoRevolut,
    tags: [
      {
        name: "Marketing",
        textColor: "#FFB836",
        bgColor: "rgba(235,133,51,0.1)",
      },
      { name: "Design", textColor: "#56CDAD", bgColor: "rgba(86,205,173,0.1)" },
    ],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    description: "Dropbox is looking for Brand Designer to help the team t ...",
    logoType: "dropbox",
    logo: logoDropboxBase,
    tags: [
      { name: "Design", textColor: "#56CDAD", bgColor: "rgba(86,205,173,0.1)" },
      {
        name: "Business",
        textColor: "#4640DE",
        bgColor: "rgba(70,64,222,0.1)",
      },
    ],
  },
  {
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    description:
      "Pitch is looking for Customer Manager to join marketing t ...",
    logo: logoPitch,
    tags: [
      {
        name: "Marketing",
        textColor: "#FFB836",
        bgColor: "rgba(235,133,51,0.1)",
      },
    ],
  },
  {
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    description:
      "Blinkist is looking for Visual Designer to help team desi ...",
    logo: logoBlinkist,
    tags: [
      { name: "Design", textColor: "#56CDAD", bgColor: "rgba(86,205,173,0.1)" },
    ],
  },
  {
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    description: "ClassPass is looking for Product Designer to help us...",
    logo: logoClassPass,
    tags: [
      {
        name: "Marketing",
        textColor: "#FFB836",
        bgColor: "rgba(235,133,51,0.1)",
      },
      { name: "Design", textColor: "#56CDAD", bgColor: "rgba(86,205,173,0.1)" },
    ],
  },
  {
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    description: "Canva is looking for Lead Engineer to help develop n ...",
    logo: logoCanva,
    tags: [
      { name: "Design", textColor: "#56CDAD", bgColor: "rgba(86,205,173,0.1)" },
      {
        name: "Business",
        textColor: "#4640DE",
        bgColor: "rgba(70,64,222,0.1)",
      },
    ],
  },
  {
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    logo: logoGoDaddy,
    tags: [
      {
        name: "Marketing",
        textColor: "#FFB836",
        bgColor: "rgba(235,133,51,0.1)",
      },
    ],
  },
  {
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    description: "Twitter is looking for Data Analyst to help team desi ...",
    logo: logoTwitter,
    tags: [
      {
        name: "Technology",
        textColor: "#FF6550",
        bgColor: "rgba(255,101,80,0.1)",
      },
    ],
  },
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

function JobCard({ job }: { job: JobItem }) {
  return (
    <article className="flex flex-col gap-4 border border-[var(--neutral-20)] bg-white p-6">
      <div className="flex items-start justify-between">
        {job.logoType === "dropbox" ? (
          <div className="relative h-12 w-12">
            <img alt="Dropbox" className="h-12 w-12" src={job.logo} />
            <img
              alt=""
              aria-hidden
              className="absolute inset-[12.5%_10%] h-9 w-[38px]"
              src={logoDropboxMark}
            />
          </div>
        ) : (
          <img
            alt={job.company}
            className="h-12 w-12 object-cover"
            src={job.logo}
          />
        )}

        <span className="border border-[var(--brand-primary)] px-3 py-1 text-base leading-[1.6] text-[var(--brand-primary)]">
          Full Time
        </span>
      </div>

      <div className="space-y-[2px]">
        <h3 className="text-[18px] font-semibold leading-[1.6] text-[var(--neutral-100)]">
          {job.title}
        </h3>
        <p className="text-base leading-[1.6] text-[var(--neutral-80)]">
          {job.company}{" "}
          <span className="mx-2 inline-block h-1 w-1 rounded-full bg-[var(--neutral-80)] align-middle" />{" "}
          {job.location}
        </p>
      </div>

      <p className="text-base leading-[1.6] text-[var(--neutral-60)]">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag.name}
            className="rounded-[80px] px-4 py-1 text-sm font-semibold leading-[1.6]"
            style={{ color: tag.textColor, backgroundColor: tag.bgColor }}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </article>
  );
}

export function FeaturedJobsSection() {
  return (
    <section className="bg-white pb-[72px]">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-heading text-[40px] font-semibold leading-[1.1] text-[var(--neutral-100)] lg:text-[48px]">
            Featured <span className="text-[var(--accent-blue)]">jobs</span>
          </h2>

          <button
            className="hidden items-center gap-4 text-base font-semibold leading-[1.6] text-[var(--brand-primary)] lg:flex"
            type="button"
          >
            Show all jobs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => (
            <JobCard key={`${job.title}-${job.company}`} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
