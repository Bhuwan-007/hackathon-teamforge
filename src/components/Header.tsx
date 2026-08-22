import { ArrowUpRight, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-violet-300/15 bg-[#110d1c]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-300 items-center justify-between px-5 sm:px-8 lg:px-10">
        <a
          href="#top"
          className="font-mono text-lg font-bold tracking-[-0.08em] text-[#70e8d2] drop-shadow-[0_0_12px_rgba(112,232,210,.5)]"
        >
          HACK<span className="text-[#b99aff]">SYNC</span>
        </a>
        <nav
          className="hidden items-center gap-8 font-mono text-xs text-[#a9a1b8] md:flex"
          aria-label="Main navigation"
        >
          <a
            className="border-b-2 border-[#70e8d2] pb-2 text-[#70e8d2]"
            href="#teams"
          >
            Find Teams
          </a>
          <a
            className="transition-colors hover:text-[#70e8d2]"
            href="#hackathons"
          >
            Hackathons
          </a>
          <a
            className="transition-colors hover:text-[#70e8d2]"
            href="#projects"
          >
            Projects
          </a>
          <a
            className="transition-colors hover:text-[#70e8d2]"
            href="#community"
          >
            Community
          </a>
        </nav>
        <div className="hidden items-center gap-4 font-mono text-xs md:flex">
          <a
            className="border border-[#70e8d2]/40 px-4 py-2.5 text-[#70e8d2] transition-colors hover:bg-[#70e8d2]/10"
            href="#login"
          >
            Login
          </a>
          <a
            className="flex items-center gap-2 bg-[#70e8d2] px-4 py-2.5 font-bold text-[#10231f] shadow-[0_0_22px_rgba(112,232,210,.22)] transition hover:-translate-y-0.5 hover:bg-[#94f3e0]"
            href="#get-started"
          >
            Get Started <ArrowUpRight size={14} />
          </a>
        </div>
        <a
          className="flex items-center gap-1 font-mono text-xs text-[#70e8d2] md:hidden"
          href="#get-started"
        >
          Join now <ArrowUpRight size={14} />
        </a>
        <Menu
          className="hidden text-[#70e8d2] sm:block md:hidden"
          size={20}
          aria-label="Menu"
        />
      </div>
    </header>
  );
}
