import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

export type DropdownMaterial = 'gothic-dark' | 'brushed-steel' | 'ornate-gold' | 'dark-wood';
export type ChainStyle = 'metal-chain' | 'rope-link' | 'bronze-rings';

export interface DropdownOption {
  value: string;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface ChainedDropdownProps {
  label?: string;
  options: (string | DropdownOption)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  material?: DropdownMaterial;
  chainStyle?: ChainStyle;
  placeholder?: string;
  className?: string;
}

export const ChainedDropdown: React.FC<ChainedDropdownProps> = ({
  label,
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  material = 'gothic-dark',
  chainStyle = 'metal-chain',
  placeholder = 'Select option...',
  className = '',
}) => {
  const normalizedOptions: DropdownOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const initialVal = defaultValue || (normalizedOptions[0]?.value ?? '');
  const [internalValue, setInternalValue] = useState<string>(initialVal);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const selectedOption = normalizedOptions.find((o) => o.value === currentValue) || normalizedOptions[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
  };

  const materialStyles = {
    'gothic-dark': {
      header: 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-2 border-slate-700 text-slate-100 shadow-[0_6px_16px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)]',
      plate: 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 text-slate-200 hover:border-amber-400 hover:text-amber-300 shadow-[0_4px_10px_rgba(0,0,0,0.6)]',
      activePlate: 'bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-2 border-amber-400 text-amber-300 font-bold shadow-[0_0_12px_rgba(251,191,36,0.4)]',
      chain: 'text-slate-400',
      accent: 'border-rose-950/80 bg-rose-900/30 text-rose-300',
    },
    'brushed-steel': {
      header: 'bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border-2 border-slate-500 text-slate-900 shadow-[0_6px_16px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.9)]',
      plate: 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 border border-slate-400 text-slate-900 hover:border-blue-600 hover:text-blue-900 shadow-[0_4px_8px_rgba(0,0,0,0.3)]',
      activePlate: 'bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 border-2 border-blue-600 text-blue-950 font-bold shadow-[0_0_10px_rgba(37,99,235,0.3)]',
      chain: 'text-slate-600',
      accent: 'border-slate-400 bg-slate-200 text-slate-800',
    },
    'ornate-gold': {
      header: 'bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900 border-2 border-amber-400 text-amber-100 shadow-[0_6px_16px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.4)]',
      plate: 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 border border-amber-600/80 text-amber-200 hover:border-amber-300 hover:text-amber-100 shadow-[0_4px_10px_rgba(0,0,0,0.6)]',
      activePlate: 'bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 border-2 border-amber-300 text-amber-100 font-bold shadow-[0_0_12px_rgba(253,224,71,0.5)]',
      chain: 'text-amber-500',
      accent: 'border-amber-500 bg-amber-950 text-amber-300',
    },
    'dark-wood': {
      header: 'bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-amber-800 text-amber-100 shadow-[0_6px_16px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)]',
      plate: 'bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border border-amber-900 text-amber-200 hover:border-amber-500 hover:text-amber-100 shadow-[0_4px_10px_rgba(0,0,0,0.6)]',
      activePlate: 'bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-2 border-amber-500 text-amber-200 font-bold shadow-[0_0_10px_rgba(245,158,11,0.4)]',
      chain: 'text-amber-700',
      accent: 'border-amber-800 bg-stone-900 text-amber-200',
    },
  }[material];

  const renderChainLink = () => {
    if (chainStyle === 'metal-chain') {
      return (
        <svg className={`w-3 h-4 ${materialStyles.chain}`} viewBox="0 0 12 16" fill="currentColor">
          <path d="M4 0h4a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V2a2 2 0 012-2zm0 8h4a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 012-2z" />
          <path d="M5 4h2v8H5V4z" opacity="0.6" />
        </svg>
      );
    }
    if (chainStyle === 'bronze-rings') {
      return (
        <svg className={`w-3 h-4 ${materialStyles.chain}`} viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="4" r="3" />
          <circle cx="6" cy="12" r="3" />
        </svg>
      );
    }
    return (
      <svg className={`w-3 h-4 ${materialStyles.chain}`} viewBox="0 0 12 16" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2">
        <line x1="6" y1="0" x2="6" y2="16" />
      </svg>
    );
  };

  return (
    <div ref={containerRef} className={`relative inline-block font-sans select-none min-w-[200px] ${className}`}>
      {label && (
        <span className="block text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-1.5 truncate">
          {label}
        </span>
      )}

      {/* Main Trigger Header Plate */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-2.5 rounded-lg flex items-center justify-between gap-3 relative z-30 transition-transform active:scale-[0.99] cursor-pointer ${materialStyles.header}`}
      >
        {/* Decorative Left Eyelet Ring */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-stone-600 bg-stone-950 shadow-inner flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-slate-400" />
        </div>

        <div className="flex items-center gap-2 overflow-hidden">
          {selectedOption?.icon}
          <span className="text-xs font-mono font-bold tracking-wide truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {selectedOption?.badge && (
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase ${materialStyles.accent}`}>
              {selectedOption.badge}
            </span>
          )}
          {isOpen ? <ChevronUp className="w-4 h-4 opacity-80" /> : <ChevronDown className="w-4 h-4 opacity-80" />}
        </div>

        {/* Decorative Right Eyelet Ring */}
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-stone-600 bg-stone-950 shadow-inner flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-slate-400" />
        </div>
      </button>

      {/* Stacked Suspended Chained Options Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-40 flex flex-col items-center space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === currentValue;
            return (
              <React.Fragment key={opt.value}>
                {/* Connecting Side Chain Link Graphics */}
                <div className="w-full flex justify-between px-3 -my-1 pointer-events-none z-10">
                  {renderChainLink()}
                  {renderChainLink()}
                </div>

                {/* Chained Horizontal Plate */}
                <button
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full px-3 py-2 rounded-md flex items-center justify-between text-left transition-all duration-150 relative cursor-pointer ${
                    isSelected ? materialStyles.activePlate : materialStyles.plate
                  }`}
                >
                  {/* Left Eyelet */}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-stone-600 bg-stone-950 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-slate-400" />
                  </div>

                  <div className="flex items-center gap-2 overflow-hidden px-1">
                    {opt.icon}
                    <span className="text-xs font-mono font-semibold truncate">{opt.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {opt.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 bg-black/30 rounded border border-white/10 uppercase">
                        {opt.badge}
                      </span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </div>

                  {/* Right Eyelet */}
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-stone-600 bg-stone-950 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-slate-400" />
                  </div>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
