// app/artisan/dashboard/loading.tsx
export default function Loading() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-6">
      <div className="mb-4">
        <div className="h-4 w-[420px] rounded bg-neutral-200" />
        <div className="mt-2 h-3 w-[280px] rounded bg-neutral-100" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="h-4 w-24 rounded bg-neutral-200" />
          <div className="mt-4 h-3 w-40 rounded bg-neutral-100" />
          <div className="mt-2 flex gap-2">
            <div className="h-8 w-12 rounded-full bg-neutral-100" />
            <div className="h-8 w-12 rounded-full bg-neutral-100" />
            <div className="h-8 w-12 rounded-full bg-neutral-100" />
          </div>
          <div className="mt-6 h-3 w-16 rounded bg-neutral-100" />
          <div className="mt-2 h-8 w-full rounded-xl bg-neutral-100" />
          <div className="mt-2 h-8 w-full rounded-xl bg-neutral-100" />
        </aside>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
            >
              <div className="h-[170px] bg-neutral-100" />
              <div className="p-4">
                <div className="h-4 w-28 rounded bg-neutral-200" />
                <div className="mt-3 h-3 w-full rounded bg-neutral-100" />
                <div className="mt-2 h-3 w-4/5 rounded bg-neutral-100" />
                <div className="mt-6 h-4 w-32 rounded bg-neutral-200" />
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
