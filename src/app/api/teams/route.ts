import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Profile, TeamMatch } from "@/lib/types";
import { explainTeam } from "@/lib/matching";

export async function GET() {
  const { data: teamsData, error: teamsError } = await supabase
    .from("teams")
    .select("*")
    .order("created_at", { ascending: false });

  if (teamsError) {
    return NextResponse.json({ error: teamsError.message }, { status: 500 });
  }

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*");

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 });
  }

  const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

  const teams = teamsData.map((team) => {
    const members = (team.member_ids || []).map((id: string) => profileMap.get(id)).filter(Boolean);
    const scores = team.scores || { coverage: 0, complementarity: 0, interestAlignment: 0, availabilityOverlap: 0 };
    const { coverage, complementarity, interestAlignment, availabilityOverlap } = scores;
    
    const overallMatch = Math.round(
      (coverage || 0) * 0.4 +
      (complementarity || 0) * 0.3 +
      (interestAlignment || 0) * 0.2 +
      (availabilityOverlap || 0) * 0.1
    );

    const explanation = explainTeam(members as Profile[]);

    return {
      id: team.id,
      memberIds: team.member_ids || [],
      scores,
      gaps: explanation.gaps,
      members: members as Profile[],
      strengths: explanation.strengths,
      overallMatch,
    } satisfies TeamMatch;
  });

  return NextResponse.json({ teams });
}
