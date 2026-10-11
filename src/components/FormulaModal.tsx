import React from 'react';
import { X, BookOpen, Lightbulb, Compass } from 'lucide-react';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaModal: React.FC<FormulaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-white flex items-center justify-between shadow">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-200" />
            <h3 className="font-extrabold text-base tracking-wide">
              Rumus Kilat: Koordinat & Refleksi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-700 dark:text-slate-300">
          {/* Card 1: Sumbu Koordinat */}
          <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
            <div className="flex items-center gap-2 text-sky-800 dark:text-sky-300 font-bold mb-1.5">
              <Compass className="w-4 h-4" />
              <span>1. Sumbu Bidang Kartesius</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <strong>Garis mendatar (horizontal)</strong> = <span className="font-bold text-sky-700 dark:text-sky-400">Sumbu X</span>
              </li>
              <li>
                <strong>Garis tegak lurus (vertikal)</strong> = <span className="font-bold text-sky-700 dark:text-sky-400">Sumbu Y</span>
              </li>
              <li>
                Titik potong sumbu X dan Y = <strong>Titik Asal O(0,0)</strong>
              </li>
              <li>
                Pasangan berurutan <strong>(x, y)</strong>: <code className="bg-white dark:bg-slate-800 px-1 py-0.5 rounded">x = absis</code>, <code className="bg-white dark:bg-slate-800 px-1 py-0.5 rounded">y = ordinat</code>
              </li>
            </ul>
          </div>

          {/* Card 2: Refleksi Sumbu X */}
          <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <div className="font-bold text-blue-800 dark:text-blue-300 flex items-center justify-between mb-1">
              <span>2. Pencerminan terhadap Sumbu X</span>
              <span className="text-xs bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-0.5 rounded font-mono font-bold">
                (x, y) → (x, -y)
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              💡 <em>Trik Cepat:</em> Nilai <strong>x tetap sama</strong>, nilai <strong>y berubah tanda</strong> (+ jadi -, - jadi +).
            </p>
            <div className="mt-2 text-xs bg-white dark:bg-slate-800 p-2 rounded-lg font-mono border border-blue-100 dark:border-slate-700">
              Contoh: A(3, 2) → A&apos;(3, -2)<br />
              Contoh: C(1, -3) → C&apos;(1, 3)
            </div>
          </div>

          {/* Card 3: Refleksi Sumbu Y */}
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
            <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center justify-between mb-1">
              <span>3. Pencerminan terhadap Sumbu Y</span>
              <span className="text-xs bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100 px-2 py-0.5 rounded font-mono font-bold">
                (x, y) → (-x, y)
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              💡 <em>Trik Cepat:</em> Nilai <strong>x berubah tanda</strong>, nilai <strong>y tetap sama</strong>.
            </p>
            <div className="mt-2 text-xs bg-white dark:bg-slate-800 p-2 rounded-lg font-mono border border-rose-100 dark:border-slate-700">
              Contoh: B(4, 6) → B&apos;(-4, 6)<br />
              Contoh: E(-2, 4) → E&apos;(2, 4)
            </div>
          </div>

          {/* Guru note */}
          <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 text-xs text-amber-900 dark:text-amber-200">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
            <span>
              Ingat! Dalam Tarik Tambang, ketelitian lebih utama daripada asal cepat. Jawaban salah akan membuatmu tergelincir!
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition shadow"
          >
            Tutup & Lanjut Duel
          </button>
        </div>
      </div>
    </div>
  );
};
