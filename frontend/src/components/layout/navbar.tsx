'use client';

import React from 'react';
import { Search, Flame, Bell, Moon, Sun } from 'lucide-react';

export function Navbar() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <header className="h-16 border-b border-slate-800 glass-panel sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Global Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search Laxmikanth, Current Affairs, MCQs..."
          className="w-full bg-slate-900/80 text-xs text-white placeholder-slate-500 pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500 transition-colors"
        />
      </div>

      {/* Stats & Actions */}
      <div className="flex items-center gap-4">
        {/* Study Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>12 Day Streak</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 relative transition-colors">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-sky-500 absolute top-1.5 right-1.5" />
        </button>
      </div>
    </header>
  );
}
