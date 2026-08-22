import { AlertTriangle, Check, Users } from "lucide-react";
import { TeamMatch } from "@/lib/types";

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
}: {
  team: TeamMatch;
  index: number;
}) {
  return (
    <article className="switchboard-panel overflow-hidden">
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
        <div className="mt-6 flex flex-wrap gap-2">
          {team.members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 border-2 border-[#2D241E] bg-[#FAF9F6] px-2 py-1 text-xs font-bold"
            >
              <span className="grid size-7 place-items-center rounded-full bg-[#D35400] text-[10px] text-[#F4F1EA]">
                {initials(member.name)}
              </span>
              <span>{member.name.split(" ")[0]}</span>
            </div>
          ))}
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
