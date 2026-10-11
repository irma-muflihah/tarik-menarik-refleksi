import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Question,
  PlayerState,
  GameMode,
  BotDifficulty,
  GameStatus,
  PlayerAnswerRecord,
} from './types';
import {
  INITIAL_QUESTIONS,
  getNonRepeatingQuestions,
  getShuffledOptions,
} from './data/questions';
import { sound } from './utils/audio';
import { Header } from './components/Header';
import { TugArena } from './components/TugArena';
import { PlayerDuelBox } from './components/PlayerDuelBox';
import { LobbyModal } from './components/LobbyModal';
import { GameOverModal } from './components/GameOverModal';
import { FormulaModal } from './components/FormulaModal';
import { ReviewModal } from './components/ReviewModal';
import { QuestionBankModal } from './components/QuestionBankModal';
import { motion, AnimatePresence } from 'motion/react';

const QUESTIONS_PER_GAME = 16;
const WIN_THRESHOLD = 85; // Rope threshold to win immediately by knockout

export default function App() {
  // Question Bank state (persisted during session)
  const [questionBank, setQuestionBank] = useState<Question[]>(INITIAL_QUESTIONS);

  // Game Config
  const [gameMode, setGameMode] = useState<GameMode>('two_players');
  const [botDifficulty, setBotDifficulty] = useState<BotDifficulty>('medium');
  const [p1Name, setP1Name] = useState('Siswa Biru');
  const [p2Name, setP2Name] = useState('Siswa Merah');

  // Match State
  const [gameStatus, setGameStatus] = useState<GameStatus>('lobby');
  const [countdown, setCountdown] = useState(3);
  const [ropePosition, setRopePosition] = useState(0); // -100 to 100
  const [lastPuller, setLastPuller] = useState<'p1' | 'p2' | null>(null);
  const [winner, setWinner] = useState<PlayerState | 'draw' | null>(null);
  const [winReason, setWinReason] = useState<string>('');

  // Audio mute
  const [isMuted, setIsMuted] = useState(sound.isMuted());

  // Modals
  const [showFormula, setShowFormula] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Bot Thinking state
  const [botThinking, setBotThinking] = useState(false);

  // Player States
  const [p1, setP1] = useState<PlayerState>({
    id: 'p1',
    name: 'Siswa Biru',
    color: 'blue',
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    maxStreak: 0,
    currentQuestionIndex: 0,
    questions: [],
    shuffledOptionsForCurrent: [],
    answersHistory: [],
    isFinished: false,
    finishTimeMs: null,
    penaltyUntil: 0,
    lastFeedback: null,
  });

  const [p2, setP2] = useState<PlayerState>({
    id: 'p2',
    name: 'Siswa Merah',
    color: 'red',
    score: 0,
    correctCount: 0,
    wrongCount: 0,
    streak: 0,
    maxStreak: 0,
    currentQuestionIndex: 0,
    questions: [],
    shuffledOptionsForCurrent: [],
    answersHistory: [],
    isFinished: false,
    finishTimeMs: null,
    penaltyUntil: 0,
    lastFeedback: null,
  });

  const matchStartTimeRef = useRef<number>(0);
  const p1QuestionStartTimeRef = useRef<number>(0);
  const p2QuestionStartTimeRef = useRef<number>(0);
  const botTimeoutRef = useRef<number | null>(null);

  // Sound toggle handler
  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Start match initialization
  const handleStartGame = () => {
    // 16 Non-repeating random questions for Player 1 & Player 2
    const p1Questions = getNonRepeatingQuestions(questionBank, QUESTIONS_PER_GAME);
    const p2Questions = getNonRepeatingQuestions(questionBank, QUESTIONS_PER_GAME);

    const initialP1Options = p1Questions.length > 0 ? getShuffledOptions(p1Questions[0]) : [];
    const initialP2Options = p2Questions.length > 0 ? getShuffledOptions(p2Questions[0]) : [];

    setP1({
      id: 'p1',
      name: p1Name.trim() || 'Siswa Biru',
      color: 'blue',
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      streak: 0,
      maxStreak: 0,
      currentQuestionIndex: 0,
      questions: p1Questions,
      shuffledOptionsForCurrent: initialP1Options,
      answersHistory: [],
      isFinished: false,
      finishTimeMs: null,
      penaltyUntil: 0,
      lastFeedback: null,
    });

    const player2DisplayName =
      gameMode === 'vs_bot'
        ? p2Name.trim() || `Bot ${botDifficulty === 'easy' ? 'Santai' : botDifficulty === 'medium' ? 'Sedang' : 'Mahir'}`
        : p2Name.trim() || 'Siswa Merah';

    setP2({
      id: 'p2',
      name: player2DisplayName,
      color: 'red',
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      streak: 0,
      maxStreak: 0,
      currentQuestionIndex: 0,
      questions: p2Questions,
      shuffledOptionsForCurrent: initialP2Options,
      answersHistory: [],
      isFinished: false,
      finishTimeMs: null,
      penaltyUntil: 0,
      lastFeedback: null,
    });

    setRopePosition(0);
    setLastPuller(null);
    setWinner(null);
    setWinReason('');
    setCountdown(3);
    setGameStatus('countdown');
  };

  // Countdown timer effect
  useEffect(() => {
    if (gameStatus !== 'countdown') return;

    sound.playBeep(false);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameStatus('playing');
          sound.playWhistle();
          matchStartTimeRef.current = Date.now();
          p1QuestionStartTimeRef.current = Date.now();
          p2QuestionStartTimeRef.current = Date.now();
          return 0;
        }
        sound.playBeep(false);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStatus]);

  const TARGET_CORRECT_TO_WIN = 16;

  // Player 1 Answer Handler
  const handleP1Answer = useCallback(
    (selectedOption: string) => {
      if (gameStatus !== 'playing' || p1.isFinished) return;
      if (Date.now() < p1.penaltyUntil) return;

      const currentQ = p1.questions[p1.currentQuestionIndex];
      if (!currentQ) return;

      const isCorrect = selectedOption.trim() === currentQ.correctAnswer.trim();
      const timeSpent = Date.now() - p1QuestionStartTimeRef.current;

      const newRecord: PlayerAnswerRecord = {
        questionId: currentQ.id,
        questionText: currentQ.question,
        selectedAnswer: selectedOption,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
        timeSpentMs: timeSpent,
      };

      const newStreak = isCorrect ? p1.streak + 1 : 0;
      const newMaxStreak = Math.max(p1.maxStreak, newStreak);
      const newScore = isCorrect ? p1.score + 100 + newStreak * 25 : Math.max(0, p1.score - 40);
      const newCorrectCount = isCorrect ? p1.correctCount + 1 : p1.correctCount;
      const newWrongCount = !isCorrect ? p1.wrongCount + 1 : p1.wrongCount;
      const isNowFinished = newCorrectCount >= TARGET_CORRECT_TO_WIN;

      // Question Queue management:
      // If wrong, re-queue the question at the end so student must solve 16 correctly
      const updatedQuestions = !isCorrect ? [...p1.questions, currentQ] : p1.questions;
      const nextIndex = p1.currentQuestionIndex + 1;

      // Rope dynamics
      let newRope = ropePosition;
      if (isCorrect) {
        sound.playCorrect();
        sound.playPull('left');
        setLastPuller('p1');
        if (isNowFinished) {
          // Final decisive pull across win line!
          newRope = -100;
        } else {
          // Pull left, but clamped at -75% so player CANNOT win before answering 16 correct questions!
          const pullStrength = 8 + Math.min(12, newStreak * 2.5);
          newRope = Math.max(-75, ropePosition - pullStrength);
        }
      } else {
        // Wrong answer: slip towards red slightly
        sound.playWrong();
        newRope = Math.min(75, ropePosition + 5);
      }
      setRopePosition(newRope);

      const nextOptions =
        !isNowFinished && updatedQuestions[nextIndex]
          ? getShuffledOptions(updatedQuestions[nextIndex])
          : [];

      const updatedP1: PlayerState = {
        ...p1,
        score: newScore,
        streak: newStreak,
        maxStreak: newMaxStreak,
        correctCount: newCorrectCount,
        wrongCount: newWrongCount,
        questions: updatedQuestions,
        currentQuestionIndex: nextIndex,
        shuffledOptionsForCurrent: nextOptions,
        answersHistory: [...p1.answersHistory, newRecord],
        isFinished: isNowFinished,
        finishTimeMs: isNowFinished ? Date.now() - matchStartTimeRef.current : null,
        penaltyUntil: !isCorrect ? Date.now() + 1500 : 0,
        lastFeedback: isCorrect ? 'correct' : 'wrong',
      };

      setP1(updatedP1);
      p1QuestionStartTimeRef.current = Date.now();

      setTimeout(() => {
        setP1((prev) => ({ ...prev, lastFeedback: null }));
      }, 700);

      // Check win condition: MUST reach 16 correct answers!
      if (isNowFinished) {
        setWinner(updatedP1);
        setWinReason(
          `Selamat! ${updatedP1.name} adalah JUARA karena berhasil menjawab 16 soal dengan benar lebih dulu!`
        );
        setGameStatus('game_over');
        sound.playVictory();
      }
    },
    [gameStatus, p1, ropePosition]
  );

  // Player 2 Answer Handler
  const handleP2Answer = useCallback(
    (selectedOption: string) => {
      if (gameStatus !== 'playing' || p2.isFinished) return;
      if (Date.now() < p2.penaltyUntil) return;

      const currentQ = p2.questions[p2.currentQuestionIndex];
      if (!currentQ) return;

      const isCorrect = selectedOption.trim() === currentQ.correctAnswer.trim();
      const timeSpent = Date.now() - p2QuestionStartTimeRef.current;

      const newRecord: PlayerAnswerRecord = {
        questionId: currentQ.id,
        questionText: currentQ.question,
        selectedAnswer: selectedOption,
        correctAnswer: currentQ.correctAnswer,
        isCorrect,
        timeSpentMs: timeSpent,
      };

      const newStreak = isCorrect ? p2.streak + 1 : 0;
      const newMaxStreak = Math.max(p2.maxStreak, newStreak);
      const newScore = isCorrect ? p2.score + 100 + newStreak * 25 : Math.max(0, p2.score - 40);
      const newCorrectCount = isCorrect ? p2.correctCount + 1 : p2.correctCount;
      const newWrongCount = !isCorrect ? p2.wrongCount + 1 : p2.wrongCount;
      const isNowFinished = newCorrectCount >= TARGET_CORRECT_TO_WIN;

      // Question Queue management:
      // If wrong, re-queue the question at the end so student/bot must solve 16 correctly
      const updatedQuestions = !isCorrect ? [...p2.questions, currentQ] : p2.questions;
      const nextIndex = p2.currentQuestionIndex + 1;

      // Rope dynamics
      let newRope = ropePosition;
      if (isCorrect) {
        sound.playCorrect();
        sound.playPull('right');
        setLastPuller('p2');
        if (isNowFinished) {
          // Final decisive pull across win line!
          newRope = 100;
        } else {
          // Pull right, but clamped at +75% so player CANNOT win before answering 16 correct questions!
          const pullStrength = 8 + Math.min(12, newStreak * 2.5);
          newRope = Math.min(75, ropePosition + pullStrength);
        }
      } else {
        // Wrong answer: slip towards blue slightly
        sound.playWrong();
        newRope = Math.max(-75, ropePosition - 5);
      }
      setRopePosition(newRope);

      const nextOptions =
        !isNowFinished && updatedQuestions[nextIndex]
          ? getShuffledOptions(updatedQuestions[nextIndex])
          : [];

      const updatedP2: PlayerState = {
        ...p2,
        score: newScore,
        streak: newStreak,
        maxStreak: newMaxStreak,
        correctCount: newCorrectCount,
        wrongCount: newWrongCount,
        questions: updatedQuestions,
        currentQuestionIndex: nextIndex,
        shuffledOptionsForCurrent: nextOptions,
        answersHistory: [...p2.answersHistory, newRecord],
        isFinished: isNowFinished,
        finishTimeMs: isNowFinished ? Date.now() - matchStartTimeRef.current : null,
        penaltyUntil: !isCorrect ? Date.now() + 1500 : 0,
        lastFeedback: isCorrect ? 'correct' : 'wrong',
      };

      setP2(updatedP2);
      p2QuestionStartTimeRef.current = Date.now();

      setTimeout(() => {
        setP2((prev) => ({ ...prev, lastFeedback: null }));
      }, 700);

      // Check win condition: MUST reach 16 correct answers!
      if (isNowFinished) {
        setWinner(updatedP2);
        setWinReason(
          `Selamat! ${updatedP2.name} adalah JUARA karena berhasil menjawab 16 soal dengan benar lebih dulu!`
        );
        setGameStatus('game_over');
        sound.playVictory();
      }
    },
    [gameStatus, p2, ropePosition]
  );

  // Bot Logic Loop
  useEffect(() => {
    if (gameStatus !== 'playing' || gameMode !== 'vs_bot' || p2.isFinished) return;

    setBotThinking(true);

    // Bot response delay & accuracy based on difficulty
    let delayMs = 3800;
    let accuracy = 0.75;

    if (botDifficulty === 'easy') {
      delayMs = 4200 + Math.random() * 1500;
      accuracy = 0.65;
    } else if (botDifficulty === 'medium') {
      delayMs = 2800 + Math.random() * 1200;
      accuracy = 0.8;
    } else if (botDifficulty === 'hard') {
      delayMs = 1800 + Math.random() * 900;
      accuracy = 0.92;
    }

    botTimeoutRef.current = window.setTimeout(() => {
      setBotThinking(false);
      const currentQ = p2.questions[p2.currentQuestionIndex];
      if (!currentQ) return;

      const willAnswerCorrectly = Math.random() < accuracy;
      let chosenAnswer = currentQ.correctAnswer;

      if (!willAnswerCorrectly && currentQ.distractors.length > 0) {
        // Pick one of the distractors
        const randomDistractor =
          currentQ.distractors[Math.floor(Math.random() * currentQ.distractors.length)];
        chosenAnswer = randomDistractor;
      }

      handleP2Answer(chosenAnswer);
    }, delayMs);

    return () => {
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
    };
  }, [gameStatus, gameMode, p2.currentQuestionIndex, p2.isFinished, botDifficulty, handleP2Answer]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toLowerCase();

      // P1 shortcuts: q, w, e, r or 1, 2, 3, 4
      if (['q', '1'].includes(key) && p1.shuffledOptionsForCurrent[0]) {
        handleP1Answer(p1.shuffledOptionsForCurrent[0]);
      } else if (['w', '2'].includes(key) && p1.shuffledOptionsForCurrent[1]) {
        handleP1Answer(p1.shuffledOptionsForCurrent[1]);
      } else if (['e', '3'].includes(key) && p1.shuffledOptionsForCurrent[2]) {
        handleP1Answer(p1.shuffledOptionsForCurrent[2]);
      } else if (['r', '4'].includes(key) && p1.shuffledOptionsForCurrent[3]) {
        handleP1Answer(p1.shuffledOptionsForCurrent[3]);
      }

      // P2 shortcuts (only if 2 players mode): u, i, o, p or 7, 8, 9, 0
      if (gameMode === 'two_players') {
        if (['u', '7'].includes(key) && p2.shuffledOptionsForCurrent[0]) {
          handleP2Answer(p2.shuffledOptionsForCurrent[0]);
        } else if (['i', '8'].includes(key) && p2.shuffledOptionsForCurrent[1]) {
          handleP2Answer(p2.shuffledOptionsForCurrent[1]);
        } else if (['o', '9'].includes(key) && p2.shuffledOptionsForCurrent[2]) {
          handleP2Answer(p2.shuffledOptionsForCurrent[2]);
        } else if (['p', '0'].includes(key) && p2.shuffledOptionsForCurrent[3]) {
          handleP2Answer(p2.shuffledOptionsForCurrent[3]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, gameMode, p1.shuffledOptionsForCurrent, p2.shuffledOptionsForCurrent, handleP1Answer, handleP2Answer]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-sky-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans select-none">
      {/* Top Header */}
      <Header
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onOpenFormula={() => setShowFormula(true)}
        onOpenBank={() => setShowQuestionBank(true)}
        onRestart={() => setGameStatus('lobby')}
      />

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col justify-start">
        {gameStatus === 'lobby' ? (
          /* Lobby Configuration */
          <LobbyModal
            mode={gameMode}
            setMode={setGameMode}
            botDifficulty={botDifficulty}
            setBotDifficulty={setBotDifficulty}
            p1Name={p1Name}
            setP1Name={setP1Name}
            p2Name={p2Name}
            setP2Name={setP2Name}
            onStartGame={handleStartGame}
          />
        ) : (
          /* Active Match View */
          <div className="flex flex-col gap-4">
            {/* Visual Tug of War Arena */}
            <TugArena
              ropePosition={ropePosition}
              player1Name={p1.name}
              player2Name={p2.name}
              p1Streak={p1.streak}
              p2Streak={p2.streak}
              p1CorrectCount={p1.correctCount}
              p2CorrectCount={p2.correctCount}
              lastPuller={lastPuller}
            />

            {/* Countdown Overlay */}
            <AnimatePresence>
              {gameStatus === 'countdown' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
                >
                  <div className="text-center">
                    <motion.div
                      key={countdown}
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                      className="text-8xl sm:text-9xl font-black text-amber-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    >
                      {countdown > 0 ? countdown : 'TARIK!'}
                    </motion.div>
                    <p className="text-white text-lg font-extrabold mt-4 tracking-widest uppercase">
                      Siap... Tarik Menarik Refleksi Dimulai!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Duel Boxes Grid (Left: Player 1, Right: Player 2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PlayerDuelBox
                player={p1}
                onAnswer={handleP1Answer}
                keyShortcuts={['Q', 'W', 'E', 'R']}
              />

              <PlayerDuelBox
                player={p2}
                onAnswer={handleP2Answer}
                keyShortcuts={['U', 'I', 'O', 'P']}
                isBot={gameMode === 'vs_bot'}
                botThinking={botThinking}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer info */}
      <footer className="w-full text-center py-2.5 text-xs text-slate-500 border-t border-slate-200/60 dark:border-slate-800">
        <p>
          Media Pembelajaran Interaktif Matematika • SMPN 2 Kemranjen • Guru Pengampu:{' '}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Irma Muflihah, S.Pd.
          </span>
        </p>
      </footer>

      {/* Modals */}
      <FormulaModal isOpen={showFormula} onClose={() => setShowFormula(false)} />

      <QuestionBankModal
        isOpen={showQuestionBank}
        onClose={() => setShowQuestionBank(false)}
        questions={questionBank}
        onUpdateQuestions={setQuestionBank}
      />

      <ReviewModal
        isOpen={showReview}
        onClose={() => setShowReview(false)}
        p1={p1}
        p2={p2}
      />

      {gameStatus === 'game_over' && winner && (
        <GameOverModal
          winner={winner}
          p1={p1}
          p2={p2}
          winReason={winReason}
          onRematch={handleStartGame}
          onBackToLobby={() => setGameStatus('lobby')}
          onOpenReview={() => setShowReview(true)}
        />
      )}
    </div>
  );
}
