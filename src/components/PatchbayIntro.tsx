import { Plug } from "lucide-react";

export function PatchbayIntro({ onPatch, buttonText = "Start now" }: { onPatch: () => void, buttonText?: string }) {
  return (
    <section className="flex flex-col items-center text-center space-y-6 my-12">
      <h2 className="font-heavy text-5xl md:text-6xl text-[#2D241E] max-w-2xl leading-tight">
        Bring builders together.
        <br />{" "}
        <span className="text-[#D35400] underline decoration-[#F4D03F] decoration-8 underline-offset-4">
          Find your right team for hackathons
        </span>
      </h2>
      <p className="text-sm md:text-base max-w-lg mb-8 font-bold text-gray-600">
        Patch complementary operators into a unified assembly. Prevent signal
        loss by covering all required frequencies.
      </p>
      <button onClick={onPatch} className="switchboard-button">
        <Plug className="w-6 h-6" />
        <span className="font-heavy text-xl uppercase tracking-wide">
          {buttonText}
        </span>
      </button>
    </section>
  );
}
