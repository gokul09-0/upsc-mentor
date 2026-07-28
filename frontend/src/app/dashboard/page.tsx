'use client';

import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { 
  Sparkles, 
  MessageSquare, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  Flame, 
  ArrowRight, 
  ExternalLink,
  Target,
  Award,
  BookMarked
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#f4f1ea] text-[#19241d]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-8 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* Header Section matching Image 2 */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-[#78877d] tracking-widest uppercase mb-1">
                TUESDAY, 28 JULY
              </p>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#19241d] tracking-tight">
                Good morning, Gokul
              </h1>
            </div>

            {/* Avatar Circle */}
            <div className="w-10 h-10 rounded-full bg-[#c89b58] text-[#19241d] font-serif font-bold flex items-center justify-center text-base shadow-sm">
              G
            </div>
          </div>

          {/* Hero Banner Card matching Image 2 Dark Card (#1a2536) */}
          <div className="bg-[#1a2536] text-white p-6 lg:p-8 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-2xl">
              <p className="text-[10px] font-bold text-[#d9ad67] tracking-widest uppercase">
                CONTINUE WHERE YOU LEFT OFF
              </p>

              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white leading-snug">
                Indian Polity — Directive Principles of State Policy
              </h2>

              <p className="text-xs text-slate-300">
                Lesson 7 of 12 · Est. 14 min remaining
              </p>

              {/* Progress Bar matching Image 2 */}
              <div className="w-full bg-slate-700/60 h-1.5 rounded-full overflow-hidden my-3">
                <div className="bg-[#d9ad67] h-full rounded-full" style={{ width: '62%' }} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 font-medium">62% complete</span>
                <Link
                  href="/chat?q=Explain+Directive+Principles+of+State+Policy+Article+36-51"
                  className="px-5 py-2.5 rounded-xl bg-[#d9ad67] hover:bg-[#ca9d55] text-[#1a2536] font-bold text-xs flex items-center gap-2 transition-colors shadow-md"
                >
                  <span>Resume lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Analytics Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#e4dec8] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-[#78877d]">Overall Accuracy</p>
                <h3 className="text-2xl font-serif font-bold text-[#19241d] mt-1">78.5%</h3>
                <p className="text-[10px] text-emerald-700 font-medium mt-1">↑ +4.2% this week</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#22352a]/10 flex items-center justify-center text-[#22352a]">
                <Target className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#e4dec8] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-[#78877d]">Current Study Streak</p>
                <h3 className="text-2xl font-serif font-bold text-[#19241d] mt-1">12 Days</h3>
                <p className="text-[10px] text-[#c2934b] font-medium mt-1">🔥 Top 5% Aspirants</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#c2934b]/10 flex items-center justify-center text-[#c2934b]">
                <Flame className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#e4dec8] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-[#78877d]">Tests Evaluated</p>
                <h3 className="text-2xl font-serif font-bold text-[#19241d] mt-1">14 Tests</h3>
                <p className="text-[10px] text-indigo-700 font-medium mt-1">180 Questions Solved</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-800">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#e4dec8] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-[#78877d]">Indexed Materials</p>
                <h3 className="text-2xl font-serif font-bold text-[#19241d] mt-1">24 PDFs</h3>
                <p className="text-[10px] text-[#22352a] font-medium mt-1">1,500+ Vector Chunks</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#22352a]">
                <BookMarked className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Section: Your Courses matching Image 2 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-[#19241d]">Your courses</h3>
              <Link href="/materials" className="text-xs text-[#22352a] font-bold underline hover:text-[#32473a]">
                View all
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Course Card 1 */}
              <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm space-y-3 relative overflow-hidden hover:border-[#22352a] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[#9c6a1e] tracking-widest uppercase">
                    POLITY
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-700 text-white">
                    62%
                  </span>
                </div>

                <h4 className="text-base font-serif font-bold text-[#19241d]">
                  Constitution & Governance
                </h4>

                <p className="text-xs text-[#445249] leading-relaxed">
                  Fundamental Rights, DPSPs, Union-State relations, and recent constitutional amendments.
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#f0ece1]">
                  <span className="text-[10px] text-[#78877d]">M. Laxmikanth • 12 Lessons</span>
                  <Link
                    href="/chat?q=Ask+about+Constitution+and+Governance"
                    className="text-xs text-[#22352a] font-bold hover:underline"
                  >
                    Study Course →
                  </Link>
                </div>
              </div>

              {/* Course Card 2 */}
              <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm space-y-3 relative overflow-hidden hover:border-[#22352a] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[#9c6a1e] tracking-widest uppercase">
                    GEOGRAPHY
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-800 text-white">
                    81%
                  </span>
                </div>

                <h4 className="text-base font-serif font-bold text-[#19241d]">
                  Physical & Indian Geography
                </h4>

                <p className="text-xs text-[#445249] leading-relaxed">
                  Monsoon systems, river networks, physiographic divisions, and climate zones.
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#f0ece1]">
                  <span className="text-[10px] text-[#78877d]">NCERT Class 11-12 • 14 Lessons</span>
                  <Link
                    href="/chat?q=Ask+about+Physical+Geography"
                    className="text-xs text-[#22352a] font-bold hover:underline"
                  >
                    Study Course →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Current Affairs Section */}
          <div className="bg-white p-6 rounded-xl border border-[#e4dec8] shadow-sm space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#19241d] flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-[#22352a]" />
              <span>Daily Current Affairs (PIB Updates)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#f7f4ef] border border-[#e4dec8]">
                <span className="text-[9px] font-bold text-[#8c6527] uppercase tracking-wider">GS-III • ENVIRONMENT</span>
                <h4 className="text-xs font-serif font-bold text-[#19241d] mt-1">National Clean Energy Initiative Update</h4>
                <p className="text-xs text-[#445249] mt-1 leading-relaxed">
                  Cabinet approves expanded financial assistance for renewable microgrids in tribal belts.
                </p>
                <Link
                  href="/chat?q=Analyze+National+Clean+Energy+Initiative+PIB"
                  className="text-xs text-[#22352a] font-bold hover:underline inline-flex items-center gap-1 mt-3"
                >
                  <span>Analyze with Research Agent →</span>
                </Link>
              </div>

              <div className="p-4 rounded-xl bg-[#f7f4ef] border border-[#e4dec8]">
                <span className="text-[9px] font-bold text-[#22352a] uppercase tracking-wider">GS-II • POLITY</span>
                <h4 className="text-xs font-serif font-bold text-[#19241d] mt-1">Supreme Court Ruling on Electoral Reforms</h4>
                <p className="text-xs text-[#445249] mt-1 leading-relaxed">
                  Constitution bench issues directives regarding candidate asset disclosure mandates.
                </p>
                <Link
                  href="/chat?q=Supreme+Court+ruling+on+electoral+reforms+2025"
                  className="text-xs text-[#22352a] font-bold hover:underline inline-flex items-center gap-1 mt-3"
                >
                  <span>Analyze with Research Agent →</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
