export function PatchbayProgress({ stage }: { stage: string }) {
  return (
    <section
      className="w-full max-w-md bg-[#FAF9F6] border-4 border-[#2D241E] p-8 hard-shadow flex flex-col items-center gap-8 my-12"
      aria-live="polite"
    >
      <div className="flex gap-4">
        <div className="w-6 h-6 rounded-full bg-[#D35400] border-2 border-[#2D241E] led-blink" />
        <div
          className="w-6 h-6 rounded-full bg-[#2E7D32] border-2 border-[#2D241E] led-blink-fast"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-6 h-6 rounded-full bg-[#F4D03F] border-2 border-[#2D241E] led-blink"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
      <div className="w-full bg-[#2D241E] p-4 border-4 border-gray-400 scanlines rounded-sm">
        <div className="text-[#F4D03F] text-xs font-bold uppercase flex flex-col gap-2">
          <span>&gt; INITIATING ROUTING SEQUENCE...</span>
          <span className="text-[#4ADE80]">&gt; {stage}</span>
          <span className="animate-pulse">_</span>
        </div>
      </div>
    </section>
  );
}
