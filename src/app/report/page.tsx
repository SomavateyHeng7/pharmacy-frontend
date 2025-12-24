"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Calendar,
  Download,
  Filter,
  Eye,
  FileText,
  PieChart,
  Activity,
  AlertTriangle,
  Clock,
  Building2,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Calculator,
  CreditCard,
  Receipt,
  Banknote,
  TrendingDown as Loss,
  Settings,
  ExternalLink,
  Zap,
  Home,
  Briefcase
} from 'lucide-react';
import Sidebar from '@/components/layout/sidebar';
// Enhanced mock data for comprehensive reports including accounting
const salesData = {
  daily: { revenue: 2847.50, transactions: 47, avgTransaction: 60.59, growth: 12.3, cost: 1708.50, gross: 1139.00 },
  weekly: { revenue: 18432.75, transactions: 298, avgTransaction: 61.85, growth: 8.7, cost: 11059.65, gross: 7373.10 },
  monthly: { revenue: 67891.25, transactions: 1156, avgTransaction: 58.72, growth: 15.2, cost: 40734.75, gross: 27156.50 },
  yearly: { revenue: 785523.40, transactions: 13847, avgTransaction: 56.73, growth: 22.8, cost: 471314.04, gross: 314209.36 }
};

// Daily Sales Summary Data
const dailySalesReport = [
  { date: "2024-11-14", revenue: 2847.50, transactions: 47, cash: 1250.00, card: 1597.50, returns: 45.00, netSales: 2802.50 },
  { date: "2024-11-13", revenue: 3124.75, transactions: 52, cash: 1450.25, card: 1674.50, returns: 78.00, netSales: 3046.75 },
  { date: "2024-11-12", revenue: 2456.80, transactions: 41, cash: 980.30, card: 1476.50, returns: 32.50, netSales: 2424.30 },
  { date: "2024-11-11", revenue: 2890.25, transactions: 48, cash: 1340.75, card: 1549.50, returns: 67.20, netSales: 2823.05 },
  { date: "2024-11-10", revenue: 2567.40, transactions: 43, cash: 1123.60, card: 1443.80, returns: 28.90, netSales: 2538.50 }
];

// Expense Tracking Data
const expenseData = {
  monthly: {
    rent: 8500.00,
    utilities: 450.75,
    salaries: 15600.00,
    insurance: 890.50,
    supplies: 2340.25,
    marketing: 675.00,
    maintenance: 320.00,
    licenses: 250.00,
    other: 445.30
  },
  categories: [
    { category: "Rent", amount: 8500.00, percentage: 29.2, icon: Home },
    { category: "Salaries", amount: 15600.00, percentage: 53.6, icon: Users },
    { category: "Utilities", amount: 450.75, percentage: 1.6, icon: Zap },
    { category: "Insurance", amount: 890.50, percentage: 3.1, icon: Building2 },
    { category: "Supplies", amount: 2340.25, percentage: 8.0, icon: Package },
    { category: "Marketing", amount: 675.00, percentage: 2.3, icon: TrendingUp },
    { category: "Maintenance", amount: 320.00, percentage: 1.1, icon: Settings },
    { category: "Other", amount: 695.30, percentage: 2.4, icon: Briefcase }
  ]
};

// Profit & Loss Statement Data
const profitLossData = {
  revenue: {
    grossSales: 67891.25,
    returns: 1245.75,
    netSales: 66645.50
  },
  costOfGoodsSold: {
    inventory: 40734.75,
    shipping: 890.25,
    totalCOGS: 41625.00
  },
  grossProfit: 25020.50,
  expenses: {
    rent: 8500.00,
    salaries: 15600.00,
    utilities: 450.75,
    insurance: 890.50,
    marketing: 675.00,
    other: 1354.55,
    totalExpenses: 27470.80
  },
  netIncome: -2450.30,
  margins: {
    grossMargin: 37.5,
    netMargin: -3.7
  }
};

