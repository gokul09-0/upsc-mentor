'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { User, ShieldCheck, Save } from 'lucide-react';

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
    <div className="flex min-h-screen bg-[#f4f1ea] text-[#19241d]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-6 overflow-y-auto max-w-4xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#19241d] tracking-tight flex items-center gap-2">
              <User className="w-6 h-6 text-[#22352a]" />
              <span>User Profile & UPSC Preparation Settings</span>
            </h1>
            <p className="text-[#445249] text-xs mt-1">
              Manage your personal credentials, target exam year, and optional subject preferences.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-[#e4dec8] shadow-sm space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-[#f0ece1]">
              <div className="w-16 h-16 rounded-2xl bg-[#c89b58] text-[#19241d] font-serif font-extrabold text-2xl flex items-center justify-center shadow-sm">
                G
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-[#19241d] flex items-center gap-2">
                  <span>{fullName}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </h2>
                <p className="text-[#445249] text-xs mt-0.5 font-medium">{email}</p>
                <span className="inline-block mt-2 text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#22352a] text-white">
                  Target UPSC CSE {targetYear}
                </span>
              </div>
            </div>

            {saved && (
              <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold">
                ✓ Profile preferences successfully updated!
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-[#19241d] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#f7f4ef] text-[#19241d] text-xs px-4 py-3 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a] font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#19241d] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full bg-[#eae4d5] text-[#445249] text-xs px-4 py-3 rounded-xl border border-[#ded7c7] cursor-not-allowed font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#19241d] mb-1.5">Target Civil Services Exam Year</label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full bg-[#f7f4ef] text-[#19241d] text-xs px-4 py-3 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a] font-medium"
                  >
                    <option value="2025">2025 Attempt</option>
                    <option value="2026">2026 Attempt</option>
                    <option value="2027">2027 Attempt</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#19241d] mb-1.5">Mains Optional Subject</label>
                  <select
                    value={optionalSubject}
                    onChange={(e) => setOptionalSubject(e.target.value)}
                    className="w-full bg-[#f7f4ef] text-[#19241d] text-xs px-4 py-3 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a] font-medium"
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

              <div className="pt-4 border-t border-[#f0ece1] flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#22352a] hover:bg-[#2e4739] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Save className="w-4 h-4 text-amber-400" />
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
