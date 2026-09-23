import React from 'react';
import { ViewportMode } from '../../types/sandbox';

export type CanvasBackdrop = 'tech-grid' | 'grass-field' | 'brushed-workbench' | 'blueprint' | 'dark-slate';

export interface CanvasProps {
  children: React.ReactNode;
  viewport: ViewportMode;
  showGrid: boolean;
  zoom: number;
  backdrop?: CanvasBackdrop;
}

export const Canvas: React.FC<CanvasProps> = ({
  children,
  viewport,
  showGrid,
  zoom,
  backdrop = 'tech-grid',
}) => {
  const viewportWidths: Record<ViewportMode, string> = {
    desktop: 'w-full max-w-5xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
    responsive: 'w-full',
  };

  const backdropStyles: Record<CanvasBackdrop, string> = {
    'tech-grid': 'bg-stone-950 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]',
    'grass-field': 'bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-600 relative overflow-hidden',
    'brushed-workbench': 'bg-gradient-to-br from-amber-950 via-stone-900 to-black bg-[radial-gradient(#78350f_1px,transparent_1px)] [background-size:20px_20px]',
    'blueprint': 'bg-sky-950 bg-[linear-gradient(to_right,#0284c715_1px,transparent_1px),linear-gradient(to_bottom,#0284c715_1px,transparent_1px)] [background-size:24px_24px]',
    'dark-slate': 'bg-slate-950',
  };

  return (
    <div
      className={`flex-1 overflow-auto p-8 flex items-center justify-center transition-all ${
        showGrid ? 'bg-grid-pattern' : backdropStyles[backdrop]
      }`}
    >
      {/* Decorative Grass Horizon Details for 'grass-field' backdrop */}
      {backdrop === 'grass-field' && !showGrid && (
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent z-0" />
      )}

      <div
        className={`bg-stone-950/90 border-2 border-stone-800 rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.85)] transition-all duration-300 relative overflow-hidden flex flex-col min-h-[420px] z-10 ${
          viewportWidths[viewport]
        }`}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <div className="h-7 bg-stone-950 border-b border-stone-800/80 px-3 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_4px_#f43f5e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_4px_#f59e0b]" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_4px_#10b981]" />
          </div>
          <div className="text-[10px] font-mono text-amber-400/70 font-bold tracking-wider uppercase">
            VIEWPORT: {viewport === 'desktop' ? '1280PX' : viewport === 'tablet' ? '768PX' : '375PX'}
          </div>
        </div>

        <div className="p-6 flex-1 flex items-center justify-center overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
