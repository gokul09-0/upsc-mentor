'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { 
  TrendingUp, 
  Target, 
  Flame, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Calendar,
  BarChart3
} from 'lucide-react';
import { fetchProgressSummary } from '@/lib/api';

export default function ProgressPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchProgressSummary().then((res) => setData(res));
  }, []);

  if (!data) return null;

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-sky-400" />
              <span>Student Learning Analytics & Performance Dashboard</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Real-time progress tracking, accuracy metrics, topic weakness diagnostics, and historical mock test performance.
            </p>
          </div>

          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Cumulative Accuracy</p>
                <h3 className="text-2xl font-bold text-white mt-1">{data.overall_accuracy}%</h3>
                <p className="text-[10px] text-emerald-400 mt-1">Target: &gt;75% for Prelims</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Target className="w-5 h-5" />
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Study Streak</p>
                <h3 className="text-2xl font-bold text-white mt-1">{data.study_streak_days} Days</h3>
                <p className="text-[10px] text-amber-400 mt-1">Consistency Streak Active</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Tests Completed</p>
                <h3 className="text-2xl font-bold text-white mt-1">{data.total_tests_taken} Tests</h3>
                <p className="text-[10px] text-indigo-400 mt-1">{data.total_questions_answered} MCQs Solved</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-slate-400">Mains Answer Score</p>
                <h3 className="text-2xl font-bold text-white mt-1">62 / 100</h3>
                <p className="text-[10px] text-purple-400 mt-1">Evaluated by Tutor Agent</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Subject Wise Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-sky-400" />
                <span>Subject-Wise Accuracy Breakdown</span>
              </h3>

              <div className="space-y-4 pt-2">
                {data.subject_breakdown.map((item: any, idx: number) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{item.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {item.status}
                        </span>
                        <span className="font-bold text-sky-400">{item.accuracy}%</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.accuracy >= 80
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : item.accuracy >= 70
                            ? 'bg-gradient-to-r from-sky-500 to-indigo-500'
                            : 'bg-gradient-to-r from-amber-500 to-rose-500'
                        }`}
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Diagnostic Cards */}
            <div className="space-y-6">
              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-bold text-rose-400 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>High-Priority Weak Areas</span>
                </h3>
                <div className="space-y-2">
                  {data.weak_areas.map((w: string, i: number) => (
                    <div key={i} className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
                      ⚠️ {w}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-5 rounded-2xl border border-slate-800">
                <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Strong Topics</span>
                </h3>
                <div className="space-y-2">
                  {data.strong_areas.map((s: string, i: number) => (
                    <div key={i} className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                      ✓ {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Historical Mock Test Logs */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-4">Historical Mock Test Records</h3>
            <div className="space-y-3">
              {data.recent_tests.map((test: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{test.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{test.date}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-sky-400">{test.score} / {test.total} Marks</span>
                    <p className="text-[10px] text-emerald-400 font-semibold">{test.accuracy}% Accuracy</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
