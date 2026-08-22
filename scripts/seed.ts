import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';
import { formTeams, explainTeam } from '../src/lib/matching/index';

// Load .env.local explicitly since we're running this in a script
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const mockProfiles = [
  {
    name: 'Alice Chen',
    skills: [{ name: 'React', score: 9 }, { name: 'UI/UX', score: 7 }, { name: 'Tailwind CSS', score: 8 }],
    role_preferences: ['Build', 'Design'],
    interests: ['Education', 'AI'],
    availability: ['weekend'],
    team_size_preference: 4,
  },
  {
    name: 'Bob Smith',
    skills: [{ name: 'Node.js', score: 8 }, { name: 'PostgreSQL', score: 7 }, { name: 'AWS', score: 6 }],
    role_preferences: ['Build'],
    interests: ['Fintech'],
    availability: ['weekday evenings'],
    team_size_preference: 4,
  },
  {
    name: 'Charlie Davis',
    skills: [{ name: 'Figma', score: 9 }, { name: 'UI/UX', score: 9 }, { name: 'Graphic Design', score: 8 }],
    role_preferences: ['Design', 'Research'],
    interests: ['Healthcare', 'Climate'],
    availability: ['flexible'],
    team_size_preference: 3,
  },
  {
    name: 'Diana Prince',
    skills: [{ name: 'Product Management', score: 10 }, { name: 'Public Speaking', score: 9 }, { name: 'Agile', score: 8 }],
    role_preferences: ['Lead', 'Present'],
    interests: ['Fintech', 'Education'],
    availability: ['weekend'],
    team_size_preference: 5,
  },
  {
    name: 'Ethan Hunt',
    skills: [{ name: 'PyTorch', score: 9 }, { name: 'Python', score: 9 }, { name: 'Pandas', score: 8 }],
    role_preferences: ['Build', 'Research'],
    interests: ['AI', 'Healthcare'],
    availability: ['flexible'],
    team_size_preference: 4,
  },
  {
    name: 'Fiona Gallagher',
    skills: [{ name: 'Go', score: 8 }, { name: 'Docker', score: 8 }, { name: 'Kubernetes', score: 7 }],
    role_preferences: ['Build'],
    interests: ['Climate'],
    availability: ['weekday evenings'],
    team_size_preference: 4,
  },
  {
    name: 'George Martin',
    skills: [{ name: 'Storytelling', score: 9 }, { name: 'Slide Design', score: 8 }, { name: 'Business Strategy', score: 7 }],
    role_preferences: ['Present', 'Lead'],
    interests: ['Education'],
    availability: ['weekend'],
    team_size_preference: 4,
  },
  {
    name: 'Hannah Abbott',
    skills: [{ name: 'Vue', score: 8 }, { name: 'UI/UX', score: 6 }, { name: 'Tailwind CSS', score: 7 }],
    role_preferences: ['Build', 'Flexible'],
    interests: ['Healthcare'],
    availability: ['flexible'],
    team_size_preference: 3,
  },
  {
    name: 'Ian Malcolm',
    skills: [{ name: 'Data Visualization', score: 9 }, { name: 'SQL', score: 9 }, { name: 'Python', score: 7 }],
    role_preferences: ['Research', 'Build'],
    interests: ['Climate', 'Fintech'],
    availability: ['weekend'],
    team_size_preference: 4,
  },
  {
    name: 'Julia Roberts',
    skills: [{ name: 'User Research', score: 9 }, { name: 'Roadmapping', score: 8 }, { name: 'Product Management', score: 7 }],
    role_preferences: ['Research', 'Lead'],
    interests: ['Education', 'AI'],
    availability: ['weekday evenings'],
    team_size_preference: 4,
  },
  {
    name: 'Kevin Hart',
    skills: [{ name: 'React', score: 6 }, { name: 'Node.js', score: 6 }, { name: 'PostgreSQL', score: 6 }],
    role_preferences: ['Flexible'],
    interests: ['AI', 'Fintech'],
    availability: ['flexible'],
    team_size_preference: 4,
  },
  {
    name: 'Luna Lovegood',
    skills: [{ name: 'Prototyping', score: 9 }, { name: 'Figma', score: 8 }, { name: 'Graphic Design', score: 7 }],
    role_preferences: ['Design'],
    interests: ['Climate', 'Healthcare'],
    availability: ['weekend'],
    team_size_preference: 3,
  },
  {
    name: 'Mike Ross',
    skills: [{ name: 'Business Strategy', score: 9 }, { name: 'Public Speaking', score: 8 }, { name: 'Agile', score: 7 }],
    role_preferences: ['Lead', 'Present'],
    interests: ['Fintech'],
    availability: ['weekday evenings'],
    team_size_preference: 4,
  },
  {
    name: 'Nina Dobrev',
    skills: [{ name: 'TensorFlow', score: 8 }, { name: 'Python', score: 9 }, { name: 'Data Engineering', score: 7 }],
    role_preferences: ['Build', 'Research'],
    interests: ['AI', 'Climate'],
    availability: ['flexible'],
    team_size_preference: 4,
  },
  {
    name: 'Oscar Isaac',
    skills: [{ name: 'Next.js', score: 9 }, { name: 'Tailwind CSS', score: 9 }, { name: 'React', score: 8 }],
    role_preferences: ['Build'],
    interests: ['Education'],
    availability: ['weekend'],
    team_size_preference: 4,
  },
  {
    name: 'Pam Beesly',
    skills: [{ name: 'Graphic Design', score: 9 }, { name: 'UI/UX', score: 7 }, { name: 'Prototyping', score: 6 }],
    role_preferences: ['Design', 'Flexible'],
    interests: ['Healthcare'],
    availability: ['weekday evenings'],
    team_size_preference: 4,
  },
  {
    name: 'Quentin Tarantino',
    skills: [{ name: 'Storytelling', score: 10 }, { name: 'Slide Design', score: 7 }, { name: 'Public Speaking', score: 8 }],
    role_preferences: ['Present'],
    interests: ['Education', 'AI'],
    availability: ['flexible'],
    team_size_preference: 5,
  },
  {
    name: 'Rachel Green',
    skills: [{ name: 'Product Management', score: 8 }, { name: 'User Research', score: 7 }, { name: 'Roadmapping', score: 7 }],
    role_preferences: ['Lead', 'Research'],
    interests: ['Fintech', 'Healthcare'],
    availability: ['weekend'],
    team_size_preference: 4,
  },
  {
    name: 'Steve Rogers',
    skills: [{ name: 'Java', score: 9 }, { name: 'Spring Boot', score: 8 }, { name: 'SQL', score: 8 }],
    role_preferences: ['Build'],
    interests: ['Education'],
    availability: ['weekday evenings'],
    team_size_preference: 4,
  },
  {
    name: 'Tony Stark',
    skills: [{ name: 'OpenAI API', score: 10 }, { name: 'Python', score: 9 }, { name: 'React', score: 7 }],
    role_preferences: ['Build', 'Lead'],
    interests: ['AI', 'Fintech'],
    availability: ['flexible'],
    team_size_preference: 4,
  },
  {
    name: 'Uma Thurman',
    skills: [{ name: 'CI/CD', score: 9 }, { name: 'AWS', score: 8 }, { name: 'Terraform', score: 8 }],
    role_preferences: ['Build', 'Flexible'],
    interests: ['Climate'],
    availability: ['weekend'],
    team_size_preference: 3,
  },
  {
    name: 'Victor Stone',
    skills: [{ name: 'Data Engineering', score: 9 }, { name: 'Pandas', score: 8 }, { name: 'SQL', score: 9 }],
    role_preferences: ['Build', 'Research'],
    interests: ['AI', 'Healthcare'],
    availability: ['weekday evenings'],
    team_size_preference: 4,
  },
  {
    name: 'Wanda Maximoff',
    skills: [{ name: 'Svelte', score: 8 }, { name: 'Tailwind CSS', score: 8 }, { name: 'Figma', score: 7 }],
    role_preferences: ['Build', 'Design'],
    interests: ['Education', 'Climate'],
    availability: ['flexible'],
    team_size_preference: 4,
  },
  {
    name: 'Xavier Woods',
    skills: [{ name: 'Public Speaking', score: 9 }, { name: 'Agile', score: 8 }, { name: 'Product Management', score: 7 }],
    role_preferences: ['Lead', 'Present'],
    interests: ['Fintech'],
    availability: ['weekend'],
    team_size_preference: 5,
  },
  {
    name: 'Yara Shahidi',
    skills: [{ name: 'Hugging Face', score: 8 }, { name: 'PyTorch', score: 8 }, { name: 'Python', score: 8 }],
    role_preferences: ['Build', 'Research'],
    interests: ['AI', 'Education'],
    availability: ['flexible'],
    team_size_preference: 4,
  }
];

