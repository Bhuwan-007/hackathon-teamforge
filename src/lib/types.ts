export type SkillProficiency = {
  name: string;
  score: number; // 0-10
};

export type Profile = {
  id: string;
  name: string;
  skills: SkillProficiency[];
  role_preferences: string[];
  interests: string[];
  availability: string[];
  team_size_preference?: number;
};

export type TeamScores = {
  coverage: number;
  complementarity: number;
  interestAlignment: number;
  availabilityOverlap: number;
};

export type Team = {
  id: string;
  memberIds: string[];
  scores: TeamScores;
  gaps: string[];
};

export type TeamMatch = Team & {
  members: Profile[];
  strengths: string[];
  overallMatch: number;
};

export const SKILL_TAXONOMY = {
  Frontend: ["React", "Next.js", "Vue", "Svelte", "Tailwind CSS"],
  Backend: ["Node.js", "Python", "Go", "Java", "PostgreSQL"],
  "AI/ML": ["PyTorch", "TensorFlow", "LangChain", "OpenAI API", "Hugging Face"],
  Design: ["Figma", "UI/UX", "Graphic Design", "Prototyping"],
  Product: ["Product Management", "Agile", "User Research", "Roadmapping"],
  DevOps: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
  Data: ["SQL", "Pandas", "Data Visualization", "Data Engineering"],
  Pitch: [
    "Public Speaking",
    "Slide Design",
    "Storytelling",
    "Business Strategy",
  ],
} as const;

export type SkillCategory = keyof typeof SKILL_TAXONOMY;
