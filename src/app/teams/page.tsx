import { PatchbayHeader } from "@/components/PatchbayHeader";
import { TeamsClient } from "@/components/TeamsClient";

export default function TeamsPage() {
  return (
    <main
      className="min-h-screen bg-[#F4F1EA] p-6 text-[#2D241E]"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <div className="absolute inset-0 pegboard-bg opacity-70 pointer-events-none" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <PatchbayHeader />
        <section className="pt-10">
          <TeamsClient />
        </section>
      </div>
    </main>
  );
}
