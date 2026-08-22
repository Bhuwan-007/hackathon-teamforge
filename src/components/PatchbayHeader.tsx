"use client";

import { Radio, LogOut } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { supabase } from "@/lib/supabase";

export function PatchbayHeader() {
  const { user } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="w-full border-b-4 border-[#2D241E] pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="switchboard-icon switchboard-icon--orange w-10 h-10 hard-shadow">
          <Radio className="w-5 h-5 text-[#F4F1EA]" />
        </div>
        <div>
          <h1 className="font-heavy text-3xl font-extrabold uppercase tracking-tight text-[#2D241E] leading-none">
            TeamForge
          </h1>
          <p className="text-xs font-bold text-[#D35400] uppercase tracking-widest mt-1">
            Find the one to build with
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-4 text-sm font-bold uppercase tracking-wider text-[#2D241E]">
        <Link href="/" className="hover:text-[#D35400]">Home</Link>
        <Link href="/teams" className="hover:text-[#D35400]">Teams</Link>
        <Link href="/participants" className="hover:text-[#D35400]">Directory</Link>
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <button onClick={handleLogout} className="flex items-center gap-2 hover:text-[#D35400] font-bold text-sm uppercase tracking-wider transition-colors">
            <LogOut size={16} /> Logout
          </button>
        ) : (
          <div className="flex gap-4 font-bold text-sm uppercase tracking-wider text-[#D35400]">
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Sign up</Link>
          </div>
        )}
        <div className="switchboard-panel px-4 py-2 flex items-center gap-3 hidden sm:flex">
          <span className="w-3 h-3 rounded-full bg-[#2E7D32] animate-pulse" />
          <span className="text-xs font-bold uppercase">System Online</span>
        </div>
      </div>
    </header>
  );
}
