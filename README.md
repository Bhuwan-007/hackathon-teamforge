# Hackers Assemble!! 🛠️

Hackers Assemble!! is a dynamic, retro-industrial switchboard-themed web application designed to help hackathon participants and project builders find their perfect teams. By analyzing skills, roles, and interests, Hackers Assemble!! automatically identifies team strengths, highlights missing gaps, and creates the optimal matching experience.

## ✨ Features

- **Retro-Industrial Aesthetic**: Built with a bold, tactical switchboard design system featuring sharp typography, dynamic hover states, and immersive UI elements.
- **Skill Taxonomy & Profiling**: Users define their expertise across domains (Frontend, Backend, AI/ML, Design, etc.) with a 1-10 proficiency scale.
- **Intelligent Team Matching**: The `explainTeam` matching engine dynamically calculates a user's compatibility with an existing team, identifying exact missing roles and complementary skills.
- **Team Board**: A real-time dashboard displaying active teams, current members (with direct GitHub links), and immediate one-click join/leave functionality.

## 🏗️ Architecture & Tech Stack

- **Frontend**: [Next.js (App Router)](https://nextjs.org/) & React
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom design system bypassing standard UI component conflicts.
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Deployment**: Optimized for Vercel

### Core Flow

1. **Authentication**: Users sign up or log in via Supabase authentication.
2. **Profile Onboarding**: New users are routed to the `signup` (onboarding) flow where they select their experience level, technical skills, role preferences, and availability.
3. **The Team Board (`/teams`)**: Users browse available teams. Each team card displays:
   - Current members and their profiles.
   - The team's collective strengths (e.g., strong backend architecture).
   - The team's gaps (e.g., missing a UI/UX designer).
   - A personalized fit score for the viewing user.
4. **Interaction**: Users can join a team (if space permits) or leave their current team via dynamic, animated modals communicating directly with the Supabase backend.
5. **Profile Editing**: Users can update their skills and preferences at any time via the `/edit-profile` route.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- A Supabase Project (with the corresponding schema)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hackathon-teamforge.git
   cd hackathon-teamforge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add your Supabase keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Database Setup:
   Ensure your Supabase instance has the `profiles` and `teams` tables set up according to the schema provided in `/supabase/schema.sql`.
   You can also run the seed script to generate mock teams:
   ```bash
   npx ts-node scripts/seed.ts
   ```

5. Run the Development Server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design System

Hackers Assemble!! avoids standard generic UI libraries in favor of a bespoke **Patchbay / Switchboard** aesthetic. 
- **Typography**: Heavily utilizes `Bricolage Grotesque` and `Space Mono` for a mechanical, precise feel.
- **Components**: UI elements are built with native HTML tags (`<button>`, `<label>`) rather than complex wrapper components to ensure Tailwind classes (like sharp borders and drop shadows) are perfectly preserved.
- **Animations**: Features micro-interactions like tactile button depressions (`hover:-translate-y-0.5`, `hard-shadow`) and smooth modal overlays.
