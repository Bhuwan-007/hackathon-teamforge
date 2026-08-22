import { supabase } from "@/lib/supabase";
import { Profile } from "@/lib/types";
import { PatchbayHeader } from "@/components/PatchbayHeader";

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

          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profiles?.map((profile: Profile) => {
              // Sort skills by score and take top 3
              const topSkills = [...profile.skills]
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);

              return (
                <article
                  key={profile.id}
                  className="border-2 border-[#2D241E] bg-[#FAF9F6] p-5 shadow-[4px_4px_0px_#2D241E] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#2D241E]"
                >
                  <div className="mb-6 flex items-start justify-between border-b-2 border-[#2D241E] pb-4">
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#D35400]">
                        BUILDER PROFILE
                      </p>
                      <h2 className="font-heavy text-2xl uppercase">
                        {profile.name}
                      </h2>
                    </div>
                    <span className="size-2 rounded-full bg-[#2E7D32] shadow-[0_0_8px_#2E7D32]" />
                  </div>
                  <ProfileGroup label="Roles">
                    {profile.role_preferences.map((role) => (
                      <span
                        key={role}
                        className="border border-[#2D241E] bg-[#F4F1EA] px-2 py-1 text-[11px] font-bold"
                      >
                        {role}
                      </span>
                    ))}
                  </ProfileGroup>
                  <ProfileGroup label="Top Skills">
                    {topSkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex justify-between border-b border-gray-300 py-2 text-xs font-bold"
                      >
                        <span>{skill.name}</span>
                        <span className="text-[#2E7D32]">{skill.score}/10</span>
                      </div>
                    ))}
                  </ProfileGroup>
                </article>
              );
            })}

            {(!profiles || profiles.length === 0) && (
              <p className="col-span-full border-2 border-dashed border-[#2D241E] bg-[#FAF9F6] p-8 text-sm font-bold text-gray-600">
                No participants found. Did you run the seed script?
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[.14em] text-[#a9a1b8]">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
