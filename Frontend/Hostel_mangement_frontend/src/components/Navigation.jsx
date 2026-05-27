import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { storage } from '../utils/helpers';
import { authService } from '../services/api.service';
import Button from './Button';

const Navigation = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
      storage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Force logout even if API call fails
      storage.clear();
      navigate('/login');
    }
  };

  const getNavigationItems = () => {
    const role = user?.role;
    const baseItems = [
      { path: '/', label: 'Home', icon: '🏠' },
    ];

    switch (role) {
      case 'Student':
        return [
          ...baseItems,
          { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/student/problems', label: 'My Problems', icon: '📋' },
          { path: '/profile', label: 'Profile', icon: '👤' },
        ];
      case 'Rector':
        return [
          ...baseItems,
          { path: '/rector/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/rector/complaints', label: 'Complaints', icon: '✅' },
          { path: '/rector/profile', label: 'Profile', icon: '👤' },
        ];
      case 'Worker':
        return [
          ...baseItems,
          { path: '/worker/dashboard', label: 'My Tasks', icon: '🔧' },
          { path: '/profile', label: 'Profile', icon: '👤' },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-slate-950/95 text-white shadow-lg sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
              {/* Logo/Brand */}
          <div className="flex flex-col gap-1">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{user?.role || 'Guest'} Portal</p>
            <p className="text-sm text-slate-300">Workspace navigation</p>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600/20 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Profile Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <select
                onChange={(e) => navigate(e.target.value)}
                value={location.pathname}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                {navigationItems.map((item) => (
                  <option key={item.path} value={item.path}>
                    {item.icon} {item.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-white/5 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="hidden sm:block">{user?.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-950 rounded-md shadow-2xl py-1 z-50 border border-white/10">
                  <div className="px-4 py-2 border-b border-white/10">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-600/15 text-blue-200 mt-1">
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      const profilePath = user?.role === 'Rector' ? '/rector/profile' : user?.role === 'Worker' ? '/worker/profile' : '/profile';
                      navigate(profilePath);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-white/5"
                  >
                    👤 Profile Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;