import React from 'react';
import { UIComponentItem } from '../types/sandbox';
import { Button } from '../components/common/Button';
import { TactilePushButton } from '../components/retro/TactilePushButton';
import { RotaryKnob } from '../components/retro/RotaryKnob';
import { DotMatrixDisplay } from '../components/retro/DotMatrixDisplay';
import { ToggleSwitch } from '../components/retro/ToggleSwitch';
import { VintageAudioConsole } from '../components/retro/VintageAudioConsole';
import { CockpitControlPanel } from '../components/retro/CockpitControlPanel';
import { Sparkles } from 'lucide-react';

export const COMPONENT_REGISTRY: UIComponentItem[] = [
  {
    id: 'cockpit-control-panel',
    name: 'Cockpit Avionics Panel',
    category: 'Cards & Containers',
    description: 'Heavy military & aircraft avionics panel featuring toggle switches with safety guards, cockpit bar knobs, dot matrix telemetry, and tactile triggers.',
    tags: ['cockpit', 'aircraft', 'military', 'switch', 'knob', 'avionics', 'retro'],
    defaultProps: {
      panelTitle: 'AVIONICS & RADAR STROBE CONTROL',
    },
    propsSchema: [
      {
        name: 'panelTitle',
        type: 'string',
        defaultValue: 'AVIONICS & RADAR STROBE CONTROL',
        description: 'Header text displayed on top of the avionics plate',
      },
    ],
    codeSnippet: `<CockpitControlPanel panelTitle="AVIONICS & RADAR STROBE CONTROL" />`,
    component: (props: any) => React.createElement(
      CockpitControlPanel,
      {
        panelTitle: props.panelTitle || 'AVIONICS & RADAR STROBE CONTROL',
      }
    ),
  },
  {
    id: 'vintage-audio-console',
    name: 'Vintage Audio Machine',
    category: 'Cards & Containers',
    description: 'Complete vintage radio console mimicking analog audio machines with rotating knobs, dot matrix marquee screen, and tactile push buttons.',
    tags: ['retro', 'audio', 'radio', 'machine', 'console', 'vintage'],
    defaultProps: {
      modelName: 'RETRO-SOUND DAB/FM',
    },
    propsSchema: [
      {
        name: 'modelName',
        type: 'string',
        defaultValue: 'RETRO-SOUND DAB/FM',
        description: 'Brand model label title on the console',
      },
    ],
    codeSnippet: `<VintageAudioConsole modelName="RETRO-SOUND DAB/FM" initialVolume={45} initialFrequency={98.5} />`,
    component: (props: any) => React.createElement(
      VintageAudioConsole,
      {
        modelName: props.modelName || 'RETRO-SOUND DAB/FM',
      }
    ),
  },
  {
    id: 'tactile-push-button',
    name: 'Tactile Push Button',
    category: 'Buttons & Controls',
    description: '3D mechanical push button with press-down depth animation, configurable texture dots, materials, LED indicators, shapes, and latching modes.',
    tags: ['button', 'tactile', 'push', 'press', 'mechanical', 'retro', 'latching'],
    defaultProps: {
      children: 'SCAN',
      label: 'SCAN',
      sublabel: 'PLAY/PAUSE',
      variant: 'cream',
      shape: 'rectangular',
      size: 'md',
      showDots: false,
      ledStatus: 'none',
      isLatching: false,
    },
    propsSchema: [
      {
        name: 'label',
        type: 'string',
        defaultValue: 'SCAN',
        description: 'Primary label text above button',
      },
      {
        name: 'sublabel',
        type: 'string',
        defaultValue: 'PLAY/PAUSE',
        description: 'Secondary caption under primary label',
      },
      {
        name: 'variant',
        type: 'select',
        defaultValue: 'cream',
        options: ['cream', 'silver', 'wood', 'dark-slate', 'brass', 'military'],
        description: 'Material finish style',
      },
      {
        name: 'shape',
        type: 'select',
        defaultValue: 'rectangular',
        options: ['rectangular', 'square', 'pill'],
        description: 'Button cap shape',
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg', 'xl'],
        description: 'Button physical dimensions',
      },
      {
        name: 'showDots',
        type: 'boolean',
        defaultValue: false,
        description: 'Show background dot pattern on button cap',
      },
      {
        name: 'ledStatus',
        type: 'select',
        defaultValue: 'none',
        options: ['none', 'green', 'red', 'amber'],
        description: 'Integrated LED indicator status',
      },
      {
        name: 'isLatching',
        type: 'boolean',
        defaultValue: false,
        description: 'Enable push-on / push-off toggle latch behavior',
      },
    ],
    codeSnippet: `<TactilePushButton
  label="SCAN"
  sublabel="PLAY/PAUSE"
  variant="cream"
  shape="rectangular"
  size="md"
  showDots={false}
  ledStatus="none"
>
  SCAN
</TactilePushButton>`,
    component: (props: any) => React.createElement(
      TactilePushButton,
      {
        label: props.label !== undefined ? props.label : 'SCAN',
        sublabel: props.sublabel !== undefined ? props.sublabel : 'PLAY/PAUSE',
        variant: props.variant || 'cream',
        shape: props.shape || 'rectangular',
        size: props.size || 'md',
        showDots: props.showDots !== undefined ? props.showDots : false,
        ledStatus: props.ledStatus || 'none',
        isLatching: props.isLatching !== undefined ? props.isLatching : false,
      },
      props.children || 'SCAN'
    ),
  },
  {
    id: 'rotary-knob',
    name: 'Rotary Dial Knob',
    category: 'Buttons & Controls',
    description: 'Interactive rotary dial knob with fluid drag physics (radial angle + vertical drag), cockpit bar handle styles, detents, and multiple physical scales.',
    tags: ['knob', 'rotary', 'dial', 'volume', 'tuning', 'cockpit', 'control'],
    defaultProps: {
      label: 'VOLUME',
      size: 'md',
      style: 'ribbed',
      variant: 'amber-gold',
      min: 0,
      max: 100,
      defaultValue: 65,
      unit: '%',
      showValue: true,
      showScale: true,
    },
    propsSchema: [
      {
        name: 'label',
        type: 'string',
        defaultValue: 'VOLUME',
        description: 'Knob header label',
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg', 'xl', '2xl'],
        description: 'Physical knob diameter',
      },
      {
        name: 'style',
        type: 'select',
        defaultValue: 'ribbed',
        options: ['ribbed', 'cockpit', 'pointer', 'classic'],
        description: 'Cap handle & pointer styling',
      },
      {
        name: 'variant',
        type: 'select',
        defaultValue: 'amber-gold',
        options: ['amber-gold', 'silver-aluminum', 'dark-bakelite', 'military-grey'],
        description: 'Material finish color scheme',
      },
      {
        name: 'showValue',
        type: 'boolean',
        defaultValue: true,
        description: 'Display numeric value readout box below knob',
      },
      {
        name: 'showScale',
        type: 'boolean',
        defaultValue: true,
        description: 'Display dial tick marks scale around knob',
      },
    ],
    codeSnippet: `<RotaryKnob label="VOLUME" size="md" style="ribbed" variant="amber-gold" min={0} max={100} defaultValue={65} unit="%" />`,
    component: (props: any) => React.createElement(
      RotaryKnob,
      {
        label: props.label || 'VOLUME',
        size: props.size || 'md',
        style: props.style || 'ribbed',
        variant: props.variant || 'amber-gold',
        min: 0,
        max: 100,
        defaultValue: 65,
        unit: '%',
        showValue: props.showValue !== undefined ? props.showValue : true,
        showScale: props.showScale !== undefined ? props.showScale : true,
      }
    ),
  },
  {
    id: 'toggle-switch',
    name: 'Cockpit Toggle Switch',
    category: 'Buttons & Controls',
    description: 'Heavy metal flip switch lever mounted on a dark screw plate with LED lights and optional red safety guard.',
    tags: ['toggle', 'switch', 'flip', 'military', 'cockpit', 'control'],
    defaultProps: {
      label: 'STROBE POWER',
      sublabel: 'SYSTEM ON/OFF',
      size: 'md',
      variant: 'chrome',
      hasGuard: false,
      ledStatus: 'amber',
      onLabel: 'ON',
      offLabel: 'OFF',
    },
    propsSchema: [
      {
        name: 'label',
        type: 'string',
        defaultValue: 'STROBE POWER',
        description: 'Header title text',
      },
      {
        name: 'sublabel',
        type: 'string',
        defaultValue: 'SYSTEM ON/OFF',
        description: 'Caption below switch plate',
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Switch size scale',
      },
      {
        name: 'variant',
        type: 'select',
        defaultValue: 'chrome',
        options: ['chrome', 'brass', 'black-tactical', 'vintage-grey'],
        description: 'Lever finish style',
      },
      {
        name: 'hasGuard',
        type: 'boolean',
        defaultValue: false,
        description: 'Show protective safety guard overlay',
      },
      {
        name: 'ledStatus',
        type: 'select',
        defaultValue: 'amber',
        options: ['none', 'green', 'red', 'amber'],
        description: 'Status indicator LED color',
      },
    ],
    codeSnippet: `<ToggleSwitch label="STROBE POWER" variant="chrome" size="md" hasGuard={false} ledStatus="amber" />`,
    component: (props: any) => React.createElement(
      ToggleSwitch,
      {
        label: props.label || 'STROBE POWER',
        sublabel: props.sublabel || 'SYSTEM ON/OFF',
        size: props.size || 'md',
        variant: props.variant || 'chrome',
        hasGuard: props.hasGuard !== undefined ? props.hasGuard : false,
        ledStatus: props.ledStatus || 'amber',
        onLabel: props.onLabel || 'ON',
        offLabel: props.offLabel || 'OFF',
      }
    ),
  },
  {
    id: 'dot-matrix-display',
    name: 'Dot Matrix LCD Display',
    category: 'Data Display',
    description: 'Warm glowing dot matrix marquee LCD screen with animated right-to-left scrolling text, LED grid overlay, and multi-line information layers.',
    tags: ['display', 'lcd', 'dot-matrix', 'marquee', 'text', 'screen'],
    defaultProps: {
      color: 'amber',
      title: 'DAB RADIO DISPLAY',
      fontSize: 'sm',
      showDotsGrid: true,
      showFrameBorder: true,
      scrollSpeed: 1,
    },
    propsSchema: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'DAB RADIO DISPLAY',
        description: 'Display frame label header',
      },
      {
        name: 'color',
        type: 'select',
        defaultValue: 'amber',
        options: ['amber', 'green', 'cyan', 'red', 'vfd-blue'],
        description: 'LCD backlight color scheme',
      },
      {
        name: 'fontSize',
        type: 'select',
        defaultValue: 'sm',
        options: ['xs', 'sm', 'md', 'lg'],
        description: 'Text font size scale',
      },
      {
        name: 'showDotsGrid',
        type: 'boolean',
        defaultValue: true,
        description: 'Overlay LED dot matrix background pattern',
      },
      {
        name: 'showFrameBorder',
        type: 'boolean',
        defaultValue: true,
        description: 'Show outer glowing bezel frame border',
      },
      {
        name: 'scrollSpeed',
        type: 'number',
        defaultValue: 1,
        description: 'Marquee text scroll speed (0 for static)',
      },
    ],
    codeSnippet: `<DotMatrixDisplay color="amber" title="DAB RADIO DISPLAY" fontSize="sm" showDotsGrid={true} />`,
    component: (props: any) => React.createElement(
      DotMatrixDisplay,
      {
        color: props.color || 'amber',
        title: props.title || 'DAB RADIO DISPLAY',
        fontSize: props.fontSize || 'sm',
        showDotsGrid: props.showDotsGrid !== undefined ? props.showDotsGrid : true,
        showFrameBorder: props.showFrameBorder !== undefined ? props.showFrameBorder : true,
        scrollSpeed: props.scrollSpeed !== undefined ? props.scrollSpeed : 1,
      }
    ),
  },
  {
    id: 'interactive-button',
    name: 'Action Button',
    category: 'Buttons & Controls',
    description: 'Customizable action button supporting multiple styles, sizes, and icon integration.',
    tags: ['button', 'interactive', 'control', 'action'],
    defaultProps: {
      label: 'Explore Sandbox',
      variant: 'primary',
      size: 'md',
    },
    propsSchema: [
      {
        name: 'label',
        type: 'string',
        defaultValue: 'Explore Sandbox',
        description: 'Text label displayed inside the button',
      },
    ],
    codeSnippet: `<Button variant="primary" size="md">
  Explore Sandbox
</Button>`,
    component: (props: any) => React.createElement(
      Button,
      {
        variant: props.variant || 'primary',
        size: props.size || 'md',
        icon: React.createElement(Sparkles, { className: 'w-4 h-4' }),
      },
      props.label || 'Action Button'
    ),
  },
];
