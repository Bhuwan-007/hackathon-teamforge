"use client";

import { useRouter } from "next/navigation";
import { PatchbayHeader } from "../components/PatchbayHeader";
import { PatchbayIntro } from "../components/PatchbayIntro";

export default function SwitchboardThemePreview() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-[#F4F1EA] text-[#2D241E] flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <div className="absolute inset-0 pegboard-bg opacity-70 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-10">
        <PatchbayHeader />

        <PatchbayIntro onPatch={() => router.push("/join")} />
      </div>
    </div>
  );
}
