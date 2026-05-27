import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 px-6 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.15),_transparent_35%)]" />
      <div className="relative max-w-7xl mx-auto grid gap-16 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span>Smart complaint tracking for modern hostels</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight text-white md:text-6xl">
              Premium hostel workflow, issue tracking, and live resolution.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Transform hostel operations with a modern SaaS-grade dashboard, adaptive workflows, and clear status updates for students, rectors, and workers.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01]"
            >
              Start Free
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base text-white transition hover:bg-white/10"
            >
              View Features
            </Link>
          </div>
        </div>

        <div className="relative rounded-[36px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Live dashboard preview</p>
              <h2 className="text-2xl font-semibold text-white">Complaint flow at a glance</h2>
            </div>
            <span className="rounded-full bg-slate-950/70 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-300">Beta</span>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Electrical</p>
                  <h3 className="text-xl font-semibold text-white">Room 302 fan issue</h3>
                </div>
                <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-200">In Progress</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Students</p>
                <p className="mt-4 text-3xl font-semibold text-white">2.4K</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Resolved today</p>
                <p className="mt-4 text-3xl font-semibold text-white">68</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
