import React from 'react';

export type GrillePattern = 'mesh-dots' | 'slotted-vents' | 'honeycomb' | 'vintage-woven';
export type GrilleVariant = 'brushed-chrome' | 'dark-brass' | 'black-satin' | 'silver-matte';

export interface SpeakerGrilleProps {
  label?: string;
  pattern?: GrillePattern;
  variant?: GrilleVariant;
  width?: number; // in pixels
  height?: number; // in pixels
  showLogoPlate?: boolean;
  logoText?: string;
  className?: string;
}

export const SpeakerGrille: React.FC<SpeakerGrilleProps> = ({
  label,
  pattern = 'mesh-dots',
  variant = 'brushed-chrome',
  width = 240,
  height = 120,
  showLogoPlate = true,
  logoText = 'HI-FI AUDIO',
  className = '',
}) => {
  const variantStyles: Record<
    GrilleVariant,
    {
      bezel: string;
      innerBg: string;
      holeColor: string;
      plateBg: string;
      plateText: string;
    }
  > = {
    'brushed-chrome': {
      bezel: 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-slate-500 shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_2px_3px_rgba(255,255,255,0.9)]',
      innerBg: 'bg-stone-950',
      holeColor: 'fill-stone-900 stroke-black',
      plateBg: 'bg-gradient-to-b from-slate-100 to-slate-300 border-slate-500',
      plateText: 'text-slate-800',
    },
    'dark-brass': {
      bezel: 'bg-gradient-to-b from-amber-900 via-amber-950 to-stone-900 border-amber-800 shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_2px_3px_rgba(251,191,36,0.3)]',
      innerBg: 'bg-black',
      holeColor: 'fill-stone-900 stroke-amber-950',
      plateBg: 'bg-gradient-to-b from-amber-200 to-amber-500 border-amber-700',
      plateText: 'text-amber-950',
    },
    'black-satin': {
      bezel: 'bg-gradient-to-b from-stone-800 via-stone-900 to-black border-stone-700 shadow-[0_8px_20px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.2)]',
      innerBg: 'bg-black',
      holeColor: 'fill-stone-900 stroke-stone-950',
      plateBg: 'bg-gradient-to-b from-stone-700 to-stone-900 border-stone-600',
      plateText: 'text-amber-400',
    },
    'silver-matte': {
      bezel: 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 border-slate-400 shadow-[0_8px_20px_rgba(0,0,0,0.3),inset_0_2px_2px_rgba(255,255,255,0.9)]',
      innerBg: 'bg-stone-900',
      holeColor: 'fill-stone-950 stroke-slate-800',
      plateBg: 'bg-gradient-to-b from-slate-200 to-slate-400 border-slate-500',
      plateText: 'text-slate-900',
    },
  };

  const current = variantStyles[variant];

  return (
    <div className={`relative inline-flex flex-col items-center select-none font-sans min-w-[200px] ${className}`}>
      {label && (
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2 min-w-[120px] text-center truncate">
          {label}
        </span>
      )}

      {/* Bezel Container */}
      <div
        className={`relative rounded-2xl p-3 border overflow-hidden flex items-center justify-center ${current.bezel}`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {/* Recessed Acoustic Cavity */}
        <div className={`relative w-full h-full rounded-xl border border-stone-800 shadow-[inset_0_6px_12px_rgba(0,0,0,0.9)] overflow-hidden ${current.innerBg}`}>

          {/* Pattern Grille Rendering */}
          {pattern === 'mesh-dots' && (
            <div className="absolute inset-0 bg-[radial-gradient(#1c1917_2px,transparent_2px)] [background-size:8px_8px] opacity-90" />
          )}

          {pattern === 'slotted-vents' && (
            <div className="absolute inset-0 flex flex-col justify-between py-2 px-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-full h-1.5 bg-stone-900 border-b border-stone-800 rounded-full shadow-inner" />
              ))}
            </div>
          )}

          {pattern === 'honeycomb' && (
            <div className="absolute inset-0 bg-[radial-gradient(#09090b_3px,transparent_3px)] [background-size:12px_12px] opacity-95" />
          )}

          {pattern === 'vintage-woven' && (
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#262626_25%,transparent_25%),linear-gradient(-45deg,#262626_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#262626_75%),linear-gradient(-45deg,transparent_75%,#262626_75%)] [background-size:10px_10px]" />
          )}

          {/* Screws at corners */}
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-slate-500 border border-stone-900 shadow-inner" />
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-500 border border-stone-900 shadow-inner" />
          <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-slate-500 border border-stone-900 shadow-inner" />
          <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-500 border border-stone-900 shadow-inner" />

          {/* Logo Badge Plate */}
          {showLogoPlate && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded border shadow-md flex items-center justify-center z-10 min-w-[100px]">
              <div className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${current.plateBg} ${current.plateText} border shadow-inner truncate`}>
                {logoText}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
