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
    <header className="w-full border-b-4 border-[#2D241E] pb-6 flex flex-col xl:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3 shrink-0 mr-auto">
        <div className="switchboard-icon switchboard-icon--orange w-10 h-10 hard-shadow shrink-0">
          <Radio className="w-5 h-5 text-[#F4F1EA]" />
        </div>
        <div>
          <h1 className="font-heavy text-3xl font-extrabold uppercase tracking-tight text-[#2D241E] leading-none">
            Hackers Assemble!!
          </h1>
          <p className="text-[10px] font-bold text-[#D35400] uppercase tracking-widest mt-1">
            Find the one to build with
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 ml-auto text-xs font-bold uppercase tracking-wider text-[#2D241E]">
        <Link href="/" className="border-2 border-[#2D241E] bg-[#FAF9F6] px-3 py-2 hover:bg-[#2D241E] hover:text-[#F4F1EA] transition-colors whitespace-nowrap">Home</Link>
        {!user && <Link href="/signup" className="border-2 border-[#2D241E] bg-[#D35400] text-[#F4F1EA] px-3 py-2 hover:bg-[#2D241E] transition-colors whitespace-nowrap">Join</Link>}
        <Link href="/participants" className="border-2 border-[#2D241E] bg-[#FAF9F6] px-3 py-2 hover:bg-[#2D241E] hover:text-[#F4F1EA] transition-colors whitespace-nowrap">Directory</Link>
        <Link href="/teams" className="border-2 border-[#2D241E] bg-[#FAF9F6] px-3 py-2 hover:bg-[#2D241E] hover:text-[#F4F1EA] transition-colors whitespace-nowrap">Find Teams</Link>
        
        {user ? (
          <>
            <Link href="/edit-profile" className="border-2 border-[#2D241E] bg-[#FAF9F6] px-3 py-2 hover:bg-[#2D241E] hover:text-[#F4F1EA] transition-colors whitespace-nowrap">
              Edit Profile
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 border-2 border-[#2D241E] bg-[#FAF9F6] px-3 py-2 hover:text-[#D35400] transition-colors whitespace-nowrap">
              <LogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="border-2 border-[#2D241E] bg-[#FAF9F6] px-3 py-2 hover:text-[#D35400] transition-colors whitespace-nowrap">Login</Link>
        )}
        <div className="switchboard-panel px-3 py-2 flex items-center gap-2 hidden lg:flex whitespace-nowrap">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse" />
          <span className="text-[10px] font-bold uppercase">System Online</span>
        </div>
      </div>
    </header>
  );
}
