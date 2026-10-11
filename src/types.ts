export interface Question {
  id: string;
  question: string;
  correctAnswer: string;
  distractors: string[];
  explanation?: string;
  category?: string;
}

export interface PlayerAnswerRecord {
  questionId: string;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

export interface PlayerState {
  id: 'p1' | 'p2';
  name: string;
  color: 'blue' | 'red';
  score: number;
  correctCount: number;
  wrongCount: number;
  streak: number;
  maxStreak: number;
  currentQuestionIndex: number;
  questions: Question[];
  shuffledOptionsForCurrent: string[];
  answersHistory: PlayerAnswerRecord[];
  isFinished: boolean;
  finishTimeMs: number | null;
  penaltyUntil: number; // timestamp until player is unlocked if wrong
  lastFeedback: 'correct' | 'wrong' | null;
}

export type BotDifficulty = 'easy' | 'medium' | 'hard';
export type GameMode = 'two_players' | 'vs_bot';
export type GameStatus = 'lobby' | 'countdown' | 'playing' | 'game_over';
