export default function StatsCard({ value, label, accent }) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.15)]">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className={`mt-5 text-4xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
}
