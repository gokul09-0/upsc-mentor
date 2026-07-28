'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { User, ShieldCheck, Mail, Calendar, BookOpen, Award, Save } from 'lucide-react';

export default function ProfilePage() {
  const [fullName, setFullName] = useState('IAS Aspirant');
  const [email, setEmail] = useState('student@upscaimentor.ai');
  const [targetYear, setTargetYear] = useState('2025');
  const [optionalSubject, setOptionalSubject] = useState('Political Science & International Relations');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 space-y-6 overflow-y-auto max-w-4xl mx-auto w-full">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <User className="w-5 h-5 text-sky-400" />
              <span>User Profile & UPSC Civil Services Preparation Settings</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Manage your personal credentials, target exam year, and optional subject preferences.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/25">
                UA
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{fullName}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">{email}</p>
                <span className="inline-block mt-2 text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Target UPSC CSE {targetYear}
                </span>
              </div>
            </div>

            {saved && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                ✓ Profile preferences successfully updated!
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900 text-white text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full bg-slate-900/50 text-slate-400 text-xs px-4 py-3 rounded-xl border border-slate-800 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Target Civil Services Exam Year</label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full bg-slate-900 text-white text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
                  >
                    <option value="2025">2025 Attempt</option>
                    <option value="2026">2026 Attempt</option>
                    <option value="2027">2027 Attempt</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1.5">Mains Optional Subject</label>
                  <select
                    value={optionalSubject}
                    onChange={(e) => setOptionalSubject(e.target.value)}
                    className="w-full bg-slate-900 text-white text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
                  >
                    <option value="Political Science & International Relations">Political Science & International Relations (PSIR)</option>
                    <option value="Public Administration">Public Administration</option>
                    <option value="Sociology">Sociology</option>
                    <option value="Geography">Geography</option>
                    <option value="History">History</option>
                    <option value="Economics">Economics</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
