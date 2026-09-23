import React from 'react';
import { Play, Pause, Square, SkipBack, SkipForward, Disc, Radio, Power } from 'lucide-react';

export type TransportButtonType = 'play' | 'pause' | 'stop' | 'rewind' | 'fastforward' | 'record' | 'power' | 'custom';
export type TransportButtonVariant = 'metallic' | 'dark-plastic' | 'amber-glow' | 'emerald-glow';

export interface MediaTransportButtonProps {
  type?: TransportButtonType;
  variant?: TransportButtonVariant;
  label?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  showLed?: boolean;
  ledColor?: 'emerald' | 'amber' | 'red' | 'cyan';
  className?: string;
}

const iconMap: Record<TransportButtonType, React.ReactNode> = {
  play: <Play className="w-4 h-4 fill-current ml-0.5" />,
  pause: <Pause className="w-4 h-4 fill-current" />,
  stop: <Square className="w-3.5 h-3.5 fill-current" />,
  rewind: <SkipBack className="w-4 h-4 fill-current" />,
  fastforward: <SkipForward className="w-4 h-4 fill-current" />,
  record: <Disc className="w-4 h-4 fill-current" />,
  power: <Power className="w-4 h-4" />,
  custom: <Radio className="w-4 h-4" />,
};

export const MediaTransportButton: React.FC<MediaTransportButtonProps> = ({
  type = 'play',
  variant = 'metallic',
  label,
  isActive = false,
  disabled = false,
  onClick,
  showLed = true,
  ledColor = 'emerald',
  className = '',
}) => {
  const variantStyles: Record<
    TransportButtonVariant,
    {
      btn: string;
      btnActive: string;
      socket: string;
    }
  > = {
    metallic: {
      btn: 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 border-slate-400 text-slate-800 shadow-[0_4px_8px_rgba(0,0,0,0.35),inset_0_2px_2px_rgba(255,255,255,0.9)]',
      btnActive: 'bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 border-slate-500 text-slate-900 shadow-[inset_0_3px_6px_rgba(0,0,0,0.6)] translate-y-0.5',
      socket: 'bg-slate-900/20 border-slate-400/80 shadow-[inset_0_3px_6px_rgba(0,0,0,0.5)]',
    },
    'dark-plastic': {
      btn: 'bg-gradient-to-b from-stone-800 via-stone-900 to-black border-stone-700 text-stone-200 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]',
      btnActive: 'bg-stone-950 border-stone-800 text-amber-400 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)] translate-y-0.5',
      socket: 'bg-black/60 border-stone-800 shadow-[inset_0_3px_6px_rgba(0,0,0,0.8)]',
    },
    'amber-glow': {
      btn: 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 border-amber-300 text-stone-950 shadow-[0_4px_10px_rgba(245,158,11,0.5),inset_0_2px_2px_rgba(255,255,255,0.8)]',
      btnActive: 'bg-amber-600 border-amber-400 text-stone-950 shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)] translate-y-0.5',
      socket: 'bg-amber-950/40 border-amber-700/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)]',
    },
    'emerald-glow': {
      btn: 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 border-emerald-300 text-stone-950 shadow-[0_4px_10px_rgba(16,185,129,0.5),inset_0_2px_2px_rgba(255,255,255,0.8)]',
      btnActive: 'bg-emerald-600 border-emerald-400 text-stone-950 shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)] translate-y-0.5',
      socket: 'bg-emerald-950/40 border-emerald-700/60 shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)]',
    },
  };

  const ledColorMap = {
    emerald: isActive ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-emerald-950',
    amber: isActive ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-amber-950',
    red: isActive ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 'bg-red-950',
    cyan: isActive ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'bg-cyan-950',
  };

  const current = variantStyles[variant];

  return (
    <div className={`relative inline-flex flex-col items-center select-none font-sans min-w-[72px] ${className}`}>
      {/* Molded Outer Sunken Socket */}
      <div className={`p-1.5 rounded-xl border flex items-center justify-center ${current.socket}`}>
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={`relative min-w-[48px] min-h-[44px] px-3 py-2 rounded-lg border font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all duration-150 ${
            isActive ? current.btnActive : current.btn
          } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer active:translate-y-0.5'}`}
        >
          {iconMap[type]}
          <span className="min-w-[48px] text-center truncate">{label || type.toUpperCase()}</span>

          {showLed && (
            <span
              className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full border border-black/40 ${
                ledColorMap[ledColor]
              }`}
            />
          )}
        </button>
      </div>
    </div>
  );
};
