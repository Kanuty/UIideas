import React from 'react';
import { UIComponentItem } from '../types/sandbox';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { Sparkles, ArrowRight } from 'lucide-react';

export const COMPONENT_REGISTRY: UIComponentItem[] = [
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
      {
        name: 'variant',
        type: 'select',
        defaultValue: 'primary',
        options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
        description: 'Visual theme style variant',
      },
      {
        name: 'size',
        type: 'select',
        defaultValue: 'md',
        options: ['sm', 'md', 'lg'],
        description: 'Component scale size',
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
  {
    id: 'status-badge-set',
    name: 'Status Badge Set',
    category: 'Feedback & Indicators',
    description: 'Compact presentational badges for displaying system, entity, or workflow statuses.',
    tags: ['badge', 'status', 'tag', 'indicator'],
    defaultProps: {
      statusText: 'Active System',
      variant: 'success',
    },
    propsSchema: [
      {
        name: 'statusText',
        type: 'string',
        defaultValue: 'Active System',
        description: 'Status label text',
      },
      {
        name: 'variant',
        type: 'select',
        defaultValue: 'success',
        options: ['default', 'primary', 'success', 'warning', 'danger', 'outline'],
        description: 'Color theme variant',
      },
    ],
    codeSnippet: `<Badge variant="success" size="md">
  Active System
</Badge>`,
    component: (props: any) => React.createElement(
      'div',
      { className: 'flex items-center gap-2' },
      React.createElement(
        Badge,
        { variant: props.variant || 'success', size: 'md' },
        props.statusText || 'Active System'
      ),
      React.createElement(
        Badge,
        { variant: 'primary', size: 'md' },
        'Live'
      )
    ),
  },
  {
    id: 'feature-card',
    name: 'Feature Spotlight Card',
    category: 'Cards & Containers',
    description: 'Encapsulated card container designed for highlighting key product features or ideas.',
    tags: ['card', 'container', 'feature', 'box'],
    defaultProps: {
      title: 'UI Idea Sandbox',
      subtitle: 'Component Architecture',
    },
    propsSchema: [
      {
        name: 'title',
        type: 'string',
        defaultValue: 'UI Idea Sandbox',
        description: 'Card title heading',
      },
      {
        name: 'subtitle',
        type: 'string',
        defaultValue: 'Component Architecture',
        description: 'Subheading caption',
      },
    ],
    codeSnippet: `<Card title="UI Idea Sandbox" subtitle="Component Architecture">
  <p className="text-xs text-slate-300">Modular sandbox ready for testing innovative UI concepts.</p>
</Card>`,
    component: (props: any) => React.createElement(
      Card,
      {
        title: props.title || 'UI Idea Sandbox',
        subtitle: props.subtitle || 'Component Architecture',
        headerAction: React.createElement(Badge, { variant: 'primary' }, 'New'),
        footer: React.createElement(
          'div',
          { className: 'flex items-center justify-between text-xs text-slate-400 w-full' },
          React.createElement('span', null, 'Updated today'),
          React.createElement(ArrowRight, { className: 'w-3.5 h-3.5 text-indigo-400' })
        ),
        className: 'w-80',
      },
      React.createElement(
        'p',
        { className: 'text-xs text-slate-300 leading-relaxed' },
        'Cleanly divided atomic components designed for rapid prototyping, presentational showcases, and visual ideation.'
      )
    ),
  },
];
