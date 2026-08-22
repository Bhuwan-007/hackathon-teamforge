"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Plug } from "lucide-react";
import { useState } from "react";
import { TeamMatch } from "@/lib/types";
import { TeamMatchCard } from "./TeamMatchCard";
import { useUser } from "@/hooks/use-user";

const stages = [
  "Analyzing participants...",
  "Mapping skills...",
  "Optimizing teams...",
  "Teams formed",
];

export function TeamsClient() {
  const { profile } = useUser();
  const [stage, setStage] = useState(-1);
  const [teams, setTeams] = useState<TeamMatch[]>([]);
  const [error, setError] = useState("");

  async function generateTeams() {
    setError("");
    setTeams([]);
    setStage(0);
    const responsePromise = fetch("/api/teams", { method: "POST" });
    for (let nextStage = 1; nextStage < stages.length; nextStage += 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStage(nextStage);
    }
    try {
      const response = await responsePromise;
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.error || "Unable to form teams.");
      setTeams(payload.teams);
    } catch (generationError) {
      setError(
        generationError instanceof Error
          ? generationError.message
          : "Unable to form teams.",
      );
    } finally {
      setStage(-1);
    }
  }

  return (
    <>
      <div className="relative mb-8 flex flex-col gap-6 border-b-4 border-[#2D241E] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D35400]">
            System / Team Match
          </p>
          <h1 className="font-heavy text-4xl uppercase leading-tight sm:text-5xl">
            Your best assembly.
          </h1>
          <p className="mt-4 max-w-lg text-sm font-bold leading-7 text-gray-600">
            Turn the participant pool into balanced teams with transparent
            scores and clear next steps.
          </p>
        </div>
        <button
          onClick={generateTeams}
          disabled={stage >= 0}
          className="switchboard-button shrink-0 justify-center disabled:cursor-wait disabled:opacity-70"
        >
          {stage >= 0 ? (
            <LoaderCircle className="size-6 animate-spin" />
          ) : (
            <Plug className="size-6" />
          )}
          <span className="font-heavy text-lg uppercase">Generate Teams</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {stage >= 0 && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="switchboard-panel mx-auto my-16 max-w-xl p-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest">
                Routing sequence
              </span>
              <span className="font-heavy text-2xl text-[#D35400]">
                {stage + 1}/4
              </span>
            </div>
            <div className="mb-6 h-4 border-2 border-[#2D241E] bg-[#F4F1EA]">
              <motion.div
                className="h-full bg-[#D35400]"
                initial={{ width: 0 }}
                animate={{ width: `${((stage + 1) / stages.length) * 100}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
            <p className="font-heavy text-xl uppercase" aria-live="polite">
              {stages[stage]}
            </p>
          </motion.div>
        )}
        {stage < 0 && teams.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {teams.map((team, index) => (
              <TeamMatchCard key={team.id} team={team} index={index} currentProfileId={profile?.id} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {stage < 0 && teams.length === 0 && !error && (
        <div className="switchboard-panel my-16 p-10 text-center">
          <p className="font-heavy text-xl uppercase">Ready to map the pool.</p>
          <p className="mt-2 text-sm font-bold text-gray-600">
            Generate teams to see match scores, strengths, and gaps.
          </p>
        </div>
      )}
      {error && (
        <p className="border-4 border-[#D35400] bg-[#FAF9F6] p-5 text-sm font-bold text-[#D35400]">
          {error}
        </p>
      )}
    </>
  );
}
