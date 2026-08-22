"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { SKILL_TAXONOMY, SkillCategory } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

const ROLE_OPTIONS = ["Lead", "Build", "Design", "Research", "Present", "Flexible"];
const INTEREST_OPTIONS = ["AI", "Climate", "Healthcare", "Education", "Fintech", "Gaming", "Social Impact"];
const AVAILABILITY_OPTIONS = ["weekday evenings", "weekend", "flexible"];
const EXPERIENCE_LEVELS = ["Junior", "Mid", "Senior"];

export default function JoinPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<Record<string, number>>({});
  const [roles, setRoles] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => {
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
    setSelectedSkills(prev => ({ ...prev, [skill]: score }));
  };

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const skillsArray = Object.entries(selectedSkills).map(([name, score]) => ({ name, score }));

    if (!name || !experience || roles.length === 0 || availability.length === 0) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase.from('profiles').insert([{
      name: `${name} (${experience})`,
      skills: skillsArray,
      role_preferences: roles,
      interests,
      availability,
      team_size_preference: 4 // Defaulting for now
    }]);

    setLoading(false);
    if (dbError) {
      setError(dbError.message);
    } else {
      router.push("/participants");
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Join the Hackathon</CardTitle>
          <CardDescription>Tell us about your skills so we can find you the perfect team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  placeholder="Jane Doe" 
                  required 
                />
              </div>

              <div>
                <Label className="mb-2 block">Experience Level</Label>
                <div className="flex gap-2">
                  {EXPERIENCE_LEVELS.map(level => (
                    <Badge 
                      key={level}
                      variant={experience === level ? "default" : "outline"}
                      className="cursor-pointer px-4 py-1"
                      onClick={() => setExperience(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <Label className="text-lg">Skills</Label>
              <p className="text-sm text-gray-500">Select your skills and rate your proficiency (0-10).</p>
              
              <div className="space-y-6 border rounded-lg p-4 bg-gray-50/50">
                {(Object.entries(SKILL_TAXONOMY) as [SkillCategory, readonly string[]][]).map(([category, skills]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-semibold text-sm">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <Badge 
                          key={skill}
                          variant={skill in selectedSkills ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Skills Sliders */}
              {Object.keys(selectedSkills).length > 0 && (
                <div className="space-y-4 mt-6 border rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-4">Set Proficiency Levels</h4>
                  {Object.entries(selectedSkills).map(([skill, score]) => (
                    <div key={skill} className="grid grid-cols-[120px_1fr_40px] items-center gap-4">
                      <span className="text-sm font-medium">{skill}</span>
                      <Slider
                        value={[score]}
                        max={10}
                        step={1}
                        onValueChange={(vals) => handleSkillScore(skill, Array.isArray(vals) ? vals[0] : vals)}
                      />
                      <span className="text-sm font-mono text-right">{score}/10</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Preferences */}
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block">Role Preferences</Label>
                <div className="flex flex-wrap gap-2">
                  {ROLE_OPTIONS.map(role => (
                    <Badge 
                      key={role}
                      variant={roles.includes(role) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayItem(setRoles, role)}
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map(interest => (
                    <Badge 
                      key={interest}
                      variant={interests.includes(interest) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayItem(setInterests, interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="mb-2 block">Availability</Label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABILITY_OPTIONS.map(avail => (
                    <Badge 
                      key={avail}
                      variant={availability.includes(avail) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleArrayItem(setAvailability, avail)}
                    >
                      {avail}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Join Hackathon"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
