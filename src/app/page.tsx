import { ClosingSection } from "@/components/ClosingSection";
import { Feature } from "@/components/FeatureCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";

const features: Feature[] = [
  {
    icon: "✦",
    title: "Smart Matching",
    text: "Our algorithm analyzes tech stacks and hackathon goals to pair you with the perfect collaborators instantly.",
    tags: ["AI-powered", "Real-time"],
    featured: true,
  },
  {
    icon: "#",
    title: "Skill Tags",
    text: "Filter instantly by framework, language, or specific hackathon experience. Find the missing piece in seconds.",
    tags: ["React", "Python", "UI/UX"],
  },
  {
    icon: "⌁",
    title: "Instant Chat",
    text: "Seamlessly move from discovery to discussion with integrated messaging and built-in code snippet sharing.",
    tags: ["Code-ready"],
  },
];

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturesSection features={features} />
      <ClosingSection />
      <Footer />
    </main>
  );
}
