import React from 'react';
import { Layers, Sparkles, Moon, Sun, LayoutGrid } from 'lucide-react';
import { Badge } from '../common/Badge';

export interface HeaderProps {
  totalComponents: number;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  activeView: 'sandbox' | 'grid';
  onViewChange: (view: 'sandbox' | 'grid') => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalComponents,
  theme,
  onToggleTheme,
  activeView,
  onViewChange,
}) => {
  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-slate-100 text-sm tracking-tight">UI Sandbox</h1>
            <Badge variant="primary" size="sm">
              v0.1
            </Badge>
          </div>
          <p className="text-[11px] text-slate-400">Modular UI Lab & Idea Showcase</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-slate-800 p-0.5 rounded-lg border border-slate-700/60 flex items-center">
          <button
            onClick={() => onViewChange('sandbox')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeView === 'sandbox'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Sandbox
          </button>
          <button
            onClick={() => onViewChange('grid')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeView === 'grid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Catalog ({totalComponents})
          </button>
        </div>

        <button
          onClick={onToggleTheme}
          className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
