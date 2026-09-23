import React, { useState } from 'react';

export type ButtonVariant = 'cream' | 'silver' | 'wood' | 'dark-slate' | 'brass' | 'military';
export type ButtonShape = 'rectangular' | 'square' | 'pill';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type LedStatus = 'none' | 'green' | 'red' | 'amber';

export interface TactilePushButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'color'> {
  label?: string;
  sublabel?: string;
  isPressed?: boolean;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  showDots?: boolean;
  ledStatus?: LedStatus;
  isLatching?: boolean;
  labelPosition?: 'top' | 'bottom' | 'inside';
  onClick?: () => void;
}

export const TactilePushButton: React.FC<TactilePushButtonProps> = ({
  label,
  sublabel,
  isPressed: controlledPressed,
  variant = 'cream',
  shape = 'rectangular',
  size = 'md',
  showDots = false,
  ledStatus = 'none',
  isLatching = false,
  labelPosition = 'top',
  onClick,
  className = '',
  children,
  ...props
}) => {
  const [internalPressed, setInternalPressed] = useState(false);
  const [latchedState, setLatchedState] = useState(false);

  const isPressed = controlledPressed !== undefined
    ? controlledPressed
    : (isLatching ? latchedState : internalPressed);

  const handleMouseDown = () => {
    if (controlledPressed === undefined && !isLatching) {
      setInternalPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (controlledPressed === undefined && !isLatching) {
      setInternalPressed(false);
    }
  };

  const handleClick = () => {
    if (isLatching && controlledPressed === undefined) {
      setLatchedState((prev) => !prev);
    }
    if (onClick) onClick();
  };

  const variantStyles = {
    cream: 'bg-amber-50 text-stone-800 border-t border-amber-100',
    silver: 'bg-stone-300 text-stone-900 border-t border-stone-100',
    wood: 'bg-amber-900 text-amber-100 border-t border-amber-700',
    'dark-slate': 'bg-stone-800 text-stone-100 border-t border-stone-700',
    brass: 'bg-yellow-700 text-yellow-100 border-t border-yellow-500',
    military: 'bg-emerald-900 text-emerald-100 border-t border-emerald-700',
  }[variant];

  const sizeClasses = {
    sm: { button: 'min-w-[40px] h-8 text-[10px] px-2', inner: 'p-0.5', led: 'w-1.5 h-1.5' },
    md: { button: 'min-w-[56px] h-10 text-xs px-3', inner: 'p-1', led: 'w-2 h-2' },
    lg: { button: 'min-w-[80px] h-12 text-sm px-4', inner: 'p-1.5', led: 'w-2.5 h-2.5' },
    xl: { button: 'min-w-[112px] h-16 text-base px-5', inner: 'p-2', led: 'w-3 h-3' },
  }[size];

  const shapeClasses = {
    rectangular: 'rounded-sm',
    square: size === 'sm' ? 'min-w-[32px] h-8 rounded-sm' : size === 'md' ? 'min-w-[40px] h-10 rounded-sm' : size === 'lg' ? 'min-w-[48px] h-12 rounded-md' : 'min-w-[64px] h-16 rounded-md',
    pill: 'rounded-full',
  }[shape];

  const ledColors = {
    none: '',
    green: isPressed ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-emerald-950/80',
    red: isPressed ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-rose-950/80',
    amber: isPressed ? 'bg-amber-400 shadow-[0_0_8px_#fbbf24]' : 'bg-amber-950/80',
  }[ledStatus];

  const renderLabels = () => (
    (label || sublabel) ? (
      <div className={`text-center min-w-[70px] ${labelPosition === 'bottom' ? 'mt-1.5' : 'mb-1.5'}`}>
        {label && <div className="text-[10px] font-bold text-amber-100 tracking-wider uppercase truncate">{label}</div>}
        {sublabel && <div className="text-[9px] text-amber-200/70 font-mono tracking-tighter truncate">{sublabel}</div>}
      </div>
    ) : null
  );

  return (
    <div className="inline-flex flex-col items-center select-none font-sans min-w-[60px]">
      {labelPosition === 'top' && renderLabels()}

      <div className={`relative ${sizeClasses.inner} bg-stone-900 rounded-md border border-stone-800 shadow-inner flex flex-col items-center justify-center min-w-[50px]`}>
        {ledStatus !== 'none' && (
          <div className={`mb-1 ${sizeClasses.led} rounded-full border border-stone-700 ${ledColors} transition-all duration-150`} />
        )}

        <button
          type="button"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
          className={`
            relative ${sizeClasses.button} ${shapeClasses} font-semibold tracking-wider transition-all duration-75
            flex items-center justify-center cursor-pointer focus:outline-none text-center whitespace-nowrap
            ${variantStyles}
            ${
              isPressed
                ? 'translate-y-1 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] border-b-0 brightness-90'
                : 'shadow-[0_6px_0_0_#292524,0_8px_10px_rgba(0,0,0,0.5)] border-b-4 border-stone-400 hover:brightness-105'
            }
            ${className}
          `}
          {...props}
        >
          {showDots && (
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none" />
          )}

          <span className={`relative z-10 flex flex-col items-center truncate ${isPressed ? 'translate-y-0.5 opacity-80' : ''}`}>
            {labelPosition === 'inside' && label && (
              <span className="text-[9px] opacity-75 font-mono leading-none mb-0.5 truncate">{label}</span>
            )}
            {children || label || 'PUSH'}
          </span>
        </button>
      </div>

      {labelPosition === 'bottom' && renderLabels()}
    </div>
  );
};
