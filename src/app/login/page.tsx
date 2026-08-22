"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PatchbayHeader } from "@/components/PatchbayHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      router.push("/teams");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2D241E] p-6 relative overflow-hidden" style={{ fontFamily: "'Space Mono', monospace" }}>
      <div className="absolute inset-0 pegboard-bg opacity-70 pointer-events-none" />
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-10">
        <PatchbayHeader />

        <Card className="switchboard-panel w-full max-w-md mt-10 rounded-none border-4 border-[#2D241E]">
          <CardHeader className="bg-[#2D241E] text-[#F4F1EA] border-b-4 border-[#2D241E] rounded-none px-6 py-6">
            <CardTitle className="font-heavy text-2xl font-extrabold uppercase tracking-tight leading-none">
               Login
            </CardTitle>
            <CardDescription className="font-bold text-xs uppercase tracking-widest mt-2">
              Log in to the Hackers Assemble!! network.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none border-2 border-[#2D241E] bg-[#F4F1EA]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-none border-2 border-[#2D241E] bg-[#F4F1EA]"
                  required
                />
              </div>

              {error && <div className="text-[#D35400] text-sm font-bold">{error}</div>}

              <Button
                type="submit"
                className="switchboard-button w-full justify-center font-heavy uppercase rounded-none mt-4"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Login"}
              </Button>

              <div className="text-center mt-6 text-sm">
                New operator? <Link href="/signup" className="text-[#D35400] font-bold hover:underline">Sign up</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
