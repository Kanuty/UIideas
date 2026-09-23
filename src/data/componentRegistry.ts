import React from 'react';
import { UIComponentItem } from '../types/sandbox';
import { Button } from '../components/common/Button';
import { TactilePushButton } from '../components/retro/TactilePushButton';
import { RotaryKnob } from '../components/retro/RotaryKnob';
import { DotMatrixDisplay } from '../components/retro/DotMatrixDisplay';
import { VintageAudioConsole } from '../components/retro/VintageAudioConsole';
import { Sparkles } from 'lucide-react';

export const COMPONENT_REGISTRY: UIComponentItem[] = [
  {
    id: 'vintage-audio-console',
    name: 'Vintage Audio Machine',
    category: 'Cards & Containers',
    description: 'Complete vintage radio console mimicking analog audio machines with rotating knobs, dot matrix marquee screen, and tactile push buttons.',
    tags: ['retro', 'audio', 'radio', 'machine', 'console', 'vintage'],
    defaultProps: {
      modelName: 'RETRO-SOUND DAB/FM',
      initialVolume: 45,
      initialFrequency: 98.5,
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
    description: '3D mechanical push button with realistic press-down depth animation, bevel highlights, and vintage audio aesthetic.',
    tags: ['button', 'tactile', 'push', 'press', 'mechanical', 'retro'],
    defaultProps: {
      children: 'SCAN',
      label: 'SCAN',
      sublabel: 'PLAY/PAUSE',
      color: 'cream',
    },
    propsSchema: [
      {
        name: 'children',
        type: 'string',
        defaultValue: 'SCAN',
        description: 'Button cap text',
      },
      {
        name: 'label',
        type: 'string',
        defaultValue: 'SCAN',
        description: 'Primary label above button',
      },
      {
        name: 'sublabel',
        type: 'string',
        defaultValue: 'PLAY/PAUSE',
        description: 'Secondary caption under label',
      },
      {
        name: 'color',
        type: 'select',
        defaultValue: 'cream',
        options: ['cream', 'silver'],
        description: 'Material finish color',
      },
    ],
    codeSnippet: `<TactilePushButton label="SCAN" sublabel="PLAY/PAUSE" color="cream">
  SCAN
</TactilePushButton>`,
    component: (props: any) => React.createElement(
      TactilePushButton,
      {
        label: props.label || 'SCAN',
        sublabel: props.sublabel || 'PLAY/PAUSE',
        color: props.color || 'cream',
      },
      props.children || 'SCAN'
    ),
  },
  {
    id: 'rotary-knob',
    name: 'Rotary Dial Knob',
    category: 'Buttons & Controls',
    description: 'Interactive rotary knob with drag, scroll-wheel, or click interaction, tick mark scale, and rotation angle indicator.',
    tags: ['knob', 'rotary', 'dial', 'volume', 'tuning', 'control'],
    defaultProps: {
      label: 'VOLUME',
      min: 0,
      max: 100,
      defaultValue: 65,
      size: 'md',
      unit: '%',
    },
    propsSchema: [
      {
        name: 'label',
        type: 'string',
        defaultValue: 'VOLUME',
        description: 'Knob title label',
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Knob size scale',
      },
    ],
    codeSnippet: `<RotaryKnob label="VOLUME" min={0} max={100} defaultValue={65} unit="%" />`,
    component: (props: any) => React.createElement(
      RotaryKnob,
      {
        label: props.label || 'VOLUME',
        size: props.size || 'md',
        min: 0,
        max: 100,
        defaultValue: 65,
        unit: '%',
      }
    ),
  },
  {
    id: 'dot-matrix-display',
    name: 'Dot Matrix LCD Display',
    category: 'Data Display',
    description: 'Warm glowing dot matrix marquee LCD screen with animated right-to-left scrolling text and multi-line information layers.',
    tags: ['display', 'lcd', 'dot-matrix', 'marquee', 'text', 'screen'],
    defaultProps: {
      color: 'amber',
      title: 'DAB RADIO DISPLAY',
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
        options: ['amber', 'green', 'cyan', 'red'],
        description: 'LCD backlight dot color',
      },
    ],
    codeSnippet: `<DotMatrixDisplay color="amber" title="DAB RADIO DISPLAY" />`,
    component: (props: any) => React.createElement(
      DotMatrixDisplay,
      {
        color: props.color || 'amber',
        title: props.title || 'DAB RADIO DISPLAY',
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
