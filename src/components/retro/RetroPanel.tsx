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
  isTransparent?: boolean;
  glassOpacity?: number; // e.g. 0.1 for 90% transparency
  windowLabel?: string;
  showGlassReflection?: boolean;
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
  isTransparent = false,
  glassOpacity = 0.15,
  windowLabel,
  showGlassReflection = true,
}) => {
  // Polygon clip-paths and SVG points for 3D heavy-duty bevel borders
  const shapeConfigs: Record<
    PanelShape,
    { clip: string; points: string; innerPadding: string }
  > = {
    rectangle: {
      clip: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      points: '0,0 100,0 100,100 0,100',
      innerPadding: 'p-5',
    },
    'cut-top-right': {
      clip: 'polygon(0% 0%, 75% 0%, 100% 25%, 100% 100%, 0% 100%)',
      points: '0,0 75,0 100,25 100,100 0,100',
      innerPadding: 'pt-5 pb-5 pl-5 pr-8',
    },
    'cut-top-left': {
      clip: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 25%)',
      points: '25,0 100,0 100,100 0,100 0,25',
      innerPadding: 'pt-5 pb-5 pl-8 pr-5',
    },
    'cut-bottom-right': {
      clip: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)',
      points: '0,0 100,0 100,75 75,100 0,100',
      innerPadding: 'pt-5 pb-8 pl-5 pr-8',
    },
    'stepped-corner': {
      clip: 'polygon(0% 0%, 62% 0%, 62% 22%, 100% 22%, 100% 100%, 0% 100%)',
      points: '0,0 62,0 62,22 100,22 100,100 0,100',
      innerPadding: 'pt-5 pb-5 pl-5 pr-6',
    },
    hexagonal: {
      clip: 'polygon(18% 0%, 82% 0%, 100% 20%, 100% 80%, 82% 100%, 18% 100%, 0% 80%, 0% 20%)',
      points: '18,0 82,0 100,20 100,80 82,100 18,100 0,80 0,20',
      innerPadding: 'py-6 px-7',
    },
    'notched-top': {
      clip: 'polygon(0% 20%, 20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%)',
      points: '0,20 20,0 80,0 100,20 100,100 0,100',
      innerPadding: 'pt-7 pb-5 px-6',
    },
  };

  const variantStyles: Record<
    PanelVariant,
    {
      plate: string;
      strokeOuter: string;
      strokeInner: string;
      text: string;
      accent: string;
      shadow: string;
      glassBg: string;
    }
  > = {
    'dark-steel': {
      plate: 'bg-gradient-to-b from-stone-900 via-stone-950 to-black',
      strokeOuter: '#44403c', // stone-700
      strokeInner: '#a8a29e', // stone-400
      text: 'text-amber-300',
      accent: 'bg-amber-400',
      shadow: 'shadow-[0_16px_32px_rgba(0,0,0,0.85)]',
      glassBg: 'bg-cyan-950/10 backdrop-blur-md',
    },
    'military-green': {
      plate: 'bg-gradient-to-b from-emerald-950 via-stone-950 to-black',
      strokeOuter: '#064e3b', // emerald-900
      strokeInner: '#34d399', // emerald-400
      text: 'text-emerald-300',
      accent: 'bg-emerald-400',
      shadow: 'shadow-[0_16px_32px_rgba(0,0,0,0.9)]',
      glassBg: 'bg-emerald-950/10 backdrop-blur-md',
    },
    'vintage-bakelite': {
      plate: 'bg-gradient-to-b from-amber-950/90 via-stone-950 to-stone-900',
      strokeOuter: '#78350f', // amber-900
      strokeInner: '#fbbf24', // amber-400
      text: 'text-amber-200',
      accent: 'bg-amber-400',
      shadow: 'shadow-[0_16px_32px_rgba(0,0,0,0.9)]',
      glassBg: 'bg-amber-950/10 backdrop-blur-md',
    },
    'brushed-aluminum': {
      plate: 'bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950',
      strokeOuter: '#475569', // slate-600
      strokeInner: '#38bdf8', // sky-400
      text: 'text-sky-200',
      accent: 'bg-sky-400',
      shadow: 'shadow-[0_16px_32px_rgba(0,0,0,0.8)]',
      glassBg: 'bg-sky-950/10 backdrop-blur-md',
    },
    'cockpit-teal': {
      plate: 'bg-gradient-to-b from-teal-950 via-stone-950 to-black',
      strokeOuter: '#115e59', // teal-800
      strokeInner: '#2dd4bf', // teal-400
      text: 'text-teal-200',
      accent: 'bg-teal-400',
      shadow: 'shadow-[0_16px_32px_rgba(0,0,0,0.9)]',
      glassBg: 'bg-teal-950/10 backdrop-blur-md',
    },
  };

  const currentVariant = variantStyles[variant];
  const shapeConfig = shapeConfigs[shape];

  return (
    <div className={`relative inline-block select-none font-sans ${className}`}>
      {/* Outer 3D Extruded Plate Bevel Container */}
      <div
        className={`relative ${shapeConfig.innerPadding} ${
          isTransparent ? currentVariant.glassBg : currentVariant.plate
        } ${currentVariant.shadow} flex flex-col transition-all duration-200`}
        style={{
          clipPath: shapeConfig.clip,
          backgroundColor: isTransparent
            ? `rgba(15, 23, 42, ${glassOpacity})`
            : undefined,
        }}
      >
        {/* SVG Thick Heavy-Duty Bevel Border Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Outer thick border stroke */}
          <polygon
            points={shapeConfig.points}
            fill="none"
            stroke={currentVariant.strokeOuter}
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Inner metallic bevel highlight line */}
          <polygon
            points={shapeConfig.points}
            fill="none"
            stroke={currentVariant.strokeInner}
            strokeWidth="1.5"
            strokeDasharray={isTransparent ? '4, 2' : 'none'}
            opacity={isTransparent ? 0.8 : 0.6}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Optional Rivet Bolts at structural non-cut positions */}
        {showRivets && (
          <div className="absolute inset-0 pointer-events-none z-20">
            {shape !== 'cut-top-left' && shape !== 'hexagonal' && shape !== 'notched-top' && (
              <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
            )}
            {shape !== 'cut-top-right' && shape !== 'stepped-corner' && shape !== 'hexagonal' && (
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
            )}
            <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
            {shape !== 'cut-bottom-right' && (
              <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
            )}
          </div>
        )}

        {/* Background Technical Grid Texture */}
        {showGridPattern && (
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none z-0" />
        )}

        {/* Glass Reflection Glint for Transparent Windows */}
        {isTransparent && showGlassReflection && (
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-40 pointer-events-none z-10" />
        )}

        {/* Window Banner Tag */}
        {windowLabel && (
          <div className="relative z-20 mb-2 px-2 py-0.5 bg-stone-950/80 border border-amber-500/40 rounded text-[9px] font-mono font-bold tracking-widest text-amber-400 uppercase self-start flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {windowLabel}
          </div>
        )}

        {/* Panel Header Strip - Safe bounds inside cuts */}
        {(title || panelId) && (
          <div className="relative z-20 flex justify-between items-center pb-2.5 mb-3 border-b border-stone-800/80 max-w-full">
            {title && (
              <div className="flex items-center gap-2 overflow-hidden">
                <div className={`w-2 h-2 rounded-full ${currentVariant.accent} shadow-[0_0_6px_#fbbf24] shrink-0`} />
                <span className={`text-xs font-mono font-bold tracking-widest uppercase truncate ${currentVariant.text}`}>
                  {title}
                </span>
              </div>
            )}
            {panelId && (
              <span className="text-[9px] font-mono tracking-wider text-stone-500 font-bold shrink-0 ml-2">
                {panelId}
              </span>
            )}
          </div>
        )}

        {/* Panel Controls / Sub-component Slot Container */}
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 py-1">
          {children}
        </div>
      </div>
    </div>
  );
};
