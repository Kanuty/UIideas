import React, { useState, useRef } from 'react';

export interface RotaryKnobProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  unit?: string;
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
  unit = '',
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const knobRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(value);

  const percentage = (value - min) / (max - min);
  const rotationAngle = -135 + percentage * 270;

  const updateValue = (newValue: number) => {
    const clamped = Math.min(max, Math.max(min, Math.round(newValue / step) * step));
    if (!isControlled) {
      setInternalValue(clamped);
    }
    if (onChange) {
      onChange(clamped);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startValue.current = value;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const deltaY = startY.current - e.clientY;
    const range = max - min;
    const sensitivity = 0.5;
    const valueChange = (deltaY * sensitivity * range) / 100;
    updateValue(startValue.current + valueChange);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY < 0 ? 1 : -1;
    updateValue(value + direction * step * 2);
  };

  const sizeClasses = {
    sm: { container: 'w-16 h-16', knob: 'w-12 h-12', notch: 'h-2 w-1' },
    md: { container: 'w-24 h-24', knob: 'w-18 h-18', notch: 'h-3.5 w-1.5' },
    lg: { container: 'w-32 h-32', knob: 'w-24 h-24', notch: 'h-5 w-2' },
  }[size];

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
        className={`relative ${sizeClasses.container} flex items-center justify-center rounded-full bg-stone-900 p-2 shadow-2xl border border-stone-800 cursor-grab active:cursor-grabbing`}
      >
        <div className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none">
          {Array.from({ length: 11 }).map((_, i) => {
            const angle = -135 + (i / 10) * 270;
            return (
              <div
                key={i}
                className="absolute w-full h-full flex justify-center items-start pt-0.5"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div className={`w-0.5 ${i % 5 === 0 ? 'h-2 bg-amber-400/80' : 'h-1 bg-stone-600'}`} />
              </div>
            );
          })}
        </div>

        <div
          className={`relative ${sizeClasses.knob} rounded-full bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_8px_rgba(0,0,0,0.6)] flex items-center justify-center border border-amber-300`}
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: isDragging.current ? 'none' : 'transform 100ms ease-out',
          }}
        >
          <div className="absolute inset-1 rounded-full border-2 border-dashed border-amber-400/40 opacity-70" />

          <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-tr from-stone-100 via-amber-50 to-white shadow-md flex items-center justify-center relative">
            <div className={`absolute top-1.5 ${sizeClasses.notch} bg-stone-800 rounded-full shadow-sm`} />
          </div>
        </div>
      </div>

      <div className="mt-1.5 px-2 py-0.5 bg-stone-950 border border-stone-800 rounded text-[10px] font-mono text-amber-400 tracking-wider">
        {value}
        {unit}
      </div>
    </div>
  );
};
