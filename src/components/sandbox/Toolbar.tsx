import React from 'react';
import { ViewportMode } from '../../types/sandbox';
import { CanvasBackdrop } from './Canvas';
import { RotaryKnob } from '../retro/RotaryKnob';
import { ToggleSwitch } from '../retro/ToggleSwitch';
import { Monitor, Tablet, Smartphone, Palette } from 'lucide-react';

export interface ToolbarProps {
  viewport: ViewportMode;
  onViewportChange: (viewport: ViewportMode) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onResetZoom: () => void;
  backdrop?: CanvasBackdrop;
  onBackdropChange?: (backdrop: CanvasBackdrop) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  viewport,
  onViewportChange,
  showGrid,
  onToggleGrid,
  zoom,
  onZoomChange,
  onResetZoom,
  backdrop = 'tech-grid',
  onBackdropChange,
}) => {
  return (
    <div className="bg-gradient-to-b from-stone-900 via-stone-950 to-black border-b border-stone-800 px-4 py-2 flex flex-wrap items-center justify-between gap-4 shrink-0 select-none shadow-[0_4px_12px_rgba(0,0,0,0.8)] z-30">

      {/* Viewport Gear Shaft Selector */}
      <div className="flex items-center gap-3 bg-stone-900/80 p-1.5 rounded-xl border border-stone-800 shadow-inner">
        <div className="flex items-center gap-2 px-2">
          <Monitor className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest">
            VIEWPORT GEAR
          </span>
        </div>

        {/* Horizontal Gear Shift Tabs */}
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-stone-800">
          {[
            { mode: 'desktop' as ViewportMode, label: 'DESK', icon: <Monitor className="w-3 h-3" /> },
            { mode: 'tablet' as ViewportMode, label: 'TAB', icon: <Tablet className="w-3 h-3" /> },
            { mode: 'mobile' as ViewportMode, label: 'MOB', icon: <Smartphone className="w-3 h-3" /> },
          ].map((item) => {
            const isActive = viewport === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => onViewportChange(item.mode)}
                className={`px-3 py-1 font-mono text-[10px] font-bold uppercase rounded flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 border border-amber-300 shadow-[0_0_8px_#fbbf24] scale-105'
                    : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-stone-200'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Canvas Grid Toggle Switch & Environment Backdrop Selector */}
      <div className="flex items-center gap-4 bg-stone-900/80 p-1.5 rounded-xl border border-stone-800 shadow-inner">

        {/* Grid Toggle Switch */}
        <div className="flex items-center scale-90 -my-1">
          <ToggleSwitch
            label="CANVAS GRID"
            size="sm"
            variant="chrome"
            checked={showGrid}
            onChange={onToggleGrid}
            ledStatus="amber"
          />
        </div>

        {/* Backdrop Selector */}
        {onBackdropChange && (
          <div className="flex items-center gap-2 border-l border-stone-800 pl-3">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={backdrop}
              onChange={(e) => onBackdropChange(e.target.value as CanvasBackdrop)}
              className="bg-stone-950 text-amber-300 font-mono text-xs px-2.5 py-1 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-400 shadow-inner"
            >
              <option value="tech-grid">Tech Dark Grid</option>
              <option value="grass-field">Grass XP Meadow</option>
              <option value="brushed-workbench">Workbench Metal</option>
              <option value="blueprint">Cyan Blueprint</option>
              <option value="dark-slate">Dark Slate</option>
            </select>
          </div>
        )}
      </div>

      {/* Rotary Knob Zoom Control Dial */}
      <div className="flex items-center gap-3 bg-stone-900/80 px-3 py-1 rounded-xl border border-stone-800 shadow-inner">
        <div className="scale-75 -my-2">
          <RotaryKnob
            label="ZOOM"
            size="sm"
            style="pointer"
            variant="amber-gold"
            min={50}
            max={200}
            defaultValue={Math.round(zoom * 100)}
            value={Math.round(zoom * 100)}
            onChange={(val) => onZoomChange(val / 100)}
            unit="%"
            showValue={false}
            showScale={false}
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="font-mono text-xs font-bold text-amber-300 bg-black/80 px-2 py-0.5 rounded border border-amber-500/40 shadow-inner min-w-[50px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          {zoom !== 1 && (
            <button
              onClick={onResetZoom}
              className="text-[9px] font-mono text-amber-400/80 hover:text-amber-300 underline mt-0.5"
            >
              RESET
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
