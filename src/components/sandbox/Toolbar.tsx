import React from 'react';
import { ViewportMode } from '../../types/sandbox';
import { IconButton } from '../common/IconButton';
import { Monitor, Tablet, Smartphone, Grid, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export interface ToolbarProps {
  viewport: ViewportMode;
  onViewportChange: (viewport: ViewportMode) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onResetZoom: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  viewport,
  onViewportChange,
  showGrid,
  onToggleGrid,
  zoom,
  onZoomChange,
  onResetZoom,
}) => {
  return (
    <div className="h-11 border-b border-slate-800/80 bg-slate-900/40 px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-1">
        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mr-2">
          Viewport:
        </span>
        <IconButton
          icon={<Monitor className="w-3.5 h-3.5" />}
          label="Desktop View (100%)"
          active={viewport === 'desktop'}
          onClick={() => onViewportChange('desktop')}
          size="sm"
        />
        <IconButton
          icon={<Tablet className="w-3.5 h-3.5" />}
          label="Tablet View (768px)"
          active={viewport === 'tablet'}
          onClick={() => onViewportChange('tablet')}
          size="sm"
        />
        <IconButton
          icon={<Smartphone className="w-3.5 h-3.5" />}
          label="Mobile View (375px)"
          active={viewport === 'mobile'}
          onClick={() => onViewportChange('mobile')}
          size="sm"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 border-r border-slate-800 pr-3">
          <IconButton
            icon={<Grid className="w-3.5 h-3.5" />}
            label="Toggle Canvas Grid"
            active={showGrid}
            onClick={onToggleGrid}
            size="sm"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <IconButton
            icon={<ZoomOut className="w-3.5 h-3.5" />}
            label="Zoom Out"
            onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
            size="sm"
          />
          <span className="font-mono text-[11px] w-12 text-center select-none">
            {Math.round(zoom * 100)}%
          </span>
          <IconButton
            icon={<ZoomIn className="w-3.5 h-3.5" />}
            label="Zoom In"
            onClick={() => onZoomChange(Math.min(2, zoom + 0.1))}
            size="sm"
          />
          {zoom !== 1 && (
            <IconButton
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              label="Reset Zoom"
              onClick={onResetZoom}
              size="sm"
            />
          )}
        </div>
      </div>
    </div>
  );
};
