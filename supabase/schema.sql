-- Supabase Schema for TeamForge

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  skills JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of { name: string, score: number }
  role_preferences JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of strings
  interests JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of strings
  availability JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of strings
  team_size_preference INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_ids JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of UUID strings (profile ids)
  scores JSONB NOT NULL DEFAULT '{}'::jsonb, -- Object { coverage, complementarity, interestAlignment, availabilityOverlap }
  gaps JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of strings
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
