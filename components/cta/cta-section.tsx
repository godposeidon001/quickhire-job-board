import Link from "next/link";

const ctaBanner = "/images/cta-banner.png";

export function CtaSection() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-[72px]">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[124px]">
        <div className="relative overflow-hidden bg-[var(--brand-primary)] px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-[70px] lg:py-[68px]">
          <div
            aria-hidden
            className="absolute right-0 top-0 hidden h-full w-[120px] bg-[#5C55F6] lg:block xl:w-[152px]"
            style={{ clipPath: "polygon(42% 0, 100% 0, 100% 84%, 0 100%, 0 18%)" }}
          />

          <div className="relative grid items-center gap-8 md:gap-10 lg:grid-cols-[minmax(0,364px)_minmax(0,1fr)] lg:gap-12">
            <div className="max-w-[364px] text-white">
              <h3 className="font-heading text-[38px] font-semibold leading-[1.05] sm:text-[42px] lg:text-[48px]">
                Start posting
                <br />
                jobs today
              </h3>

              <p className="mt-5 text-base font-medium leading-[1.6] text-white/90 lg:mt-6">
                Start posting jobs for only $10.
              </p>

              <Link
                className="mt-6 inline-flex min-h-12 items-center justify-center bg-white px-6 py-3 text-base font-bold leading-[1.6] text-[var(--brand-primary)] transition hover:bg-white/90 lg:mt-8"
                href="/signup"
              >
                Sign Up For Free
              </Link>
            </div>

            <div className="relative mx-auto w-full max-w-[620px] lg:mx-0 lg:justify-self-end">
              <div className="overflow-hidden border border-white/15 bg-white shadow-[0_22px_60px_rgba(24,24,39,0.22)]">
                <img
                  alt="QuickHire employer dashboard preview"
                  className="h-auto w-full object-cover"
                  src={ctaBanner}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
