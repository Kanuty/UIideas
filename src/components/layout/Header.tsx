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
  return (
    <header className="h-14 border-b border-stone-800 bg-gradient-to-r from-stone-900 via-stone-950 to-black px-4 flex items-center justify-between sticky top-0 z-40 shadow-[0_4px_16px_rgba(0,0,0,0.8)] select-none">
      {/* App Title & Version Micro-Plate */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-[0_2px_8px_rgba(251,191,36,0.5),inset_0_1px_1px_rgba(255,255,255,0.8)] border border-amber-300">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-mono font-bold text-amber-300 text-sm tracking-widest uppercase">UI Sandbox</h1>
            <Badge variant="embossed-tape" size="sm">
              v0.1
            </Badge>
          </div>
          <p className="text-[10px] font-mono text-stone-400">Modular UI Lab & Idea Showcase</p>
        </div>
      </div>

      {/* View Switcher & Theme Selector */}
      <div className="flex items-center gap-3">
        <div className="bg-stone-900/90 p-1 rounded-xl border border-stone-800 shadow-inner flex items-center gap-1.5">
          <TactilePushButton
            size="sm"
            variant={activeView === 'sandbox' ? 'cream' : 'dark-slate'}
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
            variant={activeView === 'grid' ? 'cream' : 'dark-slate'}
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
          className="p-2 text-stone-400 hover:text-amber-300 bg-stone-900 hover:bg-stone-800 rounded-xl border border-stone-800 transition-colors shadow-inner"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
        </button>
      </div>
    </header>
  );
};
