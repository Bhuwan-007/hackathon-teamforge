export function Footer() {
  return (
    <footer className="mx-auto flex max-w-300 flex-col gap-5 border-t border-violet-300/15 px-5 py-8 font-mono text-[10px] text-[#766d89] sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:pb-11">
      <a
        className="font-sans text-base font-bold tracking-[-.08em] text-[#70e8d2] drop-shadow-[0_0_12px_rgba(112,232,210,.5)]"
        href="#top"
      >
        HACK<span className="text-[#b99aff]">SYNC</span>
      </a>
      <p className="m-0">© 2024 HackSync. Build the future, together.</p>
      <nav className="flex gap-5">
        <a className="transition-colors hover:text-[#70e8d2]" href="#projects">
          Projects
        </a>
        <a className="transition-colors hover:text-[#70e8d2]" href="#community">
          Community
        </a>
        <a className="transition-colors hover:text-[#70e8d2]" href="#privacy">
          Privacy
        </a>
      </nav>
    </footer>
  );
}
