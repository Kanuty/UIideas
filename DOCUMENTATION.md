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

## 3. Retro 3D Sci-Fi Avionics Table (`RetroAvionicsTable.tsx`)

A complete 3D retro-futuristic data table inspired by 1990s sci-fi vehicle cockpits and avionics panels, created to replace standard, flat SAP Fiori data tables.

### Key Visual & Interactive Features
* **Dot-Matrix LCD Display Cells**: Each table cell is rendered as an individual recessed LCD screen with scanlines, LED matrix grids, and monochrome glowing text (`amber`, `green`, `cyan`, `red`, `vfd-blue`).
* **Speaker Mesh Toolbar**: Top action bar embedded over a 3D speaker vent mesh panel, equipped with tactile push buttons for search, category filtering, item creation, telemetry data export, and record purging.
* **3D Circular Light Row Selectors**: Leftmost selection column styled with 3D tactile push-button indicator lights that illuminate when selected.
* **Interactive Engine**: Features multi-column sorting, live search filtering, batch record selection, single/batch deletion, pagination, and color theme switcher.

### Props API
* `title` (`string`): Main header title on chassis frame.
* `panelCode` (`string`): Technical watermark ID code tag.
* `columns` (`TableColumn[]`): Array of column definitions (supports `text`, `badge`, `number`, `currency`, `rating`, `actions`).
* `data` (`TableItem[]`): Dataset array of records.
* `theme` (`'amber' | 'green' | 'cyan' | 'red' | 'vfd-blue'`): Monochrome LCD monitor glow color scheme.
* `chassisFinish` (`'dark-steel' | 'brushed-aluminum' | 'cockpit-teal' | 'military-green'`): Outer 3D extruded metallic frame style.
* `showSpeakerToolbar` (`boolean`): Toggle speaker vent toolbar visibility.
* `pageSize` (`number`): Number of rows displayed per page.
* `onRowSelect` (`(selectedIds: string[]) => void`): Callback fired when row selections change.
* `onAddRecord` (`() => void`): Callback fired when clicking the "ADD ITEM" tactile push button.
* `onExport` (`() => void`): Callback fired when clicking the "EXPORT" tactile push button.

---

## 4. Dynamic Sizing & Layout Stability Rules

To prevent button or display shrinkage and layout jitter during value updates (e.g. toggling labels from `'ON'` to `'RECALIBRATING_SYSTEM'`):
1. All button elements (`TactilePushButton`, `MediaTransportButton`) enforce minimum width bounding constraints calculated for their maximum possible label length.
2. Text wrapper containers use `truncate`, `whitespace-nowrap`, and `min-w-[...]` bounds.
3. Canvas views dynamically host controls inside fixed-width bounding containers.
