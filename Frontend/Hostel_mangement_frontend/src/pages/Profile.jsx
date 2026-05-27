import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
void motion;
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import Input from '../components/Input';
import StatusPill from '../components/StatusPill';
import { storage, dateHelpers } from '../utils/helpers';
import { problemService } from '../services/api.service';

const profileMetrics = [
  { label: 'Total complaints', value: '24', accent: 'from-blue-500 to-cyan-500' },
  { label: 'Resolved %', value: '92%', accent: 'from-emerald-400 to-teal-400' },
  { label: 'Pending', value: '4', accent: 'from-amber-400 to-orange-400' },
  { label: 'Satisfaction', value: '4.6/5', accent: 'from-violet-500 to-pink-500' }
];

const recentTimeline = [
  { title: 'Rector verified your plumbing complaint', subtitle: 'Your issue moved to worker assignment', time: '12m ago' },
  { title: 'Worker accepted your request', subtitle: 'Repair scheduled for today', time: '1h ago' },
  { title: 'Status updated to In Progress', subtitle: 'Maintenance team is on site', time: '3h ago' }
];

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    hostel: '',
    room: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    active: 0
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = storage.getUser();
        setUser(storedUser);
        setFormData({
          name: storedUser?.name || '',
          email: storedUser?.email || '',
          mobile: storedUser?.mobile || '',
          hostel: storedUser?.hostel || '',
          room: storedUser?.room || 'A-302'
        });
        const result = await problemService.getIssueStats();
        setStats({
          total: result.total || 0,
          completed: (result.completed || 0) + (result.closed || 0),
          active: result.inProgress || 0
        });
      } catch (err) {
        console.error(err);
        setAlert({ type: 'error', message: 'Unable to load profile data.' });
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    storage.setUser(updatedUser);
    setUser(updatedUser);
    setIsEditing(false);
    setAlert({ type: 'success', message: 'Profile saved successfully.' });
  };

  const completion = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        <LoadingSpinner text="Loading profile..." />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/6 p-10 shadow-[0_50px_140px_rgba(15,23,42,0.32)] backdrop-blur-[24px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.08),_transparent_18%)]" />
          <div className="absolute right-8 top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-10 bottom-16 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid gap-8 xl:grid-cols-[1.4fr_1fr] xl:items-center">
            <div className="relative z-10 space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Student profile</p>
              <h1 className="max-w-3xl text-5xl font-semibold text-white tracking-tight">Your student command center</h1>
              <p className="max-w-2xl text-lg text-slate-300">Track complaints, see live updates, and manage your profile with a premium experience.</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Profile Completion</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{completion}%</p>
                  <div className="mt-3 w-full bg-slate-950/70 h-3 rounded-full overflow-hidden">
                    <div className="h-3 rounded-full bg-cyan-400" style={{ width: `${completion}%` }} />
                  </div>
                </div>
                <div className="rounded-[32px] border border-white/10 bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Student status</p>
                  <div className="mt-3 flex items-center gap-3">
                    <StatusPill status={completion > 80 ? 'Active' : 'Pending'} />
                    <p className="text-sm text-slate-300">Keep your details updated for faster support.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.3)]">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute right-8 bottom-12 h-24 w-24 rounded-full bg-violet-500/10 blur-3xl" />
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-6">
                  <div className="flex h-28 w-28 items-center justify-center rounded-[28px] bg-gradient-to-br from-blue-500 to-cyan-400 text-5xl text-white shadow-xl shadow-cyan-500/15">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Welcome back</p>
                    <h2 className="text-3xl font-semibold text-white">{user?.name}</h2>
                    <p className="mt-2 text-slate-300">{user?.role || 'Student'} • {user?.hostel || 'Hostel 1'} • Room {formData.room}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-300">Active</span>
                      <span className="text-sm text-slate-400">Member since {dateHelpers.formatDate(user?.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[28px] bg-slate-900/90 p-5 border border-white/10">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Email</p>
                    <p className="mt-3 text-lg font-semibold text-white">{user?.email}</p>
                  </div>
                  <div className="rounded-[28px] bg-slate-900/90 p-5 border border-white/10">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Hostel</p>
                    <p className="mt-3 text-lg font-semibold text-cyan-300">{formData.hostel || 'Not assigned'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-4"
        >
          {profileMetrics.map((metric) => (
            <Card key={metric.label} className="p-6 hover:-translate-y-1 transition">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{metric.label}</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
                </div>
                <div className={`h-14 w-14 rounded-3xl bg-gradient-to-br ${metric.accent} text-white flex items-center justify-center shadow-lg shadow-slate-900/30`}>
                  •
                </div>
              </div>
            </Card>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]"
        >
          <Card className="p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Profile analytics</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Performance at a glance</h2>
              </div>
              <Button variant="secondary" onClick={() => navigate('/student/dashboard')}>View dashboard</Button>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-white/5 p-5 border border-white/10 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Completion rate</p>
                <p className="mt-3 text-3xl font-semibold text-white">{completion}%</p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-950/70">
                  <div className="h-3 rounded-full bg-cyan-400" style={{ width: `${completion}%` }} />
                </div>
              </div>
              <div className="rounded-[28px] bg-white/5 p-5 border border-white/10 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Active complaints</p>
                <p className="mt-3 text-3xl font-semibold text-cyan-300">{stats.active}</p>
                <p className="mt-3 text-sm text-slate-400">Issues currently being worked on by support.</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Recent activity</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Live student feed</h2>
            <div className="mt-8 space-y-4">
              {recentTimeline.map((item) => (
                <div key={item.title} className="rounded-[28px] border border-white/10 bg-slate-950/90 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-white font-semibold">{item.title}</p>
                      <p className="mt-2 text-sm text-slate-400">{item.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6, ease: 'easeOut' }}
          className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]"
        >
          <Card className="p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Edit profile</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Your details</h2>
              </div>
              {!isEditing ? (
                <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>Edit profile</Button>
              ) : (
                <div className="flex gap-3">
                  <Button variant="success" size="sm" onClick={handleSave}>Save</Button>
                  <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              )}
            </div>
            <div className="mt-8 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] bg-white/5 p-5 border border-white/10">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="bg-slate-950 text-white border-white/20 placeholder:text-slate-500"
                    />
                  ) : (
                    <p className="text-white">{formData.name}</p>
                  )}
                </div>
                <div className="rounded-[28px] bg-white/5 p-5 border border-white/10">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <p className="text-white">{formData.email}</p>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] bg-white/5 p-5 border border-white/10">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Mobile</label>
                  {isEditing ? (
                    <Input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Mobile number"
                      className="bg-slate-950 text-white border-white/20 placeholder:text-slate-500"
                    />
                  ) : (
                    <p className="text-white">{formData.mobile || 'Not provided'}</p>
                  )}
                </div>
                <div className="rounded-[28px] bg-white/5 p-5 border border-white/10">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Hostel</label>
                  {isEditing ? (
                    <Input
                      name="hostel"
                      value={formData.hostel}
                      onChange={handleInputChange}
                      placeholder="Hostel block"
                      className="bg-slate-950 text-white border-white/20 placeholder:text-slate-500"
                    />
                  ) : (
                    <p className="text-white">{formData.hostel || 'Not assigned'}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[28px] bg-white/5 p-5 border border-white/10">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Room</label>
                  {isEditing ? (
                    <Input
                      name="room"
                      value={formData.room}
                      onChange={handleInputChange}
                      placeholder="Room number"
                      className="bg-slate-950 text-white border-white/20 placeholder:text-slate-500"
                    />
                  ) : (
                    <p className="text-white">{formData.room}</p>
                  )}
                </div>
                <div className="rounded-[28px] bg-white/5 p-5 border border-white/10">
                  <label className="block text-sm font-medium text-slate-400 mb-2">Academic year</label>
                  <p className="text-white">Second Year</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Student engagement</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Recent profile activity</h2>
            <div className="mt-8 space-y-4">
              {recentTimeline.map((activity) => (
                <div key={activity.title} className="rounded-[28px] border border-white/10 bg-slate-950/90 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-white font-semibold">{activity.title}</p>
                      <p className="mt-2 text-sm text-slate-400">{activity.subtitle}</p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-400">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>
      </div>

      {alert && (
        <div className="mt-6">
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        </div>
      )}
    </DashboardLayout>
  );
}
