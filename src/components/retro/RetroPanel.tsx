import React from 'react';

export type PanelShape =
  | 'rectangle'
  | 'cut-top-right'
  | 'cut-top-left'
  | 'cut-bottom-right'
  | 'stepped-corner'
  | 'hexagonal'
  | 'notched-top';

export type PanelVariant =
  | 'dark-steel'
  | 'military-green'
  | 'vintage-bakelite'
  | 'brushed-aluminum'
  | 'cockpit-teal';

export interface RetroPanelProps {
  title?: string;
  panelId?: string;
  shape?: PanelShape;
  variant?: PanelVariant;
  children?: React.ReactNode;
  className?: string;
  showRivets?: boolean;
  showGridPattern?: boolean;
}

export const RetroPanel: React.FC<RetroPanelProps> = ({
  title,
  panelId,
  shape = 'cut-top-right',
  variant = 'dark-steel',
  children,
  className = '',
  showRivets = true,
  showGridPattern = true,
}) => {
  // Polygon clip-paths for irregular physical plate silhouettes
  const shapeClipPaths: Record<PanelShape, string> = {
    rectangle: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    'cut-top-right': 'polygon(0% 0%, 82% 0%, 100% 18%, 100% 100%, 0% 100%)',
    'cut-top-left': 'polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 18%)',
    'cut-bottom-right': 'polygon(0% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%)',
    'stepped-corner': 'polygon(0% 0%, 65% 0%, 65% 25%, 100% 25%, 100% 100%, 0% 100%)',
    hexagonal: 'polygon(12% 0%, 88% 0%, 100% 16%, 100% 84%, 88% 100%, 12% 100%, 0% 84%, 0% 16%)',
    'notched-top': 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)',
  };

  const variantStyles: Record<
    PanelVariant,
    { plate: string; border: string; accent: string; text: string; shadow: string }
  > = {
    'dark-steel': {
      plate: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      border: 'border-stone-800',
      accent: 'border-amber-500/80',
      text: 'text-amber-300',
      shadow: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.08),0_12px_24px_rgba(0,0,0,0.8)]',
    },
    'military-green': {
      plate: 'bg-gradient-to-b from-emerald-950 via-stone-950 to-black',
      border: 'border-emerald-900/80',
      accent: 'border-emerald-500',
      text: 'text-emerald-300',
      shadow: 'shadow-[inset_0_2px_4px_rgba(52,211,153,0.15),0_12px_24px_rgba(0,0,0,0.85)]',
    },
    'vintage-bakelite': {
      plate: 'bg-gradient-to-b from-amber-950/80 via-stone-950 to-stone-900',
      border: 'border-amber-900/60',
      accent: 'border-amber-400',
      text: 'text-amber-200',
      shadow: 'shadow-[inset_0_2px_4px_rgba(251,191,36,0.15),0_12px_24px_rgba(0,0,0,0.85)]',
    },
    'brushed-aluminum': {
      plate: 'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950',
      border: 'border-slate-700',
      accent: 'border-sky-400',
      text: 'text-sky-200',
      shadow: 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),0_12px_24px_rgba(0,0,0,0.8)]',
    },
    'cockpit-teal': {
      plate: 'bg-gradient-to-b from-teal-950 via-stone-950 to-black',
      border: 'border-teal-800/80',
      accent: 'border-teal-400',
      text: 'text-teal-200',
      shadow: 'shadow-[inset_0_2px_4px_rgba(45,212,191,0.2),0_12px_24px_rgba(0,0,0,0.9)]',
    },
  };

  const currentVariant = variantStyles[variant];
  const clipPathStyle = shapeClipPaths[shape];

  return (
    <div className={`relative inline-block select-none font-sans p-1 ${className}`}>
      {/* Outer 3D Extruded Plate Bevel Container */}
      <div
        className="relative p-0.5 rounded-lg bg-stone-800 shadow-2xl transition-transform duration-200 hover:scale-[1.005]"
        style={{ clipPath: clipPathStyle }}
      >
        {/* 3D Chamfer Bevel Ring */}
        <div
          className={`relative p-4 md:p-5 ${currentVariant.plate} ${currentVariant.shadow} rounded-lg border-2 ${currentVariant.border} flex flex-col`}
          style={{ clipPath: clipPathStyle }}
        >
          {/* Optional Rivet Bolts at structural points */}
          {showRivets && (
            <>
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
              <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
              {shape !== 'cut-top-right' && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
              )}
            </>
          )}

          {/* Background Technical Grid Texture */}
          {showGridPattern && (
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />
          )}

          {/* Panel Header Strip */}
          {(title || panelId) && (
            <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-stone-800/80 z-10">
              {title && (
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]`} />
                  <span className={`text-xs font-mono font-bold tracking-widest uppercase ${currentVariant.text}`}>
                    {title}
                  </span>
                </div>
              )}
              {panelId && (
                <span className="text-[9px] font-mono tracking-wider text-stone-500 font-bold">
                  {panelId}
                </span>
              )}
            </div>
          )}

          {/* Panel Controls Slot Container */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 py-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
