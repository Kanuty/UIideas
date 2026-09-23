import React from 'react';
import { ViewportMode } from '../../types/sandbox';
import { CanvasBackdrop } from './Canvas';
import { RotaryKnob } from '../retro/RotaryKnob';
import { ToggleSwitch } from '../retro/ToggleSwitch';
import { VerticalGearbox } from '../retro/VerticalGearbox';
import { ChainedDropdown } from '../retro/ChainedDropdown';
import { Monitor, Palette } from 'lucide-react';

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
  theme?: 'dark' | 'light';
}

const VIEWPORT_MODES: ViewportMode[] = ['desktop', 'tablet', 'mobile'];

const BACKDROP_OPTIONS = [
  { value: 'tech-grid', label: 'Tech Dark Grid', badge: 'GRID' },
  { value: 'grass-field', label: 'Grass XP Meadow', badge: 'XP' },
  { value: 'brushed-workbench', label: 'Workbench Metal', badge: 'METAL' },
  { value: 'blueprint', label: 'Cyan Blueprint', badge: 'CAD' },
  { value: 'dark-slate', label: 'Dark Slate', badge: 'SLATE' },
];

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
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';
  const currentViewportIndex = Math.max(0, VIEWPORT_MODES.indexOf(viewport));

  return (
    <div
      className={`border-b px-4 py-2 flex flex-wrap items-center justify-between gap-4 shrink-0 select-none shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-30 transition-colors ${
        isDark
          ? 'bg-gradient-to-b from-stone-900 via-stone-950 to-black border-stone-800'
          : 'bg-gradient-to-b from-amber-200 via-amber-100 to-amber-200 border-amber-300/80 text-amber-950'
      }`}
    >

      {/* Viewport Gear Selector */}
      <div className={`flex items-center gap-3 p-1.5 rounded-xl border shadow-inner ${
        isDark ? 'bg-stone-900/80 border-stone-800' : 'bg-amber-300/40 border-amber-400'
      }`}>
        <div className="flex items-center gap-2 px-2">
          <Monitor className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-800'}`} />
          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
            isDark ? 'text-amber-300' : 'text-amber-900'
          }`}>
            VIEWPORT GEAR
          </span>
        </div>

        {/* Horizontal Gear Transmission Shift Control */}
        <div className="scale-90 -my-2">
          <VerticalGearbox
            label=""
            orientation="horizontal"
            positions={['DESK', 'TAB', 'MOB']}
            currentPosition={currentViewportIndex}
            variant={isDark ? 'dark-tactile' : 'machined-steel'}
            onChange={(idx) => onViewportChange(VIEWPORT_MODES[idx])}
          />
        </div>
      </div>

      {/* Center Canvas Grid Toggle Switch & Environment Backdrop Selector */}
      <div className={`flex items-center gap-4 p-1.5 rounded-xl border shadow-inner ${
        isDark ? 'bg-stone-900/80 border-stone-800' : 'bg-amber-300/40 border-amber-400'
      }`}>

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

        {/* Chained Dropdown Backdrop Selector */}
        {onBackdropChange && (
          <div className={`flex items-center gap-2 border-l pl-3 ${isDark ? 'border-stone-800' : 'border-amber-400/80'}`}>
            <Palette className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-800'}`} />
            <div className="scale-90 origin-left -my-1">
              <ChainedDropdown
                value={backdrop}
                onChange={(val) => onBackdropChange(val as CanvasBackdrop)}
                options={BACKDROP_OPTIONS}
                material={isDark ? 'gothic-dark' : 'brushed-steel'}
                chainStyle="metal-chain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rotary Knob Zoom Control Dial */}
      <div className={`flex items-center gap-3 px-3 py-1 rounded-xl border shadow-inner ${
        isDark ? 'bg-stone-900/80 border-stone-800' : 'bg-amber-300/40 border-amber-400'
      }`}>
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
          <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border shadow-inner min-w-[50px] text-center ${
            isDark
              ? 'bg-black/80 text-amber-300 border-amber-500/40'
              : 'bg-amber-50 text-amber-950 border-amber-400'
          }`}>
            {Math.round(zoom * 100)}%
          </span>
          {zoom !== 1 && (
            <button
              onClick={onResetZoom}
              className={`text-[9px] font-mono underline mt-0.5 ${
                isDark ? 'text-amber-400/80 hover:text-amber-300' : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              RESET
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
