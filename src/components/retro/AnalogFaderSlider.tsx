import React, { useState, useRef } from 'react';

export type FaderOrientation = 'vertical' | 'horizontal';
export type FaderVariant = 'brushed-silver' | 'dark-tactile' | 'gold-vintage';

export interface AnalogFaderSliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  orientation?: FaderOrientation;
  variant?: FaderVariant;
  onChange?: (val: number) => void;
  ticks?: number;
  unit?: string;
  className?: string;
}

export const AnalogFaderSlider: React.FC<AnalogFaderSliderProps> = ({
  label = 'VOLUME',
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 50,
  orientation = 'vertical',
  variant = 'brushed-silver',
  onChange,
  ticks = 5,
  unit = '%',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const isDragging = useRef<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const updateValueFromPos = (clientX: number, clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    let percentage = 0;

    if (orientation === 'vertical') {
      const offset = rect.bottom - clientY;
      percentage = Math.max(0, Math.min(1, offset / rect.height));
    } else {
      const offset = clientX - rect.left;
      percentage = Math.max(0, Math.min(1, offset / rect.width));
    }

    const rawVal = min + percentage * (max - min);
    const steppedVal = Math.round(rawVal / step) * step;
    const finalVal = Math.max(min, Math.min(max, steppedVal));

    if (controlledValue === undefined) {
      setInternalValue(finalVal);
    }
    onChange?.(finalVal);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateValueFromPos(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) {
      updateValueFromPos(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const percent = Math.max(0, Math.min(100, ((currentValue - min) / (max - min)) * 100));

  const variantStyles: Record<
    FaderVariant,
    {
      cap: string;
      line: string;
      track: string;
    }
  > = {
    'brushed-silver': {
      cap: 'bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 border-slate-600 shadow-[0_4px_8px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.9)]',
      line: 'bg-red-500 shadow-[0_0_4px_#ef4444]',
      track: 'bg-stone-950 border-slate-500 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)]',
    },
    'dark-tactile': {
      cap: 'bg-gradient-to-b from-stone-700 via-stone-800 to-black border-stone-600 shadow-[0_4px_8px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.3)]',
      line: 'bg-amber-400 shadow-[0_0_4px_#fbbf24]',
      track: 'bg-black border-stone-800 shadow-[inset_0_3px_6px_rgba(0,0,0,0.95)]',
    },
    'gold-vintage': {
      cap: 'bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 border-amber-700 shadow-[0_4px_8px_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.9)]',
      line: 'bg-emerald-400 shadow-[0_0_4px_#34d399]',
      track: 'bg-stone-950 border-amber-900 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9)]',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none font-sans min-w-[80px] ${
        orientation === 'vertical' ? 'min-h-[220px]' : 'min-h-[70px] w-full max-w-xs'
      } ${className}`}
    >
      {/* Label */}
      {label && (
        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-2 min-w-[70px] text-center truncate">
          {label}
        </span>
      )}

      {/* Track & Fader Thumb Slot */}
      <div className="relative flex-1 flex items-center justify-center w-full">
        {/* Scale Ticks - aligned precisely to track ends */}
        {ticks > 0 && (
          <div
            className={`absolute flex justify-between pointer-events-none ${
              orientation === 'vertical'
                ? 'top-0 bottom-0 left-1/2 -translate-x-1/2 w-14 flex-col'
                : 'left-0 right-0 top-1/2 -translate-y-1/2 h-10 flex-row'
            }`}
          >
            {Array.from({ length: ticks }).map((_, idx) => (
              <div
                key={idx}
                className={`${
                  orientation === 'vertical' ? 'w-full h-px bg-slate-600/60' : 'h-full w-px bg-slate-600/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Groove Track */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`relative rounded-full border cursor-pointer z-10 ${style.track} ${
            orientation === 'vertical' ? 'w-3 h-40 flex flex-col justify-end' : 'h-3 w-48 flex flex-row'
          }`}
        >
          {/* Active Fill Bar */}
          <div
            className={`bg-emerald-500/80 rounded-full ${
              orientation === 'vertical' ? 'w-full' : 'h-full'
            }`}
            style={{
              [orientation === 'vertical' ? 'height' : 'width']: `${percent}%`,
            }}
          />

          {/* Fader Knob Cap */}
          <div
            className={`absolute rounded border cursor-grab active:cursor-grabbing z-20 flex items-center justify-center transition-all duration-75 ${style.cap} ${
              orientation === 'vertical'
                ? 'w-10 h-6 left-1/2 -translate-x-1/2 translate-y-1/2'
                : 'h-10 w-6 top-1/2 -translate-y-1/2 -translate-x-1/2'
            }`}
            style={{
              [orientation === 'vertical' ? 'bottom' : 'left']: `${percent}%`,
            }}
          >
            {/* Center Position Line */}
            <div
              className={`rounded-full ${style.line} ${
                orientation === 'vertical' ? 'w-6 h-0.5' : 'h-6 w-0.5'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Value Readout */}
      <div className="mt-2 text-[10px] font-mono font-bold text-emerald-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800 shadow-inner min-w-[50px] text-center">
        {currentValue}
        {unit}
      </div>
    </div>
  );
};
