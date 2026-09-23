import React, { useState } from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Volume2, VolumeX, Sliders, Disc } from 'lucide-react';

export interface SkeuomorphicMediaBarProps {
  trackTitle?: string;
  artistName?: string;
  durationSeconds?: number;
  className?: string;
}

export const SkeuomorphicMediaBar: React.FC<SkeuomorphicMediaBarProps> = ({
  trackTitle = 'SYNTHWAVE_O3_ATMOSPHERE.MP3',
  artistName = 'ANALOG FREQUENCY LABS',
  durationSeconds = 214,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(45);
  const [volume, setVolume] = useState<number>(75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [eqActive, setEqActive] = useState<boolean>(true);
  const [presetIndex, setPresetIndex] = useState<number>(0);

  const presets = ['ACOUSTIC', 'BASS BOOST', 'ROCK', 'SYNTH 80S'];

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className={`relative inline-block select-none font-sans ${className}`}>
      {/* Main Metallic Shell Container */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-100 via-slate-200 to-slate-350 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.9)] p-4 border border-slate-400/80 overflow-hidden">

        {/* Specular Top Gloss Reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 via-white/10 to-transparent pointer-events-none z-10" />

        {/* Top Status LCD Display & Track Progress */}
        <div className="relative z-20 mb-3 bg-stone-950 border-2 border-slate-400/80 rounded-lg p-2.5 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)] flex items-center justify-between gap-4">

          {/* LCD Screen Marquee */}
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            <div className={`w-3 h-3 rounded-full border border-emerald-400 ${isPlaying ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]' : 'bg-emerald-950'}`} />
            <div className="overflow-hidden">
              <div className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 truncate">
                {isPlaying ? `PLAYING [${presets[presetIndex]}]` : 'PAUSED - READY'}
              </div>
              <div className="text-xs font-mono font-bold tracking-wider text-emerald-300 truncate">
                {trackTitle} — <span className="text-emerald-500">{artistName}</span>
              </div>
            </div>
          </div>

          {/* Time Counter */}
          <div className="font-mono text-sm font-bold tracking-widest text-emerald-400 bg-stone-900 px-2.5 py-1 rounded border border-emerald-900/60 shadow-inner">
            {formatTime(position)} / {formatTime(durationSeconds)}
          </div>
        </div>

        {/* Top Mini Timeline Track Slider Bar */}
        <div className="relative z-20 mb-4 px-1 flex items-center gap-3">
          <span className="text-[9px] font-mono font-bold text-slate-600">SEEK</span>
          <div className="relative flex-1 h-3 bg-stone-900 border border-slate-400/80 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center px-1">
            {/* Filled Glow Track */}
            <div
              className="h-1.5 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full shadow-[0_0_6px_#34d399]"
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
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_#34d399]" />
            </div>
          </div>
        </div>

        {/* Lower Main Control Deck with Molded Recessed Socket Pods */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 bg-slate-300/80 border border-slate-400/70 rounded-xl p-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)]">

          {/* Transport Button Socket Pod */}
          <div className="flex items-center gap-2 bg-slate-900/10 p-1.5 rounded-xl border border-white/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)]">

            {/* Play/Pause Main Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 border ${
                isPlaying
                  ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 border-emerald-300 text-stone-950 shadow-[0_2px_8px_rgba(52,211,153,0.6),inset_0_2px_2px_rgba(255,255,255,0.8)] translate-y-0.5'
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
          <div className="flex items-center gap-2 bg-slate-900/10 px-3 py-2 rounded-xl border border-white/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)]">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-700 hover:text-slate-900 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <div className="relative w-24 h-2.5 bg-stone-900 border border-slate-400/80 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] flex items-center px-0.5">
              <div
                className={`h-1.5 rounded-full ${
                  isMuted ? 'bg-stone-700' : 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-[0_0_6px_#34d399]'
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
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-700 w-7 text-right">
              {isMuted ? '0%' : `${volume}%`}
            </span>
          </div>

          {/* Audio Preset Switcher & FX Socket Pod */}
          <div className="flex items-center gap-2 bg-slate-900/10 p-1.5 rounded-xl border border-white/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)]">
            <button
              onClick={() => setEqActive(!eqActive)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all ${
                eqActive
                  ? 'bg-slate-900 text-emerald-400 border-emerald-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]'
                  : 'bg-slate-200 text-slate-600 border-slate-400'
              }`}
              title="Toggle Equalizer"
            >
              <Sliders className="w-3 h-3" />
              EQ
            </button>

            <button
              onClick={() => setPresetIndex((presetIndex + 1) % presets.length)}
              className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-gradient-to-b from-slate-100 to-slate-300 border border-slate-400 text-slate-800 shadow-[0_2px_4px_rgba(0,0,0,0.2)] active:translate-y-0.5 flex items-center gap-1"
              title="Cycle EQ Preset"
            >
              <Disc className="w-3 h-3 text-emerald-600" />
              {presets[presetIndex]}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
