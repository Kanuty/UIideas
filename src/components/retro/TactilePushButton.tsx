import React, { useState } from 'react';

export interface TactilePushButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  sublabel?: string;
  isPressed?: boolean;
  color?: 'cream' | 'silver' | 'wood';
  onClick?: () => void;
}

export const TactilePushButton: React.FC<TactilePushButtonProps> = ({
  label,
  sublabel,
  isPressed: controlledPressed,
  color = 'cream',
  onClick,
  className = '',
  ...props
}) => {
  const [internalPressed, setInternalPressed] = useState(false);
  const isPressed = controlledPressed !== undefined ? controlledPressed : internalPressed;

  const handleMouseDown = () => {
    if (controlledPressed === undefined) {
      setInternalPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (controlledPressed === undefined) {
      setInternalPressed(false);
    }
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className="inline-flex flex-col items-center select-none font-sans">
      {(label || sublabel) && (
        <div className="mb-1.5 text-center">
          {label && <div className="text-[10px] font-bold text-amber-100 tracking-wider uppercase">{label}</div>}
          {sublabel && <div className="text-[9px] text-amber-200/70 font-mono tracking-tighter">{sublabel}</div>}
        </div>
      )}

      <div className="relative p-1 bg-stone-900 rounded-md border border-stone-800 shadow-inner">
        <button
          type="button"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
          className={`
            relative w-14 h-10 rounded-sm font-semibold text-xs tracking-wider transition-all duration-75
            flex items-center justify-center cursor-pointer focus:outline-none
            ${
              color === 'cream'
                ? 'bg-amber-50 text-stone-800 border-t border-amber-100'
                : 'bg-stone-300 text-stone-900 border-t border-stone-100'
            }
            ${
              isPressed
                ? 'translate-y-1 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] border-b-0 brightness-90'
                : 'shadow-[0_6px_0_0_#292524,0_8px_10px_rgba(0,0,0,0.5)] border-b-4 border-stone-400 hover:brightness-105'
            }
            ${className}
          `}
          {...props}
        >
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:4px_4px] pointer-events-none" />

          <span className={`relative z-10 ${isPressed ? 'translate-y-0.5 opacity-80' : ''}`}>
            {props.children}
          </span>
        </button>
      </div>
    </div>
  );
};
