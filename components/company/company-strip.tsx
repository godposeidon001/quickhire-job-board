const logoVodafone = "/images/vodafone.svg";
const logoIntel = "/images/intel.svg";
const logoTesla = "/images/tesla.svg";
const logoAmd = "/images/amd.svg";
const logoTalkit = "/images/talkit.svg";

const companyLogos = [
  {
    alt: "Vodafone",
    src: logoVodafone,
    className: "h-[40px] w-[154px]",
  },
  {
    alt: "Intel",
    src: logoIntel,
    className: "h-[32px] w-[82px] opacity-30",
  },
  {
    alt: "Tesla",
    src: logoTesla,
    className: "h-[24px] w-[183px] opacity-30",
  },
  {
    alt: "AMD",
    src: logoAmd,
    className: "h-[28px] w-[116px]",
  },
  {
    alt: "Talkit",
    src: logoTalkit,
    className: "h-[32px] w-[108px]",
  },
];

export function CompanyStripSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 lg:px-[124px] lg:py-12">
        <p className="text-[18px] font-normal leading-[1.6] text-[var(--black)]/50">
          Companies we helped grow
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-8">
          {companyLogos.map((company) => (
            <img
              key={company.alt}
              alt={company.alt}
              className={company.className}
              src={company.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
