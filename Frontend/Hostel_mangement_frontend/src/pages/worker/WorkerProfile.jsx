import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storage } from '../../utils/helpers';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/Button';
import Card from '../../components/Card';
import StatusPill from '../../components/StatusPill';

const performanceStats = [
  { label: 'Completed Tasks', value: 128, color: 'text-emerald-300' },
  { label: 'Active Tasks', value: 8, color: 'text-blue-300' },
  { label: 'Response Speed', value: '24 min', color: 'text-cyan-300' },
  { label: 'Efficiency', value: '91%', color: 'text-violet-300' }
];

const history = [
  { title: 'Completed repair', detail: 'Fixed common area lighting issue.', time: '2h ago' },
  { title: 'Uploaded proof', detail: 'Shared completion image for T-934.', time: '5h ago' },
  { title: 'Accepted request', detail: 'Started maintenance for room 302.', time: 'Yesterday' }
];

const completedList = [
  { title: 'Replace broken lock', room: '317', status: 'Completed' },
  { title: 'Repair faucet leak', room: '113', status: 'Completed' },
  { title: 'Reset AC vent', room: '205', status: 'Completed' }
];

export default function WorkerProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', department: '' });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const currentUser = storage.getUser();
    setUser(currentUser);
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      mobile: currentUser?.mobile || '',
      department: currentUser?.role === 'Worker' ? 'Maintenance Operations' : ''
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    storage.setUser(updatedUser);
    setUser(updatedUser);
    setAlert({ type: 'success', message: 'Profile saved successfully.' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-3 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Worker profile</p>
              <h1 className="text-4xl font-semibold text-white">Premium operations identity</h1>
              <p className="text-slate-300">Monitor your performance metrics, work history, and task reputation from one premium hub.</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => navigate('/worker/tasks')}>
              View my tasks
            </Button>
          </div>
        </motion.section>

        {alert && (
          <div className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-100">
            {alert.message}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-500 to-cyan-400 text-4xl text-white shadow-xl shadow-cyan-500/15">
                  {user?.name?.charAt(0) || 'W'}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Worker identity</p>
                  <h2 className="mt-2 text-3xl font-semibold text-white">{user?.name || 'Hostel Worker'}</h2>
                  <p className="mt-2 text-slate-300">{user?.role || 'Worker'} • Maintenance Operations</p>
                </div>
              </div>
              <div className="space-y-3 rounded-[32px] border border-white/10 bg-white/5 p-5 text-slate-300">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Active badge</p>
                <span className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">On duty</span>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {performanceStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{stat.label}</p>
                  <p className={`mt-3 text-3xl font-semibold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Performance analytics</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Efficiency summary</h2>
              </div>
              <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">Top 12%</span>
            </div>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-400">Average completion time</p>
                  <p className="font-semibold text-white">1.4h</p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-400">Approval ratio</p>
                  <p className="font-semibold text-cyan-300">96%</p>
                </div>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-400">Response speed</p>
                  <p className="font-semibold text-emerald-300">Fast</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Work history</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Recent activity</h2>
              </div>
              <Button variant="secondary" size="sm">View timeline</Button>
            </div>
            <div className="mt-8 space-y-4">
              {history.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-white">{item.title}</p>
                    <span className="text-sm text-slate-500">{item.time}</span>
                  </div>
                  <p className="mt-2 text-slate-300">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Recent completed</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Closed complaints</h2>
              </div>
              <StatusPill status="Completed" />
            </div>
            <div className="mt-6 space-y-3">
              {completedList.map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-400">Room {item.room}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.18)] backdrop-blur-[24px]">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Profile settings</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Update your worker details</h2>
              <p className="mt-2 text-slate-300">Keep your contact and department information accurate for fast work assignments.</p>
            </div>
            <Button variant="primary" size="sm" onClick={handleSave}>Save changes</Button>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
              <label className="block text-sm text-slate-400 mb-2">Full name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
              <label className="block text-sm text-slate-400 mb-2">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
              <label className="block text-sm text-slate-400 mb-2">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="rounded-3xl bg-slate-950/90 p-5 border border-white/10">
              <label className="block text-sm text-slate-400 mb-2">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
