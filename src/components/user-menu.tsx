"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { LayoutDashboard, LogOut, Settings, Tag, ChevronDown } from "lucide-react";

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <Link href="/login" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
          Log In
        </Link>
        <Link href="/register" className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
          Get Started
        </Link>
      </div>
    );
  }

  const initials = (user.user_metadata?.display_name || user.email || "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="hidden md:flex items-center gap-2 relative">
      <Link href="/sell">
        <button className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition-colors">
          <Tag className="h-4 w-4" /> List Account
        </button>
      </Link>

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
          {initials}
        </div>
        <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
          {user.user_metadata?.display_name || user.email?.split("@")[0]}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-slate-200 shadow-lg z-50 py-1 overflow-hidden">
            <div className="px-3 py-2.5 border-b border-slate-100">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {user.user_metadata?.display_name || "User"}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>

            {[
              { href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
              { href: "/sell",      icon: <Tag className="h-4 w-4" />,             label: "List an Account" },
              { href: "/settings",  icon: <Settings className="h-4 w-4" />,         label: "Settings" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span className="text-slate-400">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            <div className="border-t border-slate-100 mt-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
