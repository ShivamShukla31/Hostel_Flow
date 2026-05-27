export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="rounded-[36px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.22)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Hostel analytics</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">Trends, velocity, and service health</h1>
            </div>
            <button className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95">
              Export report
            </button>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Ticket volume</p>
              <p className="mt-5 text-4xl font-semibold text-white">184</p>
              <p className="mt-3 text-slate-400">New hostel complaints this week.</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Resolution rate</p>
              <p className="mt-5 text-4xl font-semibold text-emerald-300">92%</p>
              <p className="mt-3 text-slate-400">On-time resolutions for open tickets.</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Average speed</p>
              <p className="mt-5 text-4xl font-semibold text-cyan-300">1.8h</p>
              <p className="mt-3 text-slate-400">Average time to first response.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[36px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.22)] backdrop-blur-2xl">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Issue categories</p>
              <div className="mt-6 space-y-4 text-slate-300">
                <div className="flex items-center justify-between gap-4">
                  <p>Electrical</p>
                  <p className="font-semibold text-white">57%</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p>Plumbing</p>
                  <p className="font-semibold text-white">22%</p>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p>Cleaning</p>
                  <p className="font-semibold text-white">14%</p>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Top responders</p>
              <div className="mt-6 space-y-4 text-slate-300">
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="font-semibold text-white">Rector Priya</p>
                  <p className="text-sm text-slate-400">Response speed: 1.2h</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="font-semibold text-white">Worker Raj</p>
                  <p className="text-sm text-slate-400">Completed 34 jobs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
