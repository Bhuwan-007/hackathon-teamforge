import { AlertTriangle, Check, Users } from "lucide-react";
import { TeamMatch } from "@/lib/types";
import { GitHubBadge } from "./GitHubBadge";

const scoreLabels: { key: keyof TeamMatch["scores"]; label: string }[] = [
  { key: "coverage", label: "Skill Coverage" },
  { key: "complementarity", label: "Complementarity" },
  { key: "interestAlignment", label: "Interest Alignment" },
  { key: "availabilityOverlap", label: "Availability" },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TeamMatchCard({
  team,
  index,
  currentProfileId,
}: {
  team: TeamMatch;
  index: number;
  currentProfileId?: string;
}) {
  const isMyTeam = currentProfileId && team.members.some(m => m.id === currentProfileId);
  
  return (
    <article className={`switchboard-panel overflow-hidden relative ${isMyTeam ? "ring-4 ring-[#D35400] shadow-[0_0_20px_rgba(211,84,0,0.3)]" : ""}`}>
      {isMyTeam && (
        <div className="absolute top-0 right-0 bg-[#D35400] text-[#F4F1EA] px-4 py-1 text-xs font-bold uppercase tracking-widest z-10 border-b-2 border-l-2 border-[#2D241E]">
          Your Team
        </div>
      )}
      <div className="border-b-4 border-[#2D241E] bg-[#D8D1C5] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#D35400]">
              MATCH ASSEMBLY {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="font-heavy text-2xl uppercase">
              Team {String.fromCharCode(65 + index)}
            </h2>
          </div>
          <div className="text-right">
            <div className="font-heavy text-5xl leading-none text-[#2E7D32]">
              {team.overallMatch}%
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-widest">
              Overall Match
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          {team.members.map((member) => {
            const isMe = member.id === currentProfileId;
            return (
              <div
                key={member.id}
                className={`flex items-center justify-between border-2 border-[#2D241E] px-3 py-2 text-xs font-bold ${isMe ? "bg-[#D35400] text-[#F4F1EA]" : "bg-[#FAF9F6]"}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`grid size-7 place-items-center rounded-full text-[10px] ${isMe ? "bg-[#F4F1EA] text-[#D35400]" : "bg-[#D35400] text-[#F4F1EA]"}`}>
                    {initials(member.name)}
                  </span>
                  <span className="text-sm">{member.name.split(" ")[0]} {isMe && <span className="opacity-75 font-normal">(You)</span>}</span>
                </div>
                {member.github_username && (
                  <GitHubBadge username={member.github_username} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-6 flex items-center gap-2 border-b-2 border-gray-300 pb-3 text-[10px] font-bold uppercase tracking-widest text-gray-600">
          <Users className="size-4 text-[#D35400]" /> Score Breakdown
        </div>
        <div className="space-y-4">
          {scoreLabels.map(({ key, label }) => (
            <div key={key}>
              <div className="mb-1 flex justify-between text-xs font-bold uppercase">
                <span>{label}</span>
                <span className="text-[#2E7D32]">{team.scores[key]}%</span>
              </div>
              <div className="h-3 border-2 border-[#2D241E] bg-[#F4F1EA]">
                <div
                  className="h-full bg-[#2E7D32]"
                  style={{ width: `${team.scores[key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t-4 border-[#2D241E] bg-[#F4D03F] p-5">
        <h3 className="mb-4 font-heavy text-lg uppercase">Why this team?</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#2E7D32]">
              Strengths
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              {team.strengths.map((strength) => (
                <li key={strength} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-[#2E7D32]" />
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#D35400]">
              Gaps
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              {team.gaps.map((gap) => (
                <li key={gap} className="flex gap-2">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#D35400]" />
                  {gap}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
