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
    <aside className="w-64 border-r border-slate-800 bg-slate-900/60 flex flex-col h-[calc(100vh-3.5rem)] shrink-0">
      <div className="p-3 border-b border-slate-800/80 space-y-3">
        <SearchInput value={searchQuery} onChange={onSearchChange} />

        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-2 py-1 rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-indigo-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex justify-between items-center">
          <span>UI Elements</span>
          <span>{filteredComponents.length}</span>
        </div>

        {filteredComponents.length === 0 ? (
          <div className="p-4 text-center text-xs text-slate-500">
            No components found matching your search.
          </div>
        ) : (
          filteredComponents.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => onSelectComponent(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-indigo-600/15 border border-indigo-500/30 text-indigo-300 font-medium'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Folder className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className="text-xs truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Badge variant={isSelected ? 'primary' : 'default'} size="sm">
                    {item.category.split(' ')[0]}
                  </Badge>
                  <ChevronRight className={`w-3 h-3 text-slate-500 transition-transform ${isSelected ? 'translate-x-0.5 text-indigo-400' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