async function seed() {
  console.log('Seeding profiles...');
  await supabase.from('teams').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // delete all
  await supabase.from('profiles').delete().is('user_id', null); // delete all mock profiles

  // Randomize team size between 2 and 3 for the seed to leave 1-2 open slots
  const profilesToInsert = mockProfiles.map(p => ({
    ...p,
    team_size_preference: Math.random() > 0.5 ? 3 : 2
  }));

  const { data: insertedProfiles, error } = await supabase.from('profiles').insert(profilesToInsert).select('*');
  
  if (error || !insertedProfiles) {
    console.error('Error seeding profiles:', error);
    return;
  }
  
  console.log('Successfully seeded 25 profiles!');

  console.log('Generating Leader-centric teams...');
  // Form teams of 3 to leave room for users to join
  const matches = formTeams(insertedProfiles, 3);
  
  // Filter only teams that have a "Lead"
  const leaderTeams = matches.filter(team => {
    const members = team._profiles || [];
    return members.some(m => m.role_preferences.includes('Lead'));
  });

  const dbTeams = leaderTeams.map(team => {
    const members = team._profiles || [];
    const explanation = explainTeam(members);
    return {
      member_ids: team.memberIds,
      scores: team.scores,
      gaps: explanation.gaps
    };
  });

  const { error: teamsError } = await supabase.from('teams').insert(dbTeams);
  
  if (teamsError) {
    console.error('Error saving teams:', teamsError);
  } else {
    console.log(`Successfully seeded ${dbTeams.length} Leader teams!`);
  }
}

seed();
