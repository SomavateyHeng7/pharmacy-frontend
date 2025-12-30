"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Calendar,
  Package,
  Trash2,
  AlertCircle,
  Clock,
  CheckCircle,
  Search,
  Filter,
  Download,
  X
} from "lucide-react";

interface DrugBatch {
  id: string;
  drugName: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  supplier: string;
  location: string;
  status: 'critical' | 'warning' | 'normal' | 'expired';
  daysUntilExpiry: number;
}

// Mock batch data
const batchesData: DrugBatch[] = [
  {
    id: 'B001',
    drugName: 'Amoxicillin 500mg',
    batchNumber: 'AMX-2024-001',
    expiryDate: '2024-12-15',
    quantity: 450,
    supplier: 'PharmaCorp Ltd',
    location: 'Shelf A-12',
    status: 'critical',
    daysUntilExpiry: 15
  },
  {
    id: 'B002',
    drugName: 'Ibuprofen 400mg',
    batchNumber: 'IBU-2024-089',
    expiryDate: '2024-11-28',
    quantity: 120,
    supplier: 'MediSupply Inc',
    location: 'Shelf B-05',
    status: 'expired',
    daysUntilExpiry: -2
  },
  {
    id: 'B003',
    drugName: 'Lisinopril 10mg',
    batchNumber: 'LIS-2024-156',
    expiryDate: '2025-01-20',
    quantity: 890,
    supplier: 'Global Pharma',
    location: 'Shelf C-08',
    status: 'warning',
    daysUntilExpiry: 50
  },
  {
    id: 'B004',
    drugName: 'Metformin 1000mg',
    batchNumber: 'MET-2024-234',
    expiryDate: '2025-02-10',
    quantity: 1200,
    supplier: 'HealthMeds Co',
    location: 'Shelf D-14',
    status: 'warning',
    daysUntilExpiry: 71
  },
  {
    id: 'B005',
    drugName: 'Omeprazole 20mg',
    batchNumber: 'OME-2024-067',
    expiryDate: '2024-11-25',
    quantity: 85,
    supplier: 'PharmaCorp Ltd',
    location: 'Shelf A-15',
    status: 'expired',
    daysUntilExpiry: -5
  },
  {
    id: 'B006',
    drugName: 'Atorvastatin 20mg',
    batchNumber: 'ATO-2024-112',
    expiryDate: '2025-04-15',
    quantity: 650,
    supplier: 'MediSupply Inc',
    location: 'Shelf B-19',
    status: 'normal',
    daysUntilExpiry: 135
  },
  {
    id: 'B007',
    drugName: 'Paracetamol 500mg',
    batchNumber: 'PAR-2024-345',
    expiryDate: '2024-12-05',
    quantity: 320,
    supplier: 'Global Pharma',
    location: 'Shelf A-03',
    status: 'critical',
    daysUntilExpiry: 5
  },
  {
    id: 'B008',
    drugName: 'Aspirin 100mg',
    batchNumber: 'ASP-2024-198',
    expiryDate: '2025-01-30',
    quantity: 540,
    supplier: 'HealthMeds Co',
    location: 'Shelf C-21',
    status: 'warning',
    daysUntilExpiry: 60
  }
];

