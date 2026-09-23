import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { Toolbar } from './components/sandbox/Toolbar';
import { Canvas } from './components/sandbox/Canvas';
import { Inspector } from './components/sandbox/Inspector';
import { ComponentCard } from './components/sandbox/ComponentCard';
import { COMPONENT_REGISTRY } from './data/componentRegistry';
import { Category, ViewportMode } from './types/sandbox';

export const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(COMPONENT_REGISTRY[0]?.id || '');
  const [activeView, setActiveView] = useState<'sandbox' | 'grid'>('sandbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [showGrid, setShowGrid] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [zoom, setZoom] = useState(1);
  const [propsState, setPropsState] = useState<Record<string, any>>({});

  const activeComponent = COMPONENT_REGISTRY.find((item) => item.id === selectedId) || COMPONENT_REGISTRY[0];

  const handleSelectComponent = (id: string) => {
    setSelectedId(id);
    const item = COMPONENT_REGISTRY.find((c) => c.id === id);
    if (item && item.defaultProps) {
      setPropsState({ ...item.defaultProps });
    } else {
      setPropsState({});
    }
    setActiveView('sandbox');
  };

  const handlePropChange = (key: string, value: any) => {
    setPropsState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const ActiveComponentRenderer = activeComponent?.component;

  return (
    <div className={`min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans ${theme}`}>
      <Header
        totalComponents={COMPONENT_REGISTRY.length}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        activeView={activeView}
        onViewChange={setActiveView}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          components={COMPONENT_REGISTRY}
          selectedId={selectedId}
          onSelectComponent={handleSelectComponent}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <MainContent>
          {activeView === 'sandbox' ? (
            <div className="flex flex-1 h-full overflow-hidden">
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <Toolbar
                  viewport={viewport}
                  onViewportChange={setViewport}
                  showGrid={showGrid}
                  onToggleGrid={() => setShowGrid((g) => !g)}
                  zoom={zoom}
                  onZoomChange={setZoom}
                  onResetZoom={() => setZoom(1)}
                />
                {activeComponent && (
                  <Canvas viewport={viewport} showGrid={showGrid} zoom={zoom}>
                    <ActiveComponentRenderer {...(activeComponent.defaultProps || {})} {...propsState} />
                  </Canvas>
                )}
              </div>

              {activeComponent && (
                <Inspector
                  component={activeComponent}
                  propsState={propsState}
                  onPropChange={handlePropChange}
                />
              )}
            </div>
          ) : (
            <div className="p-8 overflow-y-auto flex-1">
              <div className="max-w-6xl mx-auto space-y-6">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-100">
                    Component Catalog Showcase
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Explore all presentational UI elements and ideas created in the sandbox.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {COMPONENT_REGISTRY.map((item) => (
                    <ComponentCard
                      key={item.id}
                      item={item}
                      onSelect={handleSelectComponent}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </MainContent>
      </div>
    </div>
  );
};

export default App;
