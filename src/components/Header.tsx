import React from 'react';
import { Volume2, VolumeX, BookOpen, Database, RefreshCw, Trophy, GraduationCap } from 'lucide-react';

interface HeaderProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenFormula: () => void;
  onOpenBank: () => void;
  onRestart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isMuted,
  onToggleSound,
  onOpenFormula,
  onOpenBank,
  onRestart,
}) => {
  return (
    <header className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-amber-200 dark:border-slate-800 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* School & Teacher Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-amber-300 font-black text-sm">
              <Trophy className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                <span>TARIK MENARIK REFLEKSI</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold border border-blue-200">
                  DUEL
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold text-blue-700 dark:text-blue-400">SMPN 2 Kemranjen</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500 inline" /> Guru: <strong className="font-semibold text-slate-900 dark:text-white">Irma Muflihah, S.Pd.</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Rumus Kilat */}
          <button
            onClick={onOpenFormula}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs font-bold transition shadow-sm"
            title="Buka rumus ringkas refleksi"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Rumus Kilat</span>
          </button>

          {/* Bank Soal */}
          <button
            onClick={onOpenBank}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-bold transition shadow-sm"
            title="Lihat daftar dan pengaturan bank soal"
          >
            <Database className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Bank Soal</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition border border-slate-200 dark:border-slate-700 shadow-sm"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            )}
          </button>

          {/* Reset / New Match */}
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow transition active:scale-95"
            title="Mulai Ulang Pertandingan"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Lobi Baru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
