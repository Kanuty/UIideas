import React, { useState, useRef } from 'react';

export type GearboxVariant = 'machined-steel' | 'dark-tactile' | 'gold-vintage';
export type GearboxOrientation = 'vertical' | 'horizontal';

export interface VerticalGearboxProps {
  label?: string;
  positions?: string[]; // e.g. ['P', 'R', 'N', 'D', 'L'] or ['1', '2', '3', '4', '5']
  currentPosition?: number; // index into positions
  defaultPosition?: number;
  orientation?: GearboxOrientation;
  variant?: GearboxVariant;
  onChange?: (index: number, positionLabel: string) => void;
  className?: string;
}

export const VerticalGearbox: React.FC<VerticalGearboxProps> = ({
  label = 'TRANSMISSION GEARS',
  positions = ['1', '2', '3', '4', '5', 'R'],
  currentPosition: controlledPosition,
  defaultPosition = 0,
  orientation = 'vertical',
  variant = 'machined-steel',
  onChange,
  className = '',
}) => {
  const [internalPos, setInternalPos] = useState<number>(defaultPosition);
  const activeIndex = controlledPosition !== undefined ? controlledPosition : internalPos;

  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const updatePosFromClientPos = (clientX: number, clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let percentage = 0;

    if (orientation === 'vertical') {
      const offset = clientY - rect.top;
      percentage = Math.max(0, Math.min(1, offset / rect.height));
    } else {
      const offset = clientX - rect.left;
      percentage = Math.max(0, Math.min(1, offset / rect.width));
    }

    const total = positions.length;
    const index = Math.min(total - 1, Math.max(0, Math.floor(percentage * total)));

    if (controlledPosition === undefined) {
      setInternalPos(index);
    }
    onChange?.(index, positions[index]);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosFromClientPos(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      updatePosFromClientPos(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const variantStyles: Record<
    GearboxVariant,
    {
      casing: string;
      track: string;
      leverKnob: string;
      activeGlow: string;
      labelColor: string;
    }
  > = {
    'machined-steel': {
      casing: 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 border-slate-500 shadow-[0_12px_28px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.9)]',
      track: 'bg-stone-950 border-slate-600 shadow-[inset_0_4px_10px_rgba(0,0,0,0.95)]',
      leverKnob: 'bg-gradient-to-b from-slate-100 via-slate-300 to-slate-600 border-slate-700 shadow-[0_6px_12px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.9)]',
      activeGlow: 'bg-emerald-400 text-stone-950 shadow-[0_0_10px_#34d399]',
      labelColor: 'text-slate-700',
    },
    'dark-tactile': {
      casing: 'bg-gradient-to-b from-stone-800 via-stone-900 to-black border-stone-700 shadow-[0_12px_28px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.2)]',
      track: 'bg-black border-stone-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.98)]',
      leverKnob: 'bg-gradient-to-b from-stone-700 via-stone-800 to-black border-stone-600 shadow-[0_6px_12px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)]',
      activeGlow: 'bg-amber-400 text-stone-950 shadow-[0_0_10px_#fbbf24]',
      labelColor: 'text-stone-400',
    },
    'gold-vintage': {
      casing: 'bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400 border-amber-600 shadow-[0_12px_28px_rgba(0,0,0,0.5),inset_0_2px_3px_rgba(255,255,255,0.9)]',
      track: 'bg-stone-950 border-amber-900 shadow-[inset_0_4px_10px_rgba(0,0,0,0.95)]',
      leverKnob: 'bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 border-amber-800 shadow-[0_6px_12px_rgba(0,0,0,0.6),inset_0_2px_2px_rgba(255,255,255,0.9)]',
      activeGlow: 'bg-cyan-400 text-stone-950 shadow-[0_0_10px_#22d3ee]',
      labelColor: 'text-amber-950',
    },
  };

  const style = variantStyles[variant];
  const stepPercent = 100 / positions.length;
  const knobPosPercent = activeIndex * stepPercent + stepPercent / 2;

  return (
    <div className={`relative inline-flex flex-col items-center select-none font-sans ${className}`}>
      {label && (
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-1.5 min-w-[120px] text-center truncate">
          {label}
        </span>
      )}

      {/* Main Gearbox Casing Frame */}
      <div
        className={`relative rounded-2xl border ${
          orientation === 'vertical'
            ? 'p-4 flex items-center gap-4'
            : 'p-3 flex flex-col justify-center gap-3'
        } ${style.casing}`}
      >
        {/* Gear Position Labels */}
        <div
          className={`font-mono text-xs font-bold ${
            orientation === 'vertical'
              ? 'flex flex-col justify-between h-56 py-1 min-w-[28px]'
              : 'flex flex-row justify-between w-56 px-1 min-h-[28px]'
          }`}
        >
          {positions.map((pos, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={pos}
                type="button"
                onClick={() => {
                  if (controlledPosition === undefined) setInternalPos(idx);
                  onChange?.(idx, pos);
                }}
                className={`px-2 py-0.5 rounded border text-center transition-all ${
                  isActive
                    ? `${style.activeGlow} font-black border-transparent scale-110`
                    : `${style.labelColor} bg-black/10 border-black/20 hover:bg-black/20`
                }`}
              >
                {pos}
              </button>
            );
          })}
        </div>

        {/* Track Slot & Lever Knob */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`relative rounded-full border cursor-pointer ${style.track} flex justify-center items-center ${
            orientation === 'vertical' ? 'w-10 h-56' : 'h-10 w-56'
          }`}
        >
          {/* Mechanical Detent Tick Lines along the track */}
          <div
            className={`absolute flex pointer-events-none items-center justify-between ${
              orientation === 'vertical'
                ? 'inset-y-2 flex-col'
                : 'inset-x-2 flex-row'
            }`}
          >
            {positions.map((_, i) => (
              <div
                key={i}
                className={`bg-slate-700/80 rounded-full ${
                  orientation === 'vertical' ? 'w-4 h-0.5' : 'h-4 w-0.5'
                }`}
              />
            ))}
          </div>

          {/* Heavy Lever Knob Handle */}
          <div
            className={`absolute rounded-xl border cursor-grab active:cursor-grabbing z-20 flex items-center justify-center transition-all duration-150 ${
              style.leverKnob
            } ${
              orientation === 'vertical'
                ? 'w-12 h-10 -translate-y-1/2'
                : 'h-12 w-10 -translate-x-1/2'
            }`}
            style={{
              [orientation === 'vertical' ? 'top' : 'left']: `${knobPosPercent}%`,
            }}
          >
            {/* Center Metallic Grip Ribs */}
            <div
              className={`flex items-center pointer-events-none ${
                orientation === 'vertical' ? 'flex-row gap-1' : 'flex-col gap-1'
              }`}
            >
              <div
                className={`bg-slate-800/60 rounded-full ${
                  orientation === 'vertical' ? 'w-1 h-5' : 'h-1 w-5'
                }`}
              />
              <div
                className={`bg-slate-800/60 rounded-full ${
                  orientation === 'vertical' ? 'w-1 h-5' : 'h-1 w-5'
                }`}
              />
              <div
                className={`bg-slate-800/60 rounded-full ${
                  orientation === 'vertical' ? 'w-1 h-5' : 'h-1 w-5'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
