"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  DollarSign,
  Activity,
  Clock,
  Bell,
  Plus,
  Search,
  FileCheck,
  Stethoscope
} from 'lucide-react';

// Mock data - replace with actual data fetching
const dashboardStats = {
  totalRevenue: 45231.89,
  totalSales: 234,
  totalCustomers: 1234,
  totalProducts: 567,
  lowStockItems: 12,
  expiringItems: 8,
  pendingOrders: 5,
  dailyGrowth: 12.5,
  totalPrescriptions: 156,
  pendingVerification: 8,
  activeCustomers: 1180,
  customersWithReminders: 15
};

const recentSales = [
  { id: 1, customer: "John Doe", amount: 125.50, time: "2 minutes ago", items: ["Paracetamol", "Vitamin C"] },
  { id: 2, customer: "Sarah Smith", amount: 89.25, time: "15 minutes ago", items: ["Cough Syrup", "Bandages"] },
  { id: 3, customer: "Mike Johnson", amount: 234.75, time: "1 hour ago", items: ["Blood Pressure Monitor"] },
  { id: 4, customer: "Emily Brown", amount: 45.00, time: "2 hours ago", items: ["Aspirin", "Thermometer"] },
];

const recentPrescriptions = [
  { id: 'RX001', patient: 'Alice Johnson', doctor: 'Dr. Smith', status: 'verified', time: '1 hour ago', medications: ['Amoxicillin', 'Ibuprofen'] },
  { id: 'RX002', patient: 'Bob Wilson', doctor: 'Dr. Davis', status: 'pending', time: '2 hours ago', medications: ['Metformin', 'Lisinopril'] },
  { id: 'RX003', patient: 'Carol Brown', doctor: 'Dr. Miller', status: 'dispensed', time: '3 hours ago', medications: ['Simvastatin'] },
  { id: 'RX004', patient: 'David Lee', doctor: 'Dr. Johnson', status: 'pending', time: '4 hours ago', medications: ['Losartan', 'Atorvastatin'] },
];

const lowStockItems = [
  { name: "Paracetamol 500mg", current: 15, minimum: 50, status: "critical" },
  { name: "Amoxicillin 250mg", current: 25, minimum: 40, status: "low" },
  { name: "Vitamin D3", current: 8, minimum: 30, status: "critical" },
  { name: "Insulin Pen", current: 35, minimum: 50, status: "low" },
];

const recentCustomers = [
  { id: 'C001', name: 'John Smith', lastVisit: '2024-11-14', totalSpent: 1245.75, status: 'Active' },
  { id: 'C002', name: 'Maria Garcia', lastVisit: '2024-11-13', totalSpent: 890.25, status: 'Active' },
  { id: 'C003', name: 'Robert Wilson', lastVisit: '2024-11-12', totalSpent: 2156.80, status: 'Active' }
];

const expiringItems = [
  { name: "Cough Syrup", batch: "CS2024A", expiry: "2024-12-15", days: 25 },
  { name: "Eye Drops", batch: "ED2024B", expiry: "2024-12-20", days: 30 },
  { name: "Antibiotic Cream", batch: "AC2024C", expiry: "2025-01-10", days: 51 },
];

export default function Dashboard() {
  const router = useRouter();

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new-sale':
        // Navigate to POS/Sales page when implemented
        alert('Navigating to Point of Sale - Feature coming soon!');
        break;
      case 'new-prescription':
        router.push('/prescription');
        break;
      case 'find-medicine':
        router.push('/inventory');
        break;
      case 'receive-stock':
        router.push('/purchase');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{dashboardStats.dailyGrowth}% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales Today</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalSales}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.pendingOrders} orders pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalPrescriptions}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.pendingVerification} pending verification
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                Active customer base
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Total products in stock
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Low Stock Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.name}</span>
                    <Badge variant={item.status === 'critical' ? 'destructive' : 'secondary'}>
                      {item.current} left
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All ({dashboardStats.lowStockItems})
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <Calendar className="h-5 w-5 mr-2" />
                Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expiringItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="text-sm">
                      <div>{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.batch}</div>
                    </div>
                    <Badge variant="outline" className="text-orange-600">
                      {item.days} days
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All ({dashboardStats.expiringItems})
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('new-sale')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Sale
                </Button>
                {/* <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('new-prescription')}
                >
                  <FileCheck className="h-4 w-4 mr-2" />
                  New Prescription
                </Button> */}
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('find-medicine')}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Find Medicine
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('receive-stock')}
                >
                  <Package className="h-4 w-4 mr-2" />
                  Receive Stock
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{sale.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {sale.items.join(', ')}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">${sale.amount}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {sale.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-4 w-4 mr-2" />
                Recent Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{prescription.patient}</p>
                      <p className="text-xs text-muted-foreground">
                        {prescription.doctor} • {prescription.time}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge 
                        variant={prescription.status === 'verified' ? 'default' : 
                               prescription.status === 'pending' ? 'outline' : 'secondary'}
                        className="text-xs"
                      >
                        {prescription.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Recent Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCustomers.map((customer) => (
                  <div key={customer.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Last visit: {customer.lastVisit}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">${customer.totalSpent}</p>
                      <Badge variant="default" className="text-xs">{customer.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Today's Target</span>
                  <span className="font-medium">$2,500</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all" 
                    style={{ width: `${Math.min((dashboardStats.totalRevenue / 2500) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((dashboardStats.totalRevenue / 2500) * 100)}% of daily target achieved
                  {dashboardStats.totalRevenue > 2500 && (
                    <span className="text-green-600 font-medium"> (Target exceeded!)</span>
                  )}
                </p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>This Week</span>
                    <span className="font-medium">$12,456</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>This Month</span>
                    <span className="font-medium">$45,231</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Growth Rate</span>
                    <span className="font-medium text-green-600">+15.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}