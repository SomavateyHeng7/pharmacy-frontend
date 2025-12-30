'use client';

import { useRouter } from 'next/navigation';
import { 
  DollarSign, 
  ShoppingCart, 
  FileCheck, 
  Users, 
  Package,
  Plus,
  Search
} from 'lucide-react';
import { PageHeader, PageContainer } from '@/components/shared';
import { StatsGrid } from '@/components/shared/StatsCard';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { ExpiringItemsAlert } from '@/components/dashboard/ExpiringItemsAlert';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { SalesOverview } from '@/components/dashboard/SalesOverview';

// Mock data - replace with API calls
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
};

const lowStockItems = [
  { name: "Paracetamol 500mg", current: 15, minimum: 50, status: "critical" as const },
  { name: "Amoxicillin 250mg", current: 25, minimum: 40, status: "low" as const },
  { name: "Vitamin D3", current: 8, minimum: 30, status: "critical" as const },
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
        router.push('/sales');
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
    }
  };

  const quickActions = [
    { 
      id: 'new-sale', 
      label: 'New Sale', 
      icon: Plus, 
      onClick: () => handleQuickAction('new-sale') 
    },
    { 
      id: 'find-medicine', 
      label: 'Find Medicine', 
      icon: Search, 
      onClick: () => handleQuickAction('find-medicine') 
    },
    { 
      id: 'receive-stock', 
      label: 'Receive Stock', 
      icon: Package, 
      onClick: () => handleQuickAction('receive-stock') 
    },
  ];

  const salesData = {
    totalRevenue: dashboardStats.totalRevenue,
    dailyTarget: 2500,
    weeklyRevenue: 12456,
    monthlyRevenue: 45231,
    growthRate: 15.2,
  };

  const statsData = [
    {
      title: "Total Revenue",
      value: `$${dashboardStats.totalRevenue.toLocaleString()}`,
      subtitle: "from yesterday",
      icon: DollarSign,
      trend: { value: dashboardStats.dailyGrowth, isPositive: true }
    },
    {
      title: "Sales Today",
      value: dashboardStats.totalSales,
      subtitle: `${dashboardStats.pendingOrders} orders pending`,
      icon: ShoppingCart
    },
    {
      title: "Prescriptions",
      value: dashboardStats.totalPrescriptions,
      subtitle: `${dashboardStats.pendingVerification} pending verification`,
      icon: FileCheck
    },
    {
      title: "Customers",
      value: dashboardStats.totalCustomers,
      subtitle: "Active customer base",
      icon: Users
    },
    {
      title: "Inventory Items",
      value: dashboardStats.totalProducts,
      subtitle: "Total products in stock",
      icon: Package
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Dashboard"
        subtitle="Welcome back! Here's your pharmacy overview"
      />

        {/* Quick Stats */}
        <StatsGrid stats={statsData} columns={5} />

        {/* Alerts Section */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <LowStockAlert
            items={lowStockItems}
            totalCount={dashboardStats.lowStockItems}
            onViewAll={() => router.push('/inventory')}
          />
          <ExpiringItemsAlert
            items={expiringItems}
            totalCount={dashboardStats.expiringItems}
            onViewAll={() => router.push('/inventory')}
          />
          <QuickActions actions={quickActions} />
        </div>

        {/* Recent Activity */}
        <div className="grid gap-4 md:grid-cols-4">
          <SalesOverview data={salesData} />
        </div>
    </PageContainer>
  );
}