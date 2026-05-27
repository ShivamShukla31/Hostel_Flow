import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <Navbar onMenuToggle={() => setSidebarOpen(true)} />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.14),_transparent_16%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_18%)]" />
        <div className="relative max-w-7xl mx-auto min-h-screen px-5 py-8 md:grid md:grid-cols-[auto_1fr] gap-8 xl:px-10">
          <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="space-y-8 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
