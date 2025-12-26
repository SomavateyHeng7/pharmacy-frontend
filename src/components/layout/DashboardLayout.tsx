"use client";

import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function DashboardLayout({
  children,
  title,
  description,
  actions,
}: DashboardLayoutProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex space-x-2">{actions}</div>}
      </div>

      <div className="space-y-6">{children}</div>
    </>
  );
}
