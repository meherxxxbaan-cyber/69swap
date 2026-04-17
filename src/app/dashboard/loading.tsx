import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/navbar";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Skeleton className="h-9 w-40 mb-2" />
        <Skeleton className="h-5 w-56 mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
        </div>
        <Skeleton className="h-12 w-96 rounded-xl mb-6" />
        <Skeleton className="h-[400px] rounded-xl" />
      </div>
    </div>
  );
}
