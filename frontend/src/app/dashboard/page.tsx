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
  Search,
  ExternalLink,
  Target,
  Award,
  BookMarked
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-sky-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Target UPSC Civil Services 2025</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Welcome back, <span className="gradient-text">Aspirant!</span>
              </h1>
              <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                Your AI Multi-Agent Mentor is active. Ask conceptual doubts from Laxmikanth, search live PIB current affairs, or evaluate your answer writing skills.
              </p>
              
              <div className="flex items-center gap-3 mt-4">
                <Link
                  href="/chat"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start AI Chat Session</span>
                </Link>
                <Link
                  href="/mock-test"
                  className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-2 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-sky-400" />
                  <span>Take Quick Mock Test</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Core Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Overall Accuracy</p>
                <h3 className="text-2xl font-bold text-white mt-1">78.5%</h3>
                <p className="text-[10px] text-emerald-400 font-medium mt-1">↑ +4.2% this week</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Target className="w-5 h-5" />
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Current Study Streak</p>
                <h3 className="text-2xl font-bold text-white mt-1">12 Days</h3>
                <p className="text-[10px] text-amber-400 font-medium mt-1">🔥 Top 5% Aspirants</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Tests Evaluated</p>
                <h3 className="text-2xl font-bold text-white mt-1">14 Tests</h3>
                <p className="text-[10px] text-indigo-400 font-medium mt-1">180 Questions Solved</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Indexed Materials</p>
                <h3 className="text-2xl font-bold text-white mt-1">24 PDFs</h3>
                <p className="text-[10px] text-purple-400 font-medium mt-1">1,500+ Vector Chunks</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <BookMarked className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Grid Layout for Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 Cols): Recent Chats & Continue Learning */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning Banner */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    <span>Continue Learning</span>
                  </h3>
                  <Link href="/materials" className="text-xs text-sky-400 hover:underline flex items-center gap-1">
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        Polity • Laxmikanth
                      </span>
                      <h4 className="text-xs font-semibold text-white mt-1.5">Chapter 30: Governor & State Executive</h4>
                      <p className="text-[11px] text-slate-400">Discretionary powers under Article 200 & Sarkaria Commission recommendations.</p>
                    </div>
                    <Link
                      href="/chat"
                      className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-400 text-xs font-medium hover:bg-sky-500/30 transition-colors"
                    >
                      Ask Mentor
                    </Link>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Economy • Economic Survey
                      </span>
                      <h4 className="text-xs font-semibold text-white mt-1.5">Monetary Policy Committee & Repo Rate Dynamics</h4>
                      <p className="text-[11px] text-slate-400">Inflation targeting framework (4% +/- 2%) & RBI Act Section 45ZB.</p>
                    </div>
                    <Link
                      href="/chat"
                      className="px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-400 text-xs font-medium hover:bg-sky-500/30 transition-colors"
                    >
                      Ask Mentor
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent AI Conversations */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    <span>Recent AI Mentor Sessions</span>
                  </h3>
                  <Link href="/chat" className="text-xs text-sky-400 hover:underline">
                    New Chat
                  </Link>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Comparison of Presidential vs Parliamentary Form</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Tutor Agent • 2 hours ago</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">RAG Context</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Latest PIB Release on Green Hydrogen Mission 2025</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Research Agent (Tavily) • Yesterday</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Web Search</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Daily Current Affairs & Recommended Materials */}
            <div className="space-y-6">
              {/* Daily Current Affairs Widget */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>Daily Current Affairs (PIB)</span>
                </h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">GS-III • Environment</span>
                    <h4 className="text-xs font-semibold text-white mt-1">National Clean Energy Initiative Update</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      Cabinet approves expanded financial assistance for renewable microgrids in tribal belts.
                    </p>
                    <Link
                      href="/chat?q=Tell+me+about+National+Clean+Energy+Initiative+PIB"
                      className="text-[10px] text-sky-400 font-medium hover:underline inline-flex items-center gap-1 mt-2"
                    >
                      <span>Analyze with Research Agent</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-[9px] font-bold text-sky-400 uppercase tracking-wider">GS-II • Polity</span>
                    <h4 className="text-xs font-semibold text-white mt-1">Supreme Court Landmark Ruling on Electoral Reforms</h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      Constitution bench issues guidelines on election disclosure mandates.
                    </p>
                    <Link
                      href="/chat?q=Supreme+Court+ruling+on+electoral+reforms+2025"
                      className="text-[10px] text-sky-400 font-medium hover:underline inline-flex items-center gap-1 mt-2"
                    >
                      <span>Analyze with Research Agent</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recommended Core Textbooks */}
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Recommended Study Materials</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50">
                    <span className="font-medium text-slate-200">M. Laxmikanth (Polity)</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">100% Vectorized</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50">
                    <span className="font-medium text-slate-200">Spectrum Modern History</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">100% Vectorized</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50">
                    <span className="font-medium text-slate-200">Economic Survey Highlights</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">100% Vectorized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
