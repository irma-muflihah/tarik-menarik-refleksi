import React, { useState } from 'react';
import { PlayerState } from '../types';
import { X, CheckCircle, XCircle, BookOpen } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  p1: PlayerState;
  p2: PlayerState;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  p1,
  p2,
}) => {
  const [activeTab, setActiveTab] = useState<'p1' | 'p2'>('p1');

  if (!isOpen) return null;

  const activePlayer = activeTab === 'p1' ? p1 : p2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-indigo-200" />
            <div>
              <h3 className="font-extrabold text-lg">Pembahasan 16 Soal Duel</h3>
              <p className="text-xs text-indigo-200">
                SMPN 2 Kemranjen • Guru: Irma Muflihah, S.Pd.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-2 gap-2">
          <button
            onClick={() => setActiveTab('p1')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'p1'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300'
            }`}
          >
            <span>{p1.name} (Biru)</span>
            <span className="text-[11px] bg-black/20 px-1.5 py-0.5 rounded-full">
              {p1.correctCount}/{p1.answersHistory.length || 16} Benar
            </span>
          </button>

          <button
            onClick={() => setActiveTab('p2')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition ${
              activeTab === 'p2'
                ? 'bg-rose-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-200 dark:text-slate-300'
            }`}
          >
            <span>{p2.name} (Merah)</span>
            <span className="text-[11px] bg-black/20 px-1.5 py-0.5 rounded-full">
              {p2.correctCount}/{p2.answersHistory.length || 16} Benar
            </span>
          </button>
        </div>

        {/* Question List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 text-slate-800 dark:text-slate-200">
          {activePlayer.answersHistory.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Belum ada riwayat jawaban tercatat untuk pemain ini.
            </div>
          ) : (
            activePlayer.answersHistory.map((rec, index) => {
              const matchedQ = activePlayer.questions.find((q) => q.id === rec.questionId);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-2xl border-2 transition ${
                    rec.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800'
                      : 'bg-rose-50/70 border-rose-300 dark:bg-rose-950/20 dark:border-rose-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      Soal #{index + 1}
                    </span>
                    <span
                      className={`text-xs font-bold flex items-center gap-1 ${
                        rec.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {rec.isCorrect ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Jawaban Tepat
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Tergelincir
                        </>
                      )}
                    </span>
                  </div>

                  <p className="font-bold text-sm sm:text-base mt-2 leading-snug">
                    {rec.questionText}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400 block mb-0.5">Jawaban Pemain:</span>
                      <span
                        className={`font-bold ${
                          rec.isCorrect ? 'text-emerald-600' : 'text-rose-600 line-through'
                        }`}
                      >
                        {rec.selectedAnswer}
                      </span>
                    </div>

                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <span className="text-slate-400 block mb-0.5">Kunci Jawaban:</span>
                      <span className="font-bold text-emerald-600">
                        {rec.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {matchedQ?.explanation && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                      💡 <strong>Pembahasan:</strong> {matchedQ.explanation}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800 p-3.5 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition"
          >
            Tutup Pembahasan
          </button>
        </div>
      </div>
    </div>
  );
};
