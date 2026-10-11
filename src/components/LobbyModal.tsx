import React from 'react';
import { GameMode, BotDifficulty } from '../types';
import { Users, Bot, Zap, Trophy, Play, CheckCircle2, ShieldCheck } from 'lucide-react';

interface LobbyModalProps {
  mode: GameMode;
  setMode: (m: GameMode) => void;
  botDifficulty: BotDifficulty;
  setBotDifficulty: (d: BotDifficulty) => void;
  p1Name: string;
  setP1Name: (n: string) => void;
  p2Name: string;
  setP2Name: (n: string) => void;
  onStartGame: () => void;
}

export const LobbyModal: React.FC<LobbyModalProps> = ({
  mode,
  setMode,
  botDifficulty,
  setBotDifficulty,
  p1Name,
  setP1Name,
  p2Name,
  setP2Name,
  onStartGame,
}) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white/95 dark:bg-slate-900/95 rounded-3xl shadow-2xl border-2 border-amber-300 dark:border-amber-700 overflow-hidden my-4">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 p-6 sm:p-8 text-white text-center overflow-hidden">
        {/* Background Decorative patterns */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-amber-200 text-xs font-bold mb-3 border border-white/20">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>SMPN 2 KEMRANJEN • MATEMATIKA</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight drop-shadow-md">
          TARIK MENARIK REFLEKSI
        </h2>
        <p className="text-sm sm:text-base text-amber-100 font-medium mt-1 max-w-xl mx-auto">
          Duel seru pencerminan titik terhadap Sumbu X dan Sumbu Y. Syarat mutlak: Jawab 16 soal dengan benar untuk memenangkan pertandingan!
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/90 font-semibold">
          <span className="bg-white/20 px-2.5 py-0.5 rounded-full">
            Guru Pengampu: Irma Muflihah, S.Pd.
          </span>
          <span className="bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full font-bold">
            Wajib 16 Jawaban Benar
          </span>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Mode Selector */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            Pilih Mode Duel
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMode('two_players')}
              className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition ${
                mode === 'two_players'
                  ? 'border-blue-600 bg-blue-50/90 dark:bg-blue-950/40 shadow-md ring-2 ring-blue-400/50'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  mode === 'two_players' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}
              >
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Duel 2 Pemain (1 Perangkat)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Main berdua di depan satu layar (Split Screen) dengan tombol keyboard atau sentuh.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode('vs_bot')}
              className={`p-4 rounded-2xl border-2 text-left flex items-start gap-3 transition ${
                mode === 'vs_bot'
                  ? 'border-amber-500 bg-amber-50/90 dark:bg-amber-950/40 shadow-md ring-2 ring-amber-400/50'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  mode === 'vs_bot' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}
              >
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Lawan Komputer (Bot AI)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Latihan mandiri menghadapi bot dengan kecepatan dan akurasi yang dapat disetel.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Players Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Player 1 (Blue) */}
          <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-600" />
              <span className="font-extrabold text-xs text-blue-900 dark:text-blue-300 uppercase tracking-wide">
                Pemain 1 (Tim Biru)
              </span>
            </div>
            <input
              type="text"
              value={p1Name}
              onChange={(e) => setP1Name(e.target.value)}
              placeholder="Nama Pemain 1"
              maxLength={20}
              className="w-full px-3.5 py-2.5 rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-2 text-[11px] text-blue-700 dark:text-blue-400 font-medium flex items-center gap-1">
              <span>Shortcut Keyboard:</span>
              <span className="font-mono font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-blue-200">
                Q, W, E, R
              </span>
            </div>
          </div>

          {/* Player 2 (Red or Bot) */}
          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-rose-600" />
              <span className="font-extrabold text-xs text-rose-900 dark:text-rose-300 uppercase tracking-wide">
                {mode === 'vs_bot' ? 'Lawan Komputer (Tim Merah)' : 'Pemain 2 (Tim Merah)'}
              </span>
            </div>

            {mode === 'vs_bot' ? (
              <div>
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  placeholder="Nama Bot"
                  maxLength={20}
                  className="w-full px-3.5 py-2 rounded-xl border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white mb-2"
                />
                <div className="flex gap-1.5">
                  {(['easy', 'medium', 'hard'] as BotDifficulty[]).map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setBotDifficulty(diff)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition ${
                        botDifficulty === diff
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {diff === 'easy' ? 'Santai' : diff === 'medium' ? 'Sedang' : 'Mahir'}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  placeholder="Nama Pemain 2"
                  maxLength={20}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <div className="mt-2 text-[11px] text-rose-700 dark:text-rose-400 font-medium flex items-center gap-1">
                  <span>Shortcut Keyboard:</span>
                  <span className="font-mono font-bold bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-rose-200">
                    U, I, O, P
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rules & Highlights Card */}
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 font-bold text-xs text-amber-900 dark:text-amber-200 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Aturan Tarik Menarik Refleksi (Wajib 16 Benar):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Syarat Menang:</strong> Pemain belum boleh menang sebelum menjawab tuntas <strong>16 soal dengan benar</strong>!
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Jika Salah:</strong> Tali mengendur (slip) dan soal yang keliru akan <strong>diulang di akhir</strong> hingga dijawab benar.
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>
                <strong>Penentu Juara:</strong> Pemain tercepat yang menuntaskan 16 soal benar menarik tali ke garis akhir kemenangan!
              </span>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartGame}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-black text-base sm:text-lg shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition transform active:scale-98 cursor-pointer"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>MULAI TANDING SEKARANG!</span>
        </button>
      </div>
    </div>
  );
};