// Tax Computation Data
const taxData = {
  salesTax: {
    taxableAmount: 66645.50,
    vatRate: 10.0,
    vatAmount: 6664.55,
    totalWithTax: 73310.05
  },
  incomeTax: {
    taxableIncome: -2450.30,
    taxRate: 21.0,
    taxAmount: 0.00, // No tax on loss
    netAfterTax: -2450.30
  },
  quarterlyTax: {
    q1: 4567.80,
    q2: 5234.90,
    q3: 4890.25,
    q4: 0.00 // Current quarter
  }
};

// Accounting Integration Data
const accountingIntegrations = [
  { name: "QuickBooks", status: "Connected", lastSync: "2024-11-14 09:30", icon: "💼", color: "green" },
  { name: "Xero", status: "Available", lastSync: "Never", icon: "📊", color: "blue" },
  { name: "Sage", status: "Available", lastSync: "Never", icon: "🏢", color: "gray" },
  { name: "FreshBooks", status: "Available", lastSync: "Never", icon: "📋", color: "gray" }
];

const topSellingDrugs = [
  { name: "Paracetamol 500mg", quantity: 456, revenue: 228.00, growth: 12.5, profit: 114.00, category: "Pain Relief" },
  { name: "Amoxicillin 250mg", quantity: 234, revenue: 1170.00, growth: -3.2, profit: 468.00, category: "Antibiotics" },
  { name: "Vitamin D3", quantity: 189, revenue: 945.00, growth: 25.8, profit: 567.00, category: "Supplements" },
  { name: "Cough Syrup", quantity: 167, revenue: 835.00, growth: 8.7, profit: 250.50, category: "Respiratory" },
  { name: "Blood Pressure Monitor", quantity: 23, revenue: 2875.00, growth: 45.2, profit: 1150.00, category: "Equipment" }
];

const topSuppliers = [
  { name: "MediCore Pharmaceuticals", revenue: 125430.50, orders: 45, performance: 96, category: "Prescription Drugs" },
  { name: "Global Medical Supplies", revenue: 87650.25, orders: 32, performance: 88, category: "Medical Equipment" },
  { name: "VitaHealth Distributors", revenue: 34500.75, orders: 18, performance: 78, category: "Supplements" },
  { name: "Emergency Med Express", revenue: 198750.80, orders: 67, performance: 92, category: "Emergency Supplies" }
];

const expiryData = {
  expiring30Days: [
    { drug: "Aspirin 100mg", quantity: 150, expiryDate: "2024-12-15", value: 75.00, supplier: "MediCore" },
    { drug: "Vitamin C", quantity: 89, expiryDate: "2024-12-20", value: 178.00, supplier: "VitaHealth" },
    { drug: "Cough Drops", quantity: 67, expiryDate: "2024-12-25", value: 33.50, supplier: "Global Med" }
  ]
};

const stockMovement = [
  { drug: "Paracetamol", opening: 500, received: 200, sold: 456, closing: 244, movement: "High" },
  { drug: "Amoxicillin", opening: 300, received: 150, sold: 234, closing: 216, movement: "Medium" },
  { drug: "Vitamin D3", opening: 400, received: 100, sold: 189, closing: 311, movement: "Medium" },
  { drug: "Insulin", opening: 50, received: 30, sold: 67, closing: 13, movement: "Critical" }
];

const profitabilityData = {
  byProduct: [
    { product: "Prescription Drugs", revenue: 345670.25, cost: 234500.75, profit: 111169.50, margin: 32.1 },
    { product: "OTC Medicines", revenue: 156789.50, cost: 98234.25, profit: 58555.25, margin: 37.3 },
    { product: "Medical Equipment", revenue: 98765.00, cost: 67890.50, profit: 30874.50, margin: 31.2 },
    { product: "Supplements", revenue: 87654.25, cost: 52590.75, profit: 35063.50, margin: 40.0 }
  ]
};

