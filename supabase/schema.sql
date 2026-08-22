-- Supabase Schema for TeamForge

DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  github_username TEXT,
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

-- Permissive policies: anon key can do everything (fine for a hackathon demo)
CREATE POLICY "Allow all access to profiles" ON profiles
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to teams" ON teams
  FOR ALL USING (true) WITH CHECK (true);
