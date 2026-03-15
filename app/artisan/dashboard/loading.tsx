// app/artisan/dashboard/loading.tsx
// Shfaqet MENJËHERË ndërkohë që page.tsx ngarkon — zero vonesë vizuale

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      {/* Nav skeleton */}
      <div className="sticky top-0 z-30 flex h-[52px] items-center gap-2 border-b border-[#d5d8dc] bg-[#eaecef] px-3">
        <div className="h-7 w-7 animate-pulse rounded-lg bg-slate-300" />
        <div className="h-4 w-28 animate-pulse rounded bg-slate-300" />
        <div className="mx-2 h-4 w-px bg-slate-300" />
        <div className="h-7 w-16 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200" />
        <div className="ml-auto h-7 w-32 animate-pulse rounded-full bg-slate-200" />
      </div>

      {/* Cards skeleton */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* Image */}
              <div className="h-40 w-full animate-pulse bg-slate-200" />
              <div className="p-4 space-y-3">
                {/* Title + budget */}
                <div className="flex justify-between">
                  <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
                </div>
                {/* Tags */}
                <div className="flex gap-2">
                  <div className="h-5 w-20 animate-pulse rounded-full bg-slate-100" />
                  <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
                </div>
                {/* Description */}
                <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-slate-100" />
                {/* Button */}
                <div className="h-9 w-full animate-pulse rounded-xl bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}