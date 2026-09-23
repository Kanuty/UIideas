import React, { useState } from 'react';
import { TactilePushButton } from './TactilePushButton';
import { RotaryKnob } from './RotaryKnob';
import { DotMatrixDisplay } from './DotMatrixDisplay';

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
  const [powerOn, setPowerOn] = useState(true);
  const [volume, setVolume] = useState(initialVolume);
  const [frequency, setFrequency] = useState(initialFrequency);
  const [mode, setMode] = useState<'DAB' | 'FM' | 'BT'>('FM');

  const displayLines = powerOn
    ? [
        { text: `10 : 48  ${mode}`, highlight: true },
        { text: mode === 'FM' ? 'BR-KLASSIK   P5' : 'DIGITAL AUDIO RADIO' },
        {
          text:
            mode === 'FM'
              ? `${frequency.toFixed(1)} MHz  -  Classical Music Symphony No. 5`
              : 'STREAMING VIA BLUETOOTH AUDIO',
          speed: 1,
        },
      ]
    : [{ text: 'POWER OFF', align: 'center' as const }];

  return (
    <div className="relative p-6 rounded-2xl bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 border-4 border-amber-900 shadow-2xl max-w-xl mx-auto select-none font-sans">
      {/* Wood / Brushed Metal Frame Inner Box */}
      <div className="relative p-5 rounded-xl bg-stone-950 border-2 border-amber-800/60 shadow-inner overflow-hidden">
        {/* Brass corner accent trims */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/80 rounded-tl-lg pointer-events-none" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-500/80 rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-500/80 rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500/80 rounded-br-lg pointer-events-none" />

        {/* Top Header Label */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-amber-900/40">
          <div className="text-xs font-black tracking-widest text-amber-200 uppercase font-mono">
            {modelName}
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                powerOn ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-stone-700'
              }`}
            />
            <span className="text-[9px] font-mono tracking-wider text-amber-200/70 uppercase">
              {powerOn ? 'POWER' : 'STANDBY'}
            </span>
          </div>
        </div>

        {/* Main Interface: Left Knob | Center Screen | Right Knob */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6">
          <div className="flex justify-center md:col-span-1">
            <RotaryKnob
              label="VOLUME"
              min={0}
              max={100}
              value={volume}
              onChange={setVolume}
              size="md"
              style="ribbed"
              variant="amber-gold"
              unit="%"
            />
          </div>

          <div className="flex justify-center md:col-span-2">
            <DotMatrixDisplay
              lines={displayLines}
              color={powerOn ? 'amber' : 'red'}
              scrollSpeed={powerOn ? 1 : 0}
            />
          </div>

          <div className="flex justify-center md:col-span-1">
            <RotaryKnob
              label="TUNING / SKIP"
              min={87.5}
              max={108.0}
              step={0.1}
              value={frequency}
              onChange={setFrequency}
              size="md"
              style="ribbed"
              variant="amber-gold"
              unit=" MHz"
            />
          </div>
        </div>

        {/* Bottom Tactile Switch Row */}
        <div className="pt-3 border-t border-amber-900/40 flex flex-wrap justify-around items-center gap-2">
          <TactilePushButton
            label="POWER"
            sublabel="FUNCTION"
            variant={powerOn ? 'cream' : 'silver'}
            showDots={false}
            isPressed={!powerOn}
            onClick={() => setPowerOn(!powerOn)}
          >
            {powerOn ? 'ON' : 'OFF'}
          </TactilePushButton>

          <TactilePushButton
            label="ALARM"
            sublabel="SLEEP"
            variant="cream"
            showDots={false}
            isPressed={mode === 'DAB'}
            onClick={() => setMode('DAB')}
          >
            DAB
          </TactilePushButton>

          <TactilePushButton
            label="SCAN"
            sublabel="PLAY/PAUSE"
            variant="cream"
            showDots={false}
            isPressed={mode === 'FM'}
            onClick={() => setMode('FM')}
          >
            FM
          </TactilePushButton>

          <TactilePushButton
            label="PAIR"
            sublabel="STOP"
            variant="cream"
            showDots={false}
            isPressed={mode === 'BT'}
            onClick={() => setMode('BT')}
          >
            BT
          </TactilePushButton>

          <TactilePushButton
            label="PRESET"
            sublabel="P-MODE"
            variant="silver"
            showDots={false}
          >
            PRESET
          </TactilePushButton>

          <TactilePushButton
            label="MENU"
            sublabel="INFO"
            variant="silver"
            showDots={false}
          >
            INFO
          </TactilePushButton>
        </div>
      </div>
    </div>
  );
};
