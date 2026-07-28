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
    <div className="flex min-h-screen bg-[#f4f1ea] text-[#19241d]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-6 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#19241d] tracking-tight flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#22352a]" />
              <span>Student Learning Analytics & Performance Dashboard</span>
            </h1>
            <p className="text-[#445249] text-xs mt-1">
              Real-time progress tracking, accuracy metrics, topic weakness diagnostics, and historical mock test performance.
            </p>
          </div>

          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#78877d]">Cumulative Accuracy</p>
                <h3 className="text-3xl font-serif font-bold text-[#19241d] mt-1">{data.overall_accuracy}%</h3>
                <p className="text-[10px] text-emerald-800 font-bold mt-1">Target: &gt;75% for Prelims</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#22352a]/10 flex items-center justify-center text-[#22352a]">
                <Target className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#78877d]">Study Streak</p>
                <h3 className="text-3xl font-serif font-bold text-[#19241d] mt-1">{data.study_streak_days} Days</h3>
                <p className="text-[10px] text-[#c2934b] font-bold mt-1">Consistency Streak Active</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#c2934b]/10 flex items-center justify-center text-[#c2934b]">
                <Flame className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#78877d]">Tests Completed</p>
                <h3 className="text-3xl font-serif font-bold text-[#19241d] mt-1">{data.total_tests_taken} Tests</h3>
                <p className="text-[10px] text-indigo-900 font-bold mt-1">{data.total_questions_answered} MCQs Solved</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-900">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-[#78877d]">Mains Answer Score</p>
                <h3 className="text-3xl font-serif font-bold text-[#19241d] mt-1">62 / 100</h3>
                <p className="text-[10px] text-[#22352a] font-bold mt-1">Evaluated by Tutor Agent</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#22352a]">
                <BarChart3 className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Subject Wise Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-[#e4dec8] shadow-sm space-y-4">
              <h3 className="text-base font-serif font-bold text-[#19241d] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#22352a]" />
                <span>Subject-Wise Accuracy Breakdown</span>
              </h3>

              <div className="space-y-4 pt-2">
                {data.subject_breakdown.map((item: any, idx: number) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#19241d]">{item.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f7f4ef] text-[#19241d] border border-[#e4dec8]">
                          {item.status}
                        </span>
                        <span className="font-bold text-[#22352a]">{item.accuracy}%</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2.5 rounded-full bg-[#f7f4ef] overflow-hidden border border-[#e4dec8]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.accuracy >= 80
                            ? 'bg-emerald-700'
                            : item.accuracy >= 70
                            ? 'bg-[#22352a]'
                            : 'bg-amber-600'
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
              <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm">
                <h3 className="text-xs font-bold text-rose-800 flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>High-Priority Weak Areas</span>
                </h3>
                <div className="space-y-2">
                  {data.weak_areas.map((w: string, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 text-xs font-bold">
                      ⚠️ {w}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm">
                <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Verified Strong Topics</span>
                </h3>
                <div className="space-y-2">
                  {data.strong_areas.map((s: string, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-bold">
                      ✓ {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Historical Mock Test Logs */}
          <div className="bg-white p-6 rounded-xl border border-[#e4dec8] shadow-sm">
            <h3 className="text-base font-serif font-bold text-[#19241d] mb-4">Historical Mock Test Records</h3>
            <div className="space-y-3">
              {data.recent_tests.map((test: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-[#f7f4ef] border border-[#e4dec8] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#19241d]">{test.title}</h4>
                    <p className="text-[10px] text-[#78877d] mt-0.5 flex items-center gap-2 font-medium">
                      <Calendar className="w-3 h-3 text-[#78877d]" />
                      <span>{test.date}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#22352a]">{test.score} / {test.total} Marks</span>
                    <p className="text-[10px] text-emerald-800 font-bold">{test.accuracy}% Accuracy</p>
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
