// Web Audio API synthesizer for high-response sound effects

class SoundManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  public setMuted(val: boolean) {
    this.muted = val;
  }

  // Sports Whistle for match start
  public playWhistle() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(2800, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(2300, now + 0.4);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // AudioContext fallback
    }
  }

  // Rope heave / whoosh sound
  public playPull(direction: 'left' | 'right' = 'left') {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      const baseFreq = direction === 'left' ? 140 : 160;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.28);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  // Cheerful chime on correct answer
  public playCorrect() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = now + i * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.26);
      });
    } catch {}
  }

  // Low buzz on wrong answer
  public playWrong() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  // Countdown beep
  public playBeep(high: boolean = false) {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(high ? 880 : 440, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (high ? 0.35 : 0.15));

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + (high ? 0.35 : 0.15));
    } catch {}
  }

  // Fanfare for match winner
  public playVictory() {
    if (this.muted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Trumpet fanfare chord progression: G4, C5, E5, G5, long C6
      const seq = [
        { f: 392.0, t: 0.0, d: 0.12 },
        { f: 523.25, t: 0.14, d: 0.12 },
        { f: 659.25, t: 0.28, d: 0.12 },
        { f: 783.99, t: 0.42, d: 0.3 },
        { f: 659.25, t: 0.74, d: 0.12 },
        { f: 783.99, t: 0.88, d: 0.12 },
        { f: 1046.5, t: 1.02, d: 0.7 }
      ];

      seq.forEach(({ f, t, d }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + t;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + d);
      });
    } catch {}
  }
}

export const sound = new SoundManager();