function DisposalModal({
  isOpen,
  onClose,
  batch,
  onConfirm
}: {
  isOpen: boolean;
  onClose: () => void;
  batch: DrugBatch | null;
  onConfirm: (id: string, reason: string) => void;
}) {
  const [reason, setReason] = useState('');

  if (!isOpen || !batch) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Dispose Batch
          </h3>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
              {batch.drugName}
            </p>
            <p className="text-xs text-red-600 dark:text-red-400">
              Batch: {batch.batchNumber} | Expires: {batch.expiryDate}
            </p>
            <p className="text-xs text-red-600 dark:text-red-400">
              Quantity: {batch.quantity} units
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disposalReason">Disposal Reason *</Label>
            <Textarea
              id="disposalReason"
              placeholder="Enter reason for disposal (e.g., expired, damaged, recalled)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              ⚠️ This action cannot be undone. Ensure proper disposal procedures are followed.
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={!reason.trim()}
              onClick={() => {
                onConfirm(batch.id, reason);
                setReason('');
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Confirm Disposal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BatchExpiryManagementPage() {
  const [batches, setBatches] = useState<DrugBatch[]>(batchesData);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'all' | '30' | '60' | '90' | 'expired'>('all');
  const [selectedBatch, setSelectedBatch] = useState<DrugBatch | null>(null);
  const [showDisposalModal, setShowDisposalModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const filteredBatches = useMemo(() => {
    let filtered = batches;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (batch) =>
          batch.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          batch.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          batch.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Time filter
    if (timeFilter !== 'all') {
      if (timeFilter === 'expired') {
        filtered = filtered.filter((batch) => batch.status === 'expired');
      } else {
        const days = parseInt(timeFilter);
        filtered = filtered.filter(
          (batch) => batch.daysUntilExpiry > 0 && batch.daysUntilExpiry <= days
        );
      }
    }

    return filtered;
  }, [batches, searchQuery, timeFilter]);

  const stats = useMemo(() => {
    return {
      total: batches.length,
      expired: batches.filter((b) => b.status === 'expired').length,
      critical: batches.filter((b) => b.status === 'critical').length,
      warning: batches.filter((b) => b.status === 'warning').length,
      expiring30: batches.filter((b) => b.daysUntilExpiry > 0 && b.daysUntilExpiry <= 30).length,
      expiring60: batches.filter((b) => b.daysUntilExpiry > 30 && b.daysUntilExpiry <= 60).length,
      expiring90: batches.filter((b) => b.daysUntilExpiry > 60 && b.daysUntilExpiry <= 90).length
    };
  }, [batches]);

  const handleDispose = (id: string, reason: string) => {
    setBatches((prev) => prev.filter((batch) => batch.id !== id));
    setShowDisposalModal(false);
    setSelectedBatch(null);
    setToast(`Batch ${id} has been marked for disposal. Reason: ${reason}`);
  };

  const getStatusBadge = (status: DrugBatch['status']) => {
    const variants = {
      expired: 'destructive',
      critical: 'destructive',
      warning: 'default',
      normal: 'secondary'
    } as const;

    const labels = {
      expired: 'Expired',
      critical: 'Critical',
      warning: 'Warning',
      normal: 'Normal'
    };

    return (
      <Badge variant={variants[status]} className={status === 'warning' ? 'bg-yellow-500' : ''}>
        {labels[status]}
      </Badge>
    );
  };

  const exportReport = () => {
    setToast('Batch expiry report exported successfully');
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 flex items-center gap-3">
          <CheckCircle size={20} />
          <span className="font-medium">{toast}</span>
          <button
            className="ml-2 hover:bg-white/20 rounded-full p-1 transition"
            onClick={() => setToast(null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Package className="h-8 w-8 mr-3 text-orange-600" />
            Batch Expiry Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage expiring drug batches
          </p>
        </div>
        <Button onClick={exportReport} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Expired Batches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-red-600">{stats.expired}</span>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Critical (&lt;30 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-orange-600">{stats.expiring30}</span>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Warning (30-60 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-yellow-600">{stats.expiring60}</span>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Caution (60-90 days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-blue-600">{stats.expiring90}</span>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by drug name, batch number, or supplier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={timeFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={timeFilter === 'expired' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('expired')}
                size="sm"
              >
                Expired
              </Button>
              <Button
                variant={timeFilter === '30' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('30')}
                size="sm"
              >
                &lt;30 Days
              </Button>
              <Button
                variant={timeFilter === '60' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('60')}
                size="sm"
              >
                &lt;60 Days
              </Button>
              <Button
                variant={timeFilter === '90' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('90')}
                size="sm"
              >
                &lt;90 Days
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Batches List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              Batch List ({filteredBatches.length} {filteredBatches.length === 1 ? 'batch' : 'batches'})
            </span>
            <Filter className="h-5 w-5 text-muted-foreground" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredBatches.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No batches found</p>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || timeFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'No expiring batches at this time'}
                </p>
              </div>
            ) : (
              filteredBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-lg">{batch.drugName}</h3>
                        {getStatusBadge(batch.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Batch: {batch.batchNumber} | Supplier: {batch.supplier}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setSelectedBatch(batch);
                        setShowDisposalModal(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Dispose
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {batch.expiryDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Days Until Expiry</p>
                      <p
                        className={`font-medium ${
                          batch.daysUntilExpiry < 0
                            ? 'text-red-600'
                            : batch.daysUntilExpiry <= 30
                            ? 'text-orange-600'
                            : batch.daysUntilExpiry <= 60
                            ? 'text-yellow-600'
                            : 'text-blue-600'
                        }`}
                      >
                        {batch.daysUntilExpiry < 0
                          ? `Expired ${Math.abs(batch.daysUntilExpiry)} days ago`
                          : `${batch.daysUntilExpiry} days`}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p className="font-medium">{batch.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{batch.location}</p>
                    </div>
                  </div>

                  {batch.status === 'expired' && (
                    <div className="mt-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2 text-xs text-red-800 dark:text-red-200">
                      ⚠️ This batch has expired and should be removed from inventory immediately
                    </div>
                  )}
                  {batch.status === 'critical' && (
                    <div className="mt-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded p-2 text-xs text-orange-800 dark:text-orange-200">
                      ⚠️ Critical: Less than 30 days until expiry. Consider priority sales or return to supplier.
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Disposal Modal */}
      <DisposalModal
        isOpen={showDisposalModal}
        onClose={() => {
          setShowDisposalModal(false);
          setSelectedBatch(null);
        }}
        batch={selectedBatch}
        onConfirm={handleDispose}
      />
    </div>
  );
}
