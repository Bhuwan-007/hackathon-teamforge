import {
  Activity,
  ArrowUpRight,
  Home,
  Settings,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";

export function DashboardPreview() {
  return (
    <div
      className="mt-16 border border-[#70e8d2]/45 bg-gradient-to-br from-[#70e8d2]/60 via-[#b99aff]/20 to-[#70e8d2]/10 p-0.5 shadow-[0_0_50px_rgba(112,232,210,.12)] transition-transform duration-500 hover:[transform:perspective(1200px)_rotateX(0deg)] lg:mt-24 lg:[transform:perspective(1200px)_rotateX(4deg)]"
      aria-label="HackSync dashboard preview"
    >
      <div className="flex h-9 items-center gap-2 bg-[#2a203b] px-4 font-mono text-[10px] text-[#756d88]">
        <div className="flex gap-1.5">
          <i className="size-2 rounded-full bg-[#ff7e86]" />
          <i className="size-2 rounded-full bg-[#c7f36b]" />
          <i className="size-2 rounded-full bg-[#70e8d2]" />
        </div>
        <span>hacksync-dashboard.tsx</span>
        <span className="ml-auto text-[9px] text-[#70e8d2]">● LIVE</span>
      </div>
      <div className="flex min-h-80 bg-[#171123] sm:min-h-95">
        <aside className="flex w-12 shrink-0 flex-col items-center gap-6 border-r border-violet-300/15 bg-[#1e172d] pt-5 text-[#665c7b] sm:w-17">
          <strong className="mb-4 font-sans text-lg text-[#70e8d2]">HS</strong>
          <Home className="text-[#70e8d2]" size={17} />
          <Sparkles size={17} />
          <Users size={17} />
          <Settings size={17} />
        </aside>
        <div className="flex-1 bg-[radial-gradient(circle_at_70%_10%,rgba(112,232,210,.06),transparent_34%)] p-4 sm:p-7">
          <div className="flex items-start justify-between">
            <div>
              <small className="font-mono text-[9px] tracking-[.12em] text-[#776e8b]">
                THURSDAY, MAY 16
              </small>
              <h3 className="mt-1.5 font-sans text-lg font-semibold sm:text-2xl">
                Good morning, Alex<span className="text-[#70e8d2]">.</span>
              </h3>
            </div>
            <div className="grid size-9 place-items-center rounded-full bg-[#b99aff] font-mono text-[11px] font-bold text-[#251b3a]">
              AC
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
            <div className="border border-violet-300/20 bg-[#251c38]/75 p-4 sm:p-5">
              <div className="mb-5 flex justify-between font-mono text-[9px] tracking-[.12em] text-[#776e8b]">
                TOP MATCH <span className="text-[#70e8d2]">98% FIT</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-full bg-[#c7f36b] font-mono text-[11px] font-bold text-[#251b3a]">
                  JM
                </div>
                <div>
                  <strong className="block font-sans text-sm">
                    Jordan Miller
                  </strong>
                  <small className="mt-1 block font-mono text-[10px] text-[#a9a1b8]">
                    Full-stack / ML
                  </small>
                </div>
                <b className="ml-auto text-[#70e8d2]">→</b>
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5 font-mono text-[9px] text-[#70e8d2]">
                <i className="border border-[#70e8d2]/25 px-1.5 py-1 not-italic">
                  Python
                </i>
                <i className="border border-[#70e8d2]/25 px-1.5 py-1 not-italic">
                  TensorFlow
                </i>
                <i className="border border-[#70e8d2]/25 px-1.5 py-1 not-italic">
                  Next.js
                </i>
              </div>
            </div>
            <div className="hidden border border-violet-300/20 bg-[#251c38]/75 p-5 sm:block">
              <div className="mb-5 font-mono text-[9px] tracking-[.12em] text-[#776e8b]">
                ACTIVE NOW
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#d4cde1]">
                <span className="size-1.5 rounded-full bg-[#70e8d2] shadow-[0_0_10px_#70e8d2]" />
                24 builders online
              </div>
              <div className="mt-5 flex h-14 items-end gap-1">
                <i className="h-[30%] flex-1 bg-[#70e8d2]/65" />
                <i className="h-[56%] flex-1 bg-[#b99aff]/65" />
                <i className="h-[80%] flex-1 bg-[#70e8d2]/65" />
                <i className="h-[30%] flex-1 bg-[#70e8d2]/65" />
                <i className="h-[56%] flex-1 bg-[#b99aff]/65" />
                <i className="h-[80%] flex-1 bg-[#70e8d2]/65" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-violet-300/15 pt-4">
            <div>
              <small className="font-mono text-[9px] tracking-[.12em] text-[#776e8b]">
                UPCOMING HACKATHONS
              </small>
              <strong className="mt-2 block font-sans text-sm">
                Build for impact{" "}
                <ArrowUpRight className="inline text-[#70e8d2]" size={14} />
              </strong>
            </div>
            <div className="text-right text-[#c7f36b]">
              <b className="block font-sans text-2xl">48</b>
              <span className="font-mono text-[9px]">HOURS LEFT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
