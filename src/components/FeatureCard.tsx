import { ArrowUpRight } from "lucide-react";

export type Feature = {
  icon: string;
  title: string;
  text: string;
  tags: string[];
  featured?: boolean;
};
type FeatureCardProps = Feature & { index: number };

export function FeatureCard({
  icon,
  title,
  text,
  tags,
  featured,
  index,
}: FeatureCardProps) {
  return (
    <article
      className={`min-h-68 border p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[#70e8d2]/50 ${featured ? "border-[#70e8d2]/35 bg-gradient-to-br from-[#352454] to-[#1a1429]" : "border-violet-300/15 bg-[#1a1429]"}`}
    >
      <div className="flex justify-between">
        <div className="grid size-10 place-items-center border border-[#70e8d2]/30 bg-[#70e8d2]/10 font-sans text-xl text-[#70e8d2]">
          {icon}
        </div>
        <span className="font-mono text-[11px] text-[#706782]">0{index}</span>
      </div>
      <h3 className="mt-7 font-sans text-xl font-semibold">{title}</h3>
      <p className="mt-3 min-h-15 font-mono text-xs leading-7 text-[#a9a1b8]">
        {text}
      </p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            className="border border-[#c7f36b]/25 px-1.5 py-1 font-mono text-[9px] text-[#c7f36b]"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
