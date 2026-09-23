import React, { useState } from 'react';
import { UIComponentItem } from '../../types/sandbox';
import { Badge } from '../common/Badge';
import { ToggleSwitch } from '../retro/ToggleSwitch';
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
    <div className="w-72 border-l border-stone-800 bg-stone-950/90 flex flex-col h-[calc(100vh-3.5rem)] shrink-0 select-none shadow-[-4px_0_16px_rgba(0,0,0,0.6)] z-20">
      <div className="p-3 border-b border-stone-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('props')}
            className={`px-3 py-1 font-mono text-xs font-bold uppercase rounded-md transition-all flex items-center gap-1.5 border ${
              activeTab === 'props'
                ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-[0_2px_6px_rgba(251,191,36,0.5)]'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            PROPS
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 font-mono text-xs font-bold uppercase rounded-md transition-all flex items-center gap-1.5 border ${
              activeTab === 'code'
                ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-[0_2px_6px_rgba(251,191,36,0.5)]'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            CODE
          </button>
        </div>
      </div>

      <div className="p-4 border-b border-stone-800/80 bg-stone-900/40">
        <h2 className="text-sm font-mono font-bold text-amber-300 uppercase tracking-wide">{component.name}</h2>
        <p className="text-xs text-stone-400 mt-1 leading-relaxed">{component.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          <Badge variant="embossed-tape" size="sm">
            {component.category}
          </Badge>
          {component.tags.map((tag) => (
            <Badge key={tag} variant="screwed-tag" size="sm">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'props' ? (
          <div>
            {!component.propsSchema || component.propsSchema.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-stone-500 text-center font-mono">
                <Info className="w-6 h-6 mb-2 opacity-60 text-amber-400" />
                <p className="text-xs">No interactive parameters defined for this control.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {component.propsSchema.map((prop) => (
                  <div key={prop.name} className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-amber-300/90 flex items-center justify-between">
                      <span>{prop.name}</span>
                      <span className="text-[10px] text-stone-500 font-mono lowercase">{prop.type}</span>
                    </label>

                    {prop.type === 'string' && (
                      <input
                        type="text"
                        value={propsState[prop.name] ?? prop.defaultValue}
                        onChange={(e) => onPropChange(prop.name, e.target.value)}
                        className="w-full bg-stone-900 text-amber-200 font-mono text-xs px-2.5 py-1.5 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-400 shadow-inner"
                      />
                    )}

                    {prop.type === 'boolean' && (
                      <div className="flex items-center scale-90 origin-left py-1">
                        <ToggleSwitch
                          size="sm"
                          variant="chrome"
                          checked={propsState[prop.name] ?? prop.defaultValue}
                          onChange={(val) => onPropChange(prop.name, val)}
                          ledStatus="amber"
                          onLabel="TRUE"
                          offLabel="FALSE"
                        />
                      </div>
                    )}

                    {prop.type === 'select' && prop.options && (
                      <select
                        value={propsState[prop.name] ?? prop.defaultValue}
                        onChange={(e) => onPropChange(prop.name, e.target.value)}
                        className="w-full bg-stone-900 text-amber-200 font-mono text-xs px-2.5 py-1.5 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-400 shadow-inner"
                      >
                        {prop.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}

                    {prop.type === 'number' && (
                      <input
                        type="number"
                        value={propsState[prop.name] ?? prop.defaultValue}
                        onChange={(e) => onPropChange(prop.name, Number(e.target.value))}
                        className="w-full bg-stone-900 text-amber-200 font-mono text-xs px-2.5 py-1.5 rounded-lg border border-stone-700 focus:outline-none focus:border-amber-400 shadow-inner"
                      />
                    )}

                    <p className="text-[10px] text-stone-500">{prop.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 p-1.5 text-stone-400 hover:text-white bg-stone-900 rounded border border-stone-700 shadow-sm"
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre className="bg-stone-950 p-3 rounded-lg border border-stone-800 text-[11px] font-mono text-amber-300/90 overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
              {component.codeSnippet || '// No code snippet available'}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
