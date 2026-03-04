const ctaShape = "https://www.figma.com/api/mcp/asset/80f401a5-3b2d-4def-a029-95286c66ab3c";
const ctaPattern = "https://www.figma.com/api/mcp/asset/4e1e2b14-14e0-4e64-a059-82614926025c";

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-[2px] px-3 py-2 text-white" style={{ backgroundColor: color }}>
      <p className="text-[10px] font-medium leading-[1.5] text-white/90">{label}</p>
      <p className="text-sm font-semibold leading-[1.4]">{value}</p>
    </div>
  );
}

export function CtaSection() {
  return (
    <section className="bg-white py-10 lg:py-[72px]">
      <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-[124px]">
        <div className="relative h-auto overflow-hidden lg:h-[414px]">
          <img
            alt=""
            aria-hidden
            className="absolute inset-0 hidden h-full w-full max-w-none lg:block"
            src={ctaShape}
          />

          <div className="relative grid gap-8 bg-[var(--brand-primary)] px-8 py-10 lg:grid-cols-[420px_1fr] lg:bg-transparent lg:px-[70px] lg:py-[68px]">
            <div className="max-w-[364px] text-white">
              <h3 className="font-heading text-[42px] font-semibold leading-[1.1] lg:text-[48px]">
                Start posting
                <br />
                jobs today
              </h3>
              <p className="mt-6 text-base font-medium leading-[1.6]">Start posting jobs for only $10.</p>
              <button
                className="mt-6 bg-white px-6 py-3 text-base font-bold leading-[1.6] text-[var(--brand-primary)]"
                type="button"
              >
                Sign Up For Free
              </button>
            </div>

            <div className="relative flex items-end justify-end lg:pr-[18px]">
              <div className="relative h-[346px] w-full max-w-[602px] overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                <img
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -bottom-12 left-[160px] h-[468px] w-[362px] max-w-none opacity-30"
                  src={ctaPattern}
                />

                <div className="relative z-10 flex h-full">
                  <div className="w-[106px] border-r border-[var(--neutral-20)] bg-[var(--surface-light)] p-3">
                    <div className="font-logo text-[9px] font-bold text-[var(--neutral-100)]">QuickHire</div>
                    <div className="mt-4 space-y-2">
                      <div className="rounded bg-[#E9EBFD] px-2 py-1 text-[6px] font-medium text-[var(--brand-primary)]">Dashboard</div>
                      <div className="px-2 py-1 text-[6px] text-[var(--neutral-60)]">Messages</div>
                      <div className="px-2 py-1 text-[6px] text-[var(--neutral-60)]">Applicants</div>
                      <div className="px-2 py-1 text-[6px] text-[var(--neutral-60)]">Settings</div>
                    </div>
                  </div>

                  <div className="flex-1 p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[10px] font-semibold text-[var(--neutral-100)]">Good morning, Maria</p>
                      <button className="bg-[var(--brand-primary)] px-2 py-1 text-[8px] font-semibold text-white" type="button">
                        Post a Job
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <StatCard color="#4640DE" label="New candidates" value="76" />
                      <StatCard color="#56CDAD" label="Scheduled" value="3" />
                      <StatCard color="#26A4FF" label="Messages" value="24" />
                    </div>

                    <div className="mt-3 grid grid-cols-[1fr_118px] gap-2">
                      <div className="h-[172px] border border-[var(--neutral-20)] p-2">
                        <p className="text-[8px] font-semibold text-[var(--neutral-100)]">Job statistics</p>
                        <div className="mt-2 flex h-[130px] items-end gap-1">
                          <div className="h-[56px] w-3 bg-[#4640DE]" />
                          <div className="h-[92px] w-3 bg-[#FFB836]" />
                          <div className="h-[72px] w-3 bg-[#56CDAD]" />
                          <div className="h-[84px] w-3 bg-[#4640DE]" />
                          <div className="h-[44px] w-3 bg-[#D6DDEB]" />
                          <div className="h-[34px] w-3 bg-[#FFB836]" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="border border-[var(--neutral-20)] p-2">
                          <p className="text-[8px] text-[var(--neutral-60)]">Job Open</p>
                          <p className="text-xl font-semibold leading-none text-[var(--neutral-100)]">12</p>
                        </div>
                        <div className="border border-[var(--neutral-20)] p-2">
                          <p className="text-[8px] text-[var(--neutral-60)]">Applicants</p>
                          <p className="text-xl font-semibold leading-none text-[var(--neutral-100)]">67</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
