'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertTriangle,
  Calendar,
  Package,
  TrendingDown,
  Bell,
  BellOff,
  Search,
  Filter,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Archive,
  RefreshCw,
  Settings,
  Download,
  BarChart3,
  Clock
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'low_stock' | 'expiring' | 'expired' | 'out_of_stock';
  drugId: string;
  drugName: string;
  category: string;
  currentStock: number;
  minStock: number;
  expiryDate?: Date;
  daysUntilExpiry?: number;
  batchNumber?: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'acknowledged' | 'resolved';
  createdAt: Date;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

// Mock alert data
const mockAlerts: Alert[] = [
  {
    id: 'ALT001',
    type: 'out_of_stock',
    drugId: 'DRG023',
    drugName: 'Insulin Glargine 100 units/ml',
    category: 'Diabetes Medications',
    currentStock: 0,
    minStock: 10,
    priority: 'critical',
    status: 'active',
    createdAt: new Date('2025-12-29')
  },
  {
    id: 'ALT002',
    type: 'expired',
    drugId: 'DRG015',
    drugName: 'Amoxicillin 500mg',
    category: 'Antibiotics',
    currentStock: 45,
    minStock: 50,
    expiryDate: new Date('2025-12-15'),
    daysUntilExpiry: -15,
    batchNumber: 'BATCH-2024-089',
    priority: 'critical',
    status: 'active',
    createdAt: new Date('2025-12-15')
  },
  {
    id: 'ALT003',
    type: 'low_stock',
    drugId: 'DRG007',
    drugName: 'Lisinopril 10mg',
    category: 'Cardiovascular',
    currentStock: 15,
    minStock: 50,
    priority: 'high',
    status: 'active',
    createdAt: new Date('2025-12-28')
  },
  {
    id: 'ALT004',
    type: 'expiring',
    drugId: 'DRG032',
    drugName: 'Azithromycin 250mg',
    category: 'Antibiotics',
    currentStock: 120,
    minStock: 30,
    expiryDate: new Date('2026-01-15'),
    daysUntilExpiry: 16,
    batchNumber: 'BATCH-2025-003',
    priority: 'high',
    status: 'active',
    createdAt: new Date('2025-12-20')
  },
  {
    id: 'ALT005',
    type: 'low_stock',
    drugId: 'DRG042',
    drugName: 'Metformin 500mg',
    category: 'Diabetes Medications',
    currentStock: 35,
    minStock: 100,
    priority: 'high',
    status: 'active',
    createdAt: new Date('2025-12-27')
  },
  {
    id: 'ALT006',
    type: 'expiring',
    drugId: 'DRG018',
    drugName: 'Vitamin D3 1000 IU',
    category: 'Vitamins & Supplements',
    currentStock: 200,
    minStock: 50,
    expiryDate: new Date('2026-01-25'),
    daysUntilExpiry: 26,
    batchNumber: 'BATCH-2024-145',
    priority: 'medium',
    status: 'acknowledged',
    createdAt: new Date('2025-12-18'),
    acknowledgedBy: 'John Doe',
    acknowledgedAt: new Date('2025-12-29')
  },
  {
    id: 'ALT007',
    type: 'low_stock',
    drugId: 'DRG051',
    drugName: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    currentStock: 65,
    minStock: 150,
    priority: 'medium',
    status: 'active',
    createdAt: new Date('2025-12-26')
  },
  {
    id: 'ALT008',
    type: 'expiring',
    drugId: 'DRG029',
    drugName: 'Omeprazole 20mg',
    category: 'Gastrointestinal',
    currentStock: 88,
    minStock: 40,
    expiryDate: new Date('2026-02-10'),
    daysUntilExpiry: 42,
    batchNumber: 'BATCH-2024-201',
    priority: 'low',
    status: 'active',
    createdAt: new Date('2025-12-15')
  }
];

