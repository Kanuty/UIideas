import React, { useState } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, VolumeX, Sliders, Disc, Palette } from 'lucide-react';

export type MediaBarColorScheme = 'silver' | 'titanium' | 'amber-deck' | 'cyan-cyber' | 'vfd-blue';

export interface SkeuomorphicMediaBarProps {
  trackTitle?: string;
  artistName?: string;
  durationSeconds?: number;
  colorScheme?: MediaBarColorScheme;
  className?: string;
}

export const SkeuomorphicMediaBar: React.FC<SkeuomorphicMediaBarProps> = ({
  trackTitle = 'SYNTHWAVE_O3_ATMOSPHERE.MP3',
  artistName = 'ANALOG FREQUENCY LABS',
  durationSeconds = 214,
  colorScheme: initialColorScheme = 'silver',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(45);
  const [volume, setVolume] = useState<number>(75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [eqActive, setEqActive] = useState<boolean>(true);
  const [presetIndex, setPresetIndex] = useState<number>(0);
  const [activeTheme, setActiveTheme] = useState<MediaBarColorScheme>(initialColorScheme);

  const presets = ['ACOUSTIC', 'BASS BOOST', 'ROCK', 'SYNTH 80S'];

  const themeStyles = {
    silver: {
      chassisBg: 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-350 border-slate-400/80',
      podBg: 'bg-slate-300/80 border-slate-400/70',
      lcdText: 'text-emerald-400',
      lcdTextSub: 'text-emerald-300',
      lcdDot: 'bg-emerald-400 border-emerald-400 shadow-[0_0_8px_#34d399]',
      glowBar: 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_6px_#34d399]',
      playActive: 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 border-emerald-300 text-stone-950 shadow-[0_2px_8px_rgba(52,211,153,0.6)]',
    },
    titanium: {
      chassisBg: 'bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900 border-stone-600',
      podBg: 'bg-stone-800/90 border-stone-700',
      lcdText: 'text-amber-400',
      lcdTextSub: 'text-amber-300',
      lcdDot: 'bg-amber-400 border-amber-400 shadow-[0_0_8px_#fbbf24]',
      glowBar: 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_6px_#fbbf24]',
      playActive: 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-amber-300 text-stone-950 shadow-[0_2px_8px_rgba(251,191,36,0.6)]',
    },
    'amber-deck': {
      chassisBg: 'bg-gradient-to-b from-amber-950/80 via-stone-900 to-stone-950 border-amber-700/60',
      podBg: 'bg-stone-900/90 border-amber-800/40',
      lcdText: 'text-amber-500',
      lcdTextSub: 'text-amber-400',
      lcdDot: 'bg-amber-500 border-amber-500 shadow-[0_0_8px_#f59e0b]',
      glowBar: 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_6px_#f59e0b]',
      playActive: 'bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 border-amber-400 text-stone-950 shadow-[0_2px_8px_rgba(245,158,11,0.6)]',
    },
    'cyan-cyber': {
      chassisBg: 'bg-gradient-to-b from-slate-900 via-cyan-950/60 to-slate-950 border-cyan-700/60',
      podBg: 'bg-slate-900/90 border-cyan-800/50',
      lcdText: 'text-cyan-400',
      lcdTextSub: 'text-cyan-300',
      lcdDot: 'bg-cyan-400 border-cyan-400 shadow-[0_0_8px_#22d3ee]',
      glowBar: 'bg-gradient-to-r from-cyan-500 to-teal-400 shadow-[0_0_6px_#22d3ee]',
      playActive: 'bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600 border-cyan-300 text-stone-950 shadow-[0_2px_8px_rgba(34,211,238,0.6)]',
    },
    'vfd-blue': {
      chassisBg: 'bg-gradient-to-b from-slate-800 via-blue-950/70 to-slate-900 border-sky-600/60',
      podBg: 'bg-slate-900/90 border-sky-700/50',
      lcdText: 'text-sky-300',
      lcdTextSub: 'text-sky-200',
      lcdDot: 'bg-sky-400 border-sky-400 shadow-[0_0_8px_#38bdf8]',
      glowBar: 'bg-gradient-to-r from-sky-400 to-blue-400 shadow-[0_0_6px_#38bdf8]',
      playActive: 'bg-gradient-to-b from-sky-400 via-sky-500 to-blue-600 border-sky-300 text-stone-950 shadow-[0_2px_8px_rgba(56,189,248,0.6)]',
    },
  };

  const currentTheme = themeStyles[activeTheme] || themeStyles.silver;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className={`relative inline-block select-none font-sans ${className}`}>
      {/* Main Metallic Shell Container */}
      <div className={`relative w-full max-w-2xl rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.9)] p-4 border overflow-hidden transition-all duration-300 ${currentTheme.chassisBg}`}>

        {/* Specular Top Gloss Reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 via-white/10 to-transparent pointer-events-none z-10" />

        {/* Top Status LCD Display & Track Progress */}
        <div className="relative z-20 mb-3 bg-stone-950 border-2 border-slate-500/80 rounded-lg p-2.5 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)] flex items-center justify-between gap-4">

          {/* LCD Screen Marquee */}
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            <div className={`w-3 h-3 rounded-full border ${isPlaying ? `${currentTheme.lcdDot} animate-pulse` : 'bg-stone-800 border-stone-700'}`} />
            <div className="overflow-hidden">
              <div className={`text-[10px] font-mono font-bold tracking-widest truncate ${currentTheme.lcdText}`}>
                {isPlaying ? `PLAYING [${presets[presetIndex]}]` : 'PAUSED - READY'}
              </div>
              <div className={`text-xs font-mono font-bold tracking-wider truncate ${currentTheme.lcdTextSub}`}>
                {trackTitle} — <span className="opacity-80">{artistName}</span>
              </div>
            </div>
          </div>

          {/* Time Counter */}
          <div className={`font-mono text-sm font-bold tracking-widest bg-stone-900 px-2.5 py-1 rounded border border-stone-800 shadow-inner ${currentTheme.lcdText}`}>
            {formatTime(position)} / {formatTime(durationSeconds)}
          </div>
        </div>

        {/* Top Mini Timeline Track Slider Bar */}
        <div className="relative z-20 mb-4 px-1 flex items-center gap-3">
          <span className="text-[9px] font-mono font-bold text-slate-400">SEEK</span>
          <div className="relative flex-1 h-3 bg-stone-900 border border-slate-500/80 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center px-1">
            {/* Filled Glow Track */}
            <div
              className={`h-1.5 rounded-full ${currentTheme.glowBar}`}
              style={{ width: `${(position / durationSeconds) * 100}%` }}
            />
            {/* Slider Handle Knob */}
            <input
              type="range"
              min={0}
              max={durationSeconds}
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-b from-slate-100 to-slate-400 border border-slate-600 shadow-[0_2px_5px_rgba(0,0,0,0.6)] pointer-events-none flex items-center justify-center"
              style={{ left: `calc(${(position / durationSeconds) * 100}% - 8px)` }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.lcdDot}`} />
            </div>
          </div>
        </div>

        {/* Lower Main Control Deck with Molded Recessed Socket Pods */}
        <div className={`relative z-20 flex flex-wrap items-center justify-between gap-3 border rounded-xl p-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)] ${currentTheme.podBg}`}>

          {/* Transport Button Socket Pod */}
          <div className="flex items-center gap-2 bg-slate-900/30 p-1.5 rounded-xl border border-white/20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]">

            {/* Play/Pause Main Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 border ${
                isPlaying
                  ? currentTheme.playActive
                  : 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 border-slate-400 text-slate-800 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_2px_2px_rgba(255,255,255,0.9)] active:translate-y-0.5'
              }`}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            {/* Stop Button */}
            <button
              onClick={() => {
                setIsPlaying(false);
                setPosition(0);
              }}
              className="w-8 h-8 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 text-slate-700 flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5"
              title="Stop"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Skip Back */}
            <button
              onClick={() => setPosition(Math.max(0, position - 15))}
              className="w-8 h-8 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 text-slate-700 flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5"
              title="Rewind 15s"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Skip Forward */}
            <button
              onClick={() => setPosition(Math.min(durationSeconds, position + 15))}
              className="w-8 h-8 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 text-slate-700 flex items-center justify-center shadow-[0_2px_5px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.9)] active:translate-y-0.5"
              title="Fast Forward 15s"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>

          {/* Volume Control Slider Pod */}
          <div className="flex items-center gap-2 bg-slate-900/30 px-3 py-2 rounded-xl border border-white/20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-300 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <div className="relative w-24 h-2.5 bg-stone-900 border border-slate-500/80 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center px-0.5">
              <div
                className={`h-1.5 rounded-full ${
                  isMuted ? 'bg-stone-700' : currentTheme.glowBar
                }`}
                style={{ width: `${isMuted ? 0 : volume}%` }}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-gradient-to-b from-slate-100 to-slate-400 border border-slate-600 shadow-[0_2px_4px_rgba(0,0,0,0.6)] pointer-events-none flex items-center justify-center"
                style={{ left: `calc(${isMuted ? 0 : volume}% - 7px)` }}
              >
                <div className={`w-1 h-1 rounded-full ${currentTheme.lcdDot}`} />
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-300 w-7 text-right">
              {isMuted ? '0%' : `${volume}%`}
            </span>
          </div>

          {/* Audio Preset Switcher & FX Socket Pod */}
          <div className="flex items-center gap-2 bg-slate-900/30 p-1.5 rounded-xl border border-white/20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.4)]">
            <button
              onClick={() => setEqActive(!eqActive)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all ${
                eqActive
                  ? `bg-stone-950 ${currentTheme.lcdText} border-slate-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]`
                  : 'bg-slate-200 text-slate-600 border-slate-400'
              }`}
              title="Toggle Equalizer"
            >
              <Sliders className="w-3 h-3" />
              EQ
            </button>

            <button
              onClick={() => setPresetIndex((presetIndex + 1) % presets.length)}
              className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 text-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-0.5 flex items-center gap-1"
              title="Cycle EQ Preset"
            >
              <Disc className="w-3 h-3 text-emerald-600" />
              {presets[presetIndex]}
            </button>

            {/* Theme Selector Button */}
            <button
              onClick={() => {
                const themes: MediaBarColorScheme[] = ['silver', 'titanium', 'amber-deck', 'cyan-cyber', 'vfd-blue'];
                const nextIdx = (themes.indexOf(activeTheme) + 1) % themes.length;
                setActiveTheme(themes[nextIdx]);
              }}
              className="px-2 py-1 rounded-lg text-[10px] font-mono font-bold bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 text-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-0.5 flex items-center gap-1"
              title="Cycle Media Bar Color Scheme"
            >
              <Palette className="w-3 h-3 text-amber-600" />
              {activeTheme.toUpperCase()}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
