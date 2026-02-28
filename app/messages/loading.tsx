export default function Loading() {
  return (
    <>
      <aside className="h-full overflow-hidden rounded-3xl border border-white/70 bg-white/60 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="space-y-2 p-3">
          <div className="h-16 animate-pulse rounded-2xl bg-slate-200/70" />
          <div className="h-16 animate-pulse rounded-2xl bg-slate-200/70" />
          <div className="h-16 animate-pulse rounded-2xl bg-slate-200/70" />
        </div>
      </aside>
      <section className="h-full overflow-hidden rounded-3xl border border-white/70 bg-white/60 shadow-[0_18px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl">
        <div className="space-y-3 p-5">
          <div className="h-14 w-3/5 animate-pulse rounded-2xl bg-slate-200/70" />
          <div className="ml-auto h-14 w-1/2 animate-pulse rounded-2xl bg-blue-200/60" />
          <div className="h-14 w-2/3 animate-pulse rounded-2xl bg-slate-200/70" />
        </div>
      </section>
    </>
  );
}
