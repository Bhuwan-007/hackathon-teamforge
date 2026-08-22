import { ArrowUpRight } from "lucide-react";

export function ClosingSection() {
  return (
    <section
      className="mx-auto flex max-w-300 flex-col justify-between gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:px-10 lg:py-25"
      id="get-started"
    >
      <div>
        <span className="font-mono text-[11px] tracking-[.14em] text-[#70e8d2]">
          // READY WHEN YOU ARE
        </span>
        <h2 className="mt-4 font-sans text-4xl font-semibold leading-none tracking-[-.05em] sm:text-5xl">
          Your next great build
          <br />
          <em className="text-[#70e8d2] not-italic">starts with a hello.</em>
        </h2>
      </div>
      <a
        className="flex w-fit items-center gap-2 bg-[#70e8d2] px-5 py-4 font-mono text-xs font-bold text-[#10231f] shadow-[0_0_22px_rgba(112,232,210,.22)] transition hover:-translate-y-1 hover:bg-[#94f3e0]"
        href="#top"
      >
        Create your profile <ArrowUpRight size={15} />
      </a>
    </section>
  );
}
