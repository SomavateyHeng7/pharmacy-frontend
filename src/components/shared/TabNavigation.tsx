"use client";

import { LucideIcon } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

export function TabNavigation({ tabs, activeTab, onTabChange, orientation = 'horizontal' }: TabNavigationProps) {
  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col gap-2 min-w-[200px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {Icon && <Icon size={20} className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'} />}
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 transition-all border-b-2 ${
              isActive
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {Icon && <Icon size={18} />}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
