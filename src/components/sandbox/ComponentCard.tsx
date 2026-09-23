import React from 'react';
import { UIComponentItem } from '../../types/sandbox';
import { Badge } from '../common/Badge';
import { Eye } from 'lucide-react';

export interface ComponentCardProps {
  item: UIComponentItem;
  onSelect: (id: string) => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ item, onSelect }) => {
  const Component = item.component;

  return (
    <div
      onClick={() => onSelect(item.id)}
      className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl overflow-hidden shadow-sm hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col"
    >
      <div className="p-6 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-center min-h-[160px] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 group-hover:opacity-60 transition-opacity" />
        <div className="relative z-10 scale-90 group-hover:scale-100 transition-transform duration-200">
          <Component {...(item.defaultProps || {})} />
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white p-1.5 rounded-lg shadow-md">
          <Eye className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-slate-100 text-sm group-hover:text-indigo-400 transition-colors">
              {item.name}
            </h3>
            <Badge variant="primary" size="sm">
              {item.category}
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[10px] text-slate-500 font-mono">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
