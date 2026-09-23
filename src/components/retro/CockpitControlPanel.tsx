import React, { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';
import { RotaryKnob } from './RotaryKnob';
import { TactilePushButton } from './TactilePushButton';
import { DotMatrixDisplay } from './DotMatrixDisplay';

export interface CockpitControlPanelProps {
  panelTitle?: string;
  className?: string;
}

export const CockpitControlPanel: React.FC<CockpitControlPanelProps> = ({
  panelTitle = 'AVIONICS & RADAR STROBE CONTROL',
  className = '',
}) => {
  const [strobePower, setStrobePower] = useState(true);
  const [gainT, setGainT] = useState(4.2);
  const [gainR, setGainR] = useState(2.8);
  const [ctrlStrobe, setCtrlStrobe] = useState(3);
  const [autoRelease, setAutoRelease] = useState(false);

  return (
    <div className={`relative p-5 rounded-2xl bg-stone-950 border-4 border-stone-800 shadow-2xl w-full max-w-2xl mx-auto text-amber-100 ${className}`}>
      {/* Corner rivets */}
      <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-stone-600 shadow border border-stone-800 z-10" />
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-stone-600 shadow border border-stone-800 z-10" />
      <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-stone-600 shadow border border-stone-800 z-10" />
      <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-stone-600 shadow border border-stone-800 z-10" />

      {/* Matte black textured plate body */}
      <div className="bg-gradient-to-b from-stone-900 via-stone-950 to-black rounded-xl border border-stone-800 p-4 shadow-inner">
        {/* Panel Header */}
        <div className="flex justify-between items-center pb-3 border-b border-stone-800 mb-4 px-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
            <h2 className="text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
              {panelTitle}
            </h2>
          </div>
          <span className="text-[10px] font-mono text-stone-500">PANEL-ID #CP-8492</span>
        </div>

        {/* Matrix Radar Telemetry */}
        <div className="mb-6">
          <DotMatrixDisplay
            color="vfd-blue"
            fontSize="xs"
            scrollSpeed={0.8}
            lines={[
              { text: `STROBE: ${strobePower ? 'ACTIVE [30Hz]' : 'STANDBY'}`, highlight: true },
              { text: `GAIN TRANSMIT: ${gainT.toFixed(1)} dB   RECEIVE: ${gainR.toFixed(1)} dB` },
              { text: 'TELEMETRY: ALL SYSTEMS NOMINAL - READY FOR RELEASE' },
            ]}
          />
        </div>

        {/* Controls Layout mimicking Aircraft Console Photo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center pt-2">
          {/* Column 1: Power & Strobe Toggle Switches */}
          <div className="flex flex-col items-center gap-4 p-3 bg-stone-950/60 rounded-lg border border-stone-800/80">
            <ToggleSwitch
              label="STROBE POWER"
              sublabel="SYSTEM ON/OFF"
              checked={strobePower}
              onChange={setStrobePower}
              variant="chrome"
              hasGuard={true}
              ledStatus="amber"
            />

            <ToggleSwitch
              label="RELEASE LOCK"
              sublabel="AUTO / MANUAL"
              checked={autoRelease}
              onChange={setAutoRelease}
              variant="brass"
              ledStatus="green"
              onLabel="AUTO"
              offLabel="MANUAL"
            />
          </div>

          {/* Column 2: Cockpit Pointer Rotary Knobs */}
          <div className="flex flex-col items-center gap-4 p-3 bg-stone-950/60 rounded-lg border border-stone-800/80">
            <RotaryKnob
              label="GAIN TRANSMIT"
              min={0}
              max={10}
              step={0.1}
              value={gainT}
              onChange={setGainT}
              size="md"
              style="cockpit"
              variant="military-grey"
              unit="dB"
              scaleLabels={['0', '2', '4', '6', '8', '10']}
            />

            <RotaryKnob
              label="GAIN RECEIVE"
              min={0}
              max={10}
              step={0.1}
              value={gainR}
              onChange={setGainR}
              size="md"
              style="cockpit"
              variant="military-grey"
              unit="dB"
              scaleLabels={['0', '2', '4', '6', '8', '10']}
            />
          </div>

          {/* Column 3: Large Strobe Selector Knob & Tactile Triggers */}
          <div className="flex flex-col items-center gap-4 p-3 bg-stone-950/60 rounded-lg border border-stone-800/80">
            <RotaryKnob
              label="CTRL STROBE"
              min={0}
              max={5}
              step={1}
              value={ctrlStrobe}
              onChange={setCtrlStrobe}
              size="lg"
              style="cockpit"
              variant="dark-bakelite"
              detents={6}
              scaleLabels={['0', '1', '2', '3', '4', '5']}
            />

            <div className="flex gap-2 mt-1">
              <TactilePushButton
                label="STROBE"
                sublabel="TRIG"
                variant="military"
                size="sm"
                ledStatus="red"
                showDots={false}
              >
                FIRE
              </TactilePushButton>

              <TactilePushButton
                label="RELEASE"
                sublabel="RESET"
                variant="brass"
                size="sm"
                ledStatus="green"
                showDots={false}
              >
                RST
              </TactilePushButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
