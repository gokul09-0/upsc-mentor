'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  User, 
  Settings,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'AI Chat', href: '/chat', icon: MessageSquare, badge: '4 Agents' },
  { label: 'Study Materials', href: '/materials', icon: BookOpen },
  { label: 'Mock Test', href: '/mock-test', icon: GraduationCap },
  { label: 'Progress Dashboard', href: '/progress', icon: TrendingUp },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass-panel h-screen sticky top-0 border-r border-slate-800 flex flex-col justify-between p-4 z-40">
      <div>
        {/* Logo Brand */}
        <Link href="/dashboard" className="flex items-center gap-3 px-3 py-4 mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-white flex items-center gap-1.5">
              UPSC AI <span className="gradient-text font-extrabold">Mentor</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">AI SDLC Production v1.0</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Quick Info */}
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
            UA
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">IAS Aspirant</p>
            <p className="text-[10px] text-slate-400 truncate">Target 2025 • PSIR</p>
          </div>
        </div>
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
      </div>
    </aside>
  );
}
