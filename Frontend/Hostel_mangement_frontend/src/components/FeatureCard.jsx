const accentStyles = {
  blue: 'bg-blue-500/15 text-blue-300',
  purple: 'bg-purple-500/15 text-purple-300',
  cyan: 'bg-cyan-500/15 text-cyan-300'
};

export default function FeatureCard({ title, description, accent = 'blue', icon }) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.15)] transition hover:-translate-y-1 hover:border-blue-500/20">
      <div className={`inline-flex items-center justify-center h-14 w-14 rounded-3xl mb-6 ${accentStyles[accent] || accentStyles.blue}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}
