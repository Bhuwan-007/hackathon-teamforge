"use client";

import { useState } from "react";
import { Profile } from "@/lib/types";
import { ProfileModal } from "./ProfileModal";

export function ParticipantsGrid({ profiles }: { profiles: Profile[] }) {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  if (!profiles || profiles.length === 0) {
    return (
      <p className="col-span-full border-2 border-dashed border-[#2D241E] bg-[#FAF9F6] p-8 text-sm font-bold text-gray-600">
        No participants found. Did you run the seed script?
      </p>
    );
  }

  return (
    <>
      <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => {
          const topSkills = [...profile.skills]
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

          return (
            <article
              key={profile.id}
              onClick={() => setSelectedProfile(profile)}
              className="cursor-pointer border-2 border-[#2D241E] bg-[#FAF9F6] p-5 shadow-[4px_4px_0px_#2D241E] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#2D241E]"
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
      </div>
      {selectedProfile && (
        <ProfileModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </>
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