const forecastingData = {
  salesTrends: [
    { month: "Jan 2025", predicted: 75000, confidence: 92, trend: "up" },
    { month: "Feb 2025", predicted: 82000, confidence: 89, trend: "up" },
    { month: "Mar 2025", predicted: 79000, confidence: 85, trend: "down" },
    { month: "Apr 2025", predicted: 86000, confidence: 88, trend: "up" }
  ],
  restockNeeds: [
    { drug: "Paracetamol 500mg", currentStock: 244, predictedNeed: 500, daysUntilRestock: 15, priority: "High" },
    { drug: "Vitamin D3", currentStock: 311, predictedNeed: 200, daysUntilRestock: 25, priority: "Medium" },
    { drug: "Insulin", currentStock: 13, predictedNeed: 80, daysUntilRestock: 3, priority: "Critical" }
  ]
};

const inventoryReports = {
  totalItems: 1247,
  lowStock: 23,
  expiring: 15,
  expired: 3,
  totalValue: 145780.50
};

const customerMetrics = {
  totalCustomers: 2847,
  newCustomers: 156,
  returningCustomers: 2691,
  averageOrderValue: 58.72
};

const monthlyTrends = [
  { month: "Jan", sales: 65432, customers: 234, orders: 1156 },
  { month: "Feb", sales: 59876, customers: 198, orders: 1089 },
  { month: "Mar", sales: 72145, customers: 267, orders: 1298 },
  { month: "Apr", sales: 68923, customers: 245, orders: 1203 },
  { month: "May", sales: 75641, customers: 289, orders: 1367 },
  { month: "Jun", sales: 67891, customers: 241, orders: 1156 }
];

function DailySalesReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Receipt className="h-5 w-5 mr-2" />
          Daily Sales Reports & Summaries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dailySalesReport.map((day, index) => (
            <div key={index} className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h4>
                  <p className="text-sm text-muted-foreground">{day.transactions} transactions</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">${day.netSales.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Net Sales</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-950 rounded">
                  <p className="font-medium">${day.cash.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Cash</p>
                </div>
                <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded">
                  <p className="font-medium">${day.card.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Card</p>
                </div>
                <div className="text-center p-2 bg-red-50 dark:bg-red-950 rounded">
                  <p className="font-medium">${day.returns.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Returns</p>
                </div>
                <div className="text-center p-2 bg-purple-50 dark:bg-purple-950 rounded">
                  <p className="font-medium">${day.revenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Gross</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ExpenseTrackingReport() {
  const totalExpenses = expenseData.categories.reduce((sum, cat) => sum + cat.amount, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Expense Tracking (Rent, Utilities, Salaries)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
            <p className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Monthly Expenses</p>
          </div>
          
          <div className="space-y-3">
            {expenseData.categories.map((expense, index) => {
              const IconComponent = expense.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{expense.category}</p>
                      <p className="text-sm text-muted-foreground">{expense.percentage}% of total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${expense.amount.toLocaleString()}</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${expense.percentage * 2}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfitLossStatement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Profit and Loss Statement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Revenue Section */}
          <div>
            <h4 className="font-medium text-green-600 mb-3">Revenue</h4>
            <div className="space-y-2 pl-4">
              <div className="flex justify-between">
                <span>Gross Sales</span>
                <span className="font-medium">${profitLossData.revenue.grossSales.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Less: Returns</span>
                <span className="font-medium">-${profitLossData.revenue.returns.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Net Sales</span>
                <span>${profitLossData.revenue.netSales.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Cost of Goods Sold */}
          <div>
            <h4 className="font-medium text-blue-600 mb-3">Cost of Goods Sold</h4>
            <div className="space-y-2 pl-4">
              <div className="flex justify-between">
                <span>Inventory Costs</span>
                <span className="font-medium">${profitLossData.costOfGoodsSold.inventory.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping & Handling</span>
                <span className="font-medium">${profitLossData.costOfGoodsSold.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total COGS</span>
                <span>${profitLossData.costOfGoodsSold.totalCOGS.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Gross Profit */}
          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-bold text-green-700">Gross Profit</span>
              <div className="text-right">
                <p className="font-bold text-green-700">${profitLossData.grossProfit.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{profitLossData.margins.grossMargin}% margin</p>
              </div>
            </div>
          </div>

          {/* Operating Expenses */}
          <div>
            <h4 className="font-medium text-red-600 mb-3">Operating Expenses</h4>
            <div className="space-y-2 pl-4">
              <div className="flex justify-between">
                <span>Rent</span>
                <span className="font-medium">${profitLossData.expenses.rent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Salaries</span>
                <span className="font-medium">${profitLossData.expenses.salaries.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Utilities</span>
                <span className="font-medium">${profitLossData.expenses.utilities.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance</span>
                <span className="font-medium">${profitLossData.expenses.insurance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Other Expenses</span>
                <span className="font-medium">${profitLossData.expenses.other.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Total Expenses</span>
                <span>${profitLossData.expenses.totalExpenses.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Net Income */}
          <div className={`p-4 rounded-lg ${
            profitLossData.netIncome >= 0 
              ? 'bg-green-50 dark:bg-green-950' 
              : 'bg-red-50 dark:bg-red-950'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Net Income</span>
              <div className="text-right">
                <p className={`text-xl font-bold ${
                  profitLossData.netIncome >= 0 ? 'text-green-700' : 'text-red-700'
                }`}>
                  ${profitLossData.netIncome >= 0 ? '+' : ''}${profitLossData.netIncome.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">{profitLossData.margins.netMargin}% margin</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaxComputationReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Banknote className="h-5 w-5 mr-2" />
          Tax Computation (VAT/GST)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Sales Tax / VAT */}
          <div>
            <h4 className="font-medium text-blue-600 mb-3 flex items-center">
              <Receipt className="h-4 w-4 mr-2" />
              Value Added Tax (VAT)
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <span>Taxable Amount</span>
                  <span className="font-medium">${taxData.salesTax.taxableAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>VAT Rate</span>
                  <span className="font-medium">{taxData.salesTax.vatRate}%</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>VAT Amount</span>
                  <span className="font-bold text-blue-600">${taxData.salesTax.vatAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-2">
                  <span className="font-bold">Total with Tax</span>
                  <span className="font-bold">${taxData.salesTax.totalWithTax.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Income Tax */}
          <div>
            <h4 className="font-medium text-green-600 mb-3 flex items-center">
              <Calculator className="h-4 w-4 mr-2" />
              Income Tax
            </h4>
            <div className="p-3 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <span>Taxable Income</span>
                <span className={`font-medium ${
                  taxData.incomeTax.taxableIncome >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  ${taxData.incomeTax.taxableIncome >= 0 ? '+' : ''}${taxData.incomeTax.taxableIncome.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Tax Rate</span>
                <span className="font-medium">{taxData.incomeTax.taxRate}%</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Tax Amount</span>
                <span className="font-bold">${taxData.incomeTax.taxAmount.toLocaleString()}</span>
              </div>
              {taxData.incomeTax.taxableIncome < 0 && (
                <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-950 rounded text-sm text-yellow-800 dark:text-yellow-200">
                  ℹ️ No income tax due on loss. Carry forward available.
                </div>
              )}
            </div>
          </div>

          {/* Quarterly Tax Summary */}
          <div>
            <h4 className="font-medium text-purple-600 mb-3">Quarterly Tax Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
                <p className="font-bold">${taxData.quarterlyTax.q1.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Q1 2024</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
                <p className="font-bold">${taxData.quarterlyTax.q2.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Q2 2024</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
                <p className="font-bold">${taxData.quarterlyTax.q3.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Q3 2024</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <p className="font-bold">$0.00</p>
                <p className="text-xs text-muted-foreground">Q4 2024</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AccountingIntegrationsReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ExternalLink className="h-5 w-5 mr-2" />
          Accounting Tool Integrations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accountingIntegrations.map((integration, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{integration.icon}</div>
                <div>
                  <h4 className="font-medium">{integration.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Last sync: {integration.lastSync}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge 
                  variant={integration.status === 'Connected' ? 'default' : 'outline'}
                  className={integration.status === 'Connected' ? 'bg-green-500' : ''}
                >
                  {integration.status}
                </Badge>
                <Button 
                  variant={integration.status === 'Connected' ? 'outline' : 'default'}
                  size="sm"
                >
                  {integration.status === 'Connected' ? 'Sync Now' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Integration Benefits
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Automatic transaction syncing</li>
              <li>• Real-time financial reporting</li>
              <li>• Tax preparation automation</li>
              <li>• Expense categorization</li>
              <li>• Bank reconciliation</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SalesReport() {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const currentData = salesData[selectedPeriod];
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Sales Performance Reports (Daily/Weekly/Monthly)
          </CardTitle>
          <div className="flex space-x-2">
            {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Total Revenue */}
          <div className="flex flex-col items-center justify-between rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-3 min-w-[140px] max-w-[200px] w-full h-full overflow-hidden">
            <div className="flex items-center mb-1 w-full">
              <DollarSign className="h-5 w-5 text-green-600 mr-1 shrink-0" />
              <span className="text-xs md:text-sm font-medium text-green-700 dark:text-green-300 truncate">Total Revenue</span>
            </div>
            <span className="text-lg md:text-2xl lg:text-3xl font-bold text-green-600 leading-tight truncate w-full text-left">${currentData.revenue.toLocaleString()}</span>
            <div className="flex items-center mt-1 w-full">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1 shrink-0" />
              <span className="text-xs md:text-sm font-medium text-green-600 truncate">+{currentData.growth}%</span>
            </div>
          </div>

          {/* Total Costs */}
          <div className="flex flex-col items-center justify-between rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-3 min-w-[140px] max-w-[200px] w-full h-full overflow-hidden">
            <div className="flex items-center mb-1 w-full">
              <TrendingDown className="h-5 w-5 text-red-600 mr-1 shrink-0" />
              <span className="text-xs md:text-sm font-medium text-red-700 dark:text-red-300 truncate">Total Costs</span>
            </div>
            <span className="text-lg md:text-2xl lg:text-3xl font-bold text-red-600 leading-tight truncate w-full text-left">${currentData.cost.toLocaleString()}</span>
            <span className="text-xs md:text-sm text-red-500 truncate w-full text-left">Operating Expenses</span>
          </div>

          {/* Gross Profit */}
          <div className="flex flex-col items-center justify-between rounded-xl bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 p-3 min-w-[140px] max-w-[200px] w-full h-full overflow-hidden">
            <div className="flex items-center mb-1 w-full">
              <TrendingUp className="h-5 w-5 text-purple-600 mr-1 shrink-0" />
              <span className="text-xs md:text-sm font-medium text-purple-700 dark:text-purple-300 truncate">Gross Profit</span>
            </div>
            <span className="text-lg md:text-2xl lg:text-3xl font-bold text-purple-600 leading-tight truncate w-full text-left">${currentData.gross.toLocaleString()}</span>
            <span className="text-xs md:text-sm text-purple-500 truncate w-full text-left">{((currentData.gross / currentData.revenue) * 100).toFixed(1)}% Margin</span>
          </div>

          {/* Transactions */}
          <div className="flex flex-col items-center justify-between rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 min-w-[140px] max-w-[200px] w-full h-full overflow-hidden">
            <div className="flex items-center mb-1 w-full">
              <Activity className="h-5 w-5 text-blue-600 mr-1 shrink-0" />
              <span className="text-xs md:text-sm font-medium text-blue-700 dark:text-blue-300 truncate">Transactions</span>
            </div>
            <span className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-600 leading-tight truncate w-full text-left">{currentData.transactions.toLocaleString()}</span>
            <span className="text-xs md:text-sm text-blue-500 truncate w-full text-left">Total Orders</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TopSellingMedicinesReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Top-Selling Medicines & Profit Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topSellingDrugs.map((drug, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium">{drug.name}</span>
                  <Badge variant={drug.growth > 0 ? "default" : "secondary"}>
                    {drug.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(drug.growth)}%
                  </Badge>
                  <Badge variant="outline">{drug.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {drug.quantity} units sold
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${drug.revenue.toFixed(2)}</p>
                <p className="text-sm text-green-600">+${drug.profit.toFixed(2)} profit</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ExpiryAndStockMovementReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
          Expiry & Stock Movement Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Expiring in 30 days */}
          <div>
            <h4 className="font-medium text-red-600 mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Expiring in 30 Days ({expiryData.expiring30Days.length} items)
            </h4>
            <div className="space-y-2">
              {expiryData.expiring30Days.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200">
                  <div>
                    <p className="font-medium">{item.drug}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} units • Expires: {item.expiryDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${item.value.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{item.supplier}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stock Movement Summary */}
          <div>
            <h4 className="font-medium text-blue-600 mb-3 flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Stock Movement Summary
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Drug</th>
                    <th className="text-left p-2">Opening</th>
                    <th className="text-left p-2">Received</th>
                    <th className="text-left p-2">Sold</th>
                    <th className="text-left p-2">Closing</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockMovement.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{item.drug}</td>
                      <td className="p-2">{item.opening}</td>
                      <td className="p-2 text-green-600">+{item.received}</td>
                      <td className="p-2 text-red-600">-{item.sold}</td>
                      <td className="p-2 font-medium">{item.closing}</td>
                      <td className="p-2">
                        <Badge variant={item.movement === 'Critical' ? 'destructive' : item.movement === 'High' ? 'default' : 'secondary'}>
                          {item.movement}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TopSuppliersReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          Top Performing Suppliers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topSuppliers.map((supplier, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{supplier.name}</span>
                  <Badge variant={supplier.performance >= 90 ? "default" : "secondary"}>
                    {supplier.performance}% Performance
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {supplier.category} • {supplier.orders} orders
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">${supplier.revenue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProfitabilityReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          Profitability per Product/Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Percent className="h-4 w-4 mr-2" />
              Profitability by Product Category
            </h4>
            <div className="grid gap-3">
              {profitabilityData.byProduct.map((item, index) => (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.product}</span>
                    <Badge variant={item.margin >= 35 ? "default" : "secondary"}>
                      {item.margin.toFixed(1)}% Margin
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-bold">${item.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Cost</p>
                      <p className="font-bold">${item.cost.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Profit</p>
                      <p className="font-bold text-green-600">${item.profit.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ForecastingReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="h-5 w-5 mr-2" />
          Forecasting (Sales Trends & Restock Needs)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Sales Trends */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Sales Forecast (Next 4 Months)
            </h4>
            <div className="grid gap-3">
              {forecastingData.salesTrends.map((forecast, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium">{forecast.month}</span>
                    {forecast.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${forecast.predicted.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{forecast.confidence}% confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restock Needs */}
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Predicted Restock Needs
            </h4>
            <div className="space-y-3">
              {forecastingData.restockNeeds.map((item, index) => (
                <div key={index} className="p-3 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{item.drug}</span>
                    <Badge variant={item.priority === 'Critical' ? 'destructive' : item.priority === 'High' ? 'default' : 'secondary'}>
                      {item.priority} Priority
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Stock</p>
                      <p className="font-bold">{item.currentStock} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Predicted Need</p>
                      <p className="font-bold">{item.predictedNeed} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Restock In</p>
                      <p className="font-bold text-orange-600">{item.daysUntilRestock} days</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InventoryOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="h-5 w-5 mr-2" />
          Inventory Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
            <p className="text-xl font-bold text-blue-600">{inventoryReports.totalItems}</p>
            <p className="text-xs text-muted-foreground">Total Items</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-950">
            <p className="text-xl font-bold text-red-600">{inventoryReports.lowStock}</p>
            <p className="text-xs text-muted-foreground">Low Stock</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950">
            <p className="text-xl font-bold text-orange-600">{inventoryReports.expiring}</p>
            <p className="text-xs text-muted-foreground">Expiring Soon</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
            <p className="text-xl font-bold text-gray-600">{inventoryReports.expired}</p>
            <p className="text-xs text-muted-foreground">Expired</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950 md:col-span-2">
            <p className="text-xl font-bold text-green-600">
              ${inventoryReports.totalValue.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Inventory Value</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Report Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left">
            <Download className="h-4 w-4 mr-3 shrink-0" />
            <span className="whitespace-normal">Export Sales Report</span>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left">
            <Download className="h-4 w-4 mr-3 shrink-0" />
            <span className="whitespace-normal">Export Inventory Report</span>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left">
            <PieChart className="h-4 w-4 mr-3 shrink-0" />
            <span className="whitespace-normal">Generate Analytics</span>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left">
            <Calendar className="h-4 w-4 mr-3 shrink-0" />
            <span className="whitespace-normal">Schedule Report</span>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left">
            <Filter className="h-4 w-4 mr-3 shrink-0" />
            <span className="whitespace-normal">Custom Report</span>
          </Button>
          <Button variant="outline" className="justify-start h-auto py-3 px-4 text-left">
            <Eye className="h-4 w-4 mr-3 shrink-0" />
            <span className="whitespace-normal">View Details</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const reportTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sales', label: 'Sales Reports', icon: TrendingUp },
    { id: 'financial', label: 'Financial Reports', icon: Calculator },
    { id: 'expiry', label: 'Expiry & Movement', icon: AlertTriangle },
    { id: 'profitability', label: 'Profitability', icon: DollarSign },
    { id: 'forecasting', label: 'Forecasting', icon: Target },
    // { id: 'accounting', label: 'Accounting', icon: CreditCard }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your pharmacy performance & financials
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex space-x-2 border-b overflow-x-auto">
        {reportTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <Icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </Button>
          );
        })}
      </div>

      {/* Report Content */}
      {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <SalesReport />
                </div>
                <div>
                  <QuickActions />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <TopSellingMedicinesReport />
                <InventoryOverview />
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-6">
              <SalesReport />
              <DailySalesReport />
              <div className="grid gap-6 md:grid-cols-2">
                <TopSellingMedicinesReport />
                <TopSuppliersReport />
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <ProfitLossStatement />
                <ExpenseTrackingReport />
              </div>
              <TaxComputationReport />
            </div>
          )}

          {activeTab === 'expiry' && (
            <div className="space-y-6">
              <ExpiryAndStockMovementReport />
              <InventoryOverview />
            </div>
          )}

          {activeTab === 'profitability' && (
            <div className="space-y-6">
              <ProfitabilityReport />
              <div className="grid gap-6 md:grid-cols-2">
                <TopSellingMedicinesReport />
                <TopSuppliersReport />
              </div>
            </div>
          )}

          {activeTab === 'forecasting' && (
            <div className="space-y-6">
              <ForecastingReport />
              <div className="grid gap-6 md:grid-cols-2">
                <SalesReport />
                <InventoryOverview />
              </div>
            </div>
          )}

          {/* {activeTab === 'accounting' && (
            <div className="space-y-6">
              <AccountingIntegrationsReport />
              <div className="grid gap-6 md:grid-cols-2">
                <TaxComputationReport />
                <ExpenseTrackingReport />
              </div>
            </div>
          )} */}
    </div>
  );
}