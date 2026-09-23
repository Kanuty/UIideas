import React from 'react';
import { ViewportMode } from '../../types/sandbox';

export interface CanvasProps {
  children: React.ReactNode;
  viewport: ViewportMode;
  showGrid: boolean;
  zoom: number;
}

export const Canvas: React.FC<CanvasProps> = ({
  children,
  viewport,
  showGrid,
  zoom,
}) => {
  const viewportWidths: Record<ViewportMode, string> = {
    desktop: 'w-full max-w-5xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
    responsive: 'w-full',
  };

  return (
    <div
      className={`flex-1 overflow-auto p-8 flex items-center justify-center transition-all ${
        showGrid ? 'bg-grid-pattern' : 'bg-slate-950'
      }`}
    >
      <div
        className={`bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col min-h-[400px] ${
          viewportWidths[viewport]
        }`}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
        }}
      >
        <div className="h-7 bg-slate-950 border-b border-slate-800/80 px-3 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            {viewport === 'desktop' ? '1280px' : viewport === 'tablet' ? '768px' : '375px'}
          </div>
        </div>

        <div className="p-6 flex-1 flex items-center justify-center overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
