import React, { useState } from 'react';
import { UIComponentItem } from '../../types/sandbox';
import { Badge } from '../common/Badge';
import { Code, Settings, Copy, Check, Info } from 'lucide-react';

export interface InspectorProps {
  component: UIComponentItem;
  propsState: Record<string, any>;
  onPropChange: (key: string, value: any) => void;
}

export const Inspector: React.FC<InspectorProps> = ({
  component,
  propsState,
  onPropChange,
}) => {
  const [activeTab, setActiveTab] = useState<'props' | 'code'>('props');
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (component.codeSnippet) {
      navigator.clipboard.writeText(component.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-72 border-l border-slate-800 bg-slate-900/60 flex flex-col h-[calc(100vh-3.5rem)] shrink-0">
      <div className="p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('props')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
              activeTab === 'props'
                ? 'bg-slate-800 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            Props
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
              activeTab === 'code'
                ? 'bg-slate-800 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Code
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-slate-800/80">
        <h2 className="text-sm font-semibold text-slate-100">{component.name}</h2>
        <p className="text-xs text-slate-400 mt-1">{component.description}</p>
        <div className="flex flex-wrap gap-1 mt-2.5">
          <Badge variant="primary" size="sm">
            {component.category}
          </Badge>
          {component.tags.map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'props' ? (
          <div>
            {!component.propsSchema || component.propsSchema.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-500 text-center">
                <Info className="w-6 h-6 mb-2 opacity-60" />
                <p className="text-xs">No interactive props configured for this component.</p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {component.propsSchema.map((prop) => (
                  <div key={prop.name} className="space-y-1">
                    <label className="text-xs font-mono font-medium text-slate-300 flex items-center justify-between">
                      <span>{prop.name}</span>
                      <span className="text-[10px] text-slate-500 font-sans">{prop.type}</span>
                    </label>

                    {prop.type === 'string' && (
                      <input
                        type="text"
                        value={propsState[prop.name] ?? prop.defaultValue}
                        onChange={(e) => onPropChange(prop.name, e.target.value)}
                        className="w-full bg-slate-800 text-slate-200 text-xs px-2.5 py-1.5 rounded-md border border-slate-700/60 focus:outline-none focus:border-indigo-500"
                      />
                    )}

                    {prop.type === 'boolean' && (
                      <button
                        type="button"
                        onClick={() => onPropChange(prop.name, !propsState[prop.name])}
                        className={`w-full text-left text-xs px-2.5 py-1.5 rounded-md border transition-colors flex items-center justify-between ${
                          propsState[prop.name]
                            ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300 font-medium'
                            : 'bg-slate-800 border-slate-700/60 text-slate-400'
                        }`}
                      >
                        <span>{propsState[prop.name] ? 'True' : 'False'}</span>
                        <div
                          className={`w-3.5 h-3.5 rounded-full ${
                            propsState[prop.name] ? 'bg-indigo-500' : 'bg-slate-600'
                          }`}
                        />
                      </button>
                    )}

                    {prop.type === 'select' && prop.options && (
                      <select
                        value={propsState[prop.name] ?? prop.defaultValue}
                        onChange={(e) => onPropChange(prop.name, e.target.value)}
                        className="w-full bg-slate-800 text-slate-200 text-xs px-2 py-1.5 rounded-md border border-slate-700/60 focus:outline-none focus:border-indigo-500"
                      >
                        {prop.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    <p className="text-[11px] text-slate-500">{prop.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-md border border-slate-700/60"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {component.codeSnippet || '// No code snippet available'}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
