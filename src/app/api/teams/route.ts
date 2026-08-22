import { NextResponse } from "next/server";
import { formTeams, explainTeam } from "@/lib/matching";
import { supabase } from "@/lib/supabase";
import { Profile, TeamMatch } from "@/lib/types";

export async function POST() {
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const matches = formTeams((profiles ?? []) as Profile[], 4).map((team) => {
    const members = team._profiles ?? [];
    const explanation = explainTeam(members);
    const {
      coverage,
      complementarity,
      interestAlignment,
      availabilityOverlap,
    } = team.scores;
    const overallMatch = Math.round(
      coverage * 0.4 +
        complementarity * 0.3 +
        interestAlignment * 0.2 +
        availabilityOverlap * 0.1,
    );

    return {
      id: team.id,
      memberIds: team.memberIds,
      scores: team.scores,
      gaps: explanation.gaps,
      members,
      strengths: explanation.strengths,
      overallMatch,
    } satisfies TeamMatch;
  });

  const topTeams = matches
    .sort((a, b) => b.overallMatch - a.overallMatch)
    .slice(0, 5);

  return NextResponse.json({ teams: topTeams });
}
