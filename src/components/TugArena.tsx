import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Flame } from 'lucide-react';

interface TugArenaProps {
  ropePosition: number; // -100 to +100 (-100: Blue win, +100: Red win)
  player1Name: string;
  player2Name: string;
  p1Streak: number;
  p2Streak: number;
  p1CorrectCount: number;
  p2CorrectCount: number;
  lastPuller: 'p1' | 'p2' | null;
}

export const TugArena: React.FC<TugArenaProps> = ({
  ropePosition,
  player1Name,
  player2Name,
  p1Streak,
  p2Streak,
  p1CorrectCount,
  p2CorrectCount,
  lastPuller,
}) => {
  // Clamped rope position for rendering
  const clampedPosition = Math.max(-100, Math.min(100, ropePosition));
  // Convert -100..100 to percentage offset in the arena (e.g. max shift +/- 32% of arena width)
  const shiftPercent = (clampedPosition / 100) * 32;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-200 border-4 border-amber-800/30 shadow-xl select-none">
      {/* Background Decor: Clouds & Sun */}
      <div className="absolute top-2 left-6 w-16 h-8 bg-white/70 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute top-5 right-12 w-24 h-9 bg-white/60 rounded-full blur-[1px]" />
      <div className="absolute top-2 right-4 w-10 h-10 rounded-full bg-amber-300/60 blur-sm" />

      {/* Top Banner / Match Status Indicator */}
      <div className="relative z-10 pt-3 px-4 flex justify-between items-center text-xs sm:text-sm font-bold">
        {/* Blue Info */}
        <div className="flex items-center gap-1.5 bg-blue-600/95 text-white px-3 py-1 rounded-full shadow-md backdrop-blur-sm border border-blue-400">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-300 animate-ping" />
          <span className="truncate max-w-[100px] sm:max-w-[140px]">{player1Name}</span>
          <span className="bg-blue-800 text-blue-100 px-2 py-0.5 rounded-full text-xs font-mono font-black">
            {p1CorrectCount}/16 Benar
          </span>
          {p1Streak >= 2 && (
            <span className="flex items-center gap-0.5 text-amber-300 bg-blue-900/90 px-1.5 py-0.5 rounded-full text-xs">
              <Flame className="w-3 h-3 fill-amber-300" /> {p1Streak}x
            </span>
          )}
        </div>

        {/* Center Meter */}
        <div className="flex flex-col items-center">
          <div className="px-3 py-0.5 rounded-full bg-amber-950/80 text-amber-100 font-extrabold tracking-wider text-[11px] sm:text-xs uppercase flex items-center gap-1 shadow-inner">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            {clampedPosition < -5
              ? `${Math.abs(Math.round(clampedPosition))}% Keunggulan ${player1Name}`
              : clampedPosition > 5
              ? `${Math.round(clampedPosition)}% Keunggulan ${player2Name}`
              : 'Seimbang di Tengah!'}
          </div>
          {/* Tension Bar */}
          <div className="w-32 sm:w-48 h-2 bg-gray-700/40 rounded-full mt-1.5 overflow-hidden p-0.5 relative flex">
            <div className="w-1/2 flex justify-end">
              <div
                className="h-full bg-blue-500 rounded-l-full transition-all duration-300"
                style={{ width: `${clampedPosition < 0 ? Math.min(100, Math.abs(clampedPosition)) : 0}%` }}
              />
            </div>
            <div className="w-0.5 h-full bg-white z-10" />
            <div className="w-1/2 flex justify-start">
              <div
                className="h-full bg-rose-500 rounded-r-full transition-all duration-300"
                style={{ width: `${clampedPosition > 0 ? Math.min(100, clampedPosition) : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Red Info */}
        <div className="flex items-center gap-1.5 bg-rose-600/95 text-white px-3 py-1 rounded-full shadow-md backdrop-blur-sm border border-rose-400">
          {p2Streak >= 2 && (
            <span className="flex items-center gap-0.5 text-amber-300 bg-rose-900/90 px-1.5 py-0.5 rounded-full text-xs">
              <Flame className="w-3 h-3 fill-amber-300" /> {p2Streak}x
            </span>
          )}
          <span className="bg-rose-800 text-rose-100 px-2 py-0.5 rounded-full text-xs font-mono font-black">
            {p2CorrectCount}/16 Benar
          </span>
          <span className="truncate max-w-[100px] sm:max-w-[140px]">{player2Name}</span>
          <div className="w-2.5 h-2.5 rounded-full bg-rose-300 animate-ping" />
        </div>
      </div>

      {/* Arena Stage */}
      <div className="relative h-44 sm:h-52 w-full mt-2 flex items-end justify-center">
        {/* Grass Ground with Ground Texture */}
        <div className="absolute bottom-0 w-full h-14 sm:h-16 bg-gradient-to-t from-emerald-700 via-emerald-600 to-emerald-500 border-t-4 border-emerald-800">
          {/* Mud patch in the middle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 sm:w-56 h-4 bg-amber-900/40 rounded-b-3xl blur-[1px]" />
          
          {/* Win Markers */}
          {/* Blue Win Line */}
          <div className="absolute top-0 left-[18%] -translate-x-1/2 flex flex-col items-center">
            <div className="w-1 h-14 sm:h-16 bg-blue-300/80 border-r border-dashed border-white" />
            <span className="absolute -top-5 text-[10px] font-bold text-blue-900 bg-blue-200/90 px-1.5 py-0.5 rounded shadow">
              GARIS MENANG BIRU
            </span>
          </div>

          {/* Center Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-1 h-14 sm:h-16 bg-amber-100/90 shadow-md" />
            <span className="absolute -top-5 text-[10px] font-bold text-amber-950 bg-amber-200/90 px-1.5 py-0.5 rounded shadow">
              PUSAT
            </span>
          </div>

          {/* Red Win Line */}
          <div className="absolute top-0 left-[82%] -translate-x-1/2 flex flex-col items-center">
            <div className="w-1 h-14 sm:h-16 bg-rose-300/80 border-l border-dashed border-white" />
            <span className="absolute -top-5 text-[10px] font-bold text-rose-900 bg-rose-200/90 px-1.5 py-0.5 rounded shadow">
              GARIS MENANG MERAH
            </span>
          </div>
        </div>

        {/* Dynamic Moving Tug Stage (Characters + Rope + Flag) */}
        <motion.div
          className="relative w-full h-full flex items-end justify-center pointer-events-none"
          animate={{ x: `${shiftPercent}%` }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        >
          {/* The Rope */}
          <div className="absolute bottom-9 sm:bottom-10 left-0 right-0 h-4 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-800 rounded-full shadow-md border border-amber-900/60 z-20 flex items-center justify-center">
            {/* Rope Texture Ridges */}
            <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(45deg,#000_0px,#000_3px,transparent_3px,transparent_7px)]" />

            {/* Red Center Ribbon / Flag */}
            <motion.div
              className="absolute -top-7 flex flex-col items-center z-30"
              animate={lastPuller ? { rotate: lastPuller === 'p1' ? -12 : 12 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-red-600 border-2 border-white rounded shadow-lg transform rotate-45 flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-300 rounded-full" />
              </div>
              <div className="w-1 h-8 bg-red-700 mt-[-4px]" />
              {/* Ribbon Streamers */}
              <div className="w-4 h-3 bg-red-500 rounded-b shadow-sm -mt-2 animate-bounce" />
            </motion.div>
          </div>

          {/* Left Team (Blue - SMP Students Pulling Left) */}
          <div className="absolute left-[8%] sm:left-[16%] bottom-4 flex items-end gap-1 sm:gap-2 z-25">
            {/* Student 1 (Anchor Puller) */}
            <motion.div
              className="flex flex-col items-center origin-bottom-right"
              animate={
                lastPuller === 'p1'
                  ? { rotate: [-18, -25, -18], y: [0, -3, 0] }
                  : { rotate: -15 }
              }
              transition={{ duration: 0.3 }}
            >
              {/* Blue Team Character SVG */}
              <div className="relative">
                {/* Sweat Drop if pulling */}
                {lastPuller === 'p1' && (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -12 }}
                    className="absolute -top-3 -right-1 text-sky-400 font-bold text-xs"
                  >
                    💦
                  </motion.div>
                )}
                <svg width="44" height="72" viewBox="0 0 44 72" className="drop-shadow-md">
                  {/* Head & Blue Band */}
                  <circle cx="26" cy="14" r="10" fill="#fcd34d" />
                  <rect x="18" y="10" width="16" height="4" rx="2" fill="#2563eb" />
                  {/* Face details */}
                  <circle cx="23" cy="14" r="1.5" fill="#1e293b" />
                  <path d="M 21 18 Q 24 21 27 18" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                  {/* Body / Shirt */}
                  <path d="M 16 24 L 32 24 L 28 46 L 14 46 Z" fill="#3b82f6" />
                  {/* SMP Badge */}
                  <rect x="25" y="27" width="4" height="5" rx="1" fill="#ffffff" />
                  {/* Arms gripping rope */}
                  <path d="M 28 28 L 38 38 L 44 38" stroke="#fcd34d" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <circle cx="40" cy="38" r="3.5" fill="#2563eb" />
                  {/* Pants (SMP Navy/White) */}
                  <path d="M 14 46 L 28 46 L 26 64 L 20 64 L 20 54 L 16 64 L 10 64 Z" fill="#1e3a8a" />
                  {/* Shoes */}
                  <rect x="8" y="64" width="9" height="5" rx="2" fill="#0f172a" />
                  <rect x="24" y="64" width="9" height="5" rx="2" fill="#0f172a" />
                </svg>
              </div>
            </motion.div>

            {/* Student 2 (Middle Puller) */}
            <motion.div
              className="flex flex-col items-center origin-bottom-right"
              animate={
                lastPuller === 'p1'
                  ? { rotate: [-14, -22, -14], y: [0, -4, 0] }
                  : { rotate: -12 }
              }
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <svg width="40" height="66" viewBox="0 0 44 72" className="drop-shadow-md">
                <circle cx="26" cy="14" r="9" fill="#fed7aa" />
                <rect x="19" y="10" width="14" height="3.5" rx="1.5" fill="#1d4ed8" />
                <circle cx="23" cy="14" r="1.5" fill="#1e293b" />
                <path d="M 21 17 Q 24 20 27 17" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                <path d="M 18 24 L 32 24 L 28 44 L 16 44 Z" fill="#60a5fa" />
                <path d="M 28 27 L 36 36 L 43 36" stroke="#fed7aa" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 16 44 L 28 44 L 25 62 L 20 62 L 20 52 L 15 62 L 10 62 Z" fill="#1e40af" />
                <rect x="8" y="62" width="8" height="5" rx="2" fill="#1e293b" />
                <rect x="23" y="62" width="8" height="5" rx="2" fill="#1e293b" />
              </svg>
            </motion.div>

            {/* Dust cloud when blue pulled */}
            {lastPuller === 'p1' && (
              <motion.div
                initial={{ opacity: 0.8, scale: 0.6 }}
                animate={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-2 -left-3 text-amber-900/60 font-black text-sm"
              >
                💨 TARIK!
              </motion.div>
            )}
          </div>

          {/* Right Team (Red - SMP Students Pulling Right) */}
          <div className="absolute right-[8%] sm:right-[16%] bottom-4 flex items-end gap-1 sm:gap-2 z-25">
            {/* Student 2 (Middle Puller) */}
            <motion.div
              className="flex flex-col items-center origin-bottom-left"
              animate={
                lastPuller === 'p2'
                  ? { rotate: [14, 22, 14], y: [0, -4, 0] }
                  : { rotate: 12 }
              }
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <svg width="40" height="66" viewBox="0 0 44 72" className="drop-shadow-md transform -scale-x-100">
                <circle cx="26" cy="14" r="9" fill="#fed7aa" />
                <rect x="19" y="10" width="14" height="3.5" rx="1.5" fill="#dc2626" />
                <circle cx="23" cy="14" r="1.5" fill="#1e293b" />
                <path d="M 21 17 Q 24 20 27 17" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                <path d="M 18 24 L 32 24 L 28 44 L 16 44 Z" fill="#f87171" />
                <path d="M 28 27 L 36 36 L 43 36" stroke="#fed7aa" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 16 44 L 28 44 L 25 62 L 20 62 L 20 52 L 15 62 L 10 62 Z" fill="#991b1b" />
                <rect x="8" y="62" width="8" height="5" rx="2" fill="#1e293b" />
                <rect x="23" y="62" width="8" height="5" rx="2" fill="#1e293b" />
              </svg>
            </motion.div>

            {/* Student 1 (Anchor Puller) */}
            <motion.div
              className="flex flex-col items-center origin-bottom-left"
              animate={
                lastPuller === 'p2'
                  ? { rotate: [18, 25, 18], y: [0, -3, 0] }
                  : { rotate: 15 }
              }
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                {lastPuller === 'p2' && (
                  <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -12 }}
                    className="absolute -top-3 -left-1 text-sky-400 font-bold text-xs"
                  >
                    💦
                  </motion.div>
                )}
                <svg width="44" height="72" viewBox="0 0 44 72" className="drop-shadow-md transform -scale-x-100">
                  <circle cx="26" cy="14" r="10" fill="#fcd34d" />
                  <rect x="18" y="10" width="16" height="4" rx="2" fill="#ef4444" />
                  <circle cx="23" cy="14" r="1.5" fill="#1e293b" />
                  <path d="M 21 18 Q 24 21 27 18" stroke="#1e293b" strokeWidth="1.5" fill="none" />
                  <path d="M 16 24 L 32 24 L 28 46 L 14 46 Z" fill="#ef4444" />
                  <rect x="25" y="27" width="4" height="5" rx="1" fill="#ffffff" />
                  <path d="M 28 28 L 38 38 L 44 38" stroke="#fcd34d" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <circle cx="40" cy="38" r="3.5" fill="#dc2626" />
                  <path d="M 14 46 L 28 46 L 26 64 L 20 64 L 20 54 L 16 64 L 10 64 Z" fill="#991b1b" />
                  <rect x="8" y="64" width="9" height="5" rx="2" fill="#0f172a" />
                  <rect x="24" y="64" width="9" height="5" rx="2" fill="#0f172a" />
                </svg>
              </div>
            </motion.div>

            {/* Dust cloud when red pulled */}
            {lastPuller === 'p2' && (
              <motion.div
                initial={{ opacity: 0.8, scale: 0.6 }}
                animate={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 0.4 }}
                className="absolute -bottom-2 -right-3 text-rose-900/60 font-black text-sm"
              >
                💨 TARIK!
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
