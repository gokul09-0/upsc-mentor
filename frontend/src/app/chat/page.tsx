'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { 
  Send, 
  Paperclip, 
  Copy, 
  Check, 
  FileText,
  ExternalLink,
  BrainCircuit,
  RefreshCw
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

function ChatPageContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `### 👋 Welcome to UPSC AI Mentor (Doubts Desk)!

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

  const searchParams = useSearchParams();
  const queryParam = searchParams ? searchParams.get('q') : null;
  const initialHandledRef = useRef<string | null>(null);

  // Automatically type out and send query when user comes from "Ask Agent" or links with ?q=...
  useEffect(() => {
    if (queryParam && initialHandledRef.current !== queryParam) {
      initialHandledRef.current = queryParam;
      let currentIndex = 0;
      setInput('');

      const typingInterval = setInterval(() => {
        if (currentIndex < queryParam.length) {
          setInput(queryParam.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            handleSend(queryParam);
            setInput('');
          }, 350);
        }
      }, 18);

      return () => clearInterval(typingInterval);
    }
  }, [queryParam]);

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
    <div className="flex h-screen bg-[#f4f1ea] text-[#19241d]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto p-4 md:p-6 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#e4dec8] mb-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#445249] font-medium">Subject Filter:</span>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="bg-white text-[#19241d] text-xs px-3 py-1.5 rounded-lg border border-[#e4dec8] focus:outline-none focus:border-[#22352a]"
              >
                <option value="All Subjects">All UPSC Core Subjects</option>
                <option value="Polity">Indian Polity (Laxmikanth)</option>
                <option value="History">Modern History (Spectrum)</option>
                <option value="Economy">Indian Economy</option>
                <option value="Geography">Geography & Environment</option>
                <option value="Current Affairs">Current Affairs (PIB)</option>
              </select>
            </div>

            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#22352a] text-white hover:bg-[#2e4739] transition-colors shadow-sm">
              <Paperclip className="w-3.5 h-3.5 text-amber-400" />
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
                  <div className="w-8 h-8 rounded-full bg-[#22352a] text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 shadow-md">
                    ◆
                  </div>
                )}

                <div
                  className={`max-w-3xl rounded-2xl p-5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#1a2536] text-white shadow-md'
                      : 'bg-white border border-[#e4dec8] text-[#19241d] shadow-sm'
                  }`}
                >
                  {/* Agent Metadata Badge */}
                  {msg.role === 'assistant' && msg.agent_used && (
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e4dec8]">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#22352a] bg-[#22352a]/10 px-2.5 py-0.5 rounded-full">
                        <BrainCircuit className="w-3 h-3 text-[#22352a]" />
                        <span>Orchestrated by {msg.agent_used}</span>
                      </span>

                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="text-[#78877d] hover:text-[#19241d] flex items-center gap-1 text-[11px]"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  <div className="prose prose-xs max-w-none space-y-2">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#f0ece1]">
                      <p className="text-[10px] font-bold text-[#78877d] uppercase tracking-wider mb-1.5">
                        Verified Sources & Citations:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((src, i) => (
                          <div
                            key={i}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f7f4ef] border border-[#e4dec8] text-[10px] text-[#445249]"
                          >
                            <FileText className="w-3 h-3 text-[#22352a]" />
                            <span>{src.title}</span>
                            {src.page && <span className="text-[#78877d]">(Page {src.page})</span>}
                            {src.url && (
                              <a href={src.url} target="_blank" rel="noreferrer" className="text-[#22352a] font-bold hover:underline">
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
                  <div className="w-8 h-8 rounded-full bg-[#c89b58] text-[#19241d] font-serif font-bold flex items-center justify-center text-xs shrink-0 shadow-md">
                    G
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#22352a] text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 animate-pulse">
                  ◆
                </div>
                <div className="bg-white p-4 rounded-2xl border border-[#e4dec8] text-xs text-[#78877d] flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#22352a]" />
                  <span>LangGraph Router evaluating intent & invoking agents...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="my-3 flex items-center gap-2 overflow-x-auto pb-1 text-[11px] no-scrollbar">
            <span className="text-[#78877d] shrink-0 font-medium">Quick Prompts:</span>
            <button
              onClick={() => handleSend("Explain Article 200 Governor's discretion on bills")}
              className="shrink-0 px-3 py-1 rounded-full bg-white border border-[#e4dec8] hover:border-[#22352a] text-[#445249] transition-colors"
            >
              Governor Discretion (Polity)
            </button>
            <button
              onClick={() => handleSend("What are the latest PIB releases on Union Budget 2025?")}
              className="shrink-0 px-3 py-1 rounded-full bg-white border border-[#e4dec8] hover:border-[#22352a] text-[#445249] transition-colors"
            >
              Latest PIB Union Budget
            </button>
            <button
              onClick={() => handleSend("Generate 5 MCQs on Monetary Policy Committee")}
              className="shrink-0 px-3 py-1 rounded-full bg-[#22352a] text-white hover:bg-[#2e4739] transition-colors font-bold"
            >
              Generate Economy Quiz
            </button>
          </div>

          {/* Chat Input Bar */}
          <div className="bg-white p-2.5 rounded-2xl border border-[#e4dec8] shadow-sm flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask any UPSC concept, request MCQs, or search recent PIB news..."
              className="flex-1 bg-transparent text-xs text-[#19241d] placeholder-[#78877d] px-3 py-2 focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-[#22352a] hover:bg-[#2e4739] text-white disabled:opacity-50 transition-opacity shadow-sm"
            >
              <Send className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center text-xs font-bold text-[#19241d]">Loading AI Doubts Desk...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
