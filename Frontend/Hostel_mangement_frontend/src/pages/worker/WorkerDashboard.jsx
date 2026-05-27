import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import StatusPill from '../../components/StatusPill';
import { problemService } from '../../services/api.service';

const defaultStats = [
  {
    label: 'Assigned Tasks',
    value: 0,
    accent: 'from-blue-500 to-cyan-400',
    subtitle: 'Complaint load ready for action'
  },
  {
    label: 'In Progress',
    value: 0,
    accent: 'from-cyan-500 to-violet-500',
    subtitle: 'Active repairs in motion'
  },
  {
    label: 'Completed Today',
    value: 0,
    accent: 'from-emerald-400 to-lime-400',
    subtitle: 'Issues closed in the last 24h'
  },
  {
    label: 'Efficiency Score',
    value: '91%',
    accent: 'from-violet-500 to-pink-500',
    subtitle: 'Task completion efficiency'
  }
];

const assignments = [
  {
    title: 'Restore common area lighting',
    room: 'B-108',
    status: 'In Progress',
    priority: 'High',
    description: 'Replace faulty ballast and verify the full corridor lighting system.',
    date: 'May 24',
    student: 'Rohan Patel'
  },
  {
    title: 'Repair bathroom pipe leak',
    room: 'C-302',
    status: 'Assigned',
    priority: 'Critical',
    description: 'Inspect and repair leaking pipe beneath the sink, then confirm no further seepage.',
    date: 'May 24',
    student: 'Ayesha Khan'
  },
  {
    title: 'Service AC outlet',
    room: 'D-205',
    status: 'Assigned',
    priority: 'Medium',
    description: 'Replace the outlet in the study corner and confirm power stability.',
    date: 'May 23',
    student: 'Kunal Mehta'
  }
];

const workflow = [
  'Complaint Assigned',
  'Worker Accepted',
  'Repair Started',
  'Work In Progress',
  'Completed',
  'Student Confirmation'
];

const activity = [
  { title: 'Proof uploaded for C-302', detail: 'Completed leak repair and uploaded closure images.', time: '15m ago' },
  { title: 'Task accepted', detail: 'Started the corridor lighting issue for block B.', time: '1h ago' },
  { title: 'Status updated', detail: 'Marked T-984 as in progress and notified the rector.', time: '3h ago' }
];

