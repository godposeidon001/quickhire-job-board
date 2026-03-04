function SearchIcon() {
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
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M21 21L16.65 16.65"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function LocationIcon() {
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
        d="M12 22C15.5 18.4 19 14.6 19 10C19 6.13 15.87 3 12 3C8.13 3 5 6.13 5 10C5 14.6 8.5 18.4 12 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" fill="currentColor" r="1.7" />
    </svg>
  );
}

export function SearchBar() {
  return (
    <form
      action="/jobs"
      method="get"
      className="w-full bg-white p-4 shadow-[var(--shadow-search)] md:max-w-[300px] lg:max-w-[852px]"
    >
      <div className="flex flex-col gap-0 lg:h-[57px] lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-4 border-b border-[var(--neutral-20)] pb-3 text-[var(--neutral-100)] lg:h-full lg:border-b-0 lg:pb-0 lg:pl-4 lg:pr-6">
          <span className="text-[var(--neutral-100)]">
            <SearchIcon />
          </span>
          <input
            name="q"
            className="w-full border-none bg-transparent text-base leading-[1.6] text-[var(--neutral-60)] placeholder:text-[var(--neutral-60)]/55 focus:outline-none"
            placeholder="Job title or keyword"
            type="text"
          />
        </div>

        <div className="flex flex-1 items-center gap-4 border-b border-[var(--neutral-20)] pb-3 pt-3 text-[var(--neutral-100)] lg:h-full lg:border-b-0 lg:pb-0 lg:pt-0 lg:pl-4 lg:pr-6">
          <span className="text-[var(--neutral-100)]">
            <LocationIcon />
          </span>
          <input
            name="location"
            className="w-full border-none bg-transparent text-base leading-[1.6] text-[var(--neutral-100)] placeholder:text-[var(--neutral-60)]/70 focus:outline-none"
            placeholder="City, country, or remote"
            type="text"
          />
        </div>

        <button
          className="mt-3 h-[57px] bg-[var(--brand-primary)] px-7 text-lg font-bold leading-[1.6] text-white transition-opacity hover:opacity-90 lg:mt-0"
          type="submit"
        >
          Search my job
        </button>
      </div>
    </form>
  );
}
