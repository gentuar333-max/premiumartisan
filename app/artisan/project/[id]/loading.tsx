export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="h-9 w-44 animate-pulse rounded-lg bg-slate-200" />

        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-5">
            <div className="space-y-2">
              <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
              <div className="h-7 w-80 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-52 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="h-8 w-40 animate-pulse rounded-full bg-slate-200" />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
              <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
              <div className="mt-4 space-y-3">
                <div className="h-4 w-56 animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                <div className="h-20 w-full animate-pulse rounded bg-slate-200" />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
              <div className="mt-4 h-8 w-full animate-pulse rounded bg-slate-200" />
              <div className="mt-3 h-10 w-full animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
