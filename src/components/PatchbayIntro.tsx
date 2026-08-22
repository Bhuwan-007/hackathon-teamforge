import { Plug } from "lucide-react";

export function PatchbayIntro({ onPatch }: { onPatch: () => void }) {
  return (
    <section className="flex flex-col items-center text-center space-y-6 my-12">
      <h2 className="font-heavy text-5xl md:text-6xl text-[#2D241E] max-w-2xl leading-tight">
        Wire together the{" "}
        <span className="text-[#D35400] underline decoration-[#F4D03F] decoration-8 underline-offset-4">
          perfect circuit.
        </span>
      </h2>
      <p className="text-sm md:text-base max-w-lg mb-8 font-bold text-gray-600">
        Patch complementary operators into a unified assembly. Prevent signal
        loss by covering all required frequencies.
      </p>
      <button
        onClick={onPatch}
        className="group flex items-center gap-4 bg-[#F4D03F] border-4 border-[#2D241E] px-8 py-5 hard-shadow text-[#2D241E] hover:bg-[#ffe16b]"
      >
        <Plug className="w-6 h-6" />
        <span className="font-heavy text-xl uppercase tracking-wide">
          Patch New Circuit
        </span>
      </button>
    </section>
  );
}
