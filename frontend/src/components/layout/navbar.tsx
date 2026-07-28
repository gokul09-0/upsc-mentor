'use client';

import React from 'react';
import { Search, Flame, Bell, Moon, Sun } from 'lucide-react';

export function Navbar() {
  return (
    <header className="h-16 border-b border-[#e4dec8] bg-[#f4f1ea] sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Global Search Bar */}
      <div className="relative w-80">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78877d]" />
        <input
          type="text"
          placeholder="Search Laxmikanth, Current Affairs, MCQs..."
          className="w-full bg-[#e9e4d9] text-xs text-[#19241d] placeholder-[#78877d] pl-9 pr-4 py-2 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a] transition-colors"
        />
      </div>

      {/* Stats & Actions */}
      <div className="flex items-center gap-4">
        {/* Study Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e9e2d0] border border-[#d9ceb5] text-[#8c6527] text-xs font-semibold">
          <Flame className="w-4 h-4 text-[#c2934b] fill-[#c2934b] animate-pulse" />
          <span>12 Day Streak</span>
        </div>

        {/* User Initial Circle matching Image 2 */}
        <div className="w-8 h-8 rounded-full bg-[#c89b58] text-[#19241d] font-bold text-xs flex items-center justify-center shadow-sm">
          G
        </div>
      </div>
    </header>
  );
}
