import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Clock, CheckCircle, DollarSign, CreditCard } from 'lucide-react';

interface PurchaseStatsProps {
  totalOrders: number;
  pendingOrders: number;
  approvedOrders: number;
  totalValue: number;
  pendingPayments: number;
}

export function PurchaseStats({
  totalOrders,
  pendingOrders,
  approvedOrders,
  totalValue,
  pendingPayments
}: PurchaseStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold">{pendingOrders}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Approved Orders</p>
              <p className="text-2xl font-bold">{approvedOrders}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Value</p>
              <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
              <p className="text-2xl font-bold">{pendingPayments}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
