import { Navbar } from "@/components/navbar";
import { ListingCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function MarketplaceLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="mb-6">
          <Skeleton className="h-9 w-40 mb-2" />
          <Skeleton className="h-5 w-56" />
        </div>
        <div className="flex gap-3 mb-6">
          <Skeleton className="h-10 flex-1 rounded-xl" />
          <Skeleton className="h-10 w-[200px] rounded-xl" />
        </div>
        <div className="flex gap-6">
          <div className="hidden md:block w-[220px] flex-shrink-0">
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <Skeleton className="h-5 w-20" />
              {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-5 w-full" />)}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {[...Array(9)].map((_, i) => <ListingCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
