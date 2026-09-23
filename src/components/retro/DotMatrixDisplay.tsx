import React, { useState, useEffect } from 'react';

export interface DisplayLine {
  text: string;
  speed?: number;
  align?: 'left' | 'center' | 'right';
  highlight?: boolean;
}

export interface DotMatrixDisplayProps {
  lines?: (string | DisplayLine)[];
  title?: string;
  color?: 'amber' | 'green' | 'cyan' | 'red';
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
  className = '',
}) => {
  const [offset, setOffset] = useState(0);

  const normalizedLines: DisplayLine[] = lines.map((l) =>
    typeof l === 'string' ? { text: l } : l
  );

  const colorStyles = {
    amber: {
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.35)]',
      text: 'text-amber-400 drop-shadow-[0_0_3px_rgba(251,191,36,0.8)]',
      dim: 'text-amber-950/40',
      bg: 'bg-stone-950 border-amber-950/60',
    },
    green: {
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      text: 'text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.8)]',
      dim: 'text-emerald-950/40',
      bg: 'bg-stone-950 border-emerald-950/60',
    },
    cyan: {
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.35)]',
      text: 'text-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,0.8)]',
      dim: 'text-cyan-950/40',
      bg: 'bg-stone-950 border-cyan-950/60',
    },
    red: {
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.35)]',
      text: 'text-rose-500 drop-shadow-[0_0_3px_rgba(244,63,94,0.8)]',
      dim: 'text-rose-950/40',
      bg: 'bg-stone-950 border-rose-950/60',
    },
  }[color];

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 40);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`inline-flex flex-col select-none font-mono ${className}`}>
      {title && (
        <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase mb-1">
          {title}
        </span>
      )}

      <div
        className={`relative p-3 rounded-lg border-2 ${colorStyles.bg} ${colorStyles.glow} overflow-hidden min-w-[280px] max-w-full`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 pointer-events-none z-10" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_bottom,transparent_1px,rgba(0,0,0,0.8)_1px)] [background-size:100%_2px] pointer-events-none z-10" />

        <div className="relative z-0 space-y-1">
          {normalizedLines.map((line, idx) => {
            const isLong = line.text.length > 20;

            return (
              <div
                key={idx}
                className={`relative overflow-hidden text-xs tracking-widest whitespace-nowrap leading-snug font-bold ${
                  line.highlight ? 'text-sm font-black' : ''
                } ${colorStyles.text}`}
              >
                {isLong ? (
                  <div
                    className="inline-block transition-transform duration-75"
                    style={{
                      transform: `translateX(${-((offset * (line.speed || 1)) % (line.text.length * 10 + 150))}px)`,
                    }}
                  >
                    <span>{line.text}</span>
                    <span className="inline-block w-24" />
                    <span>{line.text}</span>
                  </div>
                ) : (
                  <div
                    className={
                      line.align === 'center'
                        ? 'text-center'
                        : line.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                    }
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
