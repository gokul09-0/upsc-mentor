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
  ShieldCheck
} from 'lucide-react';

const navItems = [
  { label: 'Study Desk', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Doubts (AI Chat)', href: '/chat', icon: MessageSquare, badge: '4 Agents' },
  { label: 'Materials', href: '/materials', icon: BookOpen },
  { label: 'Mock Tests', href: '/mock-test', icon: GraduationCap },
  { label: 'Progress', href: '/progress', icon: TrendingUp },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#22352a] text-slate-100 h-screen sticky top-0 border-r border-[#2d4235] flex flex-col justify-between p-5 z-40 shrink-0">
      <div>
        {/* Brand Header matching Image 2 (Diamond + Name) */}
        <Link href="/dashboard" className="flex items-center gap-2 px-2 py-4 mb-6 group">
          <span className="text-amber-400 text-lg">◆</span>
          <h1 className="font-serif font-bold text-xl tracking-tight text-white">
            UPSC AI Mentor
          </h1>
        </Link>

        {/* Navigation Links with Bullet Point design matching Image 2 */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#32473a] text-white font-semibold shadow-sm'
                    : 'text-[#bdceb5] hover:text-white hover:bg-[#293e32]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs ${isActive ? 'text-amber-400 font-bold' : 'text-[#8ba295]'}`}>•</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-amber-400/20 text-amber-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Quick Info */}
      <div className="p-3 rounded-xl bg-[#1c2d23] border border-[#2d4235] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#d9ad67] text-[#1a2536] font-bold flex items-center justify-center text-xs">
            G
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">IAS Aspirant</p>
            <p className="text-[10px] text-[#8ba295] truncate">Target 2025 • PSIR</p>
          </div>
        </div>
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
      </div>
    </aside>
  );
}
