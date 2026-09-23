import React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'outline' | 'embossed-tape' | 'metal-plate' | 'screwed-tag';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-mono font-bold select-none transition-all duration-150';

  const variantStyles = {
    default: 'bg-stone-900 text-stone-300 border border-stone-700/80 rounded-md shadow-sm',
    primary: 'bg-sky-950 text-sky-300 border border-sky-600/50 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)]',
    success: 'bg-emerald-950 text-emerald-300 border border-emerald-600/50 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)]',
    warning: 'bg-amber-950 text-amber-300 border border-amber-600/50 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)]',
    danger: 'bg-rose-950 text-rose-300 border border-rose-600/50 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.4)]',
    outline: 'border border-stone-600/80 text-stone-400 bg-stone-900/60 rounded-md',
    'embossed-tape': 'bg-stone-950 text-amber-400 border-2 border-stone-800 tracking-widest shadow-[0_3px_6px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-sm uppercase transform -rotate-1',
    'metal-plate': 'bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 text-slate-950 border border-slate-500 shadow-[0_2px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.9)] rounded-sm uppercase tracking-wider',
    'screwed-tag': 'bg-stone-900 text-teal-300 border border-teal-500/40 rounded px-2.5 py-0.5 shadow-[0_3px_6px_rgba(0,0,0,0.6)] flex items-center gap-1.5 uppercase',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {variant === 'screwed-tag' && (
        <span className="w-1.5 h-1.5 rounded-full bg-stone-700 border border-stone-950 shadow-inner shrink-0" />
      )}
      {children}
      {variant === 'screwed-tag' && (
        <span className="w-1.5 h-1.5 rounded-full bg-stone-700 border border-stone-950 shadow-inner shrink-0" />
      )}
    </span>
  );
};
