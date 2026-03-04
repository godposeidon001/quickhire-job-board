import TopNav from "@/components/top-nav";
import Link from "next/link";
import { SearchBar } from "./search-bar";

const heroImage =
  "https://www.figma.com/api/mcp/asset/ce7c44be-d562-4a7a-872c-3ecb062541f3";
const patternImage =
  "https://www.figma.com/api/mcp/asset/3e39775c-b252-4c38-a5c2-582a11b11df0";
const underlineImage =
  "https://www.figma.com/api/mcp/asset/5a40c1a6-92a7-48f2-ae45-8f17efb9161b";
const desktopAngledRectangleImage =
  "https://www.figma.com/api/mcp/asset/9354d08d-4e6e-42d0-bd4d-c60b6cd711fb";
const mobileRect2734 =
  "https://www.figma.com/api/mcp/asset/b46c08be-6611-4041-8a0e-d750930533dd";
const mobileRect2729 =
  "https://www.figma.com/api/mcp/asset/5d6a7ce4-09b7-4952-9109-53a783ec4af4";
const mobileRect2730 =
  "https://www.figma.com/api/mcp/asset/fccc5b39-e17c-465d-97f7-7e66b075b9d4";
const mobileRect2733 =
  "https://www.figma.com/api/mcp/asset/4a45f2f4-4f52-41b6-bd7a-e4e534181f46";

function LogoMark() {
  return (
    <div className="relative h-8 w-8 rounded-full bg-[var(--brand-primary)]">
      <div className="absolute left-[7px] top-[7px] h-[18px] w-[18px] rounded-full border-2 border-white" />
      <div className="absolute left-[14px] top-[14px] h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 7H20"
        stroke="#25324B"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M4 12H20"
        stroke="#25324B"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
      <path
        d="M4 17H14"
        stroke="#25324B"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MobilePattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden lg:hidden">
      <div className="absolute left-[152px] top-[440px] flex h-[216px] w-[279px] items-center justify-center">
        <img
          alt=""
          aria-hidden
          className="h-[253px] w-[117px] max-w-none rotate-[64deg]"
          src={mobileRect2734}
        />
      </div>
      <div className="absolute left-[217px] top-[321px] flex h-[392px] w-[523px] items-center justify-center">
        <img
          alt=""
          aria-hidden
          className="h-[484px] w-[200px] max-w-none rotate-[64deg]"
          src={mobileRect2729}
        />
      </div>
      <div className="absolute left-[117px] top-[454px] flex h-[382px] w-[511px] items-center justify-center">
        <img
          alt=""
          aria-hidden
          className="h-[474px] w-[195px] max-w-none rotate-[64deg]"
          src={mobileRect2730}
        />
      </div>
      <div className="absolute left-[-31px] top-[683px] flex h-[346px] w-[467px] items-center justify-center">
        <img
          alt=""
          aria-hidden
          className="h-[436px] w-[172px] max-w-none rotate-[64deg]"
          src={mobileRect2733}
        />
      </div>
    </div>
  );
}

function DesktopPattern() {
  return (
    <>
      <div className="pointer-events-none absolute left-[calc(50%-140px)] top-0 hidden h-[794px] w-[860px] overflow-hidden lg:block">
        <img
          alt=""
          aria-hidden
          className="absolute left-[-137px] top-0 h-[1186px] w-[1123px] max-w-none"
          src={patternImage}
        />
      </div>
      <div className="pointer-events-none absolute left-[calc(50%+164px)] top-[555px] hidden h-[569px] w-[768px] items-center justify-center lg:flex">
        <img
          alt=""
          aria-hidden
          className="h-[716px] w-[283px] max-w-none rotate-[64deg]"
          src={desktopAngledRectangleImage}
        />
      </div>
    </>
  );
}

export function HeroSection() {
  return (
    <section className="relative h-[722px] overflow-hidden bg-[var(--surface-light)] lg:h-[794px]">
      <MobilePattern />
      <DesktopPattern />
      <TopNav />

      <div className="relative mx-auto flex w-full max-w-[1440px]  px-4 pb-8 pt-4 lg:flex-row lg:justify-between lg:px-[124px] lg:pb-0 lg:pt-[82px]">
        <div className="relative z-10 w-full max-w-[629px]">
          <h1 className="font-heading text-[48px] font-semibold leading-[1.1] text-[var(--neutral-100)] lg:w-[533px] lg:text-[72px]">
            <span className="lg:hidden">
              Discover more than{" "}
              <span className="text-[var(--accent-blue)]">5000+ Jobs</span>
            </span>
            <span className="hidden lg:inline">
              Discover
              <br />
              more than
              <br />
              <span className="text-[var(--accent-blue)]">5000+ Jobs</span>
            </span>
          </h1>

          <img
            alt=""
            aria-hidden
            className="mt-1 w-full max-w-[344px] lg:mt-0 lg:max-w-[455px]"
            src={underlineImage}
          />

          <p className="mt-4 w-full max-w-[344px] text-[18px] leading-[1.6] text-[var(--neutral-80)]/80 lg:mt-6 lg:max-w-[521px] lg:text-[20px]">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          <div className="mt-6">
            <SearchBar />
          </div>

          <div className="mt-4 flex gap-2 text-base leading-[1.6] text-[var(--black)]/70">
            <p>Try :</p>
            <p className="font-medium">Engineer, Manager, Designer</p>
          </div>
        </div>

        <div className="relative mt-10 hidden justify-center md:mt-0 md:flex md:min-h-[700px] md:w-[520px] lg:items-end">
          <img
            alt="Smiling candidate"
            className="relative z-10 w-full max-w-[501px] object-contain"
            src={heroImage}
          />
        </div>
      </div>
    </section>
  );
}
