"use client";

import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl' | '4xl';
}

const maxWidthClasses = {
  'full': 'max-w-full',
  '7xl': 'max-w-7xl',
  '6xl': 'max-w-6xl',
  '5xl': 'max-w-5xl',
  '4xl': 'max-w-4xl',
};

export function PageContainer({ children, className = '', maxWidth = '7xl' }: PageContainerProps) {
  return (
    <div className={`mx-auto w-full ${maxWidthClasses[maxWidth]} space-y-6 ${className}`}>
      {children}
    </div>
  );
}
