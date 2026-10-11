import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PlayerState } from '../types';
import { Trophy, Flame, CheckCircle, XCircle, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';

interface GameOverModalProps {
  winner: PlayerState | 'draw';
  p1: PlayerState;
  p2: PlayerState;
  winReason: string;
  onRematch: () => void;
  onBackToLobby: () => void;
  onOpenReview: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  p1,
  p2,
  winReason,
  onRematch,
  onBackToLobby,
  onOpenReview,
}) => {
  useEffect(() => {
    // Fire confetti celebration
    try {
      const end = Date.now() + 2.5 * 1000;
      const colors = ['#2563eb', '#ef4444', '#f59e0b', '#10b981'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch {}
  }, []);

  const isP1Winner = winner !== 'draw' && winner.id === 'p1';
  const isP2Winner = winner !== 'draw' && winner.id === 'p2';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-4 border-amber-400 dark:border-amber-600 overflow-hidden my-8">
        {/* Victory Header */}
        <div className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 py-6 px-4 text-center text-white">
          <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-md mb-2 shadow-inner border border-white/30 animate-bounce">
            <Trophy className="w-12 h-12 text-yellow-300 drop-shadow" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow">
            {winner === 'draw'
              ? 'PERTANDINGAN SEIMBANG!'
              : `SELAMAT, ${winner.name.toUpperCase()} MENANG!`}
          </h2>
          <p className="text-sm text-amber-100 font-semibold mt-1 max-w-md mx-auto">
            {winReason}
          </p>

          <div className="mt-2 text-xs font-medium text-amber-200">
            SMPN 2 Kemranjen • Guru: Irma Muflihah, S.Pd.
          </div>
        </div>

        {/* Side-by-Side Statistics */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Player 1 Stats Card */}
            <div
              className={`p-4 rounded-2xl border-2 transition ${
                isP1Winner
                  ? 'bg-blue-50/90 border-blue-500 shadow-md ring-2 ring-blue-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-blue-700 text-sm sm:text-base truncate">
                  {p1.name}
                </span>
                {isP1Winner && (
                  <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Juara 1 👑
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500">Skor Akhir</span>
                  <span className="font-bold text-slate-800 text-base">{p1.score}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Benar
                  </span>
                  <span className="font-bold text-emerald-600">{p1.correctCount} / 16</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-500" /> Salah
                  </span>
                  <span className="font-bold text-rose-600">{p1.wrongCount}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500">Akurasi</span>
                  <span className="font-bold text-blue-600">
                    {Math.round((p1.correctCount / Math.max(1, p1.correctCount + p1.wrongCount)) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> Max Combo
                  </span>
                  <span className="font-bold text-amber-600">{p1.maxStreak}x</span>
                </div>
              </div>
            </div>

            {/* Player 2 Stats Card */}
            <div
              className={`p-4 rounded-2xl border-2 transition ${
                isP2Winner
                  ? 'bg-rose-50/90 border-rose-500 shadow-md ring-2 ring-rose-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-rose-700 text-sm sm:text-base truncate">
                  {p2.name}
                </span>
                {isP2Winner && (
                  <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Juara 1 👑
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500">Skor Akhir</span>
                  <span className="font-bold text-slate-800 text-base">{p2.score}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Benar
                  </span>
                  <span className="font-bold text-emerald-600">{p2.correctCount} / 16</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5 text-rose-500" /> Salah
                  </span>
                  <span className="font-bold text-rose-600">{p2.wrongCount}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200">
                  <span className="text-slate-500">Akurasi</span>
                  <span className="font-bold text-rose-600">
                    {Math.round((p2.correctCount / Math.max(1, p2.correctCount + p2.wrongCount)) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> Max Combo
                  </span>
                  <span className="font-bold text-amber-600">{p2.maxStreak}x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button
              onClick={onOpenReview}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center gap-2 border border-indigo-200 transition shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Lihat Pembahasan Soal</span>
            </button>

            <button
              onClick={onRematch}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tanding Ulang (Rematch)</span>
            </button>

            <button
              onClick={onBackToLobby}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <span>Lobi Utama</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
