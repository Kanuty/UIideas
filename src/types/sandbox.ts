import React from 'react';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile' | 'responsive';

export type Category =
  | 'Buttons & Controls'
  | 'Cards & Containers'
  | 'Navigation & Menus'
  | 'Feedback & Indicators'
  | 'Forms & Inputs'
  | 'Data Display';

export interface PropSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select';
  defaultValue: any;
  options?: string[];
  description: string;
}

export interface UIComponentItem {
  id: string;
  name: string;
  category: Category;
  description: string;
  tags: string[];
  author?: string;
  version?: string;
  propsSchema?: PropSchema[];
  defaultProps?: Record<string, any>;
  component: React.ComponentType<any>;
  codeSnippet?: string;
}

export interface SandboxSettings {
  viewport: ViewportMode;
  showGrid: boolean;
  theme: 'dark' | 'light';
  zoom: number;
  selectedComponentId: string | null;
}
