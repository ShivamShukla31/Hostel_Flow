import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import StatsCard from '../components/StatsCard';
import WorkflowTimeline from '../components/WorkflowTimeline';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Fast complaint capture',
    description: 'Report hostel issues in a modern interface with confidence and speed.',
    icon: '⚡'
  },
  {
    title: 'Live workflow status',
    description: 'See every ticket move from student report to worker completion.',
    icon: '📈'
  },
  {
    title: 'Role-aware dashboards',
    description: 'Students, rectors, and workers get the right actions and insights.',
    icon: '👥'
  },
  {
    title: 'Modern analytics',
    description: 'Track resolution metrics, response times, and problem trends.',
    icon: '📊'
  }
];

const faqs = [
  {
    question: 'How do students submit complaints?',
    answer: 'Students can login, fill the complaint form, attach a photo, select hostel details, and submit instantly.'
  },
  {
    question: 'Can rectors approve complaints directly?',
    answer: 'Yes. Rectors can review pending submissions, verify details, and assign workers with one click.'
  },
  {
    question: 'How are workers notified?',
    answer: 'Once assigned, workers see their task queue and can update status in real time.'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <Navbar />
      <HeroSection />

      <section id="features" className="relative py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 text-center mb-14">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Designed for modern hostels</p>
            <h2 className="text-4xl font-semibold text-white md:text-5xl">Everything a university hostel team needs.</h2>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400">Hostel Flow brings premium SaaS styling, transparent status updates, rich dashboards, and a workflow-first experience for students, rectors, and workers.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} accent="blue" />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Future-ready dashboard experience
            </div>
            <h3 className="text-4xl font-semibold text-white">Your campus operations, reimagined.</h3>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">A beautiful dashboard layout for Atlas-grade workflow management and real-time decisioning, built to feel premium and effortless.</p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01]"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base text-white transition hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <StatsCard label="Open tickets" value="24" accent="text-blue-400" />
            <StatsCard label="Resolved today" value="18" accent="text-emerald-400" />
            <StatsCard label="Rector approvals" value="12" accent="text-purple-400" />
            <StatsCard label="Worker responses" value="41" accent="text-cyan-400" />
          </div>
        </div>
      </section>

      <section id="workflow" className="pb-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <WorkflowTimeline />
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white">Plans built for every campus.</h2>
          <p className="max-w-3xl mx-auto text-lg leading-8 text-slate-400">Choose the right plan for your hostel operations, whether you need basic reporting or full rector and worker workflows.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { name: 'Starter', price: '$0', description: 'Perfect for small hostel teams' },
            { name: 'Campus Pro', price: '$49', description: 'Advanced workflow and analytics' },
            { name: 'Enterprise', price: 'Custom', description: 'Large campuses with premium support' }
          ].map((plan) => (
            <div key={plan.name} className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.12)] hover:border-blue-500/30 transition-all">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400 mb-4">{plan.name}</p>
              <h3 className="text-5xl font-semibold text-white mb-4">{plan.price}</h3>
              <p className="text-slate-400 mb-8">{plan.description}</p>
              <Link to="/register" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Start Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="pb-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">FAQ</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white">Frequently asked questions</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
