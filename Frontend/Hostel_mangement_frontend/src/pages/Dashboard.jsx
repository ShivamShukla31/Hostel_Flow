import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/helpers';
import Navigation from '../components/Navigation';
import Button from '../components/Button';
import Alert from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import Card from '../components/Card';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  const recentComplaints = [
    {
      title: 'Leaking ceiling in room 205',
      room: '205',
      status: 'Pending',
      category: 'Plumbing',
      priority: 'High',
      description: 'Ceiling leak near the study table. Water drips whenever the AC is on.'
    },
    {
      title: 'Broken door lock',
      room: '118',
      status: 'In Progress',
      category: 'Carpentry',
      priority: 'Medium',
      description: 'Room lock is damaged and requires a secure replacement.'
    },
    {
      title: 'Flickering hallway lights',
      room: '307',
      status: 'Completed',
      category: 'Electrical',
      priority: 'Low',
      description: 'Lighting stabilized after maintenance crew serviced the wiring.'
    }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = storage.getUser();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setAlert({ type: 'error', message: 'Failed to load profile' });
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <LoadingSpinner text="Loading Dashboard..." />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-slate-950 text-white"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95)), url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navigation user={user} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr] mb-8">
          <Card className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/95 shadow-2xl">
            <div className="relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-slate-950 opacity-90 blur-3xl" />
              <div className="relative p-8 lg:p-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="h-28 w-28 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1 shadow-lg shadow-cyan-500/20">
                        <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-5xl font-bold text-white shadow-inner">
                          {user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                      </div>
                      <span className="absolute -bottom-2 right-0 inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100 border border-emerald-500/20">
                        {user?.role}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Hostel Flow</p>
                      <h1 className="text-4xl font-semibold text-white">{user?.name}</h1>
                      <p className="mt-3 max-w-2xl text-slate-300">A premium portal for {user?.role?.toLowerCase()} operations, designed for fast decisions, clear status, and polished control.</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-950/90 border border-white/10 p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Email</p>
                      <p className="mt-3 text-lg font-semibold text-white">{user?.email}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-950/90 border border-white/10 p-5">
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Hostel</p>
                      <p className="mt-3 text-lg font-semibold text-white">{user?.hostel || 'Not assigned'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Reports</p>
                    <p className="mt-3 text-3xl font-bold text-cyan-300">0</p>
                    <p className="mt-2 text-slate-500 text-sm">Awaiting action</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Resolved</p>
                    <p className="mt-3 text-3xl font-bold text-emerald-300">0</p>
                    <p className="mt-2 text-slate-500 text-sm">Closed issues</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">In progress</p>
                    <p className="mt-3 text-3xl font-bold text-orange-300">0</p>
                    <p className="mt-2 text-slate-500 text-sm">Active workflows</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                      variant="primary"
                      className="min-w-[190px]"
                      onClick={() => navigate(user?.role === 'Rector' ? '/rector/profile' : user?.role === 'Worker' ? '/worker/profile' : '/profile')}
                  >
                      View Profile
                    </Button>
                  <Button
                    variant="secondary"
                    className="min-w-[190px] text-white border-white/20 hover:bg-white/10"
                    onClick={() =>
                      navigate(
                        user?.role === 'Rector'
                          ? '/rector/dashboard'
                          : user?.role === 'Worker'
                          ? '/worker/dashboard'
                          : '/student/problems'
                      )
                    }
                  >
                    Open {user?.role === 'Student' ? 'Problem Tracker' : 'Dashboard'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4">
            <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Overview</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/90 border border-white/10 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Open Cases</p>
                  <p className="mt-3 text-3xl font-bold text-blue-300">0</p>
                </div>
                <div className="rounded-3xl bg-slate-950/90 border border-white/10 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Tasks</p>
                  <p className="mt-3 text-3xl font-bold text-purple-300">0</p>
                </div>
              </div>
            </Card>
            <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Fast Actions</p>
              <div className="mt-6 space-y-4">
                <Button
                  variant="outline"
                  className="w-full text-white border-white/20 hover:bg-white/10"
                  onClick={() => navigate(user?.role === 'Rector' ? '/rector/profile' : user?.role === 'Worker' ? '/worker/profile' : '/profile')}
                >
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white/10" onClick={() => navigate('/') }>
                  Open Home Page
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Recent Complaints</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Latest issues at a glance</h2>
            </div>
            <Button
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => navigate('/student/problems')}
            >
              View all reports
            </Button>
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {recentComplaints.map((complaint) => (
              <Card key={complaint.title} className="border border-white/10 bg-slate-900/90 p-6 shadow-2xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Room {complaint.room}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{complaint.title}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${complaint.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-200' : complaint.status === 'In Progress' ? 'bg-orange-500/15 text-orange-200' : 'bg-yellow-500/15 text-yellow-200'}`}>
                    {complaint.status}
                  </span>
                </div>
                <p className="mt-4 text-slate-300">{complaint.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-300 border border-white/10">{complaint.category}</span>
                  <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-300 border border-white/10">Priority: {complaint.priority}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">How it works</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Hostel Flow process</h3>
            <div className="mt-6 space-y-4 text-slate-300">
              <div className="flex gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 text-blue-200">1</span>
                <p>Report an issue with a detailed description and photo.</p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 text-blue-200">2</span>
                <p>Rector verifies and assigns the best worker for the task.</p>
              </div>
              <div className="flex gap-3">
                <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 text-blue-200">3</span>
                <p>Worker updates progress until the issue is resolved.</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-[32px] border border-white/10 bg-slate-900/95 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Workflow tips</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Keep the process moving</h3>
            <div className="mt-6 space-y-4 text-slate-300">
              <div className="rounded-3xl bg-slate-950/90 p-4 border border-white/10">
                <p className="text-sm text-slate-400">Use clear descriptions to reduce back-and-forth.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-4 border border-white/10">
                <p className="text-sm text-slate-400">Keep issue photos updated for faster approvals.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/90 p-4 border border-white/10">
                <p className="text-sm text-slate-400">Respond quickly to status changes for best results.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
