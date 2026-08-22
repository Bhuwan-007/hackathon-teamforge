"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Plug } from "lucide-react";
import { useState } from "react";
import { TeamMatch } from "@/lib/types";
import { TeamMatchCard } from "./TeamMatchCard";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
const stages = [
  "Analyzing participants...",
  "Mapping skills...",
  "Optimizing teams...",
  "Teams formed",
];

export function TeamsClient() {
  const { user, profile } = useUser();
  const [stage, setStage] = useState(-1);
  const [teams, setTeams] = useState<TeamMatch[]>([]);
  const [error, setError] = useState("");
  const [teamToLeave, setTeamToLeave] = useState<string | null>(null);

  const loadTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Unable to fetch teams.");
      setTeams(payload.teams);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to fetch teams.");
    } finally {
      // Don't set loading state here, we handle it in initialize
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setStage(0);
      const responsePromise = loadTeams();
      for (let nextStage = 1; nextStage < stages.length; nextStage += 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStage(nextStage);
      }
      await responsePromise;
      setStage(-1);
    };
    initialize();
  }, []);

  const handleJoin = async (teamId: string) => {
    if (!user) {
      alert("You must be logged in to join a team!");
      return;
    }
    try {
      const res = await fetch(`/api/teams/${teamId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id })
      });
      if (!res.ok) {
        let errorMsg = "Failed to join team";
        try {
            const data = await res.json();
            errorMsg = data.error || errorMsg;
        } catch (e) {
            // If json parsing fails, fall back to status text
            errorMsg = `Error ${res.status}: ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }
      await loadTeams(); // refresh teams
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLeave = async (teamId: string) => {
    if (!user) return;
    setTeamToLeave(teamId);
  };

  const confirmLeave = async () => {
    if (!user || !teamToLeave) return;
    
    try {
      const res = await fetch(`/api/teams/${teamToLeave}/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id })
      });
      if (!res.ok) {
        let errorMsg = "Failed to leave team";
        try {
            const data = await res.json();
            errorMsg = data.error || errorMsg;
        } catch (e) {
            errorMsg = `Error ${res.status}: ${res.statusText}`;
        }
        throw new Error(errorMsg);
      }
      await loadTeams(); // refresh teams
      setTeamToLeave(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <div className="relative mb-8 flex flex-col gap-6 border-b-4 border-[#2D241E] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#D35400]">
            Team Board
          </p>
          <h1 className="font-heavy text-4xl uppercase leading-tight sm:text-5xl">
            Join a Squad.
          </h1>
          <p className="mt-4 max-w-lg text-sm font-bold leading-7 text-gray-600">
            Browse teams looking for members and patch into the one that fits your skills.
          </p>
        </div>
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
              <TeamMatchCard
                key={team.id}
                team={team}
                index={index}
                currentProfileId={profile?.id}
                onJoin={() => handleJoin(team.id)}
                onLeave={() => handleLeave(team.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {stage < 0 && teams.length === 0 && !error && (
        <div className="switchboard-panel my-16 p-10 text-center">
          <p className="font-heavy text-xl uppercase">No teams found.</p>
          <p className="mt-2 text-sm font-bold text-gray-600">
            Check back later for open teams!
          </p>
        </div>
      )}
      {error && (
        <p className="border-4 border-[#D35400] bg-[#FAF9F6] p-5 text-sm font-bold text-[#D35400]">
          {error}
        </p>
      )}

      <AnimatePresence>
        {teamToLeave && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D241E]/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="switchboard-panel max-w-sm w-full bg-[#F4F1EA] p-6"
            >
              <h2 className="font-heavy text-2xl uppercase mb-4 text-[#D35400]">
                Leave Team?
              </h2>
              <p className="text-sm font-bold text-gray-700 mb-8">
                Are you sure you want to disconnect from this team? You will lose your spot if someone else joins.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setTeamToLeave(null)}
                  className="flex-1 border-2 border-[#2D241E] px-4 py-2 text-sm font-bold uppercase hover:bg-[#D8D1C5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLeave}
                  className="flex-1 bg-[#D35400] text-[#F4F1EA] border-2 border-[#2D241E] px-4 py-2 text-sm font-bold uppercase hover:bg-[#A84300] transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
