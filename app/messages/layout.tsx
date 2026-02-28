import React from "react";

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[calc(100vh-0px)] w-full overflow-hidden bg-gradient-to-br from-slate-100 via-emerald-50 to-sky-100">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.55) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative mx-auto h-full max-w-6xl p-4">
        <div className="grid h-full grid-cols-1 gap-4 rounded-3xl bg-white/55 p-3 shadow-xl ring-1 ring-white/30 backdrop-blur-xl md:grid-cols-[320px_1fr]">
          {children}
        </div>
      </div>
    </div>
  );
}
