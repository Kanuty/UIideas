import React from 'react';

export interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-950 flex flex-col relative">
      {children}
    </main>
  );
};
