import React from 'react';
import { Layers, Sparkles, Moon, Sun, LayoutGrid } from 'lucide-react';
import { Badge } from '../common/Badge';
import { TactilePushButton } from '../retro/TactilePushButton';

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
  const isDark = theme === 'dark';

  return (
    <header
      className={`h-14 border-b px-4 flex items-center justify-between sticky top-0 z-40 shadow-[0_4px_16px_rgba(0,0,0,0.3)] select-none transition-colors ${
        isDark
          ? 'border-stone-800 bg-gradient-to-r from-stone-900 via-stone-950 to-black text-stone-100'
          : 'border-amber-300/80 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 text-amber-950'
      }`}
    >
      {/* App Title & Version Micro-Plate */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-[0_2px_8px_rgba(251,191,36,0.5),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-amber-300">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className={`font-mono font-bold text-sm tracking-widest uppercase ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
              UI Sandbox
            </h1>
            <Badge variant="embossed-tape" size="sm">
              v0.1
            </Badge>
          </div>
          <p className={`text-[10px] font-mono ${isDark ? 'text-stone-400' : 'text-amber-800'}`}>
            Modular UI Lab & Idea Showcase
          </p>
        </div>
      </div>

      {/* View Switcher & Theme Selector */}
      <div className="flex items-center gap-3">
        <div className={`p-1 rounded-xl border shadow-inner flex items-center gap-1.5 ${
          isDark ? 'bg-stone-900/90 border-stone-800' : 'bg-amber-300/40 border-amber-400'
        }`}>
          <TactilePushButton
            size="sm"
            variant={activeView === 'sandbox' ? 'cream' : isDark ? 'dark-slate' : 'silver'}
            isPressed={activeView === 'sandbox'}
            onClick={() => onViewChange('sandbox')}
          >
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Sandbox
            </span>
          </TactilePushButton>

          <TactilePushButton
            size="sm"
            variant={activeView === 'grid' ? 'cream' : isDark ? 'dark-slate' : 'silver'}
            isPressed={activeView === 'grid'}
            onClick={() => onViewChange('grid')}
          >
            <span className="flex items-center gap-1">
              <LayoutGrid className="w-3.5 h-3.5" />
              Catalog ({totalComponents})
            </span>
          </TactilePushButton>
        </div>

        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-xl border transition-colors shadow-inner ${
            isDark
              ? 'text-amber-300 hover:text-amber-200 bg-stone-900 hover:bg-stone-800 border-stone-800'
              : 'text-amber-900 hover:text-amber-950 bg-amber-300/60 hover:bg-amber-300 border-amber-400'
          }`}
          title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-700" />}
        </button>
      </div>
    </header>
  );
};
