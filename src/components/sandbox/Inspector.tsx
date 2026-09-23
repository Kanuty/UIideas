import React, { useState } from 'react';
import { UIComponentItem } from '../../types/sandbox';
import { Badge } from '../common/Badge';
import { ToggleSwitch } from '../retro/ToggleSwitch';
import { ChainedDropdown } from '../retro/ChainedDropdown';
import { Code, Settings, Copy, Check, Info } from 'lucide-react';

export interface InspectorProps {
  component: UIComponentItem;
  propsState: Record<string, any>;
  onPropChange: (key: string, value: any) => void;
  theme?: 'dark' | 'light';
}

export const Inspector: React.FC<InspectorProps> = ({
  component,
  propsState,
  onPropChange,
  theme = 'dark',
}) => {
  const [activeTab, setActiveTab] = useState<'props' | 'code'>('props');
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const copyCode = () => {
    if (component.codeSnippet) {
      navigator.clipboard.writeText(component.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`w-72 border-l flex flex-col h-[calc(100vh-3.5rem)] shrink-0 select-none shadow-[-4px_0_16px_rgba(0,0,0,0.3)] z-20 transition-colors ${
        isDark
          ? 'border-stone-800 bg-stone-950/90 text-stone-100'
          : 'border-amber-300/80 bg-amber-100/90 text-amber-950'
      }`}
    >
      <div className={`p-3 border-b flex items-center justify-between ${isDark ? 'border-stone-800/80' : 'border-amber-300/60'}`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('props')}
            className={`px-3 py-1 font-mono text-xs font-bold uppercase rounded-md transition-all flex items-center gap-1.5 border ${
              activeTab === 'props'
                ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-[0_2px_6px_rgba(251,191,36,0.5)]'
                : isDark
                ? 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                : 'bg-amber-200 text-amber-900 border-amber-300 hover:bg-amber-300'
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
                : isDark
                ? 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                : 'bg-amber-200 text-amber-900 border-amber-300 hover:bg-amber-300'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            CODE
          </button>
        </div>
      </div>

      <div className={`p-4 border-b ${isDark ? 'border-stone-800/80 bg-stone-900/40' : 'border-amber-300/60 bg-amber-200/40'}`}>
        <h2 className={`text-sm font-mono font-bold uppercase tracking-wide ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
          {component.name}
        </h2>
        <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-stone-400' : 'text-amber-800'}`}>
          {component.description}
        </p>
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
              <div className={`flex flex-col items-center justify-center py-8 text-center font-mono ${isDark ? 'text-stone-500' : 'text-amber-800/60'}`}>
                <Info className="w-6 h-6 mb-2 opacity-60 text-amber-500" />
                <p className="text-xs">No interactive parameters defined for this control.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {component.propsSchema.map((prop) => (
                  <div key={prop.name} className="space-y-1.5">
                    <label className={`text-xs font-mono font-bold flex items-center justify-between ${isDark ? 'text-amber-300/90' : 'text-amber-900'}`}>
                      <span>{prop.name}</span>
                      <span className={`text-[10px] font-mono lowercase ${isDark ? 'text-stone-500' : 'text-amber-800/70'}`}>
                        {prop.type}
                      </span>
                    </label>

                    {prop.type === 'string' && (
                      <input
                        type="text"
                        value={propsState[prop.name] ?? prop.defaultValue}
                        onChange={(e) => onPropChange(prop.name, e.target.value)}
                        className={`w-full font-mono text-xs px-2.5 py-1.5 rounded-lg border focus:outline-none shadow-inner ${
                          isDark
                            ? 'bg-stone-900 text-amber-200 border-stone-700 focus:border-amber-400'
                            : 'bg-amber-50 text-amber-950 border-amber-300 focus:border-amber-500'
                        }`}
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
                      <div className="py-0.5">
                        <ChainedDropdown
                          value={propsState[prop.name] ?? prop.defaultValue}
                          onChange={(val) => onPropChange(prop.name, val)}
                          options={prop.options}
                          material={isDark ? 'gothic-dark' : 'brushed-steel'}
                          chainStyle="metal-chain"
                        />
                      </div>
                    )}

                    {prop.type === 'number' && (
                      <input
                        type="number"
                        value={propsState[prop.name] ?? prop.defaultValue}
                        onChange={(e) => onPropChange(prop.name, Number(e.target.value))}
                        className={`w-full font-mono text-xs px-2.5 py-1.5 rounded-lg border focus:outline-none shadow-inner ${
                          isDark
                            ? 'bg-stone-900 text-amber-200 border-stone-700 focus:border-amber-400'
                            : 'bg-amber-50 text-amber-950 border-amber-300 focus:border-amber-500'
                        }`}
                      />
                    )}

                    <p className={`text-[10px] ${isDark ? 'text-stone-500' : 'text-amber-800/70'}`}>
                      {prop.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={copyCode}
              className={`absolute top-2 right-2 p-1.5 rounded border shadow-sm ${
                isDark
                  ? 'text-stone-400 hover:text-white bg-stone-900 border-stone-700'
                  : 'text-amber-800 hover:text-amber-950 bg-amber-200 border-amber-300'
              }`}
              title="Copy snippet"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre className={`p-3 rounded-lg border text-[11px] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner ${
              isDark
                ? 'bg-stone-950 border-stone-800 text-amber-300/90'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              {component.codeSnippet || '// No code snippet available'}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
