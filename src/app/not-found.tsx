import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8 select-none">
            <div className="text-[120px] font-extrabold text-slate-100 leading-none tracking-tighter">404</div>
            <div className="absolute inset-0 flex items-center justify-center text-6xl">🔍</div>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-3">This page doesn&apos;t exist</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">The listing may have sold, been removed, or you followed a broken link.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild><Link href="/marketplace" className="gap-2"><Search className="h-4 w-4" /> Browse Listings</Link></Button>
            <Button variant="secondary" asChild><Link href="/" className="gap-2"><Home className="h-4 w-4" /> Go Home</Link></Button>
          </div>
        </div>
      </main>
    </div>
  );
}
