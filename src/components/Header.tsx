"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-violet-300/15 bg-[#110d1c]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-[-0.08em] text-[#70e8d2] drop-shadow-[0_0_12px_rgba(112,232,210,.5)]"
        >
          TEAM<span className="text-[#b99aff]">FORGE</span>
        </Link>
        <nav
          className="hidden items-center gap-8 font-mono text-xs text-[#a9a1b8] md:flex"
          aria-label="Main navigation"
        >
          <Link
            className="border-b-2 border-[#70e8d2] pb-2 text-[#70e8d2]"
            href="/teams"
          >
            Find Teams
          </Link>
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
        </nav>
        <div className="hidden items-center gap-4 font-mono text-xs md:flex">
          <Link
            className="border border-[#70e8d2]/40 px-4 py-2.5 text-[#70e8d2] transition-colors hover:bg-[#70e8d2]/10"
            href="/join"
          >
            Login
          </Link>
          <Link
            className="flex items-center gap-2 bg-[#70e8d2] px-4 py-2.5 font-bold text-[#10231f] shadow-[0_0_22px_rgba(112,232,210,.22)] transition hover:-translate-y-0.5 hover:bg-[#94f3e0]"
            href="/join"
          >
            Get Started <ArrowUpRight size={14} />
          </Link>
        </div>
        <button
          className="text-[#70e8d2] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-violet-300/15 bg-[#110d1c] p-5 flex flex-col gap-4 font-mono text-sm text-[#a9a1b8]">
          <Link href="/teams" className="text-[#70e8d2]" onClick={() => setIsOpen(false)}>Find Teams</Link>
          <a href="#hackathons" onClick={() => setIsOpen(false)}>Hackathons</a>
          <a href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
          <div className="pt-4 mt-2 border-t border-violet-300/15 flex flex-col gap-3">
            <Link href="/join" className="border border-[#70e8d2]/40 px-4 py-3 text-center text-[#70e8d2]" onClick={() => setIsOpen(false)}>Login</Link>
            <Link href="/join" className="bg-[#70e8d2] px-4 py-3 text-center font-bold text-[#10231f]" onClick={() => setIsOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
