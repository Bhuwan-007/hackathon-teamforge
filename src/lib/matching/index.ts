import { Profile, Team, SKILL_TAXONOMY, SkillCategory } from '../types';

export const ROLE_REQUIREMENTS: Record<string, Record<SkillCategory, number>> = {
  "Lead": { Product: 8, Pitch: 8, Design: 4, Frontend: 0, Backend: 0, "AI/ML": 0, DevOps: 0, Data: 0 },
  "Build": { Frontend: 6, Backend: 6, DevOps: 4, "AI/ML": 0, Design: 0, Product: 0, Pitch: 0, Data: 4 },
  "Design": { Design: 8, Frontend: 4, Product: 4, Backend: 0, "AI/ML": 0, DevOps: 0, Pitch: 0, Data: 0 },
  "Research": { Data: 8, "AI/ML": 8, Product: 4, Frontend: 0, Backend: 0, Design: 0, DevOps: 0, Pitch: 0 },
  "Present": { Pitch: 8, Product: 6, Design: 4, Frontend: 0, Backend: 0, "AI/ML": 0, DevOps: 0, Data: 0 },
  "Flexible": { Frontend: 4, Backend: 4, Design: 4, Product: 4, Pitch: 4, "AI/ML": 4, DevOps: 4, Data: 4 },
};

// 1. roleAffinity
export function roleAffinity(profile: Profile, role: string): number {
  const reqs = ROLE_REQUIREMENTS[role];
  if (!reqs) return 0;

  let totalScore = 0;
  let maxScore = 0;

  for (const [category, weight] of Object.entries(reqs)) {
    if (weight > 0) {
      maxScore += weight * 10;
      
      const categorySkills = SKILL_TAXONOMY[category as SkillCategory] as readonly string[];
      let maxProfileScore = 0;
      for (const pSkill of profile.skills) {
        if (categorySkills.includes(pSkill.name)) {
          if (pSkill.score > maxProfileScore) maxProfileScore = pSkill.score;
        }
      }
      totalScore += maxProfileScore * weight;
    }
  }

  return maxScore > 0 ? totalScore / maxScore : 0;
}

// 2. complementarity
export function complementarity(profileA: Profile, profileB: Profile): number {
  let diffSum = 0;
  const categories = Object.keys(SKILL_TAXONOMY) as SkillCategory[];

  for (const cat of categories) {
    const skills = SKILL_TAXONOMY[cat] as readonly string[];
    const getCatScore = (p: Profile) => {
      let m = 0;
      for (const s of p.skills) {
        if (skills.includes(s.name) && s.score > m) m = s.score;
      }
      return m;
    };
    const scoreA = getCatScore(profileA);
    const scoreB = getCatScore(profileB);
    diffSum += Math.abs(scoreA - scoreB);
  }

  return diffSum / (categories.length * 10);
}

// 3. teamCoverage
export function teamCoverage(team: Profile[]): number {
  const categories = Object.keys(SKILL_TAXONOMY) as SkillCategory[];
  let totalMax = 0;

  for (const cat of categories) {
    const skills = SKILL_TAXONOMY[cat] as readonly string[];
    let catMax = 0;
    for (const p of team) {
      for (const s of p.skills) {
        if (skills.includes(s.name) && s.score > catMax) {
          catMax = s.score;
        }
      }
    }
    totalMax += catMax;
  }

  return (totalMax / (categories.length * 10)) * 100;
}

function interestAlignment(team: Profile[]): number {
  if (team.length <= 1) return 100;
  const interestCounts: Record<string, number> = {};
  for (const p of team) {
    for (const i of p.interests) {
      interestCounts[i] = (interestCounts[i] || 0) + 1;
    }
  }
  const maxOverlap = Math.max(0, ...Object.values(interestCounts));
  return (maxOverlap / team.length) * 100;
}

function availabilityOverlap(team: Profile[]): number {
  if (team.length <= 1) return 100;
  const availCounts: Record<string, number> = {};
  for (const p of team) {
    for (const a of p.availability) {
      availCounts[a] = (availCounts[a] || 0) + 1;
    }
  }
  const maxOverlap = Math.max(0, ...Object.values(availCounts));
  return (maxOverlap / team.length) * 100;
}

// 4. formTeams
export function formTeams(pool: Profile[], defaultTeamSize: number): (Team & { _profiles?: Profile[] })[] {
  const remaining = [...pool];
  const teams: (Team & { _profiles?: Profile[] })[] = [];

  while (remaining.length > 0) {
    const seed = remaining.shift()!;
    const teamSize = seed.team_size_preference || defaultTeamSize;
    const currentTeam: Profile[] = [seed];

    while (currentTeam.length < teamSize && remaining.length > 0) {
      let bestScore = -1;
      let bestIdx = -1;

      for (let i = 0; i < remaining.length; i++) {
        const candidate = remaining[i];
        const prospectiveTeam = [...currentTeam, candidate];
        
        const coverage = teamCoverage(prospectiveTeam) / 100;
        let compScore = 0;
        for (const existing of currentTeam) {
          compScore += complementarity(existing, candidate);
        }
        compScore = compScore / currentTeam.length;
        
        const interestScore = interestAlignment(prospectiveTeam) / 100;
        const availScore = availabilityOverlap(prospectiveTeam) / 100;

        const score = (0.4 * coverage) + (0.3 * compScore) + (0.2 * interestScore) + (0.1 * availScore);

        if (score > bestScore) {
          bestScore = score;
          bestIdx = i;
        }
      }

      currentTeam.push(remaining[bestIdx]);
      remaining.splice(bestIdx, 1);
    }

    teams.push({
      id: crypto.randomUUID(),
      memberIds: currentTeam.map(p => p.id),
      scores: {
        coverage: Math.round(teamCoverage(currentTeam)),
        complementarity: Math.round(
           currentTeam.length > 1 
            ? currentTeam.reduce((acc, p1, i) => acc + currentTeam.slice(i+1).reduce((acc2, p2) => acc2 + complementarity(p1, p2), 0), 0) / (currentTeam.length * (currentTeam.length - 1) / 2) * 100
            : 100
        ),
        interestAlignment: Math.round(interestAlignment(currentTeam)),
        availabilityOverlap: Math.round(availabilityOverlap(currentTeam))
      },
      gaps: explainTeam(currentTeam).gaps,
      _profiles: currentTeam
    });
  }

  return teams;
}

// 5. explainTeam
export function explainTeam(team: Profile[]): { strengths: string[], gaps: string[] } {
  const categories = Object.keys(SKILL_TAXONOMY) as SkillCategory[];
  const strengths: string[] = [];
  const gaps: string[] = [];

  for (const cat of categories) {
    const skills = SKILL_TAXONOMY[cat] as readonly string[];
    let catMax = 0;
    for (const p of team) {
      for (const s of p.skills) {
        if (skills.includes(s.name) && s.score > catMax) {
          catMax = s.score;
        }
      }
    }
    
    if (catMax >= 6) {
      strengths.push(cat);
    } else {
      gaps.push(cat);
    }
  }

  return { strengths, gaps };
}
