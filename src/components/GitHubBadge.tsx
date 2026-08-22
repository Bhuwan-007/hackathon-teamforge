"use client";

import { useEffect, useState } from "react";
import { GitBranch } from "lucide-react";

type GitHubData = {
  avatar_url: string;
  public_repos: number;
};

export function GitHubBadge({ username }: { username?: string | null }) {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    if (!username) return;
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => setData(null));
  }, [username]);

  if (!data) return null;

  return (
    <div className="flex items-center gap-2 border-2 border-[#2D241E] bg-[#F4F1EA] px-2 py-0.5 text-[10px] text-[#2D241E] shrink-0">
      <img src={data.avatar_url} alt={username!} className="w-4 h-4 rounded-full border border-[#2D241E]" />
      <span className="font-bold flex items-center gap-1 uppercase"><GitBranch className="w-3 h-3"/> {data.public_repos}</span>
    </div>
  );
}
