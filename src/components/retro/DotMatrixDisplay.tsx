import React, { useState, useEffect } from 'react';

export interface DisplayLine {
  text: string;
  speed?: number;
  align?: 'left' | 'center' | 'right';
  highlight?: boolean;
}

export type DisplayColor = 'amber' | 'green' | 'cyan' | 'red' | 'vfd-blue';

export interface DotMatrixDisplayProps {
  lines?: (string | DisplayLine)[];
  title?: string;
  color?: DisplayColor;
  showDotsGrid?: boolean;
  showFrameBorder?: boolean;
  scrollSpeed?: number;
  fontSize?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const DotMatrixDisplay: React.FC<DotMatrixDisplayProps> = ({
  lines = [
    { text: '10 : 48 DAB', highlight: true },
    { text: 'BR-KLASSIK   P5', align: 'left' },
    { text: 'Classical Music - Symphony No. 5 in C Minor - Allegro con brio', speed: 1 },
  ],
  title,
  color = 'amber',
  showDotsGrid = true,
  showFrameBorder = true,
  scrollSpeed = 1,
  fontSize = 'sm',
  className = '',
}) => {
  const [offset, setOffset] = useState(0);

  const normalizedLines: DisplayLine[] = lines.map((l) =>
    typeof l === 'string' ? { text: l } : l
  );

  const colorStyles = {
    amber: {
      glow: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]',
      text: 'text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]',
      border: 'border-amber-950/70',
      dots: 'rgba(245,158,11,0.15)',
    },
    green: {
      glow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
      text: 'text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.8)]',
      border: 'border-emerald-950/70',
      dots: 'rgba(16,185,129,0.15)',
    },
    cyan: {
      glow: 'shadow-[0_0_20px_rgba(6,182,212,0.35)]',
      text: 'text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.8)]',
      border: 'border-cyan-950/70',
      dots: 'rgba(6,182,212,0.15)',
    },
    red: {
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.35)]',
      text: 'text-rose-500 drop-shadow-[0_0_4px_rgba(244,63,94,0.8)]',
      border: 'border-rose-950/70',
      dots: 'rgba(239,68,68,0.15)',
    },
    'vfd-blue': {
      glow: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]',
      text: 'text-blue-300 drop-shadow-[0_0_5px_rgba(96,165,250,0.9)]',
      border: 'border-blue-950/70',
      dots: 'rgba(59,130,246,0.15)',
    },
  }[color];

  const fontSizeClasses = {
    xs: 'text-[11px] leading-tight',
    sm: 'text-xs leading-relaxed',
    md: 'text-sm leading-relaxed',
    lg: 'text-base leading-relaxed',
  }[fontSize];

  useEffect(() => {
    if (scrollSpeed === 0) return;
    const timer = setInterval(() => {
      setOffset((prev) => prev + 1 * scrollSpeed);
    }, 40);

    return () => clearInterval(timer);
  }, [scrollSpeed]);

  return (
    <div className={`flex flex-col select-none font-mono w-full max-w-xl mx-auto ${className}`}>
      {title && (
        <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase mb-1 self-start">
          {title}
        </span>
      )}

      <div
        className={`relative p-4 rounded-lg bg-stone-950 ${
          showFrameBorder ? `border-2 ${colorStyles.border} ${colorStyles.glow}` : 'border border-stone-800'
        } overflow-hidden w-full flex flex-col justify-center min-h-[90px]`}
      >
        {/* Vignette lighting overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 pointer-events-none z-10" />

        {/* Scanlines overlay */}
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_bottom,transparent_1px,rgba(0,0,0,0.9)_1px)] [background-size:100%_3px] pointer-events-none z-10" />

        {/* Optional LED Dot-matrix LED grid overlay */}
        {showDotsGrid && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none z-10"
            style={{
              backgroundImage: `radial-gradient(${colorStyles.dots} 1.5px, transparent 1.5px)`,
              backgroundSize: '6px 6px',
            }}
          />
        )}

        {/* Content container */}
        <div className="relative z-0 space-y-1.5 w-full overflow-hidden">
          {normalizedLines.map((line, idx) => {
            const isLong = line.text.length > 22;

            return (
              <div
                key={idx}
                className={`relative w-full overflow-hidden tracking-widest font-bold ${
                  line.highlight ? 'font-black text-amber-300' : ''
                } ${fontSizeClasses} ${colorStyles.text}`}
              >
                {isLong && scrollSpeed > 0 ? (
                  <div className="whitespace-nowrap w-full overflow-hidden">
                    <div
                      className="inline-block transition-transform duration-75"
                      style={{
                        transform: `translateX(${-((offset * (line.speed || 1)) % (line.text.length * 9 + 140))}px)`,
                      }}
                    >
                      <span>{line.text}</span>
                      <span className="inline-block w-20" />
                      <span>{line.text}</span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full overflow-hidden text-ellipsis ${
                      line.align === 'center'
                        ? 'text-center'
                        : line.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                    }`}
                  >
                    {line.text}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
