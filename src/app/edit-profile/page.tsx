"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SKILL_TAXONOMY, SkillCategory } from "@/lib/types";
import { useUser } from "@/hooks/use-user";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PatchbayHeader } from "@/components/PatchbayHeader";

const ROLE_OPTIONS = [
  "Lead",
  "Build",
  "Design",
  "Research",
  "Present",
  "Flexible",
];
const INTEREST_OPTIONS = [
  "AI",
  "Climate",
  "Healthcare",
  "Education",
  "Fintech",
  "Gaming",
  "Social Impact",
];
const AVAILABILITY_OPTIONS = ["weekday evenings", "weekend", "flexible"];
const EXPERIENCE_LEVELS = ["Junior", "Mid", "Senior"];

export default function EditProfilePage() {
  const router = useRouter();
  const { user, profile, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [experience, setExperience] = useState("");
  const [customSkill, setCustomSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Record<string, number>>({});
  const [roles, setRoles] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      const expMatch = profile.name.match(/\(([^)]+)\)$/);
      const exp = expMatch ? expMatch[1] : "";
      setExperience(exp);
      setName(profile.name.replace(` (${exp})`, ""));
      setGithubUsername(profile.github_username || "");
      
      const skillsMap: Record<string, number> = {};
      profile.skills.forEach(s => skillsMap[s.name] = s.score);
      setSelectedSkills(skillsMap);
      
      setRoles(profile.role_preferences);
      setInterests(profile.interests);
      setAvailability(profile.availability);
    } else if (!userLoading && !user) {
      router.push("/login");
    }
  }, [profile, user, userLoading, router]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => {
      const next = { ...prev };
      if (skill in next) {
        delete next[skill];
      } else {
        next[skill] = 5; // Default score
      }
      return next;
    });
  };

  const handleSkillScore = (skill: string, score: number) => {
    setSelectedSkills((prev) => ({ ...prev, [skill]: score }));
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim()) {
      setSelectedSkills((prev) => ({ ...prev, [customSkill.trim()]: 5 }));
      setCustomSkill("");
    }
  };

  const toggleArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError(null);

    const skillsArray = Object.entries(selectedSkills).map(([n, score]) => ({
      name: n,
      score,
    }));

    if (
      !name ||
      !experience ||
      roles.length === 0 ||
      availability.length === 0
    ) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    const parsedGithub = githubUsername.trim().split('/').filter(Boolean).pop() || githubUsername.trim();

    const { error: dbError } = await supabase.from("profiles").update({
        name: `${name} (${experience})`,
        github_username: parsedGithub || null,
        skills: skillsArray,
        role_preferences: roles,
        interests,
        availability,
    }).eq("user_id", user.id);

    setLoading(false);
    if (dbError) {
      setError(dbError.message);
    } else {
      router.push("/teams");
    }
  };

  if (userLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <main
      className="min-h-screen bg-[#F4F1EA] text-[#2D241E] p-6 relative overflow-hidden"
      style={{ fontFamily: "'Space Mono', monospace" }}
    >
      <div className="absolute inset-0 pegboard-bg opacity-70 pointer-events-none" />
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <PatchbayHeader />
        <Card className="switchboard-panel rounded-none overflow-hidden mt-10">
          <CardHeader className="bg-[#D8D1C5] border-b-4 border-[#2D241E] rounded-none">
            <CardTitle className="font-heavy text-3xl uppercase">
              Edit Profile
            </CardTitle>
            <CardDescription>
              Update your skills, availability, and interests.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-heavy uppercase text-xs tracking-widest mb-2 block">Full Name *</label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="rounded-none border-2 border-[#2D241E] bg-[#F4F1EA]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="github" className="font-heavy uppercase text-xs tracking-widest mb-2 block">GitHub Profile URL (Optional)</label>
                    <Input
                      id="github"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      placeholder="https://github.com/torvalds"
                      className="rounded-none border-2 border-[#2D241E] bg-[#F4F1EA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-heavy uppercase text-xs tracking-widest mb-2 block">Experience Level</label>
                  <div className="flex gap-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <button type="button" key={level}
                        className={`cursor-pointer px-4 py-1.5 text-xs font-sans uppercase font-bold tracking-wider rounded-none border-2 border-[#2D241E] transition-all hover:-translate-y-0.5 ${experience === level ? 'bg-[#2D241E] text-[#F4F1EA] hard-shadow' : 'bg-[#F4F1EA] text-[#2D241E] hover:bg-[#D8D1C5]'}`}
                        onClick={() => setExperience(level)}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <label className="font-heavy uppercase text-lg tracking-widest">Skills</label>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Select your skills and rate your proficiency (0-10).
                </p>

                <div className="space-y-6 border-2 border-[#2D241E] rounded-none p-4 bg-[#F4F1EA]">
                  {(
                    Object.entries(SKILL_TAXONOMY) as [
                      SkillCategory,
                      readonly string[],
                    ][]
                  ).map(([category, skills]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="font-heavy uppercase text-sm text-[#D35400] tracking-widest">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <button type="button" key={skill}
                            className={`cursor-pointer px-3 py-1.5 text-xs font-sans uppercase font-bold tracking-wider rounded-none border-2 border-[#2D241E] transition-all hover:-translate-y-0.5 ${skill in selectedSkills ? 'bg-[#D35400] text-[#F4F1EA] border-[#D35400] hard-shadow' : 'bg-[#F4F1EA] text-[#2D241E] hover:bg-[#D8D1C5]'}`}
                            onClick={() => handleSkillToggle(skill)}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Custom Skill Input */}
                  <div className="pt-4 border-t-2 border-[#2D241E] mt-4">
                    <h4 className="font-heavy uppercase text-sm text-[#D35400] tracking-widest mb-3">Other Skills</h4>
                    <div className="flex gap-2">
                      <Input 
                        value={customSkill} 
                        onChange={e => setCustomSkill(e.target.value)} 
                        placeholder="e.g. Rust, Elixir, Figma" 
                        className="rounded-none border-2 border-[#2D241E] bg-[#F4F1EA]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomSkill();
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddCustomSkill} 
                        className="rounded-none border-2 border-[#2D241E] bg-[#D35400] text-[#F4F1EA] font-heavy uppercase hover:bg-[#2D241E]"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Selected Skills Sliders */}
                {Object.keys(selectedSkills).length > 0 && (
                  <div className="space-y-4 mt-6 border-2 border-[#2D241E] rounded-none p-4">
                    <h4 className="font-heavy uppercase text-sm text-[#D35400] tracking-widest mb-4">
                      Set Proficiency Levels
                    </h4>
                    {Object.entries(selectedSkills).map(([skill, score]) => (
                      <div
                        key={skill}
                        className="grid grid-cols-[120px_1fr_40px] items-center gap-4"
                      >
                        <span className="text-xs font-bold uppercase tracking-widest truncate" title={skill}>{skill}</span>
                        <Slider
                          value={[score]}
                          max={10}
                          step={1}
                          onValueChange={(vals) =>
                            handleSkillScore(
                              skill,
                              Array.isArray(vals) ? vals[0] : vals,
                            )
                          }
                        />
                        <span className="text-xs font-heavy uppercase text-[#D35400] tracking-widest text-right">
                          {score}/10
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Preferences */}
              <div className="space-y-6">
                <div>
                  <label className="font-heavy uppercase text-xs tracking-widest mb-2 block">Role Preferences</label>
                  <div className="flex flex-wrap gap-2">
                    {ROLE_OPTIONS.map((role) => (
                      <button type="button" key={role}
                        className={`cursor-pointer px-3 py-1.5 text-xs font-sans uppercase font-bold tracking-wider rounded-none border-2 border-[#2D241E] transition-all hover:-translate-y-0.5 ${roles.includes(role) ? 'bg-[#2D241E] text-[#F4F1EA] hard-shadow' : 'bg-[#F4F1EA] text-[#2D241E] hover:bg-[#D8D1C5]'}`}
                        onClick={() => toggleArrayItem(setRoles, role)}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-heavy uppercase text-xs tracking-widest mb-2 block">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((interest) => (
                      <button type="button" key={interest}
                        className={`cursor-pointer px-3 py-1.5 text-xs font-sans uppercase font-bold tracking-wider rounded-none border-2 border-[#2D241E] transition-all hover:-translate-y-0.5 ${interests.includes(interest) ? 'bg-[#2D241E] text-[#F4F1EA] hard-shadow' : 'bg-[#F4F1EA] text-[#2D241E] hover:bg-[#D8D1C5]'}`}
                        onClick={() => toggleArrayItem(setInterests, interest)}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-heavy uppercase text-xs tracking-widest mb-2 block">Availability</label>
                  <div className="flex flex-wrap gap-2">
                    {AVAILABILITY_OPTIONS.map((avail) => (
                      <button type="button" key={avail}
                        className={`cursor-pointer px-3 py-1.5 text-xs font-sans uppercase font-bold tracking-wider rounded-none border-2 border-[#2D241E] transition-all hover:-translate-y-0.5 ${availability.includes(avail) ? 'bg-[#2D241E] text-[#F4F1EA] hard-shadow' : 'bg-[#F4F1EA] text-[#2D241E] hover:bg-[#D8D1C5]'}`}
                        onClick={() => toggleArrayItem(setAvailability, avail)}
                      >
                        {avail}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}

              <Button
                type="submit"
                className="switchboard-button w-full justify-center font-heavy uppercase rounded-none"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
