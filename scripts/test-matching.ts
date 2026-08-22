import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function runTest() {
  const { supabase } = await import('../src/lib/supabase');
  const { formTeams, explainTeam } = await import('../src/lib/matching/index');

  console.log("Fetching profiles from Supabase...");
  const { data: profiles, error } = await supabase.from('profiles').select('*');
  
  if (error || !profiles) {
    console.error("Error fetching profiles:", error);
    return;
  }
  
  if (profiles.length === 0) {
    console.log("No profiles found. Did you run the seed script?");
    return;
  }
  
  console.log(`Found ${profiles.length} profiles. Running matching engine...`);
  console.log("-----------------------------------------------------");

  const teams = formTeams(profiles, 4);

  teams.forEach((team: any, i: number) => {
    console.log(`\n=== TEAM ${i + 1} (Size: ${team._profiles?.length}) ===`);
    console.log("Members:");
    team._profiles?.forEach((p: any) => {
      console.log(`  - ${p.name} (Roles: ${p.role_preferences.join(', ')})`);
    });
    
    console.log("\nScores:");
    console.log(`  Coverage:       ${team.scores.coverage}%`);
    console.log(`  Complementarity:${team.scores.complementarity}%`);
    console.log(`  Interests:      ${team.scores.interestAlignment}%`);
    console.log(`  Availability:   ${team.scores.availabilityOverlap}%`);
    
    const explanation = explainTeam(team._profiles || []);
    console.log("\nWhy this team?");
    console.log(`  Strengths:      ${explanation.strengths.join(', ') || 'None'}`);
    console.log(`  Gaps:           ${explanation.gaps.join(', ') || 'None'}`);
    console.log("-----------------------------------------------------");
  });
}

runTest();
