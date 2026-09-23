import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'SEARCH COMPONENTS...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center select-none font-sans ${className}`}>
      {/* Outer 3D Metallic Frame Socket */}
      <div className="relative w-full bg-gradient-to-b from-stone-900 via-stone-950 to-black p-1.5 rounded-xl border border-stone-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.5)] flex items-center gap-2">
        <Search className="w-4 h-4 text-amber-400 shrink-0 ml-1.5" />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-black/90 text-amber-300 font-mono text-xs px-2 py-1 rounded border border-amber-500/30 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 placeholder-amber-500/40 shadow-inner uppercase tracking-wider"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1 text-stone-400 hover:text-amber-400 bg-stone-900 hover:bg-stone-800 rounded border border-stone-700 transition-colors shrink-0"
            title="Clear Search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
