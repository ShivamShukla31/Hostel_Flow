import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend
} from 'recharts';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusPill from '../../components/StatusPill';
import { problemService } from '../../services/api.service';
import { storage, dateHelpers } from '../../utils/helpers';

const timelineSteps = [
  'Complaint Raised',
  'Rector Verification',
  'Worker Assigned',
  'Repair In Progress',
  'Completed',
  'Student Confirmation'
];

const trendData = [
  { day: 'Mon', opened: 5, resolved: 3 },
  { day: 'Tue', opened: 7, resolved: 4 },
  { day: 'Wed', opened: 6, resolved: 5 },
  { day: 'Thu', opened: 8, resolved: 6 },
  { day: 'Fri', opened: 4, resolved: 4 },
  { day: 'Sat', opened: 3, resolved: 2 },
  { day: 'Sun', opened: 2, resolved: 1 }
];

const categoryData = [
  { name: 'Electrical', value: 32 },
  { name: 'Plumbing', value: 26 },
  { name: 'Furnishing', value: 18 },
  { name: 'Cleanliness', value: 14 },
  { name: 'Other', value: 10 }
];

const categoryColors = ['#06b6d4', '#8b5cf6', '#3b82f6', '#22c55e', '#f59e0b'];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const storedUser = storage.getUser();
        setUser(storedUser);
        const [issueStats, myProblems] = await Promise.all([
          problemService.getIssueStats(),
          problemService.getMyProblems(1, 8)
        ]);
        setStats(issueStats || {});
        setComplaints(Array.isArray(myProblems) ? myProblems.slice(0, 6) : []);
      } catch (err) {
        setError('Unable to load your student dashboard.');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Student';
  const hostelLabel = user?.hostel || 'Hostel 1';
  const roomNumber = user?.room || 'A-302';
  const totalComplaints = stats.total || 0;
  const pending = stats.pending || 0;
  const resolved = (stats.completed || 0) + (stats.closed || 0);
  const satisfaction = totalComplaints ? Math.round((resolved / totalComplaints) * 100) : 0;
  const active = stats.inProgress || 0;

  const summaryCards = [
    { label: 'Open tickets', value: pending, detail: 'Awaiting action', accent: 'from-cyan-500 to-blue-500' },
    { label: 'Resolved cases', value: resolved, detail: 'Since last sync', accent: 'from-violet-500 to-pink-500' },
    { label: 'Live repairs', value: active, detail: 'Currently active', accent: 'from-emerald-400 to-cyan-400' },
    { label: 'Satisfaction', value: `${satisfaction}%`, detail: 'Student sentiment', accent: 'from-indigo-500 to-fuchsia-500' }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#020617] p-8 shadow-[0_48px_120px_rgba(5,12,27,0.35)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_18%)]" />
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl" />
          <div className="relative grid gap-8 xl:grid-cols-[1.45fr_0.95fr] xl:items-center">
            <div className="relative z-10 space-y-6">
              <p className="text-sm uppercase tracking-[0.36em] text-cyan-300">Student dashboard</p>
              <h1 className="max-w-3xl text-[clamp(2.5rem,4vw,4.2rem)] font-semibold tracking-tight text-white leading-[1.02]">A premium student command center for hostel complaint tracking.</h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">Stay ahead of every request with a world-class dark mode dashboard that combines clarity, motion, and pro-grade analytics.</p>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="rounded-[28px] border border-white/10 bg-slate-950/90 p-5 shadow-[0_20px_85px_rgba(0,0,0,0.18)]"
                  >
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{card.label}</p>
                    <p className="mt-4 text-4xl font-semibold text-white">{card.value}</p>
                    <p className="mt-3 text-sm text-slate-400">{card.detail}</p>
                    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className={`h-2 rounded-full bg-gradient-to-r ${card.accent}`} style={{ width: `${Math.min(100, Number(String(card.value).replace('%', '')))}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <Button variant="primary" onClick={() => navigate('/student/problems')}>View all complaints</Button>
                <Button variant="secondary" onClick={() => navigate('/student/problems')}>New request</Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_40px_120px_rgba(10,18,38,0.4)]"
            >
              <div className="absolute -right-10 top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute left-6 top-20 h-20 w-20 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="space-y-6">
                <div className="rounded-[32px] border border-white/10 bg-[#08101f]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Realtime pulse</p>
                      <h2 className="mt-3 text-3xl font-semibold text-white">System health</h2>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">Live</span>
                  </div>
                  <div className="mt-8 grid gap-4">
                    <div className="rounded-[28px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-5 border border-cyan-500/10">
                      <div className="flex items-center justify-between gap-4 text-white">
                        <span className="text-sm">Resolution score</span>
                        <span className="text-2xl font-semibold">{satisfaction}%</span>
                      </div>
                      <div className="mt-4 h-2 rounded-full bg-white/10">
                        <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${satisfaction}%` }} />
                      </div>
                    </div>
                    <div className="rounded-[28px] bg-slate-900/95 p-5 border border-white/10">
                      <div className="grid gap-3">
                        <div className="rounded-[28px] bg-slate-950/80 p-4 text-white">
                          <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>Active issues</span>
                            <span className="font-semibold text-white">{active}</span>
                          </div>
                          <p className="mt-3 text-sm text-slate-300">Tickets currently being serviced.</p>
                        </div>
                        <div className="rounded-[28px] bg-white/5 p-4 text-slate-300">
                          <div className="flex items-center justify-between text-sm text-slate-400">
                            <span>Pending reviews</span>
                            <span className="font-semibold text-cyan-300">{pending}</span>
                          </div>
                          <p className="mt-3 text-sm text-slate-400">Fresh requests in queue.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-[#08101f]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Notification center</p>
                      <h2 className="mt-3 text-2xl font-semibold text-white">Live updates</h2>
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300">Now</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-slate-300">
                      <p className="text-sm text-slate-400">Worker assigned to Electrical complaint #1042</p>
                      <p className="mt-2 text-sm text-slate-300">2 minutes ago</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-slate-300">
                      <p className="text-sm text-slate-400">Rector verified complaint #0987</p>
                      <p className="mt-2 text-sm text-slate-300">12 minutes ago</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-slate-300">
                      <p className="text-sm text-slate-400">New maintenance request submitted</p>
                      <p className="mt-2 text-sm text-slate-300">21 minutes ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.6, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-4"
        >
          {summaryCards.map((card) => (
            <Card key={card.label} className="p-6 hover:-translate-y-1 transition">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
                  <p className="mt-4 text-4xl font-semibold text-white">{card.value}</p>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${card.accent} text-white shadow-lg shadow-slate-900/30`}>
                  <span className="text-xl">•</span>
                </div>
              </div>
              <p className="mt-5 text-sm text-slate-400">{card.detail}</p>
            </Card>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]"
        >
          <Card className="p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Active complaints</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Live issue feed</h2>
              </div>
              <Button variant="secondary" onClick={() => navigate('/student/problems')}>See all tickets</Button>
            </div>

            {loading ? (
              <div className="mt-8 rounded-[32px] border border-white/10 bg-slate-950/90 p-10 text-center text-slate-400">Loading student complaints...</div>
            ) : !complaints.length ? (
              <div className="mt-8 rounded-[32px] border border-white/10 bg-slate-950/90 p-10 text-center text-slate-300">
                <p className="text-xl font-semibold text-white">No active complaints yet.</p>
                <p className="mt-3 text-slate-400">Once you raise a request, it will appear here with full tracking and status updates.</p>
                <Button variant="primary" className="mt-6" onClick={() => navigate('/student/problems')}>Raise a new complaint</Button>
              </div>
            ) : (
              <div className="mt-8 grid gap-6">
                {complaints.map((complaint) => (
                  <motion.div
                    key={complaint._id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_24px_90px_rgba(15,23,42,0.16)]"
                  >
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr] p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{complaint.department || 'General'}</p>
                            <h3 className="mt-2 text-2xl font-semibold text-white">{complaint.title}</h3>
                          </div>
                          <StatusPill status={complaint.status || 'Pending'} />
                        </div>
                        <p className="text-slate-300 leading-7">{complaint.description || 'No description available.'}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                          <span className="rounded-full border border-white/10 bg-slate-950/90 px-3 py-2">Room {complaint.room || roomNumber}</span>
                          <span className="rounded-full border border-white/10 bg-slate-950/90 px-3 py-2">Priority {complaint.priority || 'Medium'}</span>
                          <span className="rounded-full border border-white/10 bg-slate-950/90 px-3 py-2">Worker assigned</span>
                        </div>
                      </div>
                      <div className="grid gap-4">
                                <div className="h-40 overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/90">
                                  {((complaint.problemImage || complaint.image)) ? (
                                    <img src={complaint.problemImage || complaint.image} alt={complaint.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                                  ) : (
                                    <div className="flex h-full items-center justify-center bg-slate-900 text-slate-500">Image preview unavailable</div>
                                  )}
                                </div>
                        <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-4 text-slate-300">
                          <p className="text-sm">Last update</p>
                          <p className="mt-2 text-white">{dateHelpers.formatDate(complaint.updatedAt || complaint.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>

          <div className="grid gap-6">
            <Card className="p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Analytics overview</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Complaint trends</h2>
                </div>
              </div>
              <div className="mt-8 h-[320px]" style={{ minWidth: 0, minHeight: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 16, right: 0, left: -16, bottom: 0 }}>
                    <defs>
                      <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.68} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.16)', color: '#ffffff', borderRadius: '20px' }} />
                    <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
                    <Area type="monotone" dataKey="opened" name="Opened" stroke="#38bdf8" strokeWidth={3} fill="url(#trendGradient)" activeDot={{ r: 6 }} animationDuration={900} />
                    <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#a855f7" strokeWidth={2.5} fill="rgba(168,85,247,0.16)" activeDot={{ r: 5 }} animationDuration={900} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Category breakdown</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Issue distribution</h2>
                </div>
              </div>
              <div className="mt-8 h-[320px]" style={{ minWidth: 0, minHeight: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={58} outerRadius={100} paddingAngle={4} animationDuration={800}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#020617', border: '1px solid rgba(148,163,184,0.16)', color: '#ffffff', borderRadius: '18px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6 grid gap-3">
                  {categoryData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-slate-300">
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ background: categoryColors[index % categoryColors.length] }} />
                        <span className="text-white truncate">{entry.name}</span>
                      </div>
                      <span className="text-sm text-slate-400">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.6, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"
        >
          <Card className="p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Complaint timeline</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Workflow progression</h2>
              </div>
            </div>
            <div className="mt-10 space-y-6">
              {timelineSteps.map((step, index) => (
                <div key={step} className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                  <div className="absolute left-5 top-5 h-10 w-10 rounded-full bg-slate-900/90 ring-1 ring-cyan-400/10" />
                  <div className="ml-16 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-base font-semibold text-white">{step}</p>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">Step {index + 1}</span>
                    </div>
                    <p className="text-sm leading-6 text-slate-400">{index === 0 ? 'Complaint lodged and recorded' : index === 1 ? 'Rector verifies the details' : index === 2 ? 'Worker assigned to the issue' : index === 3 ? 'Repair work is currently underway' : index === 4 ? 'Maintenance issue marked complete' : 'Student confirms the final resolution'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Issue heatmap</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Daily intensity</h2>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              <div className="grid gap-3 rounded-[32px] border border-white/10 bg-slate-950/90 p-4">
                {trendData.map((item) => (
                  <div key={item.day} className="grid grid-cols-[90px_repeat(7,1fr)] items-center gap-3 text-sm text-slate-400">
                    <span className="whitespace-nowrap font-medium text-white">{item.day}</span>
                    {[...Array(7)].map((_, heatIndex) => {
                      const intensity = Math.min(5, Math.max(1, Math.round((heatIndex + 1) / 2 + (item.opened - 3) * 0.3)));
                      return (
                        <div key={heatIndex} className={`h-8 rounded-2xl ${intensity > 4 ? 'bg-cyan-400/90' : intensity > 3 ? 'bg-violet-500/80' : intensity > 2 ? 'bg-slate-700/80' : 'bg-slate-900/70'} shadow-[0_0_0_1px_rgba(255,255,255,0.05)]`} title={`${intensity} issues`} />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#02050f]/90 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Real-time issue feed</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">System notification center</h3>
                  </div>
                  <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-300">Live</span>
                </div>
                <div className="grid gap-4">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-slate-300">
                    <p className="text-sm text-slate-400">Worker assigned to Electrical complaint #1042</p>
                    <p className="mt-2 text-sm text-slate-300">2 minutes ago</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-slate-300">
                    <p className="text-sm text-slate-400">Rector verified complaint #0987</p>
                    <p className="mt-2 text-sm text-slate-300">12 minutes ago</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 text-slate-300">
                    <p className="text-sm text-slate-400">New maintenance request submitted</p>
                    <p className="mt-2 text-sm text-slate-300">21 minutes ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
