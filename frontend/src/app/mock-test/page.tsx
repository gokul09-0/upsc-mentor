'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Navbar } from '@/components/layout/navbar';
import { 
  GraduationCap, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  RefreshCw,
  RotateCcw
} from 'lucide-react';
import { generateMockTest, evaluateMockTest } from '@/lib/api';

export default function MockTestPage() {
  const [subject, setSubject] = useState('Indian Polity');
  const [difficulty, setDifficulty] = useState('medium');
  const [testState, setTestState] = useState<'setup' | 'testing' | 'result'>('setup');
  const [loading, setLoading] = useState(false);
  const [testData, setTestData] = useState<any>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [evaluation, setEvaluation] = useState<any>(null);

  const handleStartTest = async () => {
    setLoading(true);
    try {
      const data = await generateMockTest(subject, difficulty);
      setTestData(data);
      setUserAnswers({});
      setCurrentQIndex(0);
      setTestState('testing');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId: string, optionLetter: string) => {
    setUserAnswers({ ...userAnswers, [qId]: optionLetter });
  };

  const handleSubmitTest = async () => {
    setLoading(true);
    try {
      const evalResult = await evaluateMockTest(testData.questions, userAnswers);
      setEvaluation(evalResult);
      setTestState('result');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f1ea] text-[#19241d]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        <main className="p-6 lg:p-8 space-y-6 overflow-y-auto max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#19241d] tracking-tight flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#22352a]" />
                <span>AI UPSC Mock Test Generator</span>
              </h1>
              <p className="text-[#445249] text-xs mt-1">
                Powered by Test Agent. Generates Prelims standard MCQs with negative marking & weak area diagnostics.
              </p>
            </div>
          </div>

          {/* SETUP STATE */}
          {testState === 'setup' && (
            <div className="bg-white p-8 rounded-xl border border-[#e4dec8] shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#f0ece1]">
                <div className="w-10 h-10 rounded-xl bg-[#22352a]/10 border border-[#22352a]/20 flex items-center justify-center text-[#22352a]">
                  <Sparkles className="w-5 h-5 text-[#c2934b]" />
                </div>
                <div>
                  <h2 className="text-base font-serif font-bold text-[#19241d]">Configure Your Mock Quiz</h2>
                  <p className="text-[#445249] text-xs">Select your subject and difficulty level</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#19241d] mb-2">Subject Area</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#f7f4ef] text-[#19241d] text-xs px-4 py-3 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a] font-medium"
                  >
                    <option value="Indian Polity">Indian Polity & Constitution</option>
                    <option value="Modern History">Modern Indian History & Freedom Struggle</option>
                    <option value="Indian Economy">Indian Economy & Budget</option>
                    <option value="Geography & Environment">Geography, Biodiversity & Climate</option>
                    <option value="Current Affairs">Latest Current Affairs (PIB)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#19241d] mb-2">Difficulty Standard</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-[#f7f4ef] text-[#19241d] text-xs px-4 py-3 rounded-xl border border-[#ded7c7] focus:outline-none focus:border-[#22352a] font-medium"
                  >
                    <option value="easy">Easy (NCERT Foundation)</option>
                    <option value="medium">Medium (Standard Reference Books)</option>
                    <option value="hard">Hard (UPSC Mains/Prelims Level)</option>
                    <option value="upsc_level">UPSC Examiner Benchmark</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#f7f4ef] border border-[#e4dec8] text-xs text-[#2d3b32] space-y-1">
                <p className="font-bold text-[#19241d]">Exam Rules & Negative Marking:</p>
                <p>• 2 Marks for every correct response.</p>
                <p>• 0.66 Negative marks deducted for incorrect options.</p>
                <p>• Detailed topic weakness radar will be generated upon completion.</p>
              </div>

              <button
                onClick={handleStartTest}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#22352a] hover:bg-[#2e4739] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                    <span>Test Agent Generating Questions...</span>
                  </>
                ) : (
                  <>
                    <span>Generate & Start Test</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* TESTING STATE */}
          {testState === 'testing' && testData && (
            <div className="bg-white p-6 rounded-xl border border-[#e4dec8] shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#f0ece1]">
                <div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-[#22352a]/10 text-[#22352a]">
                    Question {currentQIndex + 1} of {testData.questions.length}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#19241d] mt-1">{testData.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#8c6527] font-bold bg-[#f7f4ef] px-3 py-1.5 rounded-xl border border-[#e4dec8]">
                  <Clock className="w-4 h-4 animate-pulse text-[#c2934b]" />
                  <span>05:00 Time Remaining</span>
                </div>
              </div>

              {/* Current Question */}
              {(() => {
                const q = testData.questions[currentQIndex];
                const selectedOpt = userAnswers[q.id];

                return (
                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-[#19241d] leading-relaxed whitespace-pre-line">
                      {q.question}
                    </p>

                    <div className="space-y-2.5">
                      {q.options.map((opt: string, idx: number) => {
                        const optLetter = opt.charAt(0);
                        const isSelected = selectedOpt === optLetter;

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(q.id, optLetter)}
                            className={`w-full text-left p-4 rounded-xl text-xs font-medium transition-all ${
                              isSelected
                                ? 'bg-[#22352a] text-white border border-[#22352a] shadow-sm font-bold'
                                : 'bg-[#f7f4ef] text-[#19241d] hover:bg-[#eae4d5] border border-[#e4dec8]'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Question Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-[#f0ece1]">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(currentQIndex - 1)}
                  className="px-4 py-2 rounded-xl bg-[#f7f4ef] text-[#19241d] text-xs font-bold disabled:opacity-40 border border-[#e4dec8]"
                >
                  Previous
                </button>

                {currentQIndex < testData.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(currentQIndex + 1)}
                    className="px-4 py-2 rounded-xl bg-[#22352a] text-white text-xs font-bold hover:bg-[#2e4739]"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    disabled={loading}
                    className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5 shadow-sm"
                  >
                    {loading ? 'Evaluating...' : 'Submit & View Score'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* RESULT STATE */}
          {testState === 'result' && evaluation && (
            <div className="space-y-6">
              {/* Score Header Card */}
              <div className="bg-[#1a2536] text-white p-6 rounded-xl shadow-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#d9ad67] text-[#1a2536] font-serif font-extrabold text-2xl flex items-center justify-center shadow-md">
                      {evaluation.percentage}%
                    </div>
                    <div>
                      <h2 className="text-xl font-serif font-bold text-white">Mock Test Performance Report</h2>
                      <p className="text-slate-300 text-xs mt-0.5">
                        Score: <span className="text-[#d9ad67] font-bold">{evaluation.score}</span> / {evaluation.total_marks} Marks
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setTestState('setup')}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold border border-slate-700 hover:bg-slate-700 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span>Take Another Test</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700/80 text-center">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Correct Answers</p>
                    <p className="text-base font-bold text-emerald-400 mt-1">
                      {evaluation.correct_count} / {testData.questions.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Accuracy Rate</p>
                    <p className="text-base font-bold text-sky-400 mt-1">{evaluation.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Incorrect Answers</p>
                    <p className="text-base font-bold text-rose-400 mt-1">{evaluation.incorrect_count}</p>
                  </div>
                </div>
              </div>

              {/* Weak & Strong Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm">
                  <h3 className="text-xs font-bold text-rose-700 flex items-center gap-2 mb-3">
                    <XCircle className="w-4 h-4" />
                    <span>Identified Weak Topics</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-[#19241d]">
                    {evaluation.weak_areas.length > 0 ? (
                      evaluation.weak_areas.map((w: string, i: number) => (
                        <li key={i} className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 font-bold">
                          • {w}
                        </li>
                      ))
                    ) : (
                      <p className="text-[#78877d] italic">No major weak areas detected!</p>
                    )}
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#e4dec8] shadow-sm">
                  <h3 className="text-xs font-bold text-emerald-800 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Strong Mastery Topics</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-[#19241d]">
                    {evaluation.strong_areas.length > 0 ? (
                      evaluation.strong_areas.map((s: string, i: number) => (
                        <li key={i} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                          ✓ {s}
                        </li>
                      ))
                    ) : (
                      <p className="text-[#78877d] italic">Keep practicing to build topic strongholds!</p>
                    )}
                  </ul>
                </div>
              </div>

              {/* Detailed Explanations */}
              <div className="bg-white p-6 rounded-xl border border-[#e4dec8] shadow-sm space-y-4">
                <h3 className="text-base font-serif font-bold text-[#19241d] mb-2">Question-by-Question Detailed Feedback</h3>
                {evaluation.detailed_feedback.map((item: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#f7f4ef] border border-[#e4dec8] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#19241d]">Q{idx + 1}. {item.topic}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.is_correct ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.is_correct ? 'CORRECT (+2.0)' : 'INCORRECT (-0.66)'}
                      </span>
                    </div>
                    <p className="text-xs text-[#19241d] font-medium">{item.question}</p>
                    <div className="p-3 rounded-lg bg-white text-xs text-[#2d3b32] border border-[#e4dec8]">
                      <span className="font-bold text-[#22352a]">Explanation:</span> {item.explanation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
