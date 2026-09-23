import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  active = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'p-1 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base',
  };

  const activeStyles = active
    ? 'bg-indigo-600 text-white shadow-sm'
    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800';

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`rounded-lg transition-colors inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 ${sizeStyles[size]} ${activeStyles} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
