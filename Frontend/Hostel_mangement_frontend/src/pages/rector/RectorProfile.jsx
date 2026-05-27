import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
void motion;
import RectorLayout from '../../layouts/RectorLayout';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import Input from '../../components/Input';
import StatusPill from '../../components/StatusPill';
import { storage, dateHelpers } from '../../utils/helpers';

const rectorStats = [
  { label: 'Complaints Approved', value: 312, color: 'text-emerald-300' },
  { label: 'Active Workers', value: 18, color: 'text-blue-300' },
  { label: 'Pending Reviews', value: 7, color: 'text-amber-300' },
  { label: 'Resolution Efficiency', value: '89%', color: 'text-violet-300' }
];

const activity = [
  { title: 'Approved complaint: Water Leak', detail: 'Assigned to Worker T-32', time: '2h ago' },
  { title: 'Reviewed: Electrical checks', detail: 'Marked for immediate action', time: '6h ago' },
  { title: 'Created assignment roster', detail: 'Allocated workers for Block B', time: 'Yesterday' }
];

export default function RectorProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', hostel: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const stored = storage.getUser();
        setUser(stored);
        setFormData({
          name: stored?.name || '',
          email: stored?.email || '',
          mobile: stored?.mobile || '',
          hostel: stored?.hostel || ''
        });
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = () => {
    const updated = { ...user, ...formData };
    storage.setUser(updated);
    setUser(updated);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white">
        <LoadingSpinner text="Loading Rector profile..." />
      </div>
    );
  }

  return (
    <RectorLayout>
      <div className="space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/6 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.28)] backdrop-blur-[24px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(139,92,246,0.10),_transparent_18%)]" />
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] items-center">
            <div className="relative z-10 space-y-4">
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Rector profile</p>
              <h1 className="text-4xl font-semibold text-white">{user?.name}</h1>
              <p className="text-slate-300">Operational control center for hostel workflows and approvals.</p>
              <div className="mt-4 flex items-center gap-3">
                <StatusPill status="Active" />
                      <p className="text-sm text-slate-400">Member since {dateHelpers.formatDate(user?.createdAt)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] bg-slate-950/85 p-5 border border-white/10">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Contact</p>
                <p className="mt-2 text-lg text-white">{user?.email}</p>
                <p className="mt-1 text-sm text-slate-400">{user?.mobile || 'Not provided'}</p>
              </div>
              <div className="rounded-[28px] bg-slate-950/85 p-5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Hostel</p>
                  <p className="mt-2 text-lg text-cyan-300">{formData.hostel || 'Main Campus'}</p>
                </div>
                <div className="text-right">
                  {!isEditing ? (
                    <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="success" size="sm" onClick={handleSave}>Save</Button>
                      <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Statistics</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Operational overview</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {rectorStats.map((s) => (
                <div key={s.label} className="rounded-3xl border border-white/10 bg-slate-950/85 p-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{s.label}</p>
                  <p className={`mt-3 text-3xl font-semibold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Activity</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Recent actions</h2>
            <div className="mt-6 space-y-4">
              {activity.map((a) => (
                <div key={a.title} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{a.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{a.detail}</p>
                    </div>
                    <span className="text-sm text-slate-400">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <Card className="p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Management analytics</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Resolution & workload</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-white/5 p-5 border border-white/10 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Resolution efficiency</p>
                <p className="mt-3 text-3xl font-semibold text-white">89%</p>
              </div>
              <div className="rounded-[28px] bg-white/5 p-5 border border-white/10 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Active workers</p>
                <p className="mt-3 text-3xl font-semibold text-cyan-300">18</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Quick settings</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Operational controls</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Auto-approve low-risk</p>
                </div>
                <div>
                  <StatusPill status="On" />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Notify workers on assign</p>
                </div>
                <div>
                  <StatusPill status="On" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </RectorLayout>
  );
}
