# Physical Controls Sandbox Documentation

Welcome to the **UI Sandbox - Physical & Tactical Component Library** (`retro-physical-components-1`).

This documentation details all available custom physical UI components, their props, default values, design variants, interaction physics, and instructions for customizing and creating new elements.

---

## 1. SkeuomorphicMediaBar (`src/components/retro/SkeuomorphicMediaBar.tsx`)

An early-2000s WinAMP / Frutiger Aero skeuomorphic metallic audio media bar. Features swooping silver curves, molded sunken button sockets, track seeking slider, volume bar, EQ preset cycler, and digital LCD track marquee.

### Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `trackTitle` | `string` | `'SYNTHWAVE_O3_ATMOSPHERE.MP3'` | Song or audio track file title string. |
| `artistName` | `string` | `'ANALOG FREQUENCY LABS'` | Artist / composer name label. |
| `durationSeconds` | `number` | `214` | Total audio track length in seconds. |

---

## 2. RetroPanel (`src/components/retro/RetroPanel.tsx`)

A physical 3D mounting panel container supporting irregular polygon silhouettes, organic swooping curves, chamfered bevels, structural rivets, technical grid backdrops, and recessed molded sockets.

### Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `undefined` | Header title string displayed at the top of the panel plate. |
| `panelId` | `string` | `undefined` | Technical ID tag string (e.g. `PNL-409`). |
| `shape` | `'rectangle' \| 'cut-top-right' \| 'cut-top-left' \| 'cut-bottom-right' \| 'stepped-corner' \| 'hexagonal' \| 'notched-top' \| 'swoop-bottom-left' \| 'curved-notch' \| 'concave-inset' \| 'molded-pod' \| 'wave-top'` | `'cut-top-right'` | Polygon or bezier curve silhouette with thick non-scaling SVG 3D bevel borders. |
| `variant` | `'dark-steel' \| 'military-green' \| 'vintage-bakelite' \| 'brushed-aluminum' \| 'cockpit-teal' \| 'silver-metallic'` | `'dark-steel'` | Material finish and color theme. |
| `showRivets` | `boolean` | `true` | Renders metal corner rivet bolts placed safely away from cut/curved edges. |
| `showGridPattern` | `boolean` | `true` | Displays subtle technical grid backdrop texture. |
| `isTransparent` | `boolean` | `false` | Renders panel as a transparent glass visor window revealing underlying UI. |
| `glassOpacity` | `number` | `0.15` | Alpha opacity for the glass panel background (e.g. 0.1 for 90% transparency). |
| `windowLabel` | `string` | `undefined` | Badge banner tag shown on transparent glass window panels. |
| `showGlassReflection` | `boolean` | `true` | Renders glass glint glare effect across window surface. |
| `recessedSockets` | `boolean` | `false` | Hosts child controls inside molded sunken socket pods with inner drop shadow. |
| `children` | `React.ReactNode` | `undefined` | UI controls or telemetry displays hosted inside the panel plate. |

---

## 3. ToggleSwitch (`src/components/retro/ToggleSwitch.tsx`)

A heavy-duty military flip switch with mounting plate details, corner hex screws, status LED, ON/OFF labels, and an interactive protective safety cover.

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
| `hasGuard` | `boolean` | `false` | Displays red protective safety guard cover over the switch. |
| `isGuardOpen` | `boolean` | `undefined` | Controlled state of safety guard cover. |
| `onGuardToggle` | `(isOpen: boolean) => void` | `undefined` | Callback fired when safety guard cover is clicked open or closed. |
| `ledStatus` | `'none' \| 'green' \| 'red' \| 'amber'` | `'amber'` | Status LED indicator light. |
| `onLabel` | `string` | `'ON'` | Top position label. |
| `offLabel` | `string` | `'OFF'` | Bottom position label. |

---

## 4. RotaryKnob (`src/components/retro/RotaryKnob.tsx`)

A tactile rotary dial with support for continuous values, discrete detent snapping, scale tick mark rendering, direct tick clicking, custom min/max rotation angle limits, and smooth rotation animations.

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
| `style` | `'ribbed' \| 'cockpit' \| 'pointer' \| 'classic'` | `'ribbed'` | Knob dial cap style. |
| `variant` | `'amber-gold' \| 'silver-aluminum' \| 'dark-bakelite' \| 'military-grey'` | `'amber-gold'` | Material finish theme. |
| `unit` | `string` | `''` | Value suffix string (e.g. `dB`, `kHz`, `V`). |
| `showValue` | `boolean` | `true` | Shows digital readout pill under knob. |
| `showScale` | `boolean` | `true` | Shows radial scale tick marks and labels. |
| `scaleLabels` | `string[]` | `undefined` | Custom text labels for scale ticks. |
| `detents` | `number` | `undefined` | Number of discrete physical snap points around the scale. |
| `minAngle` | `number` | `-135` | Rotation angle in degrees corresponding to minimum value (0° is top/12 o'clock). |
| `maxAngle` | `number` | `135` | Rotation angle in degrees corresponding to maximum value. |

---

## 5. TactilePushButton (`src/components/retro/TactilePushButton.tsx`)

A physical 3D push-button inspired by vintage audio consoles, synth keys, and military command panels. Supports latching states, LED indicators, custom labels, and optional dot textures.

---

## 6. DotMatrixDisplay (`src/components/retro/DotMatrixDisplay.tsx`)

A customizable retro LED dot matrix display board capable of rendering scrolling or static uppercase text, digital status readouts, and vintage VFD displays.

---

## Environment Backdrops & Micro-Plate Badges

- **Canvas Backdrops:** The sandbox environment toolbar includes a backdrop menu supporting `Grass XP Meadow`, `Tech Dark Grid`, `Workbench Metal`, `Cyan Blueprint`, and `Dark Slate`.
- **Physical Micro-Plate Badges:** Tags, hashtags, and category chips are styled as physical analog micro-plates (embossed Dymo tape labels, screwed metal plates, and stamped badges).

---

## How to Add New Custom UI Elements

1. Create your new React component file inside `src/components/retro/YourNewElement.tsx`.
2. Export your component in `src/components/retro/index.ts`.
3. Register your component definition with controls and default props in `src/data/componentRegistry.ts`.
4. Update this `DOCUMENTATION.md` with the new component's API table and usage guide.
