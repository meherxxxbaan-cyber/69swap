import { Navbar } from "@/components/navbar";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListingLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        <Skeleton className="h-5 w-64 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <Skeleton className="h-[200px] rounded-xl" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-6 w-24 rounded-full" />)}
            </div>
            <Skeleton className="h-[120px] rounded-xl" />
            <Skeleton className="h-[100px] rounded-xl" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-[280px] rounded-xl" />
            <Skeleton className="h-[180px] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
