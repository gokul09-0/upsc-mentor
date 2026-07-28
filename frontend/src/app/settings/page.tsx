'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { Settings, ShieldCheck, Activity, Cpu, Sliders, Database, Globe } from 'lucide-react';

export default function SettingsPage() {
  const [langsmithEnabled, setLangsmithEnabled] = useState(true);
  const [vectorSearchThreshold, setVectorSearchThreshold] = useState('0.5');

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 space-y-6 overflow-y-auto max-w-4xl mx-auto w-full">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-400" />
              <span>System & Agent Architecture Settings</span>
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Configure AI SDLC agents, vector store retrieval thresholds, and LangSmith tracing integrations.
            </p>
          </div>

          {/* System Services Status */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Active System Components Status</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-300">FastAPI Backend</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ONLINE</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-300">Supabase pgvector</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">CONNECTED</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-300">LangGraph Router</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">4 AGENTS</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <span className="font-semibold text-slate-300">Tavily Web Search</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-400">READY</span>
              </div>
            </div>
          </div>

          {/* Agent Settings */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>AI Multi-Agent Configuration</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                <div>
                  <p className="font-semibold text-slate-200">LangSmith Observability & Tracing</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Logs all agent executions, token usages, and intent router decisions to LangSmith.</p>
                </div>
                <input
                  type="checkbox"
                  checked={langsmithEnabled}
                  onChange={(e) => setLangsmithEnabled(e.target.checked)}
                  className="w-4 h-4 accent-sky-500 rounded"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-200">RAG Cosine Similarity Match Threshold</p>
                  <span className="font-bold text-sky-400">{vectorSearchThreshold}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.1"
                  value={vectorSearchThreshold}
                  onChange={(e) => setVectorSearchThreshold(e.target.value)}
                  className="w-full accent-sky-500"
                />
                <p className="text-[10px] text-slate-500">Higher values ensure stricter vector similarity matches from Supabase pgvector.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
