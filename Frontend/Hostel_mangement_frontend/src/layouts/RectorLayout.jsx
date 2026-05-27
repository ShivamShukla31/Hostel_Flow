import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function RectorLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#040712] text-white">
      <Navbar onMenuToggle={() => setSidebarOpen(true)} />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_20%)]" />
        <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400/15 to-violet-500/5 blur-3xl" />
        <div className="absolute right-10 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-fuchsia-500/10 to-sky-500/0 blur-3xl" />
        <div className="relative max-w-7xl mx-auto min-h-screen px-6 py-10 md:grid md:grid-cols-[auto_1fr] gap-8 lg:px-10">
          <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="space-y-8 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
