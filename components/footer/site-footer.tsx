const iconTwitter =
  "https://www.figma.com/api/mcp/asset/ddd3be15-ff43-470c-820d-8eba0b91a130";
const iconLinkedIn =
  "https://www.figma.com/api/mcp/asset/9b25e7b6-18bc-4814-bc80-92c3e90c6347";
const iconDribbble =
  "https://www.figma.com/api/mcp/asset/6f78b95f-d503-4e1a-9ff1-bd7ac47823fd";
const iconInstagram =
  "https://www.figma.com/api/mcp/asset/5b2ac923-c9bf-4451-bc72-46e71bc88829";
const iconFacebook =
  "https://www.figma.com/api/mcp/asset/8b68d4dd-1e94-42f4-9726-0f8f76fb22bb";

function LogoMark() {
  return (
    <div className="relative h-8 w-8 rounded-full bg-[var(--brand-primary)]">
      <div className="absolute left-[7px] top-[7px] h-[18px] w-[18px] rounded-full border-2 border-white" />
      <div className="absolute left-[14px] top-[14px] h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#202430] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-10 pt-12 lg:px-[124px] lg:pb-12 lg:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.8fr_0.8fr_1fr] lg:gap-12">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-logo text-[32px] font-bold leading-none text-white lg:text-[24px]">
                QuickHire
              </span>
            </div>
            <p className="mt-6 max-w-[376px] text-base leading-[1.6] text-[var(--neutral-20)]">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold leading-[1.6] text-white">
              About
            </h3>
            <ul className="mt-4 space-y-2 text-base leading-[1.6] text-[var(--neutral-20)]">
              <li>Companies</li>
              <li>Pricing</li>
              <li>Terms</li>
              <li>Advice</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold leading-[1.6] text-white">
              Resources
            </h3>
            <ul className="mt-4 space-y-2 text-base leading-[1.6] text-[var(--neutral-20)]">
              <li>Help Docs</li>
              <li>Guide</li>
              <li>Updates</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold leading-[1.6] text-white">
              Get job notifications
            </h3>
            <p className="mt-4 max-w-[306px] text-base leading-[1.6] text-[var(--neutral-20)]">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="mt-6 flex flex-col max-w-[420px] gap-2">
              <input
                className="h-12 border border-[var(--neutral-20)] bg-white px-4 text-base text-[var(--neutral-100)] outline-none placeholder:text-[#A8ADB7]"
                placeholder="Email Address"
                type="email"
              />
              <button
                className="h-12 bg-[var(--brand-primary)] px-6 text-base font-bold text-white"
                type="button"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-base font-medium leading-[1.6] text-white/50">
              2021 @ QuickHire. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <img alt="Facebook" className="h-8 w-8" src={iconFacebook} />
              <img alt="Instagram" className="h-8 w-8" src={iconInstagram} />
              <img alt="Dribbble" className="h-8 w-8" src={iconDribbble} />
              <img alt="LinkedIn" className="h-8 w-8" src={iconLinkedIn} />
              <img alt="Twitter" className="h-8 w-8" src={iconTwitter} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