export default function WorkerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadAssignedTasks();
  }, []);

  const loadAssignedTasks = async () => {
    setLoadingTasks(true);
    try {
      const assignedProblems = await problemService.getAssignedProblems();
      setTasks(assignedProblems || []);
    } catch (error) {
      setAlert({ type: 'error', message: 'Unable to load your assigned tasks.' });
    } finally {
      setLoadingTasks(false);
    }
  };

  const openTasksPage = () => navigate('/worker/tasks');

  const summaryCards = [
    {
      label: 'Assigned Tasks',
      value: tasks.length,
      accent: 'from-blue-500 to-cyan-400',
      subtitle: 'Complaints assigned to you by the rector'
    },
    {
      label: 'In Progress',
      value: tasks.filter((task) => task.status === 'In Progress').length,
      accent: 'from-cyan-500 to-violet-500',
      subtitle: 'Work currently in motion'
    },
    {
      label: 'Completed Today',
      value: tasks.filter((task) => task.status === 'Completed').length,
      accent: 'from-emerald-400 to-lime-400',
      subtitle: 'Issues closed by you'
    },
    {
      label: 'Efficiency Score',
      value: '91%',
      accent: 'from-violet-500 to-pink-500',
      subtitle: 'Task completion efficiency'
    }
  ];

  const previewTasks = tasks.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="rounded-[32px] border border-white/10 bg-white/6 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]"
        >
          <div className="grid gap-8 xl:grid-cols-[1.8fr_1fr] xl:items-end">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Worker Dashboard</p>
              <h1 className="text-5xl font-semibold text-white">Live operations workspace for frontline repairs</h1>
              <p className="max-w-3xl text-lg text-slate-300">Track assigned complaints, update progress, and see completion analytics in a premium task-oriented command panel.</p>
            </div>
            <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-slate-950/90 p-6 shadow-lg shadow-cyan-500/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Live work status</p>
                  <p className="mt-2 text-3xl font-semibold text-white">Operational</p>
                </div>
                <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">Active workflow</span>
              </div>
              <div className="grid gap-3">
                <Button variant="primary" className="w-full">New update</Button>
                <Button variant="assign" className="w-full" onClick={openTasksPage}>Open tasks</Button>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.55, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-4"
        >
          {summaryCards.map((item) => (
            <Card
              key={item.label}
              className="rounded-[32px] border border-white/10 bg-white/6 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px] hover:-translate-y-1 transition"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                  <p className="mt-4 text-4xl font-semibold text-white">{item.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${item.accent} text-white shadow-lg shadow-slate-900/30`}>
                  {item.label === 'Efficiency Score' ? '⚡' : '🧰'}
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-400">{item.subtitle}</p>
            </Card>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-[1.4fr_0.85fr]"
        >
          <Card className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Active assigned complaints</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Your frontline queue</h2>
                <p className="mt-3 text-slate-400">See the latest complaints assigned by the rector and manage status updates from one place.</p>
              </div>
              <Button variant="secondary" size="sm" onClick={openTasksPage}>Open complaints</Button>
            </div>
            <div className="mt-8 grid gap-5">
              {loadingTasks ? (
                <div className="rounded-[28px] border border-white/10 bg-slate-950/85 p-10 text-center text-slate-400">Loading your assigned complaints...</div>
              ) : previewTasks.length === 0 ? (
                <div className="rounded-[28px] border border-white/10 bg-slate-950/85 p-10 text-center text-slate-400">No complaints have been assigned to you yet.</div>
              ) : (
                previewTasks.map((assignment) => (
                  <div key={assignment._id || assignment.id} className="rounded-[28px] border border-white/10 bg-slate-950/85 p-5 shadow-[0_20px_80px_rgba(15,23,42,0.12)]">
                    <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{assignment.department || assignment.category} · Room {assignment.hostel || assignment.room}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{assignment.title}</h3>
                        <p className="mt-3 text-slate-300 leading-7">{assignment.description}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <StatusPill status={assignment.status} />
                        <span className="rounded-3xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">{assignment.priority}</span>
                      </div>
                    </div>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <span className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-300">Assigned by Rector</span>
                      <span className="rounded-3xl bg-slate-950/90 px-4 py-3 text-sm text-slate-300">Assigned {new Date(assignment.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Workflow timeline</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Progress tracking</h2>
            <div className="mt-8 space-y-4">
              {workflow.map((stage, index) => (
                <div key={stage} className="grid gap-3 sm:grid-cols-[1fr_auto] rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="font-semibold text-white">{stage}</p>
                    <p className="text-sm text-slate-400">{index === 3 ? 'Current operation status' : 'Next workflow milestone'}</p>
                  </div>
                  <span className="rounded-full bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-400">{index < 3 ? 'Upcoming' : index === 3 ? 'Current' : 'Future'}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]"
        >
          <Card className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Recent activity</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Live operations feed</h2>
              </div>
              <Button variant="secondary" size="sm">View timeline</Button>
            </div>
            <div className="mt-8 space-y-4">
              {activity.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/85 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-white">{item.title}</p>
                    <span className="text-sm text-slate-500">{item.time}</span>
                  </div>
                  <p className="mt-2 text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Completion analytics</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Performance insights</h2>
            <div className="mt-8 space-y-5">
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <div className="flex items-center justify-between gap-4 text-slate-400">
                  <span>Completion rate</span>
                  <span className="text-white font-semibold">92%</span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" style={{ width: '92%' }} />
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <div className="flex items-center justify-between gap-4 text-slate-400">
                  <span>Average handoff time</span>
                  <span className="text-white font-semibold">1.2h</span>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <div className="flex items-center justify-between gap-4 text-slate-400">
                  <span>Quality approval</span>
                  <span className="text-emerald-300 font-semibold">98%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
