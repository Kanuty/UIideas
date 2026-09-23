import React, { useState } from 'react';
import { RotaryKnob } from './RotaryKnob';
import { DotMatrixDisplay, DisplayLine } from './DotMatrixDisplay';
import { TactilePushButton } from './TactilePushButton';

export interface VintageAudioConsoleProps {
  modelName?: string;
  initialVolume?: number;
  initialFrequency?: number;
}

export const VintageAudioConsole: React.FC<VintageAudioConsoleProps> = ({
  modelName = 'RETRO-SOUND DAB/FM',
  initialVolume = 45,
  initialFrequency = 98.5,
}) => {
  const [volume, setVolume] = useState(initialVolume);
  const [frequency, setFrequency] = useState(initialFrequency);
  const [activeBand, setActiveBand] = useState<'FM' | 'DAB' | 'AM' | 'PAIR'>('FM');
  const [powerOn, setPowerOn] = useState(true);

  const displayLines: (string | DisplayLine)[] = powerOn
    ? [
        { text: `10:48 ${activeBand}`, highlight: true, align: 'center' },
        { text: `BR-KLASSIK   P5`, align: 'left' },
        { text: `CH ${frequency.toFixed(1)} MHz - Classical Music Symphony - Live Stereo DAB+`, speed: 1 },
      ]
    : [
        { text: 'SYSTEM OFF', highlight: true, align: 'center' },
        { text: 'STANDBY MODE', align: 'center' },
      ];

  return (
    <div className="w-full max-w-xl bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 p-5 rounded-2xl border-4 border-amber-900/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative select-none font-sans overflow-hidden">
      {/* Decorative Gold Trim Lines */}
      <div className="absolute top-3 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-sm" />
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-amber-500/60" />
      <div className="absolute bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-sm" />

      {/* Brand & Model Header */}
      <div className="flex justify-between items-center mb-3 px-2">
        <span className="text-xs font-black tracking-widest text-amber-200/90 uppercase font-mono">
          {modelName}
        </span>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${powerOn ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-900'}`} />
          <span className="text-[10px] font-mono text-amber-300/70">POWER</span>
        </div>
      </div>

      {/* Main Control Panel Surface */}
      <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 shadow-inner flex items-center justify-between gap-4 relative">
        {/* Left Volume Knob */}
        <div className="flex flex-col items-center shrink-0">
          <RotaryKnob
            label="VOLUME"
            min={0}
            max={100}
            value={volume}
            onChange={setVolume}
            size="sm"
            unit="%"
          />
        </div>

        {/* Center Screen Display */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center">
          <DotMatrixDisplay
            lines={displayLines}
            color={powerOn ? 'amber' : 'red'}
            className="w-full"
          />
        </div>

        {/* Right Tuning/Skip Knob */}
        <div className="flex flex-col items-center shrink-0">
          <RotaryKnob
            label="TUNING / SKIP"
            min={875}
            max={1080}
            value={Math.round(frequency * 10)}
            onChange={(val) => setFrequency(val / 10)}
            size="sm"
            unit=" MHz"
          />
        </div>
      </div>

      {/* Bottom Physical Push Buttons Deck */}
      <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
        <TactilePushButton
          label="POWER"
          sublabel="FUNCTION"
          isPressed={!powerOn}
          onClick={() => setPowerOn(!powerOn)}
        >
          {powerOn ? 'ON' : 'OFF'}
        </TactilePushButton>

        <TactilePushButton
          label="ALARM"
          sublabel="SLEEP"
          onClick={() => setActiveBand('DAB')}
        >
          DAB
        </TactilePushButton>

        <TactilePushButton
          label="SCAN"
          sublabel="PLAY/PAUSE"
          onClick={() => setFrequency((f) => (f >= 107.5 ? 88.0 : f + 0.5))}
        >
          FM
        </TactilePushButton>

        <TactilePushButton
          label="PAIR"
          sublabel="STOP"
          onClick={() => setActiveBand('PAIR')}
        >
          BT
        </TactilePushButton>

        <TactilePushButton
          label="PRESET"
          sublabel="P-MODE"
          onClick={() => setFrequency(98.5)}
        >
          PRESET
        </TactilePushButton>

        <TactilePushButton
          label="MENU"
          sublabel="INFO"
          onClick={() => alert(`Frequency: ${frequency.toFixed(1)} MHz | Volume: ${volume}%`)}
        >
          INFO
        </TactilePushButton>
      </div>
    </div>
  );
};
