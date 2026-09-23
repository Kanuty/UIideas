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
}) => {
  const filteredComponents = components.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <aside className="w-64 border-r border-stone-800 bg-stone-950/80 flex flex-col h-[calc(100vh-3.5rem)] shrink-0 select-none">
      <div className="p-3 border-b border-stone-800/80 space-y-3">
        <SearchInput value={searchQuery} onChange={onSearchChange} />

        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-2.5 py-1 font-mono text-[11px] font-bold uppercase transition-all border ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-[0_2px_6px_rgba(251,191,36,0.4)] rounded-sm'
                    : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200 hover:bg-stone-800 rounded-sm'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="px-2 py-1.5 text-[10px] font-mono font-bold text-amber-500/80 uppercase tracking-widest flex justify-between items-center border-b border-stone-800/50 mb-1">
          <span>UI ELEMENTS CATALOG</span>
          <span className="bg-stone-900 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30 font-mono text-[9px]">
            {filteredComponents.length}
          </span>
        </div>

        {filteredComponents.length === 0 ? (
          <div className="p-4 text-center font-mono text-xs text-stone-500">
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
                    ? 'bg-stone-900/90 border-2 border-amber-400/80 text-amber-300 shadow-[0_4px_12px_rgba(0,0,0,0.6)] rounded-md'
                    : 'text-stone-300 hover:bg-stone-900/50 hover:text-white border border-stone-800/40 rounded-md'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Folder className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                  <span className="text-xs font-mono font-semibold truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={isSelected ? 'embossed-tape' : 'metal-plate'} size="sm">
                    {item.category.split(' ')[0]}
                  </Badge>
                  <ChevronRight className={`w-3 h-3 text-stone-500 transition-transform ${isSelected ? 'translate-x-0.5 text-amber-400' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
