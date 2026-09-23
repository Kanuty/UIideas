import React from 'react';
import { Category, UIComponentItem } from '../../types/sandbox';
import { SearchInput } from '../common/SearchInput';
import { Badge } from '../common/Badge';
import { ChevronRight, Folder } from 'lucide-react';

export interface SidebarProps {
  components: UIComponentItem[];
  selectedId: string | null;
  onSelectComponent: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  theme?: 'dark' | 'light';
}

const CATEGORIES: (Category | 'All')[] = [
  'All',
  'Buttons & Controls',
  'Cards & Containers',
  'Navigation & Menus',
  'Feedback & Indicators',
  'Forms & Inputs',
  'Data Display',
];

export const Sidebar: React.FC<SidebarProps> = ({
  components,
  selectedId,
  onSelectComponent,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  const filteredComponents = components.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <aside
      className={`w-64 border-r flex flex-col h-[calc(100vh-3.5rem)] shrink-0 select-none shadow-[4px_0_16px_rgba(0,0,0,0.3)] z-20 transition-colors ${
        isDark
          ? 'border-stone-800 bg-stone-950/90 text-stone-100'
          : 'border-amber-300/80 bg-amber-100/90 text-amber-950'
      }`}
    >
      <div className={`p-3 border-b space-y-3 ${isDark ? 'border-stone-800/80' : 'border-amber-300/60'}`}>
        <SearchInput value={searchQuery} onChange={onSearchChange} />

        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-all border ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-[0_2px_6px_rgba(251,191,36,0.5)] rounded-sm'
                    : isDark
                    ? 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200 hover:bg-stone-800 rounded-sm'
                    : 'bg-amber-200/80 text-amber-900 border-amber-300 hover:bg-amber-200 rounded-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className={`px-2 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest flex justify-between items-center border-b mb-1 ${
          isDark ? 'text-amber-400 border-stone-800/80' : 'text-amber-900 border-amber-300/60'
        }`}>
          <span>UI ELEMENTS CATALOG</span>
          <span className={`px-2 py-0.5 rounded border font-mono text-[9px] font-bold shadow-inner ${
            isDark ? 'bg-stone-900 text-amber-400 border-amber-500/40' : 'bg-amber-200 text-amber-950 border-amber-400'
          }`}>
            {filteredComponents.length}
          </span>
        </div>

        {filteredComponents.length === 0 ? (
          <div className={`p-4 text-center font-mono text-xs ${isDark ? 'text-stone-500' : 'text-amber-800/70'}`}>
            No elements found in catalog.
          </div>
        ) : (
          filteredComponents.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => onSelectComponent(item.id)}
                className={`w-full text-left px-2.5 py-2 transition-all flex items-center justify-between group ${
                  isSelected
                    ? isDark
                      ? 'bg-stone-900/95 border-2 border-amber-400 text-amber-300 shadow-[0_4px_12px_rgba(0,0,0,0.8)] rounded-lg'
                      : 'bg-amber-200 border-2 border-amber-600 text-amber-950 shadow-[0_4px_12px_rgba(0,0,0,0.15)] rounded-lg font-bold'
                    : isDark
                    ? 'text-stone-300 hover:bg-stone-900/50 hover:text-white border border-stone-800/60 rounded-lg'
                    : 'text-amber-900 hover:bg-amber-200/60 hover:text-amber-950 border border-amber-300/50 rounded-lg'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Folder className={`w-3.5 h-3.5 shrink-0 ${isSelected ? (isDark ? 'text-amber-400' : 'text-amber-700') : (isDark ? 'text-stone-500' : 'text-amber-700/60')}`} />
                  <span className="text-xs font-mono font-semibold truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-1">
                  <Badge variant={isSelected ? 'embossed-tape' : 'screwed-tag'} size="sm">
                    {item.category.split(' ')[0]}
                  </Badge>
                  <ChevronRight className={`w-3 h-3 transition-transform ${
                    isSelected
                      ? (isDark ? 'translate-x-0.5 text-amber-400' : 'translate-x-0.5 text-amber-800')
                      : 'opacity-0 group-hover:opacity-100 text-stone-400'
                  }`} />
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
