import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Plus } from 'lucide-react';

interface PurchaseHeaderProps {
  onCreateOrder: () => void;
}

export function PurchaseHeader({ onCreateOrder }: PurchaseHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          Purchase Order Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage purchase orders, approvals, and vendor relationships
        </p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
        <Button onClick={onCreateOrder}>
          <Plus className="h-4 w-4 mr-2" />
          Create Purchase Order
        </Button>
      </div>
    </div>
  );
}
