import { Feature, FeatureCard } from "./FeatureCard";

type FeaturesSectionProps = { features: Feature[] };

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <section
      className="border-y border-violet-300/15 bg-[#171123] px-5 py-20 sm:px-8 lg:px-10 lg:py-24"
      id="features"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="font-mono text-[11px] tracking-[.14em] text-[#70e8d2]">
              // THE ADVANTAGE
            </span>
            <h2 className="mt-4 font-sans text-4xl font-semibold leading-none tracking-[-.05em] sm:text-5xl">
              Everything you need
              <br />
              <em className="text-[#70e8d2] not-italic">to ship together.</em>
            </h2>
          </div>
          <p className="max-w-80 font-mono text-xs leading-7 text-[#a9a1b8]">
            Core tools designed to compress the team formation phase from days
            into minutes.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
