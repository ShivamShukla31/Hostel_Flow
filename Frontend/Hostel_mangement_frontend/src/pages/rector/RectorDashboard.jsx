import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RectorLayout from '../../layouts/RectorLayout';
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import LoadingSpinner from '../../components/LoadingSpinner';
import Card from '../../components/Card';
import { problemService } from '../../services/api.service';

const summaryCards = [
  {
    label: 'Pending approvals',
    key: 'pending',
    accent: 'text-amber-300',
    description: 'Tickets waiting your review.'
  },
  {
    label: 'Assigned workload',
    key: 'assigned',
    accent: 'text-cyan-300',
    description: 'Requests already sent to workers.'
  },
  {
    label: 'Live operations',
    key: 'inProgress',
    accent: 'text-emerald-300',
    description: 'Requests actively being handled.'
  }
];

const workflowSteps = ['Complaint Raised', 'Rector Approval', 'Worker Assigned', 'Completed'];

export default function RectorDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [pendingIssues, setPendingIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [dashboardStats, allProblems] = await Promise.all([
        problemService.getDashboardStats(),
        problemService.getAllProblems()
      ]);
      setStats(dashboardStats || {});
      setPendingIssues((allProblems || []).filter((problem) => problem.status === 'Pending').slice(0, 3));
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to load rector dashboard data.' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await problemService.approveProblem(id);
      setAlert({ type: 'success', message: 'Issue approved successfully.' });
      fetchDashboard();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Unable to approve the issue.' });
    }
  };

  const handleReject = async (id) => {
    try {
      await problemService.rejectProblem(id);
      setAlert({ type: 'success', message: 'Issue rejected successfully.' });
      fetchDashboard();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Unable to reject the issue.' });
    }
  };

  const satisfactionScore = stats.total ? Math.min(100, Math.round(((stats.completed + stats.closed) / stats.total) * 100)) : 92;

  return (
    <RectorLayout>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-[38px] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-slate-900/80 p-10 shadow-[0_50px_140px_rgba(15,23,42,0.25)] backdrop-blur-3xl"
      >
        <div className="absolute right-0 top-6 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-10 top-12 h-24 w-24 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="grid gap-8 xl:grid-cols-[1.55fr_1fr] xl:items-end">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Rector command center</p>
            <h1 className="max-w-3xl text-5xl font-semibold text-white tracking-tight">Monitor workflow, approve requests, and lead hostel operations with precision.</h1>
            <p className="max-w-2xl text-lg text-slate-300">A premium operations hub for tracking complaints, managing assignments, and measuring performance.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.14)]">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Approval rate</p>
                <p className="mt-4 text-3xl font-semibold text-white">{stats.approved ?? 0}%</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.14)]">
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Active workflow</p>
                <p className="mt-4 text-3xl font-semibold text-cyan-300">{stats.inProgress ?? 0}</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-[32px] border border-white/10 bg-slate-950/95 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.18)]">
            <div className="absolute -right-8 top-6 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="rounded-[28px] bg-slate-900/90 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Dashboard overview</p>
                  <p className="mt-3 text-2xl font-semibold text-white">Command pulse</p>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300">Live</span>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-slate-950/90 p-4">
                  <span className="text-sm text-slate-400">Queue load</span>
                  <span className="text-white font-semibold">{stats.pending ?? 0}</span>
                </div>
                <div className="flex h-40 items-end gap-3 px-2">
                  {[78, 92, 60, 88].map((height, index) => (
                    <div key={index} className="flex-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
        className="grid gap-6 xl:grid-cols-3"
      >
        {summaryCards.map((card) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_28px_90px_rgba(15,23,42,0.16)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">{card.label}</p>
            <p className={`mt-5 text-4xl font-semibold ${card.accent}`}>{stats[card.key] ?? 0}</p>
            <p className="mt-3 text-slate-400">{card.description}</p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        className="grid gap-6 xl:grid-cols-[1.4fr_0.85fr]"
      >
        <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Live workflow</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Intelligent request flow</h2>
            </div>
            <Button variant="secondary" className="rounded-3xl px-5 py-3 text-sm font-semibold" onClick={fetchDashboard}>
              Refresh snapshot
            </Button>
          </div>

          <div className="mt-8 relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/90 p-6">
            <div className="absolute left-12 top-8 h-[calc(100%-4rem)] w-px bg-cyan-500/20" />
            {workflowSteps.map((step, index) => (
              <div key={step} className="relative flex items-start gap-4 py-5 pl-14">
                <span className="absolute left-3 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-500/20">{index + 1}</span>
                <div>
                  <p className="text-base font-semibold text-white">{step}</p>
                  <p className="mt-2 text-sm text-slate-400">{index === 0 ? 'Student request enters the portal.' : index === 1 ? 'Rector validates and approves.' : index === 2 ? 'Worker receives the assignment.' : 'Issue request is completed.'}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Analytics panel</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Live performance visuals</h2>
            </div>
            <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">Insights</span>
          </div>

          <div className="mt-8 space-y-5">
            {['Approval speed', 'Dispatch coverage', 'Resolution velocity'].map((item, index) => {
              const values = [78, 92, 86];
              return (
                <div key={item} className="rounded-[28px] bg-slate-900/90 p-5 border border-white/10">
                  <div className="flex items-center justify-between gap-4 text-slate-400">
                    <span>{item}</span>
                    <span className="text-white font-semibold">{values[index]}%</span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${values[index]}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.6, ease: 'easeOut' }}
        className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]"
      >
        <div className="space-y-6">
          <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Pending approvals</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Tickets needing your decision</h2>
              </div>
              <Button variant="primary" className="rounded-3xl px-5 py-3 text-sm font-semibold" onClick={() => navigate('/rector/complaints')}>
                Full queue
              </Button>
            </div>

            {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

            {loading ? (
              <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 text-center shadow-2xl">
                <LoadingSpinner text="Refreshing rector workspace..." />
              </Card>
            ) : pendingIssues.length === 0 ? (
              <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 text-center shadow-2xl">
                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
                  ✓
                </div>
                <p className="text-lg font-semibold text-white">No approvals waiting right now.</p>
                <p className="mt-3 text-slate-400">Your operational pipeline is currently balanced.</p>
              </Card>
            ) : (
              <div className="grid gap-6">
                {pendingIssues.map((issue) => (
                  <motion.div
                    key={issue._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    whileHover={{ y: -3 }}
                    className="rounded-[32px] border border-white/10 bg-slate-900/95 p-7 shadow-2xl"
                  >
                    <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-400">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-blue-500/10 text-blue-300">R</span>
                          <p className="text-sm uppercase tracking-[0.28em]">Ticket {issue.tokenId}</p>
                        </div>
                        <h3 className="text-2xl font-semibold text-white">{issue.title}</h3>
                        <p className="max-w-2xl text-slate-300">{issue.description}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                          <span className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2">Hostel {issue.hostel}</span>
                          <span className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2">Priority {issue.priority}</span>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        <div className="rounded-[28px] bg-slate-950/85 p-4 text-sm text-slate-300 border border-white/10">
                          <p className="font-semibold text-white">Preview</p>
                          <div className="mt-4 h-28 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-sm text-slate-500">
                            {issue.problemImage || issue.image ? (
                              <img
                                src={issue.problemImage || issue.image}
                                alt={issue.title || 'Problem image preview'}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentNode.querySelector('.fallback-text').style.display = 'block';
                                }}
                              />
                            ) : (
                              <div className="fallback-text flex h-full items-center justify-center px-3 text-center">
                                No image uploaded
                              </div>
                            )}
                            <div className="fallback-text hidden flex h-full items-center justify-center px-3 text-center">
                              Image failed to load
                            </div>
                          </div>
                        </div>
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300 border border-amber-500/20">{issue.status}</span>
                        <Button variant="success" className="w-full px-5 py-3 text-sm font-semibold" onClick={() => handleApprove(issue._id)}>
                          Approve
                        </Button>
                        <Button variant="danger" className="w-full px-5 py-3 text-sm font-semibold" onClick={() => handleReject(issue._id)}>
                          Reject
                        </Button>
                        <Button variant="outline" className="w-full px-5 py-3 text-sm font-semibold" onClick={() => navigate(`/complaints/${issue._id}`)}>
                          View details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Operational insights</p>
            <h3 className="mt-3 text-3xl font-semibold text-white">Workload analytics</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-1">
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <p className="text-sm text-slate-400">Satisfaction score</p>
                <p className="mt-3 text-3xl font-semibold text-white">{satisfactionScore}%</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300" style={{ width: `${satisfactionScore}%` }} />
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <p className="text-sm text-slate-400">Average decision time</p>
                <p className="mt-3 text-3xl font-semibold text-white">1.8h</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <p className="text-sm text-slate-400">Capacity buffer</p>
                <p className="mt-3 text-3xl font-semibold text-cyan-300">+18%</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>
    </RectorLayout>
  );
}
