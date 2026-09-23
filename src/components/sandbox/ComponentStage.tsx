import React from 'react';

export interface ComponentStageProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const ComponentStage: React.FC<ComponentStageProps> = ({
  children,
  title,
  className = '',
}) => {
  return (
    <div className={`p-6 bg-slate-900/80 rounded-xl border border-slate-800/80 flex flex-col items-center justify-center gap-3 ${className}`}>
      {title && <span className="text-xs text-slate-400 font-medium mb-1">{title}</span>}
      {children}
    </div>
  );
};
