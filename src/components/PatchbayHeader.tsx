import { Radio } from "lucide-react";

export function PatchbayHeader() {
  return (
    <header className="w-full border-b-4 border-[#2D241E] pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#D35400] border-4 border-[#2D241E] rounded-full flex items-center justify-center hard-shadow">
          <Radio className="w-5 h-5 text-[#F4F1EA]" />
        </div>
        <div>
          <h1 className="font-heavy text-3xl font-extrabold uppercase tracking-tight text-[#2D241E] leading-none">Patchbay_OS</h1>
          <p className="text-xs font-bold text-[#D35400] uppercase tracking-widest mt-1">Analog Team Assembly</p>
        </div>
      </div>
      <div className="px-4 py-2 bg-[#FAF9F6] border-4 border-[#2D241E] hard-shadow flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-[#2E7D32] animate-pulse" />
        <span className="text-xs font-bold uppercase">System Online</span>
      </div>
    </header>
  );
}