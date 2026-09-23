import React, { useState, useRef } from 'react';

export type KnobStyle = 'ribbed' | 'cockpit' | 'pointer' | 'classic';
export type KnobSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type KnobVariant = 'amber-gold' | 'silver-aluminum' | 'dark-bakelite' | 'military-grey';

export interface RotaryKnobProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: KnobSize;
  style?: KnobStyle;
  variant?: KnobVariant;
  unit?: string;
  showValue?: boolean;
  showScale?: boolean;
  scaleLabels?: string[];
  detents?: number;
}

export const RotaryKnob: React.FC<RotaryKnobProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 50,
  onChange,
  size = 'md',
  style = 'ribbed',
  variant = 'amber-gold',
  unit = '',
  showValue = true,
  showScale = true,
  scaleLabels,
  detents,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef<{ x: number; y: number; val: number }>({ x: 0, y: 0, val: value });

  const percentage = (value - min) / (max - min);
  const rotationAngle = -135 + percentage * 270;

  const updateValue = (newValue: number) => {
    let clamped = Math.min(max, Math.max(min, newValue));
    if (detents && detents > 1) {
      const stepSize = (max - min) / (detents - 1);
      clamped = Math.round((clamped - min) / stepSize) * stepSize + min;
    } else if (step) {
      clamped = Math.round((clamped - min) / step) * step + min;
    }
    clamped = Math.min(max, Math.max(min, Math.round(clamped * 100) / 100));

    if (!isControlled) {
      setInternalValue(clamped);
    }
    if (onChange) {
      onChange(clamped);
    }
  };

  const hasMoved = useRef(false);

  const calculateValFromEvent = (e: MouseEvent | React.MouseEvent) => {
    if (!knobRef.current) return value;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90; // 0 deg is top
    if (angle > 180) angle -= 360;

    let clampedAngle = Math.min(135, Math.max(-135, angle));
    const norm = (clampedAngle + 135) / 270;
    return min + norm * (max - min);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    hasMoved.current = false;
    startPos.current = { x: e.clientX, y: e.clientY, val: value };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !knobRef.current) return;

    const distMoved = Math.hypot(e.clientX - startPos.current.x, e.clientY - startPos.current.y);
    if (distMoved > 3) {
      hasMoved.current = true;
    }

    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 12) {
      const targetVal = calculateValFromEvent(e);
      updateValue(targetVal);
    } else {
      const deltaY = startPos.current.y - e.clientY;
      const range = max - min;
      const sensitivity = 0.8;
      const valueChange = (deltaY * sensitivity * range) / 120;
      updateValue(startPos.current.val + valueChange);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isDragging.current && !hasMoved.current) {
      // Direct click on dial
      const targetVal = calculateValFromEvent(e);
      updateValue(targetVal);
    }
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    const deltaStep = step || (max - min) / 20;
    updateValue(value + direction * deltaStep);
  };

  const sizeClasses = {
    sm: { container: 'w-16 h-16', knob: 'w-11 h-11', pointerBar: 'w-8 h-2.5', notch: 'h-2 w-1' },
    md: { container: 'w-24 h-24', knob: 'w-18 h-18', pointerBar: 'w-13 h-4', notch: 'h-3.5 w-1.5' },
    lg: { container: 'w-32 h-32', knob: 'w-24 h-24', pointerBar: 'w-18 h-5', notch: 'h-4 w-2' },
    xl: { container: 'w-40 h-40', knob: 'w-30 h-30', pointerBar: 'w-22 h-6', notch: 'h-5 w-2.5' },
    '2xl': { container: 'w-48 h-48', knob: 'w-36 h-36', pointerBar: 'w-28 h-7', notch: 'h-6 w-3' },
  }[size];

  const variantStyles = {
    'amber-gold': {
      outer: 'bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 border-amber-300',
      inner: 'bg-gradient-to-tr from-stone-100 via-amber-50 to-white',
      pointer: 'bg-stone-800',
      bar: 'bg-gradient-to-r from-amber-200 via-stone-100 to-amber-300 border-stone-700 text-stone-900',
    },
    'silver-aluminum': {
      outer: 'bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 border-slate-300',
      inner: 'bg-gradient-to-tr from-slate-200 via-slate-100 to-white',
      pointer: 'bg-red-600',
      bar: 'bg-gradient-to-r from-slate-200 via-white to-slate-300 border-slate-600 text-slate-900',
    },
    'dark-bakelite': {
      outer: 'bg-gradient-to-b from-stone-800 via-stone-900 to-black border-stone-700',
      inner: 'bg-stone-900',
      pointer: 'bg-amber-400',
      bar: 'bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 border-stone-600 text-amber-300',
    },
    'military-grey': {
      outer: 'bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 border-slate-500',
      inner: 'bg-slate-700',
      pointer: 'bg-amber-300',
      bar: 'bg-gradient-to-r from-slate-500 via-slate-400 to-slate-600 border-slate-900 text-slate-100',
    },
  }[variant];

  const totalTicks = detents && detents > 1 ? detents : 11;

  return (
    <div className="inline-flex flex-col items-center select-none font-sans">
      {label && (
        <span className="text-[10px] font-bold tracking-widest text-amber-100 uppercase mb-1">
          {label}
        </span>
      )}

      <div
        ref={knobRef}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        className={`relative ${sizeClasses.container} flex items-center justify-center rounded-full bg-stone-950 p-2 shadow-2xl border border-stone-800 cursor-grab active:cursor-grabbing`}
      >
        {showScale && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none z-20">
            {Array.from({ length: totalTicks }).map((_, i) => {
              const angle = -135 + (i / (totalTicks - 1)) * 270;
              const isMajor = i === 0 || i === totalTicks - 1 || i % Math.max(1, Math.floor(totalTicks / 4)) === 0;
              const customLabel = scaleLabels && scaleLabels[i];

              const tickVal = min + (i / (totalTicks - 1)) * (max - min);

              return (
                <div
                  key={i}
                  className="absolute w-full h-full flex justify-center items-start pt-0.5"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateValue(tickVal);
                    }}
                    className="pointer-events-auto focus:outline-none flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-0.5 ${isMajor ? 'h-2.5 bg-amber-400 group-hover:bg-amber-300 group-hover:scale-125' : 'h-1.5 bg-stone-600 group-hover:bg-amber-400'} transition-all`} />
                    {customLabel && (
                      <span
                        className="absolute top-3 text-[8px] font-mono text-stone-300 font-bold tracking-tighter group-hover:text-amber-300 transition-colors"
                        style={{ transform: `rotate(${-angle}deg)` }}
                      >
                        {customLabel}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div
          className={`relative ${sizeClasses.knob} rounded-full ${variantStyles.outer} shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_6px_12px_rgba(0,0,0,0.7)] flex items-center justify-center border z-10`}
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: isDragging.current ? 'none' : 'transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {style === 'ribbed' && (
            <div className="absolute inset-1 rounded-full border-2 border-dashed border-black/20 opacity-70 pointer-events-none" />
          )}

          {style === 'cockpit' ? (
            /* Cockpit / Aircraft bar handle style with physical ridge pointer */
            <div className={`relative ${sizeClasses.pointerBar} ${variantStyles.bar} rounded border shadow-lg flex items-center justify-between px-1`}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_4px_#fbbf24]" />
              <div className="w-full h-0.5 bg-stone-900/40 mx-1 rounded" />
              <div className="w-1 h-1 rounded-full bg-stone-800" />
            </div>
          ) : (
            /* Round Dial styles */
            <div className={`w-2/3 h-2/3 rounded-full ${variantStyles.inner} shadow-md flex items-center justify-center relative`}>
              <div className={`absolute top-1.5 ${sizeClasses.notch} ${variantStyles.pointer} rounded-full shadow-sm`} />
              {style === 'pointer' && (
                <div className="absolute top-0 bottom-1/2 w-0.5 bg-rose-600 rounded-full" />
              )}
            </div>
          )}
        </div>
      </div>

      {showValue && (
        <div className="mt-1.5 px-2 py-0.5 bg-stone-950 border border-stone-800 rounded text-[10px] font-mono text-amber-400 tracking-wider">
          {value}
          {unit}
        </div>
      )}
    </div>
  );
};
