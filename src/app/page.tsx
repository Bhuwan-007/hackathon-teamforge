"use client";

import { useState } from "react";
import { AssemblyDashboard } from "../components/AssemblyDashboard";
import { PatchbayHeader } from "../components/PatchbayHeader";
import { PatchbayIntro } from "../components/PatchbayIntro";
import { PatchbayProgress } from "../components/PatchbayProgress";

const patchStages = [
  "Warming up mainframes...",
  "Patching operator cables...",
  "Syncing frequencies...",
  "Circuit closed. Signal locked.",
];

export default function SwitchboardThemePreview() {
  const [isPatching, setIsPatching] = useState(false);
  const [patchStage, setPatchStage] = useState(0);
  const [circuitReady, setCircuitReady] = useState(false);

  const handlePatch = () => {
    setIsPatching(true);
    setCircuitReady(false);
    setPatchStage(0);

    let stage = 0;
    const interval = setInterval(() => {
      stage += 1;
      if (stage < stages.length) {
        setPatchStage(stage);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsPatching(false);
          setCircuitReady(true);
        }, 600);
      }
    }, 900);
  };

  const operators = [
    {
      id: "OP-01",
      role: "Frontend",
      signal: "92Hz",
      type: "Visual",
      name: "Alice C.",
    },
    {
      id: "OP-02",
      role: "Backend",
      signal: "88Hz",
      type: "Logic",
      name: "Bob W.",
    },
    {
      id: "OP-03",
      role: "Data/ML",
      signal: "75Hz",
      type: "Compute",
      name: "Charlie D.",
    },
    {
      id: "OP-04",
      role: "Product",
      signal: "95Hz",
      type: "Router",
      name: "Diana M.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#F4F1EA] text-[#2D241E] flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <div className="absolute inset-0 pegboard-bg opacity-70 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-10">
        <PatchbayHeader />

        {!isPatching && !circuitReady && (
          <PatchbayIntro onPatch={handlePatch} />
        )}

        {isPatching && (
          <PatchbayProgress stage={patchStages[patchStage]} />
        )}

        {circuitReady && (
          <AssemblyDashboard onReset={() => setCircuitReady(false)} />
        )}
      </div>
    </div>
  );
}