export default function StockAlertsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | Alert['type']>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | Alert['priority']>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | Alert['status']>('all');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.batchNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  const stats = {
    total: alerts.length,
    critical: alerts.filter(a => a.priority === 'critical' && a.status === 'active').length,
    active: alerts.filter(a => a.status === 'active').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length
  };

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId
        ? { ...alert, status: 'acknowledged' as const, acknowledgedBy: 'Current User', acknowledgedAt: new Date() }
        : alert
    ));
    toast({
      title: 'Alert Acknowledged',
      description: 'The alert has been marked as acknowledged.',
      variant: 'success'
    });
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
    ));
    toast({
      title: 'Alert Resolved',
      description: 'The alert has been marked as resolved.',
      variant: 'success'
    });
  };

  const handleRestock = (drugId: string) => {
    router.push(`/purchase?drug=${drugId}`);
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'out_of_stock': return <XCircle className="h-5 w-5" />;
      case 'expired': return <Calendar className="h-5 w-5" />;
      case 'low_stock': return <TrendingDown className="h-5 w-5" />;
      case 'expiring': return <Clock className="h-5 w-5" />;
    }
  };

  const getAlertColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getBadgeVariant = (priority: Alert['priority']) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Bell className="h-8 w-8 text-red-600" />
                Stock Alerts Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Monitor and manage inventory alerts</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Alerts</p>
                  <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.active}</p>
                </div>
                <Bell className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Acknowledged</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.acknowledged}</p>
                </div>
                <CheckCircle className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                  <p className="text-3xl font-bold text-gray-700">{stats.total}</p>
                </div>
                <BarChart3 className="h-10 w-10 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search drug name or batch..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Types</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="expired">Expired</option>
                <option value="low_stock">Low Stock</option>
                <option value="expiring">Expiring Soon</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="acknowledged">Acknowledged</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="space-y-3">
          {filteredAlerts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Alerts Found</h3>
                <p className="text-gray-600">All inventory levels are healthy!</p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map(alert => (
              <Card key={alert.id} className={`border-l-4 ${getAlertColor(alert.priority)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${getAlertColor(alert.priority)}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{alert.drugName}</h3>
                          <Badge variant={getBadgeVariant(alert.priority)}>
                            {alert.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{alert.category}</Badge>
                          {alert.status !== 'active' && (
                            <Badge variant="secondary">{alert.status}</Badge>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                          {alert.type === 'low_stock' && (
                            <p className="flex items-center gap-2">
                              <TrendingDown className="h-4 w-4" />
                              Current: {alert.currentStock} units | Minimum: {alert.minStock} units
                            </p>
                          )}
                          {alert.type === 'out_of_stock' && (
                            <p className="flex items-center gap-2 text-red-600 font-medium">
                              <XCircle className="h-4 w-4" />
                              Out of Stock - Reorder immediately
                            </p>
                          )}
                          {(alert.type === 'expiring' || alert.type === 'expired') && (
                            <>
                              <p className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Batch: {alert.batchNumber} | Expiry: {alert.expiryDate?.toLocaleDateString()}
                              </p>
                              <p className={`flex items-center gap-2 ${alert.type === 'expired' ? 'text-red-600 font-medium' : ''}`}>
                                <Clock className="h-4 w-4" />
                                {alert.type === 'expired' ? 'EXPIRED' : `Expires in ${alert.daysUntilExpiry} days`}
                              </p>
                            </>
                          )}
                          <p className="text-xs text-gray-500">
                            Created: {alert.createdAt.toLocaleDateString()} at {alert.createdAt.toLocaleTimeString()}
                          </p>
                          {alert.acknowledgedBy && (
                            <p className="text-xs text-gray-500">
                              Acknowledged by {alert.acknowledgedBy} on {alert.acknowledgedAt?.toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {alert.status === 'active' && (
                        <>
                          <Button size="sm" onClick={() => handleAcknowledge(alert.id)}>
                            <BellOff className="h-4 w-4 mr-2" />
                            Acknowledge
                          </Button>
                          {(alert.type === 'low_stock' || alert.type === 'out_of_stock') && (
                            <Button size="sm" variant="default" onClick={() => handleRestock(alert.drugId)}>
                              <Package className="h-4 w-4 mr-2" />
                              Restock
                            </Button>
                          )}
                          {(alert.type === 'expired') && (
                            <Button size="sm" variant="destructive">
                              <Archive className="h-4 w-4 mr-2" />
                              Dispose
                            </Button>
                          )}
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <Button size="sm" variant="outline" onClick={() => handleResolve(alert.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
