import { supabase } from '@/lib/supabase';
import { Profile } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function ParticipantsPage() {
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div>Error loading profiles: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Participants</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {profiles?.map((profile: Profile) => {
          // Sort skills by score and take top 3
          const topSkills = [...profile.skills]
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);

          return (
            <Card key={profile.id}>
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Roles</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.role_preferences.map((role) => (
                      <Badge key={role} variant="secondary">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">Top Skills</h3>
                  <div className="flex flex-col gap-2">
                    {topSkills.map((skill) => (
                      <div key={skill.name} className="flex justify-between text-sm">
                        <span>{skill.name}</span>
                        <span className="font-mono text-gray-500">{skill.score}/10</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {(!profiles || profiles.length === 0) && (
          <p className="text-gray-500 col-span-full">No participants found. Did you run the seed script?</p>
        )}
      </div>
    </div>
  );
}
