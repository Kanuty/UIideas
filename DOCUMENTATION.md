# Physical Controls Sandbox Documentation

Welcome to the **UI Sandbox - Physical & Tactical Component Library** (`retro-physical-components-1`).

This documentation details all available custom physical UI components, their props, default values, design variants, interaction physics, and instructions for customizing and creating new elements.

---

## 1. RetroPanel (`src/components/retro/RetroPanel.tsx`)

A physical 3D mounting panel container with irregular polygon silhouettes, chamfered bevels, structural rivets, and technical grid backdrops. Used as an extruded mounting plate to organize physical controls, switches, and displays.

### Props API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `undefined` | Header title string displayed at the top of the panel plate. |
| `panelId` | `string` | `undefined` | Technical ID tag string (e.g. `PNL-409`). |
| `shape` | `'rectangle' \| 'cut-top-right' \| 'cut-top-left' \| 'cut-bottom-right' \| 'stepped-corner' \| 'hexagonal' \| 'notched-top'` | `'cut-top-right'` | Irregular polygon clip silhouette with thick uniform SVG 3D bevel borders. |
| `variant` | `'dark-steel' \| 'military-green' \| 'vintage-bakelite' \| 'brushed-aluminum' \| 'cockpit-teal'` | `'dark-steel'` | Material finish and color theme. |
| `showRivets` | `boolean` | `true` | Renders metal corner rivet bolts placed safely away from cut corners. |
| `showGridPattern` | `boolean` | `true` | Displays subtle technical grid backdrop texture. |
| `isTransparent` | `boolean` | `false` | Renders panel as a transparent glass visor window revealing underlying UI. |
| `glassOpacity` | `number` | `0.15` | Alpha opacity for the glass panel background (e.g. 0.1 for 90% transparency). |
| `windowLabel` | `string` | `undefined` | Badge banner tag shown on transparent glass window panels. |
| `showGlassReflection` | `boolean` | `true` | Renders glass glint glare effect across window surface. |
| `children` | `React.ReactNode` | `undefined` | UI controls or telemetry displays hosted inside the panel plate. |

---

## 2. ToggleSwitch (`src/components/retro/ToggleSwitch.tsx`)

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

### Interactivity & Safety Physics
- **Interactive Security Cover:** When `hasGuard={true}`, the red safety cover physically locks the switch. Clicking the switch while locked automatically flips open the cover with a 3D swing animation. When open, the lever toggles freely. Clicking the guard again closes and re-secures it.
- **Vertical Axis Flip Motion:** Lever flips cleanly along the vertical Y-axis UP and DOWN with subtle depth translation and ball-tip movement.

---

## 3. RotaryKnob (`src/components/retro/RotaryKnob.tsx`)

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

## 4. TactilePushButton (`src/components/retro/TactilePushButton.tsx`)

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
| `isLatching` | `boolean` | `true` | If true, remains depressed when pressed. |
| `ledColor` | `'none' \| 'red' \| 'green' \| 'amber' \| 'blue'` | `'red'` | Status light color indicator. |
| `showDots` | `boolean` | `false` | Toggles dot grid background texture on button face. |

---

## 5. DotMatrixDisplay (`src/components/retro/DotMatrixDisplay.tsx`)

A customizable retro LED dot matrix display board capable of rendering scrolling or static uppercase text, digital status readouts, and vintage VFD displays.

---

## How to Add New Custom UI Elements

1. Create your new React component file inside `src/components/retro/YourNewElement.tsx`.
2. Export your component in `src/components/retro/index.ts`.
3. Register your component definition with controls and default props in `src/data/componentRegistry.ts`.
4. Update this `DOCUMENTATION.md` with the new component's API table and usage guide.
