import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-slate-100", className)}
      {...props}
    />
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <Skeleton className="h-[76px] rounded-none" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="space-y-1">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-8 w-20 rounded-xl" />
            <Skeleton className="h-8 w-20 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-2 mb-8">
      <Skeleton className="h-9 w-48" />
      <Skeleton className="h-5 w-64" />
    </div>
  );
}

export { Skeleton };
