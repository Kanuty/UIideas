# Physical Controls Sandbox Documentation

Welcome to the **UI Sandbox - Physical & Tactical Component Library** (`retro-physical-components-1`).

This documentation details all available custom physical UI components, their props, default values, design variants, interaction physics, and instructions for customizing and creating new elements.

---

## 1. TactilePushButton (`src/components/retro/TactilePushButton.tsx`)

A physical 3D push-button inspired by vintage audio consoles, synth keys, and military command panels. Supports latching states, LED indicators, custom labels, and optional dot textures.

### Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `undefined` | Top header label text. |
| `sublabel` | `string` | `undefined` | Bottom subtitle label text. |
| `active` | `boolean` | `undefined` | Controlled active/pressed state. |
| `defaultActive` | `boolean` | `false` | Initial active state when uncontrolled. |
| `onToggle` | `(active: boolean) => void` | `undefined` | Callback fired when button state changes. |
| `variant` | `'cream' \| 'silver' \| 'wood' \| 'dark-slate' \| 'brass' \| 'military'` | `'cream'` | Visual aesthetic theme and finish. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Physical dimension scale. |
| `shape` | `'rectangular' \| 'square' \| 'pill'` | `'rectangular'` | Button outer bezel geometry. |
| `isLatching` | `boolean` | `true` | If true, remains depressed when pressed. If false, behaves as momentary press. |
| `ledColor` | `'none' \| 'red' \| 'green' \| 'amber' \| 'blue'` | `'red'` | Status light color indicator. |
| `showDots` | `boolean` | `false` | Toggles dot grid background texture on button face. |
| `className` | `string` | `''` | Custom CSS utility classes. |

### Styling & Customization
- **Dot Texture Control:** Set `showDots={true}` to display a high-density dot matrix overlay across the cap surface.
- **Finish Variants:** Switch between brushed aluminum (`silver`), rich walnut (`wood`), military green (`military`), and vintage Bakelite (`dark-slate`).

---

## 2. RotaryKnob (`src/components/retro/RotaryKnob.tsx`)

A tactile rotary dial with support for continuous values, discrete detent snapping, scale tick mark rendering, direct tick clicking, and smooth rotation animations.

### Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `undefined` | Upper title text above the knob dial. |
| `min` | `number` | `0` | Minimum value boundary. |
| `max` | `number` | `100` | Maximum value boundary. |
| `step` | `number` | `1` | Value increment step size. |
| `value` | `number` | `undefined` | Controlled knob value. |
| `defaultValue` | `number` | `50` | Initial value when uncontrolled. |
| `onChange` | `(value: number) => void` | `undefined` | Callback fired when value changes. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Outer knob container scale. |
| `style` | `'ribbed' \| 'cockpit' \| 'pointer' \| 'classic'` | `'ribbed'` | Knob dial cap style (e.g. aircraft bar handle vs round ribbed dial). |
| `variant` | `'amber-gold' \| 'silver-aluminum' \| 'dark-bakelite' \| 'military-grey'` | `'amber-gold'` | Material finish theme. |
| `unit` | `string` | `''` | Value suffix string displayed in value readout (e.g. `dB`, `kHz`, `V`). |
| `showValue` | `boolean` | `true` | Shows digital readout pill under knob. |
| `showScale` | `boolean` | `true` | Shows radial scale tick marks and labels. |
| `scaleLabels` | `string[]` | `undefined` | Custom text labels for scale ticks (e.g. `['OFF', '1', '2', '3', '4', 'MAX']`). |
| `detents` | `number` | `undefined` | Number of discrete physical snap points around the scale. |

### Interaction Features
- **Direct Tick Click:** Clicking directly on any scale tick mark or label instantly turns and snaps the knob to that value.
- **Smooth Snap Animation:** When detents or tick clicks are triggered, the knob turns with a realistic spring-loaded CSS transition (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
- **Radial & Delta Dragging:** Intuitively drag around the perimeter or vertically to spin the dial smoothly.

---

## 3. ToggleSwitch (`src/components/retro/ToggleSwitch.tsx`)

A heavy-duty military flip switch with mounting plate details, corner hex screws, status LED, ON/OFF labels, and an optional red protective safety guard.

### Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `undefined` | Panel header title above the switch. |
| `sublabel` | `string` | `undefined` | Subtitle caption text under the switch. |
| `checked` | `boolean` | `undefined` | Controlled state (true = ON, false = OFF). |
| `defaultChecked` | `boolean` | `false` | Initial state when uncontrolled. |
| `onChange` | `(checked: boolean) => void` | `undefined` | Callback fired when switch is toggled. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Mounting plate scale. |
| `variant` | `'chrome' \| 'brass' \| 'black-tactical' \| 'vintage-grey'` | `'chrome'` | Lever and plate finish. |
| `hasGuard` | `boolean` | `false` | Displays red translucent safety cover over the switch. |
| `ledStatus` | `'none' \| 'green' \| 'red' \| 'amber'` | `'amber'` | Status LED indicator light. |
| `onLabel` | `string` | `'ON'` | Top position label. |
| `offLabel` | `string` | `'OFF'` | Bottom position label. |

### Mechanical Physics
- **Vertical Axis Flip Motion:** Lever flips cleanly along the vertical Y-axis UP and DOWN with subtle depth translation and ball-tip movement, eliminating inverted rotation visual bugs.

---

## 4. DotMatrixDisplay (`src/components/retro/DotMatrixDisplay.tsx`)

A customizable retro LED dot matrix display board capable of rendering scrolling or static uppercase text, digital status readouts, and vintage VFD displays.

### Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | `'READY'` | Text string rendered in dot matrix layout. |
| `color` | `'amber' \| 'green' \| 'cyan' \| 'red' \| 'vfd-blue'` | `'amber'` | LED phosphor glow color. |
| `fontSize` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Matrix font size. |
| `glow` | `boolean` | `true` | Adds ambient neon bloom glow behind active LEDs. |
| `scroll` | `boolean` | `false` | Enables horizontal marquee scrolling animation. |
| `scrollSpeed` | `number` | `5` | Scrolling animation speed multiplier (1 - 10). |

---

## 5. Preset Showcase Panels

- **`VintageAudioConsole` (`src/components/retro/VintageAudioConsole.tsx`):** Synth/equalizer channel strip assembly integrating knobs, dot matrix display, and tactile buttons.
- **`CockpitControlPanel` (`src/components/retro/CockpitControlPanel.tsx`):** Tactical aircraft instrument panel inspired by fighter jet cockpits, featuring heavy toggle flip switches, detented rotary dials, and illuminated push buttons.

---

## How to Add New Custom UI Elements

1. Create your new React component file inside `src/components/retro/YourNewElement.tsx`.
2. Export your component in `src/components/retro/index.ts`.
3. Register your component definition with controls and default props in `src/data/componentRegistry.ts`.
4. Update this `DOCUMENTATION.md` with the new component's API table and usage guide.
