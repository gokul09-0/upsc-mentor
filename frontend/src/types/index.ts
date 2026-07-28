export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  target_year: number;
  optional_subject: string;
  study_streak: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agent_used?: string;
  sources?: Array<{ title: string; url?: string; page?: number }>;
  created_at: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  file_size: number;
  is_global: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  topic: string;
}

export interface MockTest {
  id?: string;
  title: string;
  subject: string;
  difficulty: string;
  questions: Question[];
}

export interface EvaluationResult {
  score: number;
  total_marks: number;
  percentage: number;
  accuracy: number;
  correct_count: number;
  incorrect_count: number;
  unanswered_count: number;
  weak_areas: string[];
  strong_areas: string[];
  recommended_topics: string[];
  detailed_feedback: Array<{
    question_id: string;
    question: string;
    user_answer: string;
    correct_answer: string;
    is_correct: boolean;
    explanation: string;
    topic: string;
  }>;
}
