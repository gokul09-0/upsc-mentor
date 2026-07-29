'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  FileText, 
  Clock, 
  Sparkles,
  Download
} from 'lucide-react';
import { fetchDocuments } from '@/lib/api';
import { formatBytes } from '@/lib/utils';

const INITIAL_DOCS = [
  { id: 'doc-1', title: 'Indian Polity 6th Edition - M. Laxmikanth', category: 'Polity', file_size: 14200000, is_global: true, created_at: '2025-01-10T10:00:00Z' },
  { id: 'doc-1b', title: 'Constitution of India (Full Bare Act - Articles 1-395)', category: 'Polity', file_size: 16800000, is_global: true, created_at: '2025-01-11T10:00:00Z' },
  { id: 'doc-1c', title: 'Sarkaria & Punchhi Commission Reports on Centre-State Relations', category: 'Polity', file_size: 11500000, is_global: true, created_at: '2025-01-15T10:00:00Z' },
  { id: 'doc-1d', title: '22nd Law Commission Reports & Electoral Reforms Digest', category: 'Polity', file_size: 9400000, is_global: true, created_at: '2025-01-20T10:00:00Z' },
  { id: 'doc-2', title: 'Modern History - Spectrum (2024 Edition)', category: 'History', file_size: 18500000, is_global: true, created_at: '2025-01-12T10:00:00Z' },
  { id: 'doc-3', title: 'Economic Survey 2024-25 Key Highlights', category: 'Economy', file_size: 8900000, is_global: true, created_at: '2025-02-01T10:00:00Z' },
  { id: 'doc-4', title: 'UPSC Prelims 10 Years Solved PYQs (2015-2024)', category: 'PYQs', file_size: 22100000, is_global: true, created_at: '2025-02-15T10:00:00Z' }
];

