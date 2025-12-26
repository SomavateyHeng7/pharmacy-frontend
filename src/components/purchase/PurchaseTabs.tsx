import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CheckCircle, Package, BarChart3, Truck } from 'lucide-react';

interface PurchaseTab {
  id: string;
  label: string;
  icon: any;
}

interface PurchaseTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function PurchaseTabs({ activeTab, onTabChange }: PurchaseTabsProps) {
  const tabs: PurchaseTab[] = [
    { id: 'orders', label: 'Purchase Orders', icon: ShoppingCart },
    { id: 'approval', label: 'Approval Workflow', icon: CheckCircle },
    { id: 'inventory', label: 'Inventory Needs', icon: Package },
    { id: 'budget', label: 'Budget & Cost Analysis', icon: BarChart3 },
    { id: 'tracking', label: 'Order Tracking', icon: Truck }
  ];

  return (
    <div className="flex space-x-2 border-b overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => onTabChange(tab.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <Icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
