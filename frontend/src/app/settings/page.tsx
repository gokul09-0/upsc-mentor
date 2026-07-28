'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { Settings, Activity, Cpu, Palette, Check } from 'lucide-react';

export default function SettingsPage() {
  const [langsmithEnabled, setLangsmithEnabled] = useState(true);
  const [vectorSearchThreshold, setVectorSearchThreshold] = useState('0.5');
  const [selectedTheme, setSelectedTheme] = useState('academic');

  const themes = [
    { id: 'academic', name: 'Academic Ivory & Sage (Default)', color: 'bg-[#22352a]', border: 'border-[#22352a]' },
    { id: 'midnight', name: 'Human Midnight Slate', color: 'bg-slate-900', border: 'border-slate-700' },
    { id: 'obsidian', name: 'Obsidian Dark', color: 'bg-neutral-900', border: 'border-neutral-700' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f1ea] text-[#19241d]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-6 overflow-y-auto max-w-4xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#19241d] tracking-tight flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#22352a]" />
              <span>System & Design Settings</span>
            </h1>
            <p className="text-[#445249] text-xs mt-1">
              Configure AI SDLC agents, vector store retrieval thresholds, theme presets, and LangSmith tracing integrations.
            </p>
          </div>

          {/* Theme Picker */}
          <div className="bg-white p-6 rounded-xl border border-[#e4dec8] shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#19241d] flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#22352a]" />
              <span>Application Theme Preset</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`p-4 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                    selectedTheme === theme.id
                      ? `${theme.border} bg-[#f7f4ef] text-[#19241d] shadow-sm`
                      : 'border-[#e4dec8] bg-white text-[#445249] hover:bg-[#f7f4ef]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full ${theme.color} border border-[#ded7c7]`} />
                    <span>{theme.name}</span>
                  </div>
                  {selectedTheme === theme.id && <Check className="w-4 h-4 text-[#22352a]" />}
                </button>
              ))}
            </div>
          </div>

          {/* System Services Status */}
          <div className="bg-white p-6 rounded-xl border border-[#e4dec8] shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#19241d] flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-800" />
              <span>Active System Components Status</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#f7f4ef] border border-[#e4dec8] flex items-center justify-between">
                <span className="font-bold text-[#19241d]">FastAPI Backend</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">ONLINE</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f7f4ef] border border-[#e4dec8] flex items-center justify-between">
                <span className="font-bold text-[#19241d]">Supabase pgvector</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">CONNECTED</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f7f4ef] border border-[#e4dec8] flex items-center justify-between">
                <span className="font-bold text-[#19241d]">LangGraph Router</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-300">4 AGENTS</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#f7f4ef] border border-[#e4dec8] flex items-center justify-between">
                <span className="font-bold text-[#19241d]">Tavily Web Search</span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#22352a]/10 text-[#22352a] border border-[#22352a]/20">READY</span>
              </div>
            </div>
          </div>

          {/* Agent Settings */}
          <div className="bg-white p-6 rounded-xl border border-[#e4dec8] shadow-sm space-y-4">
            <h2 className="text-base font-serif font-bold text-[#19241d] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#22352a]" />
              <span>AI Multi-Agent Configuration</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#f7f4ef] border border-[#e4dec8]">
                <div>
                  <p className="font-bold text-[#19241d]">LangSmith Observability & Tracing</p>
                  <p className="text-xs text-[#445249] mt-0.5 font-medium">Logs all agent executions, token usages, and intent router decisions to LangSmith.</p>
                </div>
                <input
                  type="checkbox"
                  checked={langsmithEnabled}
                  onChange={(e) => setLangsmithEnabled(e.target.checked)}
                  className="w-4 h-4 accent-[#22352a] rounded cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#f7f4ef] border border-[#e4dec8] space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-[#19241d]">RAG Cosine Similarity Match Threshold</p>
                  <span className="font-bold text-[#22352a] text-sm">{vectorSearchThreshold}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.1"
                  value={vectorSearchThreshold}
                  onChange={(e) => setVectorSearchThreshold(e.target.value)}
                  className="w-full accent-[#22352a] cursor-pointer"
                />
                <p className="text-[11px] text-[#78877d] font-medium">Higher values ensure stricter vector similarity matches from Supabase pgvector.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
