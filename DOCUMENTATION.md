# UI Sandbox Architecture & Component Documentation

Welcome to the **React UI Sandbox**, a modular lab designed for building, inspecting, and presenting physical/retro skeuomorphic UI components and interactive layouts.

---

## 1. Multi-Cutout Panel System (`RetroPanel.tsx`)

The `RetroPanel` container supports dynamic multi-cutout combinations across corners and outer edges without distorting borders or corner rivets.

### Custom Cutouts Prop Schema (`cuts`)

You can pass an array of `CutoutConfig` objects to `cuts`:

```tsx
interface CutoutConfig {
  location: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-edge' | 'bottom-edge' | 'left-edge' | 'right-edge';
  type?: 'harsh' | 'clean' | 'curved' | 'wave';
  size?: 'small' | 'medium' | 'large';
}
```

#### Example Usage
```tsx
<RetroPanel
  title="MODULAR MULTI-CUTOUT PANEL"
  variant="silver-metallic"
  cuts={[
    { location: 'top-left', type: 'curved', size: 'medium' },
    { location: 'top-right', type: 'clean', size: 'small' },
    { location: 'bottom-edge', type: 'wave', size: 'large' },
  ]}
>
  <MediaTransportButton type="play" />
</RetroPanel>
```

---

## 2. Skeuomorphic Radio & Analog Subcomponents

Individual radio/media bar elements are isolated as standalone, inspectable UI components:

### A. `VerticalGearbox` (`VerticalGearbox.tsx`)
Tactile vertical transmission selector lever.
* **Props**:
  * `label` (`string`): Casing title label (e.g., `"TRANSMISSION GEARS"`).
  * `positions` (`string[]`): Gear labels (default `['1', '2', '3', '4', '5', 'R']`).
  * `variant` (`'machined-steel' | 'dark-tactile' | 'gold-vintage'`): Material finish.
  * `onChange` (`(index: number, label: string) => void`): Shift callback.

### B. `MediaTransportButton` (`MediaTransportButton.tsx`)
Molded sunken tactile transport button.
* **Props**:
  * `type` (`'play' | 'pause' | 'stop' | 'rewind' | 'fastforward' | 'record' | 'power' | 'custom'`): Icon action style.
  * `variant` (`'metallic' | 'dark-plastic' | 'amber-glow' | 'emerald-glow'`): Finish style.
  * `ledColor` (`'emerald' | 'amber' | 'red' | 'cyan'`): Integrated LED indicator.

### C. `AnalogFaderSlider` (`AnalogFaderSlider.tsx`)
Tactile vertical/horizontal fader slider with track groove and scale markings.
* **Props**:
  * `orientation` (`'vertical' | 'horizontal'`): Axis layout.
  * `variant` (`'brushed-silver' | 'dark-tactile' | 'gold-vintage'`): Thumb knob cap style.
  * `ticks` (`number`): Scale tick mark lines count.

### D. `SpeakerGrille` (`SpeakerGrille.tsx`)
Skeuomorphic mesh vent panel plate.
* **Props**:
  * `pattern` (`'mesh-dots' | 'slotted-vents' | 'honeycomb' | 'vintage-woven'`): Vent pattern.
  * `variant` (`'brushed-chrome' | 'dark-brass' | 'black-satin' | 'silver-matte'`): Frame bezel finish.
  * `logoText` (`string`): Center brand badge plate text.

---

## 3. Dynamic Sizing & Layout Stability Rules

To prevent button or display shrinkage and layout jitter during value updates (e.g. toggling labels from `'ON'` to `'RECALIBRATING_SYSTEM'`):
1. All button elements (`TactilePushButton`, `MediaTransportButton`) enforce minimum width bounding constraints calculated for their maximum possible label length.
2. Text wrapper containers use `truncate`, `whitespace-nowrap`, and `min-w-[...]` bounds.
3. Canvas views dynamically host controls inside fixed-width bounding containers.
