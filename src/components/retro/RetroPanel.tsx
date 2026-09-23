import React from 'react';

export type PanelShape =
  | 'rectangle'
  | 'cut-top-right'
  | 'cut-top-left'
  | 'cut-bottom-right'
  | 'stepped-corner'
  | 'hexagonal'
  | 'notched-top'
  | 'swoop-bottom-left'
  | 'curved-notch'
  | 'concave-inset'
  | 'molded-pod'
  | 'wave-top';

export type PanelVariant =
  | 'dark-steel'
  | 'military-green'
  | 'vintage-bakelite'
  | 'brushed-aluminum'
  | 'cockpit-teal'
  | 'silver-metallic';

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
  recessedSockets?: boolean;
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
  recessedSockets = false,
}) => {
  const panelInstanceId = React.useId().replace(/:/g, '_');
  const clipId = `panel-clip-${panelInstanceId}`;

  // Shape definitions with SVG path data in objectBoundingBox (0..1) space and viewBox (0..100) space
  const shapeConfigs: Record<
    PanelShape,
    { path: string; viewBoxPath: string; innerPadding: string }
  > = {
    rectangle: {
      path: 'M 0,0 L 1,0 L 1,1 L 0,1 Z',
      viewBoxPath: 'M 0,0 L 100,0 L 100,100 L 0,100 Z',
      innerPadding: 'p-5',
    },
    'cut-top-right': {
      path: 'M 0,0 L 0.75,0 L 1,0.25 L 1,1 L 0,1 Z',
      viewBoxPath: 'M 0,0 L 75,0 L 100,25 L 100,100 L 0,100 Z',
      innerPadding: 'pt-5 pb-5 pl-5 pr-8',
    },
    'cut-top-left': {
      path: 'M 0.25,0 L 1,0 L 1,1 L 0,1 L 0,0.25 Z',
      viewBoxPath: 'M 25,0 L 100,0 L 100,100 L 0,100 L 0,25 Z',
      innerPadding: 'pt-5 pb-5 pl-8 pr-5',
    },
    'cut-bottom-right': {
      path: 'M 0,0 L 1,0 L 1,0.75 L 0.75,1 L 0,1 Z',
      viewBoxPath: 'M 0,0 L 100,0 L 100,75 L 75,100 L 0,100 Z',
      innerPadding: 'pt-5 pb-8 pl-5 pr-8',
    },
    'stepped-corner': {
      path: 'M 0,0 L 0.62,0 L 0.62,0.22 L 1,0.22 L 1,1 L 0,1 Z',
      viewBoxPath: 'M 0,0 L 62,0 L 62,22 L 100,22 L 100,100 L 0,100 Z',
      innerPadding: 'pt-5 pb-5 pl-5 pr-6',
    },
    hexagonal: {
      path: 'M 0.18,0 L 0.82,0 L 1,0.20 L 1,0.80 L 0.82,1 L 0.18,1 L 0,0.80 L 0,0.20 Z',
      viewBoxPath: 'M 18,0 L 82,0 L 100,20 L 100,80 L 82,100 L 18,100 L 0,80 L 0,20 Z',
      innerPadding: 'py-6 px-7',
    },
    'notched-top': {
      path: 'M 0,0.20 L 0.20,0 L 0.80,0 L 1,0.20 L 1,1 L 0,1 Z',
      viewBoxPath: 'M 0,20 L 20,0 L 80,0 L 100,20 L 100,100 L 0,100 Z',
      innerPadding: 'pt-7 pb-5 px-6',
    },
    'swoop-bottom-left': {
      path: 'M 0,0 L 1,0 L 1,1 L 0.38,1 C 0.18,1 0,0.82 0,0.60 Z',
      viewBoxPath: 'M 0,0 L 100,0 L 100,100 L 38,100 C 18,100 0,82 0,60 Z',
      innerPadding: 'pt-5 pb-6 pl-8 pr-5',
    },
    'curved-notch': {
      path: 'M 0,0 L 0.35,0 C 0.42,0.18 0.58,0.18 0.65,0 L 1,0 L 1,1 L 0,1 Z',
      viewBoxPath: 'M 0,0 L 35,0 C 42,18 58,18 65,0 L 100,0 L 100,100 L 0,100 Z',
      innerPadding: 'pt-7 pb-5 px-6',
    },
    'concave-inset': {
      path: 'M 0.08,0 C 0.02,0.30 0.02,0.70 0.08,1 L 0.92,1 C 0.98,0.70 0.98,0.30 0.92,0 Z',
      viewBoxPath: 'M 8,0 C 2,30 2,70 8,100 L 92,100 C 98,70 98,30 92,0 Z',
      innerPadding: 'py-5 px-8',
    },
    'molded-pod': {
      path: 'M 0.12,0 C 0.5,-0.04 0.5,-0.04 0.88,0 C 1,0.25 1,0.75 0.88,1 C 0.5,1.04 0.5,1.04 0.12,1 C 0,0.75 0,0.25 0.12,0 Z',
      viewBoxPath: 'M 12,0 C 50,-4 50,-4 88,0 C 100,25 100,75 88,100 C 50,104 50,104 12,100 C 0,75 0,25 12,0 Z',
      innerPadding: 'py-6 px-8',
    },
    'wave-top': {
      path: 'M 0,0.14 C 0.28,-0.02 0.72,0.28 1,0.12 L 1,1 L 0,1 Z',
      viewBoxPath: 'M 0,14 C 28,-2 72,28 100,12 L 100,100 L 0,100 Z',
      innerPadding: 'pt-8 pb-5 px-6',
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
    'silver-metallic': {
      plate: 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-350',
      strokeOuter: '#64748b', // slate-500
      strokeInner: '#ffffff', // bright white specular highlight
      text: 'text-slate-800 font-bold',
      accent: 'bg-sky-500',
      shadow: 'shadow-[0_12px_28px_rgba(0,0,0,0.35)]',
      glassBg: 'bg-slate-200/20 backdrop-blur-md',
    },
  };

  const currentVariant = variantStyles[variant];
  const shapeConfig = shapeConfigs[shape];

  return (
    <div className={`relative inline-block select-none font-sans ${className}`}>
      {/* SVG ClipPath Definition for Complex Bezier Curves */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={shapeConfig.path} />
          </clipPath>
        </defs>
      </svg>

      {/* Outer 3D Extruded Plate Bevel Container */}
      <div
        className={`relative ${shapeConfig.innerPadding} ${
          isTransparent ? currentVariant.glassBg : currentVariant.plate
        } ${currentVariant.shadow} flex flex-col transition-all duration-200`}
        style={{
          clipPath: `url(#${clipId})`,
          backgroundColor: isTransparent
            ? `rgba(15, 23, 42, ${glassOpacity})`
            : undefined,
        }}
      >
        {/* SVG Heavy-Duty Bevel Border Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Outer thick border stroke */}
          <path
            d={shapeConfig.viewBoxPath}
            fill="none"
            stroke={currentVariant.strokeOuter}
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Inner metallic bevel highlight line */}
          <path
            d={shapeConfig.viewBoxPath}
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
            {shape !== 'cut-top-left' && shape !== 'hexagonal' && shape !== 'notched-top' && shape !== 'wave-top' && (
              <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
            )}
            {shape !== 'cut-top-right' && shape !== 'stepped-corner' && shape !== 'hexagonal' && (
              <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
            )}
            {shape !== 'swoop-bottom-left' && (
              <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
            )}
            {shape !== 'cut-bottom-right' && (
              <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-stone-700 border border-stone-900 shadow-inner" />
            )}
          </div>
        )}

        {/* Background Technical Grid Texture */}
        {showGridPattern && (
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-20 pointer-events-none z-0" />
        )}

        {/* Glass Reflection Glint for Transparent Windows or Silver Metallic finish */}
        {(isTransparent || variant === 'silver-metallic') && showGlassReflection && (
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-60 pointer-events-none z-10" />
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
                <div className={`w-2 h-2 rounded-full ${currentVariant.accent} shadow-[0_0_6px_#38bdf8] shrink-0`} />
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
        <div
          className={`relative z-20 flex flex-wrap items-center justify-center gap-4 py-1 ${
            recessedSockets
              ? 'bg-stone-950/60 shadow-[inset_0_4px_8px_rgba(0,0,0,0.85)] border border-stone-800/80 rounded-xl p-3 my-1'
              : ''
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
