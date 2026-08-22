import { X } from "lucide-react";
import { Profile } from "@/lib/types";
import { GitHubBadge } from "./GitHubBadge";

export function ProfileModal({ profile, onClose }: { profile: Profile; onClose: () => void }) {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="switchboard-panel w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#D8D1C5] border-b-4 border-[#2D241E] p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <h2 className="font-heavy text-2xl uppercase text-[#2D241E]">
              {profile.name}
            </h2>
            {profile.github_username && (
              <GitHubBadge username={profile.github_username} />
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-[#2D241E] hover:text-[#F4F1EA] transition-colors border-2 border-transparent hover:border-[#2D241E]"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Roles & Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D35400] mb-2">Roles</h3>
              <div className="flex flex-wrap gap-2">
                {profile.role_preferences.map(r => (
                  <span key={r} className="text-xs font-bold bg-[#FAF9F6] border-2 border-[#2D241E] px-2 py-1">{r}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#D35400] mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map(i => (
                  <span key={i} className="text-xs font-bold bg-[#FAF9F6] border-2 border-[#2D241E] px-2 py-1">{i}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#2E7D32] mb-3">Skills Map</h3>
            <div className="space-y-3">
              {profile.skills.sort((a,b) => b.score - a.score).map(skill => (
                <div key={skill.name}>
                  <div className="mb-1 flex justify-between text-xs font-bold uppercase">
                    <span>{skill.name}</span>
                    <span className="text-[#2E7D32]">{skill.score}/10</span>
                  </div>
                  <div className="h-2 border-2 border-[#2D241E] bg-[#F4F1EA]">
                    <div
                      className="h-full bg-[#2E7D32]"
                      style={{ width: `${(skill.score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
