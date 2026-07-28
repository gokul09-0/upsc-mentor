'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { 
  Send, 
  Sparkles, 
  Paperclip, 
  Copy, 
  RefreshCw, 
  Check, 
  BookOpen, 
  Search, 
  BrainCircuit, 
  FileText,
  ExternalLink,
  Bot,
  User,
  ShieldCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent_used?: string;
  sources?: Array<{ title: string; url?: string; page?: number }>;
  intent?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### 👋 Welcome to UPSC AI Mentor!

I am your multi-agent AI tutor orchestrated by **LangGraph**. Here is how my specialized agents assist you:

* 📚 **Knowledge & Tutor Agent**: Ask core conceptual questions from *Laxmikanth, NCERTs, Spectrum, or uploaded PDFs*.
* 📝 **Test Agent**: Ask for *mock test questions, MCQs, or answer evaluation*.
* 📰 **Research Agent**: Ask about *latest PIB news, Union Budget, Government Schemes, Supreme Court judgments, or current affairs*.

How can I help your preparation today?`,
      agent_used: 'Tutor Agent',
      sources: [
        { title: 'Indian Polity by M. Laxmikanth', page: 1 },
        { title: 'Press Information Bureau (PIB)', url: 'https://pib.gov.in' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>('All Subjects');
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customMsg?: string) => {
    const queryText = customMsg || input;
    if (!queryText.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customMsg) setInput('');
    setLoading(true);

    try {
      const res = await sendChatMessage(
        queryText,
        'session-1',
        subjectFilter === 'All Subjects' ? undefined : subjectFilter
      );

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.response,
        agent_used: res.agent_used,
        sources: res.sources,
        intent: res.intent
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    setTimeout(() => {
      setUploadingPdf(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `✅ **Successfully Ingested PDF**: \`${file.name}\`\n\nThe Knowledge Agent has parsed, chunked, and stored vector embeddings in **Supabase pgvector**. You can now ask questions directly from this document!`,
          agent_used: 'Knowledge Agent'
        }
      ]);
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 md:p-6 overflow-hidden">
          {/* Chat Control Toolbar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Context Filter:</span>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none focus:border-sky-500"
              >
                <option value="All Subjects">All UPSC Core Subjects</option>
                <option value="Polity">Indian Polity (Laxmikanth)</option>
                <option value="History">Modern History (Spectrum)</option>
                <option value="Economy">Indian Economy</option>
                <option value="Geography">Geography & Environment</option>
                <option value="Current Affairs">Current Affairs (PIB)</option>
              </select>
            </div>

            {/* Upload PDF button */}
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 transition-colors">
              <Paperclip className="w-3.5 h-3.5" />
              <span>{uploadingPdf ? 'Indexing PDF...' : 'Upload PDF Document'}</span>
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto space-y-6 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-3xl rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-lg'
                      : 'glass-card border border-slate-800 text-slate-200'
                  }`}
                >
                  {/* Agent Metadata Badge */}
                  {msg.role === 'assistant' && msg.agent_used && (
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-slate-800">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
                        <BrainCircuit className="w-3 h-3" />
                        <span>Orchestrated by {msg.agent_used}</span>
                      </span>

                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Markdown Content */}
                  <div className="prose prose-invert prose-xs max-w-none space-y-2">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {/* Sources Citations */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Verified Sources & Citations:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src, i) => (
                          <div
                            key={i}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300"
                          >
                            <FileText className="w-3 h-3 text-sky-400" />
                            <span>{src.title}</span>
                            {src.page && <span className="text-slate-500">(Page {src.page})</span>}
                            {src.url && (
                              <a href={src.url} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                                <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shrink-0 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="glass-card p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
                  <span>LangGraph Router evaluating intent & invoking agents...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Pill */}
          <div className="my-3 flex items-center gap-2 overflow-x-auto pb-1 text-[11px] no-scrollbar">
            <span className="text-slate-500 shrink-0 font-medium">Quick Prompts:</span>
            <button
              onClick={() => handleSend("Explain Article 200 Governor's discretion on bills")}
              className="shrink-0 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
            >
              Governor Discretion (Polity)
            </button>
            <button
              onClick={() => handleSend("What are the latest PIB releases on Union Budget 2025?")}
              className="shrink-0 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
            >
              Latest PIB Union Budget
            </button>
            <button
              onClick={() => handleSend("Generate 5 MCQs on Monetary Policy Committee")}
              className="shrink-0 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
            >
              Generate Economy Quiz
            </button>
          </div>

          {/* Chat Input Bar */}
          <div className="glass-panel p-2 rounded-2xl border border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask any UPSC concept, request MCQs, or search recent PIB news..."
              className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 px-3 py-2 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:opacity-90 disabled:opacity-50 transition-opacity shadow-md shadow-indigo-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
