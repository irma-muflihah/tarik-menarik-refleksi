import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayerState } from '../types';
import { Flame, CheckCircle2, AlertCircle, Bot, User, Hourglass } from 'lucide-react';

interface PlayerDuelBoxProps {
  player: PlayerState;
  onAnswer: (answer: string) => void;
  keyShortcuts: string[]; // e.g. ['Q', 'W', 'E', 'R']
  isBot?: boolean;
  botThinking?: boolean;
}

export const PlayerDuelBox: React.FC<PlayerDuelBoxProps> = ({
  player,
  onAnswer,
  keyShortcuts,
  isBot = false,
  botThinking = false,
}) => {
  const TARGET_CORRECT = 16;
  const isBlue = player.color === 'blue';
  const currentQ = player.questions[player.currentQuestionIndex];
  const now = Date.now();
  const isPenalized = player.penaltyUntil > now;
  const remainingPenaltySec = Math.max(0, Math.ceil((player.penaltyUntil - now) / 1000));
  const progressPercent = Math.min(100, Math.round((player.correctCount / TARGET_CORRECT) * 100));

  const themeClasses = isBlue
    ? {
        border: 'border-blue-300 dark:border-blue-700',
        bg: 'bg-blue-50/90 dark:bg-slate-900/90',
        headerBg: 'bg-gradient-to-r from-blue-600 to-indigo-600',
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        progressFill: 'bg-blue-500',
        optionBorder: 'hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100',
        keyBadge: 'bg-blue-600 text-white',
        accentText: 'text-blue-600',
      }
    : {
        border: 'border-rose-300 dark:border-rose-700',
        bg: 'bg-rose-50/90 dark:bg-slate-900/90',
        headerBg: 'bg-gradient-to-r from-rose-600 to-amber-600',
        badge: 'bg-rose-100 text-rose-800 border-rose-200',
        progressFill: 'bg-rose-500',
        optionBorder: 'hover:border-rose-500 hover:bg-rose-50 active:bg-rose-100',
        keyBadge: 'bg-rose-600 text-white',
        accentText: 'text-rose-600',
      };

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl border-2 ${themeClasses.border} ${themeClasses.bg} shadow-lg backdrop-blur-md overflow-hidden transition-all duration-200 min-h-[460px]`}
    >
      {/* Header bar */}
      <div className={`${themeClasses.headerBg} text-white px-4 py-3 shadow`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm border border-white/30">
              {isBot ? <Bot className="w-5 h-5 text-amber-200" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wide drop-shadow-sm">
                  {player.name}
                </span>
                {isBot && (
                  <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-1.5 py-0.2 rounded-full">
                    BOT AI
                  </span>
                )}
              </div>
              <div className="text-xs text-white/80 font-medium">
                Benar: <span className="font-bold text-white">{player.correctCount}</span> | Salah: <span className="font-bold text-white">{player.wrongCount}</span>
              </div>
            </div>
          </div>

          {/* Streak & Score badge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-xs font-bold bg-black/25 px-2.5 py-1 rounded-full border border-white/20">
              <span className="text-amber-300">Skor:</span>
              <span className="text-white text-sm">{player.score}</span>
            </div>
            {player.streak >= 2 && (
              <div className="flex items-center gap-1 text-[11px] font-black text-amber-300 mt-1 animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-400" />
                <span>COMBO x{player.streak}!</span>
              </div>
            )}
          </div>
        </div>

        {/* Question Progress bar */}
        <div className="mt-2.5">
          <div className="flex justify-between items-center text-[11px] font-bold text-white/90 mb-1">
            <span className="flex items-center gap-1">
              <span>Target:</span>
              <span className="bg-white/20 px-1.5 py-0.2 rounded font-mono font-black text-amber-200">
                {player.correctCount} / 16 Benar
              </span>
            </span>
            <span>{progressPercent}% Menuju Menang</span>
          </div>
          <div className="w-full h-2.5 bg-black/35 rounded-full overflow-hidden p-0.5">
            <motion.div
              className={`h-full ${themeClasses.progressFill} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {player.isFinished ? (
          /* Finished State */
          <div className="flex-1 flex flex-col items-center justify-center py-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 shadow"
            >
              <CheckCircle2 className="w-10 h-10" />
            </motion.div>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
              16 Soal Benar Tuntas! 👑
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Luar biasa! Kamu telah menuntaskan seluruh 16 soal dengan benar!
            </p>
            <div className="mt-4 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300">
              {player.correctCount} Soal Dijawab Benar • Skor: {player.score}
            </div>
          </div>
        ) : (
          /* Question & Options Area */
          <>
            {/* Category badge & Question Prompt */}
            <div className="mb-3">
              {currentQ?.category && (
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold border mb-2 ${themeClasses.badge}`}>
                  {currentQ.category}
                </span>
              )}
              <div className="bg-white dark:bg-slate-800/90 rounded-xl p-3.5 border border-slate-200 dark:border-slate-700 shadow-sm min-h-[90px] flex items-center">
                <p className="text-slate-800 dark:text-slate-100 font-bold text-base leading-snug">
                  {currentQ?.question}
                </p>
              </div>
            </div>

            {/* Penalty Cooldown Overlay */}
            <AnimatePresence>
              {isPenalized && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-3 p-2 bg-rose-100 border border-rose-300 rounded-xl flex items-center justify-center gap-2 text-rose-800 text-xs font-bold"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 animate-spin" />
                  <span>Tergelincir! Terkunci {remainingPenaltySec} detik (soal keliru akan diulang kembali)</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bot Thinking indicator */}
            {isBot && botThinking && (
              <div className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center gap-2 text-amber-800 text-xs font-semibold animate-pulse">
                <Hourglass className="w-4 h-4 text-amber-600 animate-spin" />
                <span>Bot sedang menghitung koordinat...</span>
              </div>
            )}

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-auto">
              {player.shuffledOptionsForCurrent.map((option, idx) => {
                const shortcut = keyShortcuts[idx];
                return (
                  <button
                    key={`${player.currentQuestionIndex}-${idx}`}
                    disabled={isPenalized || isBot || player.isFinished}
                    onClick={() => onAnswer(option)}
                    className={`group relative flex items-center text-left p-3 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 transition-all font-semibold text-slate-800 dark:text-slate-100 shadow-sm hover:shadow active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed ${
                      !isPenalized && !isBot ? themeClasses.optionBorder : ''
                    }`}
                  >
                    {/* Shortcut key badge (Q, W, E, R / U, I, O, P) */}
                    {shortcut && (
                      <span
                        className={`w-6 h-6 rounded-lg ${themeClasses.keyBadge} font-mono font-bold text-xs flex items-center justify-center mr-2.5 shrink-0 shadow-sm`}
                      >
                        {shortcut}
                      </span>
                    )}
                    <span className="text-sm font-medium leading-tight select-none break-words">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Help / Shortcut tip */}
            <div className="mt-2.5 text-center text-[10px] text-slate-400 font-medium">
              {!isBot ? (
                <span>
                  Bisa klik tombol atau tekan keyboard{' '}
                  <span className="font-mono font-bold text-slate-600 dark:text-slate-300">
                    [{keyShortcuts.join(', ')}]
                  </span>
                </span>
              ) : (
                <span>Bot otomatis menjawab sesuai tingkat kesulitan</span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Floating Feedback Effect */}
      <AnimatePresence>
        {player.lastFeedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1.1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className={`absolute inset-x-4 top-24 z-30 p-2.5 rounded-xl shadow-xl text-center font-black text-sm flex items-center justify-center gap-1.5 ${
              player.lastFeedback === 'correct'
                ? 'bg-emerald-500 text-white border-2 border-emerald-300'
                : 'bg-rose-500 text-white border-2 border-rose-300'
            }`}
          >
            {player.lastFeedback === 'correct' ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>BENAR! TARIK REFLEKSI! +100</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5" />
                <span>SALAH! TERGELINCIR! (Diulang Nanti) -50</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
