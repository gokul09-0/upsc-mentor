import logging
import json
from typing import Dict, Any, List
from langchain_openai import ChatOpenAI
from app.core.config import settings

logger = logging.getLogger("test_agent")

class TestAgent:
    """
    Agent 3: Test Agent
    Responsibilities:
    - Generate UPSC Prelims/Mains level mock tests with high quality MCQs.
    - Evaluate student answers against answer keys.
    - Calculate score, percentage, and negative marking (0.66 marks deducted for UPSC style).
    - Identify weak areas & strong areas based on subject topics.
    - Recommend study topics and targeted review materials.
    """

    def __init__(self):
        self.llm = ChatOpenAI(
            openai_api_key=settings.OPENAI_API_KEY,
            model=settings.PRIMARY_MODEL,
            temperature=0.4
        )

    def generate_mock_test(self, subject: str, difficulty: str, count: int = 5) -> Dict[str, Any]:
        logger.info(f"[Test Agent] Generating {count} questions for subject: '{subject}', difficulty: '{difficulty}'")
        
        prompt = f"""You are the UPSC Chief Examiner creating a Prelims Mock Test.
Generate a JSON response containing exactly {count} UPSC standard Multiple Choice Questions (MCQs) for subject '{subject}' at difficulty level '{difficulty}'.

The output MUST be valid JSON with the following key format:
{{
  "title": "{subject} UPSC Mock Test - {difficulty.capitalize()} Level",
  "subject": "{subject}",
  "difficulty": "{difficulty}",
  "questions": [
    {{
      "id": "q1",
      "question": "Consider the following statements regarding...",
      "options": [
        "A) 1 only",
        "B) 2 only",
        "C) Both 1 and 2",
        "D) Neither 1 nor 2"
      ],
      "correct_answer": "A",
      "explanation": "Detailed explanation of why statement 1 is correct and statement 2 is incorrect...",
      "topic": "Constitutional Framework"
    }}
  ]
}}

Only output pure JSON. Do not include markdown code blocks or additional text.
"""
        try:
            res = self.llm.invoke(prompt)
            content = res.content.strip()
            if content.startswith("```json"):
                content = content.replace("```json", "").replace("```", "").strip()
            data = json.loads(content)
            return data
        except Exception as e:
            logger.warning(f"[Test Agent] JSON parsing/generation fallback: {e}")
            return self._fallback_questions(subject, difficulty, count)

    def evaluate_test(self, questions: List[Dict[str, Any]], user_answers: Dict[str, str]) -> Dict[str, Any]:
        logger.info("[Test Agent] Evaluating student answers...")
        total_questions = len(questions)
        correct_count = 0
        incorrect_count = 0
        unanswered_count = 0
        
        topic_performance = {}

        detailed_feedback = []
        
        for q in questions:
            q_id = q.get("id")
            correct_ans = q.get("correct_answer", "A").upper()
            user_ans = user_answers.get(q_id, "").upper()
            topic = q.get("topic", "General UPSC Core")

            if topic not in topic_performance:
                topic_performance[topic] = {"correct": 0, "total": 0}
            topic_performance[topic]["total"] += 1

            is_correct = False
            if not user_ans:
                unanswered_count += 1
            elif user_ans == correct_ans:
                correct_count += 1
                is_correct = True
                topic_performance[topic]["correct"] += 1
            else:
                incorrect_count += 1

            detailed_feedback.append({
                "question_id": q_id,
                "question": q.get("question"),
                "user_answer": user_ans,
                "correct_answer": correct_ans,
                "is_correct": is_correct,
                "explanation": q.get("explanation"),
                "topic": topic
            })

        # UPSC Scoring: 2 marks per question, 0.66 negative marking
        total_marks = total_questions * 2.0
        score = max(0.0, round((correct_count * 2.0) - (incorrect_count * 0.66), 2))
        percentage = round((score / total_marks) * 100, 2) if total_marks > 0 else 0
        accuracy = round((correct_count / (correct_count + incorrect_count)) * 100, 2) if (correct_count + incorrect_count) > 0 else 0

        weak_areas = []
        strong_areas = []
        recommended_topics = []

        for topic, perf in topic_performance.items():
            acc = perf["correct"] / perf["total"]
            if acc >= 0.7:
                strong_areas.append(topic)
            else:
                weak_areas.append(topic)
                recommended_topics.append(f"Revise {topic} from NCERT & Laxmikanth")

        return {
            "score": score,
            "total_marks": total_marks,
            "percentage": percentage,
            "accuracy": accuracy,
            "correct_count": correct_count,
            "incorrect_count": incorrect_count,
            "unanswered_count": unanswered_count,
            "weak_areas": weak_areas,
            "strong_areas": strong_areas,
            "recommended_topics": recommended_topics,
            "detailed_feedback": detailed_feedback
        }

    def _fallback_questions(self, subject: str, difficulty: str, count: int) -> Dict[str, Any]:
        return {
            "title": f"{subject} Practice Test ({difficulty.capitalize()})",
            "subject": subject,
            "difficulty": difficulty,
            "questions": [
                {
                    "id": "q1",
                    "question": "Which of the following statements regarding the Governor of an Indian state is/are correct?\n1. The Governor holds office during the pleasure of the President.\n2. The executive power of the state is vested in the Governor.",
                    "options": [
                        "A) 1 only",
                        "B) 2 only",
                        "C) Both 1 and 2",
                        "D) Neither 1 nor 2"
                    ],
                    "correct_answer": "C",
                    "explanation": "Article 156 states that the Governor holds office during the pleasure of the President. Article 154 states that executive power of the state is vested in the Governor.",
                    "topic": "Indian Polity - Executive"
                },
                {
                    "id": "q2",
                    "question": "Consider the following statements about the Monetary Policy Committee (MPC):\n1. It has 6 members, including the RBI Governor.\n2. It fixes the benchmark policy interest rate (Repo Rate).",
                    "options": [
                        "A) 1 only",
                        "B) 2 only",
                        "C) Both 1 and 2",
                        "D) Neither 1 nor 2"
                    ],
                    "correct_answer": "C",
                    "explanation": "MPC consists of 6 members (3 from RBI and 3 appointed by Government of India) and decides the Repo Rate to achieve target inflation.",
                    "topic": "Indian Economy - Banking"
                }
            ]
        }

test_agent = TestAgent()
