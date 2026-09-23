import React, { useState } from 'react';

export type ToggleVariant = 'chrome' | 'brass' | 'black-tactical' | 'vintage-grey';
export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleSwitchProps {
  label?: string;
  sublabel?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ToggleSize;
  variant?: ToggleVariant;
  hasGuard?: boolean;
  ledStatus?: 'none' | 'green' | 'red' | 'amber';
  onLabel?: string;
  offLabel?: string;
  className?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  sublabel,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  size = 'md',
  variant = 'chrome',
  hasGuard = false,
  ledStatus = 'amber',
  onLabel = 'ON',
  offLabel = 'OFF',
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleToggle = () => {
    const nextState = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(nextState);
    }
    if (onChange) {
      onChange(nextState);
    }
  };

  const sizeStyles = {
    sm: { plate: 'w-12 h-16', lever: 'w-2 h-7', base: 'w-6 h-6', led: 'w-1.5 h-1.5' },
    md: { plate: 'w-16 h-22', lever: 'w-2.5 h-9', base: 'w-8 h-8', led: 'w-2 h-2' },
    lg: { plate: 'w-20 h-28', lever: 'w-3 h-12', base: 'w-10 h-10', led: 'w-2.5 h-2.5' },
  }[size];

  const leverStyles = {
    chrome: 'bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border-slate-400 shadow-[2px_2px_4px_rgba(0,0,0,0.6)]',
    brass: 'bg-gradient-to-r from-yellow-600 via-amber-300 to-yellow-700 border-yellow-600 shadow-[2px_2px_4px_rgba(0,0,0,0.6)]',
    'black-tactical': 'bg-gradient-to-r from-stone-700 via-stone-800 to-stone-900 border-stone-600 shadow-[2px_2px_4px_rgba(0,0,0,0.6)]',
    'vintage-grey': 'bg-gradient-to-r from-stone-400 via-stone-300 to-stone-500 border-stone-500 shadow-[2px_2px_4px_rgba(0,0,0,0.6)]',
  }[variant];

  const ledColors = {
    none: '',
    green: isChecked ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-emerald-950/80',
    red: isChecked ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-rose-950/80',
    amber: isChecked ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-amber-950/80',
  }[ledStatus];

  return (
    <div className={`inline-flex flex-col items-center select-none font-sans ${className}`}>
      {label && (
        <span className="text-[10px] font-bold tracking-wider text-amber-100 uppercase mb-1">
          {label}
        </span>
      )}

      {/* Switch Outer Mounting Plate */}
      <div
        onClick={handleToggle}
        className={`relative ${sizeStyles.plate} bg-gradient-to-b from-stone-900 via-stone-950 to-black rounded-lg border-2 border-stone-800 shadow-2xl flex flex-col items-center justify-between p-1.5 cursor-pointer hover:border-stone-700 transition-colors`}
      >
        {/* Screw heads on corner */}
        <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-stone-700 shadow-inner" />
        <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-stone-700 shadow-inner" />
        <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-stone-700 shadow-inner" />
        <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-stone-700 shadow-inner" />

        {/* Top ON label / LED */}
        <div className="flex items-center gap-1 z-10">
          {ledStatus !== 'none' && (
            <div className={`${sizeStyles.led} rounded-full border border-stone-700 ${ledColors} transition-all duration-150`} />
          )}
          <span className={`text-[8px] font-mono font-bold tracking-widest ${isChecked ? 'text-amber-300' : 'text-stone-500'}`}>
            {onLabel}
          </span>
        </div>

        {/* Center Metal Nut Base & Flip Lever */}
        <div className={`relative ${sizeStyles.base} rounded-full bg-stone-800 border-2 border-stone-700 flex items-center justify-center shadow-inner my-auto`}>
          {/* Hex nut detail */}
          <div className="absolute inset-1 rounded-full border border-stone-600 bg-gradient-to-tr from-stone-900 to-stone-700 opacity-90" />

          {/* Heavy Lever */}
          <div
            className={`relative ${sizeStyles.lever} rounded-full border ${leverStyles} transition-transform duration-150 ease-out origin-bottom z-20`}
            style={{
              transform: isChecked ? 'rotate(0deg) translateY(-25%) scaleY(1.1)' : 'rotate(180deg) translateY(-25%) scaleY(1.1)',
            }}
          >
            {/* Lever ball tip */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-200 border border-slate-400 shadow-sm" />
          </div>
        </div>

        {/* Optional Red Safety Guard */}
        {hasGuard && (
          <div className="absolute inset-x-1 top-2 bottom-2 rounded border-2 border-rose-600/60 bg-rose-950/20 pointer-events-none z-30 flex items-center justify-center">
            <span className="text-[7px] font-mono text-rose-500 font-bold uppercase tracking-tighter rotate-90">
              SAFETY
            </span>
          </div>
        )}

        {/* Bottom OFF label */}
        <span className={`text-[8px] font-mono font-bold tracking-widest z-10 ${!isChecked ? 'text-amber-300' : 'text-stone-500'}`}>
          {offLabel}
        </span>
      </div>

      {sublabel && (
        <span className="text-[9px] text-amber-200/70 font-mono tracking-tighter mt-1">
          {sublabel}
        </span>
      )}
    </div>
  );
};
