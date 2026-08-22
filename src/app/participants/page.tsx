import { supabase } from "@/lib/supabase";
import { Profile } from "@/lib/types";
import { PatchbayHeader } from "@/components/PatchbayHeader";
import { ParticipantsGrid } from "@/components/ParticipantsGrid";

export default async function ParticipantsPage() {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main
        className="min-h-screen bg-[#F4F1EA] px-6 py-10 text-[#2D241E]"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        <p className="mx-auto max-w-4xl border-4 border-[#2D241E] bg-[#FAF9F6] p-6 text-[#D35400] hard-shadow">
          Error loading profiles: {error.message}
        </p>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#F4F1EA] p-6 text-[#2D241E]"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <div className="absolute inset-0 pegboard-bg opacity-70 pointer-events-none" />
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <PatchbayHeader />
        <section className="pt-10">
          <div className="relative mb-8 flex flex-col gap-5 border-b-4 border-[#2D241E] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D35400]">
                SYSTEM / PARTICIPANTS
              </p>
              <h1 className="font-heavy text-4xl uppercase leading-tight sm:text-5xl">
                Find your crew.
              </h1>
              <p className="mt-4 max-w-lg text-sm font-bold leading-7 text-gray-600">
                Browse builders by role, experience, and strongest skills. Find
                the signal that completes your team.
              </p>
            </div>
            <span className="w-fit border-4 border-[#2D241E] bg-[#FAF9F6] px-3 py-2 text-xs font-bold uppercase hard-shadow">
              {profiles?.length ?? 0} ACTIVE BUILDERS
            </span>
          </div>

          <ParticipantsGrid profiles={profiles || []} />
        </section>
      </div>
    </main>
  );
}
