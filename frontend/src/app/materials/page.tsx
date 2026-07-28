'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Download, 
  Bookmark, 
  FileText, 
  Check, 
  Clock, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { fetchDocuments } from '@/lib/api';
import { formatBytes } from '@/lib/utils';

export default function MaterialsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['doc-1']);

  useEffect(() => {
    fetchDocuments().then((data) => {
      if (data.documents) setDocuments(data.documents);
    });
  }, []);

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((b) => b !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const categories = ['All', 'Polity', 'History', 'Economy', 'Geography', 'PYQs', 'Current Affairs'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" />
                <span>UPSC Vectorized Study Repository</span>
              </h1>
              <p className="text-slate-400 text-xs mt-1">
                Indexed standard textbooks, NCERTs, Laxmikanth, Spectrum, and Government Reports available for instant RAG search.
              </p>
            </div>

            {/* Upload Action */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 hover:opacity-90 transition-opacity">
                <Sparkles className="w-4 h-4" />
                <span>Upload PDF to RAG Vectorstore</span>
              </button>
            </div>
          </div>

          {/* Search and Category Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center glass-card p-4 rounded-2xl border border-slate-800">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 text-white text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.map((doc) => {
              const isBookmarked = bookmarkedIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                        {doc.category}
                      </span>

                      <button
                        onClick={() => toggleBookmark(doc.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    <h3 className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2">
                      {doc.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>{formatBytes(doc.file_size)}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">100% Vectorized</span>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Added 2025</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href="/chat"
                        className="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 text-xs font-medium transition-colors"
                      >
                        Ask RAG Agent
                      </a>
                      <button
                        onClick={() => alert(`Downloading ${doc.title}...`)}
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