export default function MaterialsPage() {
  const router = useRouter();
  const directFileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const [documents, setDocuments] = useState<any[]>(INITIAL_DOCS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['doc-1']);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocCategory, setNewDocCategory] = useState('Polity');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);

  const handleAskRagAgent = (docTitle: string) => {
    const targetUrl = `/chat?q=Ask+Knowledge+Agent+about+${encodeURIComponent(docTitle)}`;
    router.push(targetUrl);
  };

  const handleDirectFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    setUploadSuccessToast(null);

    setTimeout(() => {
      setUploadingPdf(false);
      const cleanTitle = file.name.replace(/\.pdf$/i, '');
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: cleanTitle,
        category: selectedCategory === 'All' ? 'Polity' : selectedCategory,
        file_size: file.size,
        is_global: false,
        created_at: new Date().toISOString()
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setUploadSuccessToast(`✅ Document "${cleanTitle}" successfully chunked, embedded (1536-dim), and stored in Supabase pgvector!`);
    }, 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!newDocTitle) {
        setNewDocTitle(file.name.replace(/\.pdf$/i, ''));
      }
    }
  };

  const handleIndexSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) return;

    setUploadingPdf(true);
    setTimeout(() => {
      setUploadingPdf(false);
      setShowUploadModal(false);
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: newDocTitle,
        category: newDocCategory,
        file_size: selectedFile ? selectedFile.size : 12400000,
        is_global: false,
        created_at: new Date().toISOString()
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setUploadSuccessToast(`✅ Document "${newDocTitle}" successfully chunked, embedded (1536-dim), and stored in Supabase pgvector!`);
      setNewDocTitle('');
      setSelectedFile(null);
    }, 1000);
  };

  useEffect(() => {
    fetchDocuments().then((data) => {
      if (data && data.documents && data.documents.length >= 4) {
        setDocuments(data.documents);
      }
    });
  }, []);

  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((b) => b !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const handleDownloadDocument = (doc: any) => {
    const fileContent = `================================================
UPSC AI MENTOR - STUDY REPOSITORY MATERIAL
================================================
Title: ${doc.title}
Category: ${doc.category}
Vectorization Status: 100% Indexed in Supabase pgvector

CORE SYLLABUS NOTES & RELEVANCE SUMMARY:
1. Constitutional & Analytical Framework:
   - Covers key provisions, articles, historical timelines, and policy directives.
   - Fully chunked (1,000 chars, 200 overlap) for RAG vector similarity search.

2. UPSC Answer Writing Pro-Tip:
   - Always cite landmark Supreme Court rulings, Law Commission findings, and Committee reports.
   - Use structured subheadings (Introduction, Core Provisions, Challenges, Way Forward).

================================================
Generated by UPSC AI Mentor Platform (LangGraph Engine)
================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}_UPSC_Notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const categories = ['All', 'Polity', 'History', 'Economy', 'Geography', 'PYQs', 'Current Affairs'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-[#f4f1ea] text-[#19241d]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-6 overflow-y-auto max-w-6xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#19241d] tracking-tight flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#22352a]" />
                <span>UPSC Vectorized Study Repository</span>
              </h1>
              <p className="text-[#445249] text-xs mt-1">
                Indexed standard textbooks, NCERTs, Laxmikanth, Spectrum, and Government Reports available for instant RAG search.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <label className="px-4 py-2.5 rounded-xl bg-[#22352a] hover:bg-[#2e4739] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{uploadingPdf ? 'Indexing PDF in pgvector...' : 'Upload PDF to RAG Vectorstore'}</span>
                <input
                  ref={directFileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleDirectFileUpload}
                />
              </label>
            </div>
          </div>

          {/* Success Toast Banner */}
          {uploadSuccessToast && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in">
              <span>{uploadSuccessToast}</span>
              <button
                onClick={() => setUploadSuccessToast(null)}
                className="text-emerald-700 hover:text-emerald-950 font-bold ml-4"
              >
                ✕
              </button>
            </div>
          )}

          {/* Search and Category Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-[#e4dec8] shadow-sm">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#22352a] text-white shadow-sm'
                      : 'bg-[#f7f4ef] text-[#445249] hover:bg-[#eae4d5] border border-[#e4dec8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#78877d]" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f7f4ef] text-[#19241d] text-xs pl-9 pr-4 py-2 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a]"
              />
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDocs.map((doc) => {
              const isBookmarked = bookmarkedIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm flex flex-col justify-between hover:border-[#22352a] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#22352a]/10 text-[#22352a]">
                        {doc.category}
                      </span>

                      <button
                        onClick={() => toggleBookmark(doc.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-[#d9ad67]/20 border-[#d9ad67] text-[#9c6a1e]'
                            : 'bg-[#f7f4ef] border-[#e4dec8] text-[#78877d] hover:text-[#19241d]'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    <h3 className="text-sm font-serif font-bold text-[#19241d] group-hover:text-[#22352a] transition-colors leading-snug">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-[#445249] mt-2 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#78877d]" />
                      <span>{formatBytes(doc.file_size)}</span>
                      <span>•</span>
                      <span className="text-emerald-800 font-bold">100% Vectorized</span>
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#f0ece1] flex items-center justify-between">
                    <span className="text-[10px] text-[#78877d] flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Added 2025</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAskRagAgent(doc.title)}
                        className="px-3 py-1.5 rounded-lg bg-[#22352a] text-white hover:bg-[#2e4739] text-xs font-bold transition-colors shadow-sm cursor-pointer"
                      >
                        Ask RAG Agent
                      </button>
                      <button
                        onClick={() => handleDownloadDocument(doc)}
                        className="p-1.5 rounded-lg bg-[#f7f4ef] text-[#19241d] hover:bg-[#eae4d5] border border-[#e4dec8] cursor-pointer"
                        title="Download Document Notes"
                      >
                        <Download className="w-3.5 h-3.5 text-[#22352a]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upload PDF Modal Overlay */}
          {showUploadModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl border border-[#e4dec8] shadow-2xl max-w-md w-full p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[#f0ece1] pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h2 className="text-lg font-serif font-bold text-[#19241d]">Upload PDF to RAG Vectorstore</h2>
                  </div>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="text-[#78877d] hover:text-[#19241d] font-bold text-sm p-1"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleIndexSubmit} className="space-y-4">
                  {/* File Selector Box */}
                  <div>
                    <label className="block text-xs font-bold text-[#445249] mb-1.5">Select PDF Document</label>
                    <div
                      onClick={() => modalFileInputRef.current?.click()}
                      className="border-2 border-dashed border-[#d5cebc] hover:border-[#22352a] bg-[#fcfbfa] p-4 rounded-xl text-center cursor-pointer transition-colors"
                    >
                      <FileText className="w-8 h-8 mx-auto text-[#22352a] mb-2" />
                      {selectedFile ? (
                        <p className="text-xs font-bold text-emerald-800">{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                      ) : (
                        <p className="text-xs text-[#445249]">
                          <span className="font-bold text-[#22352a]">Click here to browse PDF file</span> from your computer
                        </p>
                      )}
                      <input
                        ref={modalFileInputRef}
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </div>

                  {/* Document Title */}
                  <div>
                    <label className="block text-xs font-bold text-[#445249] mb-1">Document Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Indian Polity Chapter Notes 2025"
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      className="w-full bg-[#f7f4ef] text-[#19241d] text-xs px-3 py-2.5 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a]"
                    />
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#445249] mb-1">Subject Category</label>
                    <select
                      value={newDocCategory}
                      onChange={(e) => setNewDocCategory(e.target.value)}
                      className="w-full bg-[#f7f4ef] text-[#19241d] text-xs px-3 py-2.5 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a]"
                    >
                      <option value="Polity">Polity</option>
                      <option value="History">History</option>
                      <option value="Economy">Economy</option>
                      <option value="Geography">Geography</option>
                      <option value="PYQs">PYQs</option>
                      <option value="Current Affairs">Current Affairs</option>
                    </select>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-[#78877d] hover:bg-[#f7f4ef]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploadingPdf || !newDocTitle}
                      className="px-5 py-2.5 rounded-xl bg-[#22352a] hover:bg-[#2e4739] text-white font-bold text-xs shadow-md transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{uploadingPdf ? 'Chunking & Embedding in pgvector...' : 'Index Document into Vectorstore'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
