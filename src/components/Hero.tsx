import { ArrowUpRight, Command } from "lucide-react";
import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <section
      className="relative mx-auto max-w-300 overflow-hidden px-5 pb-16 pt-24 text-center sm:px-8 lg:px-10 lg:pb-25 lg:pt-37"
      id="top"
    >
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(112,232,210,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(112,232,210,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-210">
        <div className="inline-flex items-center gap-2 border border-[#70e8d2]/30 bg-[#251c38]/55 px-3 py-2 font-mono text-[11px] tracking-[.14em] text-[#70e8d2]">
          <span className="size-1.5 rounded-full bg-[#70e8d2] shadow-[0_0_10px_#70e8d2]" />
          SYSTEM ONLINE
        </div>
        <h1 className="mt-7 font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.06] tracking-[-.055em]">
          Bring developers together.
          <br />
          <em className="text-[#70e8d2] not-italic drop-shadow-[0_0_20px_rgba(112,232,210,.28)]">
            Make your best hackathon team today.
          </em>
        </h1>
        <p className="mx-auto mt-6 max-w-165 font-mono text-sm leading-8 text-[#a9a1b8]">
          Stop scrolling through generic Discord channels. Connect with builders
          who complement your stack, match your intensity, and are ready to
          ship.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a
            className="flex items-center gap-2 bg-[#70e8d2] px-5 py-4 font-mono text-xs font-bold text-[#10231f] shadow-[0_0_22px_rgba(112,232,210,.22)] transition hover:-translate-y-1 hover:bg-[#94f3e0]"
            href="#get-started"
          >
            Initialize team <ArrowUpRight size={15} />
          </a>
          <a
            className="flex items-center gap-2 border border-[#70e8d2]/45 px-5 py-4 font-mono text-xs text-[#70e8d2] transition hover:-translate-y-1 hover:bg-[#70e8d2]/10"
            href="#features"
          >
            View protocol <Command size={15} />
          </a>
        </div>
      </div>
      <DashboardPreview />
    </section>
  );
}
