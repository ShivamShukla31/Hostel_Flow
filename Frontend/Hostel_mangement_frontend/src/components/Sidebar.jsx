import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Bell,
  User,
  Settings,
  ChevronRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const navMap = {
  Student: [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Complaints', path: '/student/problems', icon: ClipboardList },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Notifications', path: '/analytics?panel=notifications', icon: Bell },
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/profile?tab=settings', icon: Settings }
  ],
  Rector: [
    { label: 'Dashboard', path: '/rector/dashboard', icon: LayoutDashboard },
    { label: 'Complaints', path: '/rector/complaints', icon: ClipboardList },
    { label: 'Assignments', path: '/rector/assignments', icon: ShieldCheck },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Notifications', path: '/analytics?panel=notifications', icon: Bell },
    { label: 'Profile', path: '/rector/profile', icon: User }
  ],
  Worker: [
    { label: 'Dashboard', path: '/worker/dashboard', icon: LayoutDashboard },
    { label: 'Complaints', path: '/worker/tasks', icon: ClipboardList },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Notifications', path: '/analytics?panel=notifications', icon: Bell },
    { label: 'Profile', path: '/worker/profile', icon: User },
    { label: 'Settings', path: '/profile?tab=settings', icon: Settings }
  ]
};

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = navMap[user?.role] || [];
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const MotionLink = motion.create ? motion.create(Link) : motion(Link);

  const expanded = mobileOpen || isPinned || isHovered;
  const sidebarWidth = mobileOpen ? 'calc(100vw - 2rem)' : expanded ? '18rem' : '5rem';

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={onClose}
      />

      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-4 top-6 z-40 flex min-h-[calc(100vh-3rem)] flex-col rounded-[32px] border border-white/10 bg-slate-950/95 p-4 shadow-[0_42px_120px_rgba(8,15,35,0.55)] backdrop-blur-3xl transition-all duration-300 md:relative md:top-0 md:left-0 md:min-h-0 md:h-auto md:w-auto md:translate-x-0 md:shadow-none${mobileOpen ? '' : ' md:shadow-[0_40px_110px_rgba(8,15,35,0.30)]'} ${mobileOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-[-110%] opacity-0 pointer-events-none md:translate-x-0 md:opacity-100 md:pointer-events-auto'}`}
        style={{ maxWidth: mobileOpen ? '28rem' : '100%' }}
      >
        <div className="flex items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-[28px] bg-slate-900/90 text-white shadow-[0_28px_80px_rgba(0,0,0,0.24)]">
              <img src="/favicon.svg" alt="Hostel Flow logo" className="h-12 w-12 rounded-3xl" />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-w-[12rem] opacity-100' : 'max-w-0 opacity-0'}`}>
              <p className="truncate text-base font-semibold text-white">Hostel Flow</p>
              <p className="mt-1 text-xs uppercase tracking-[0.28em] text-slate-500">{user?.role || 'Guest'} portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPinned((current) => !current)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-slate-200 transition hover:bg-slate-900/95 ${expanded ? 'shadow-[0_0_0_1px_rgba(56,189,248,0.16)]' : ''}`}
              aria-label={isPinned ? 'Pin sidebar open' : 'Unpin sidebar'}
            >
              <ChevronRight className={`h-5 w-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </button>
            {mobileOpen && (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-slate-200 transition hover:bg-slate-900/95 md:hidden"
                aria-label="Close sidebar"
              >
                <span className="text-xl leading-none">×</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 p-4 text-slate-300 shadow-[0_16px_55px_rgba(5,12,28,0.26)]">
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Workspace</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">A premium workspace for student complaints and resident intelligence.</p>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path.split('?')[0];
            const Icon = item.icon;
            return (
              <MotionLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  onClose();
                  if (mobileOpen) setIsPinned(true);
                }}
                title={expanded ? undefined : item.label}
                className={`group relative flex items-center gap-4 overflow-hidden rounded-3xl px-3 py-4 text-sm font-medium transition duration-200 ${
                  active
                    ? 'bg-slate-900/90 text-white shadow-[0_24px_70px_rgba(56,189,248,0.12)]'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
                whileHover={{ x: 4 }}
              >
                <span
                  className={`absolute left-0 top-0 h-full w-1 rounded-tr-full rounded-br-full bg-cyan-400 transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'}`}
                />
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${active ? 'bg-cyan-500/10 text-cyan-300' : 'bg-slate-900/80 text-slate-200'} transition`}> 
                  <Icon className="h-5 w-5" />
                </span>
                <span className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-w-[12rem] opacity-100' : 'max-w-0 opacity-0'}`}>
                  {item.label}
                </span>
              </MotionLink>
            );
          })}
        </nav>

        <div className="mt-auto overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 p-5 text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Ready</p>
              <p className="mt-2 text-sm text-slate-200">Your workspace is optimized for calm focus.</p>
            </div>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
              <Sparkles className="h-4 w-4" />
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/profile?tab=settings')}
            className="mt-5 inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:bg-white/10"
          >
            Open workspace settings
          </button>
        </div>
      </motion.aside>
    </>
  );
}
