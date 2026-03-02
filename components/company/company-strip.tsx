const logoVodafone = "https://www.figma.com/api/mcp/asset/b90b71ee-5820-4161-90d5-4746cd1f073b";
const logoIntel = "https://www.figma.com/api/mcp/asset/a819aedf-1cc6-4116-a83e-87fc5c73ac7e";
const logoTesla = "https://www.figma.com/api/mcp/asset/7f8ac672-5df0-4699-8800-93102b131385";
const logoAmd = "https://www.figma.com/api/mcp/asset/55f6d541-5e64-47bb-bb44-dbc8404251d8";
const logoTalkit = "https://www.figma.com/api/mcp/asset/e5e299e0-99d6-442a-8240-bfb14e115270";

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
