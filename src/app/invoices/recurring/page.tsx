'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
  PauseIcon,
  PlayIcon,
  UserIcon,
  ClockIcon,
  DollarSignIcon,
  XIcon,
  CheckIcon,
  AlertTriangleIcon,
  TrendingUpIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

type FrequencyType = 'Daily' | 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'Yearly';

interface RecurringInvoice {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  medication: string;
  quantity: number;
  frequency: FrequencyType;
  amount: number;
  nextBillDate: string;
  endDate?: string;
  status: 'active' | 'paused' | 'ended';
  startDate: string;
  prescriptionNumber: string;
  notes?: string;
  autoGenerate: boolean;
  lastInvoiceDate?: string;
  totalInvoicesGenerated: number;
}

// Mock recurring invoices data with enhanced fields
const mockRecurringInvoices: RecurringInvoice[] = [
  {
    id: 'REC-001',
    customerId: 'CUST-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    medication: 'Lisinopril 10mg',
    quantity: 30,
    frequency: 'Monthly',
    amount: 25.00,
    nextBillDate: '2025-01-15',
    status: 'active',
    startDate: '2024-01-15',
    prescriptionNumber: 'RX-789456123',
    autoGenerate: true,
    totalInvoicesGenerated: 12,
    lastInvoiceDate: '2024-12-15',
    notes: 'Regular monthly refill'
  },
  {
    id: 'REC-002',
    customerId: 'CUST-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    medication: 'Metformin 500mg',
    quantity: 60,
    frequency: 'Monthly',
    amount: 18.50,
    nextBillDate: '2025-01-20',
    status: 'active',
    startDate: '2024-03-20',
    prescriptionNumber: 'RX-789456124',
    autoGenerate: true,
    totalInvoicesGenerated: 10,
    lastInvoiceDate: '2024-12-20'
  },
  {
    id: 'REC-003',
    customerId: 'CUST-003',
    customerName: 'Mike Davis',
    customerEmail: 'mike.d@email.com',
    medication: 'Atorvastatin 20mg',
    quantity: 30,
    frequency: 'Monthly',
    amount: 32.00,
    nextBillDate: '2025-01-10',
    status: 'paused',
    startDate: '2024-06-10',
    prescriptionNumber: 'RX-789456125',
    autoGenerate: true,
    totalInvoicesGenerated: 7,
    lastInvoiceDate: '2024-11-10',
    notes: 'Temporarily paused per customer request'
  },
  {
    id: 'REC-004',
    customerId: 'CUST-004',
    customerName: 'Emily Chen',
    customerEmail: 'emily.chen@email.com',
    medication: 'Omeprazole 20mg',
    quantity: 30,
    frequency: 'Bi-Weekly',
    amount: 15.00,
    nextBillDate: '2025-01-05',
    endDate: '2025-06-05',
    status: 'active',
    startDate: '2024-12-01',
    prescriptionNumber: 'RX-789456126',
    autoGenerate: true,
    totalInvoicesGenerated: 2,
    lastInvoiceDate: '2024-12-22',
    notes: '6-month prescription'
  },
  {
    id: 'REC-005',
    customerId: 'CUST-005',
    customerName: 'Robert Wilson',
    customerEmail: 'r.wilson@email.com',
    medication: 'Insulin Glargine 100 units/mL',
    quantity: 1,
    frequency: 'Quarterly',
    amount: 89.00,
    nextBillDate: '2025-03-01',
    status: 'active',
    startDate: '2024-03-01',
    prescriptionNumber: 'RX-789456127',
    autoGenerate: true,
    totalInvoicesGenerated: 4,
    lastInvoiceDate: '2024-12-01',
    notes: 'Refrigeration required'
  }
];

// Create/Edit Recurring Invoice Modal
function RecurringInvoiceModal({ isOpen, onClose, invoice, onSave }: {
  isOpen: boolean;
  onClose: () => void;
  invoice?: RecurringInvoice;
  onSave: (data: Partial<RecurringInvoice>) => void;
}) {
  const [formData, setFormData] = useState<Partial<RecurringInvoice>>({
    customerName: invoice?.customerName || '',
    customerEmail: invoice?.customerEmail || '',
    medication: invoice?.medication || '',
    quantity: invoice?.quantity || 1,
    frequency: invoice?.frequency || 'Monthly',
    amount: invoice?.amount || 0,
    nextBillDate: invoice?.nextBillDate || new Date().toISOString().split('T')[0],
    endDate: invoice?.endDate || '',
    prescriptionNumber: invoice?.prescriptionNumber || '',
    notes: invoice?.notes || '',
    autoGenerate: invoice?.autoGenerate ?? true,
    status: invoice?.status || 'active'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const frequencies: FrequencyType[] = ['Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 dark:bg-gray-800 border-b p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {invoice ? 'Edit' : 'Create'} Recurring Invoice
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <XIcon className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Customer Name *</Label>
              <Input
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <Label>Customer Email *</Label>
              <Input
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                placeholder="customer@email.com"
                required
              />
            </div>

            <div>
              <Label>Prescription Number *</Label>
              <Input
                value={formData.prescriptionNumber}
                onChange={(e) => setFormData({ ...formData, prescriptionNumber: e.target.value })}
                placeholder="RX-123456789"
                required
              />
            </div>

            <div>
              <Label>Medication *</Label>
              <Input
                value={formData.medication}
                onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                placeholder="Medication name and strength"
                required
              />
            </div>

            <div>
              <Label>Quantity *</Label>
              <Input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                min="1"
                required
              />
            </div>

            <div>
              <Label>Amount ($) *</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                min="0"
                required
              />
            </div>

            <div>
              <Label>Frequency *</Label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value as FrequencyType })}
                required
              >
                {frequencies.map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Next Bill Date *</Label>
              <Input
                type="date"
                value={formData.nextBillDate}
                onChange={(e) => setFormData({ ...formData, nextBillDate: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>End Date (Optional)</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
              <p className="text-xs text-muted-foreground mt-1">Leave blank for indefinite</p>
            </div>

            <div>
              <Label>Status</Label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'paused' | 'ended' })}
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="ended">Ended</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes or special instructions..."
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoGenerate"
              checked={formData.autoGenerate}
              onChange={(e) => setFormData({ ...formData, autoGenerate: e.target.checked })}
              className="h-4 w-4"
            />
            <Label htmlFor="autoGenerate" className="cursor-pointer">
              Automatically generate invoices on schedule
            </Label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <CheckIcon className="h-4 w-4 mr-2" />
              {invoice ? 'Update' : 'Create'} Schedule
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RecurringInvoicesPage() {
  const [recurringInvoices, setRecurringInvoices] = useState<RecurringInvoice[]>(mockRecurringInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'ended'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<RecurringInvoice | undefined>();
  const { toast } = useToast();

  const filteredInvoices = recurringInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const activeCount = recurringInvoices.filter(i => i.status === 'active').length;
  const pausedCount = recurringInvoices.filter(i => i.status === 'paused').length;
  const totalMonthlyRevenue = recurringInvoices
    .filter(i => i.status === 'active' && i.frequency === 'Monthly')
    .reduce((sum, i) => sum + i.amount, 0);

  // Calculate upcoming invoices (next 30 days)
  const upcomingInvoices = useMemo(() => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return recurringInvoices
      .filter(inv => inv.status === 'active' && new Date(inv.nextBillDate) <= thirtyDaysFromNow)
      .sort((a, b) => new Date(a.nextBillDate).getTime() - new Date(b.nextBillDate).getTime());
  }, [recurringInvoices]);

  const handleSaveRecurring = (data: Partial<RecurringInvoice>) => {
    if (editingInvoice) {
      // Update existing
      setRecurringInvoices(prev => prev.map(inv => 
        inv.id === editingInvoice.id ? { ...inv, ...data } : inv
      ));
      toast({
        variant: 'success',
        title: 'Schedule Updated',
        description: `Recurring invoice for ${data.customerName} has been updated.`
      });
    } else {
      // Create new
      const newInvoice: RecurringInvoice = {
        id: `REC-${String(recurringInvoices.length + 1).padStart(3, '0')}`,
        customerId: `CUST-${String(recurringInvoices.length + 1).padStart(3, '0')}`,
        startDate: new Date().toISOString().split('T')[0],
        totalInvoicesGenerated: 0,
        ...data
      } as RecurringInvoice;
      
      setRecurringInvoices(prev => [...prev, newInvoice]);
      toast({
        variant: 'success',
        title: 'Schedule Created',
        description: `Recurring invoice for ${data.customerName} has been created.`
      });
    }
    setEditingInvoice(undefined);
  };

  const handleToggleStatus = (invoice: RecurringInvoice) => {
    const newStatus = invoice.status === 'active' ? 'paused' : 'active';
    setRecurringInvoices(prev => prev.map(inv => 
      inv.id === invoice.id ? { ...inv, status: newStatus } : inv
    ));
    toast({
      variant: 'success',
      title: newStatus === 'active' ? 'Schedule Resumed' : 'Schedule Paused',
      description: `Recurring invoice for ${invoice.customerName} has been ${newStatus === 'active' ? 'resumed' : 'paused'}.`
    });
  };

  const handleDelete = (invoice: RecurringInvoice) => {
    if (confirm(`Are you sure you want to delete the recurring invoice for ${invoice.customerName}?`)) {
      setRecurringInvoices(prev => prev.filter(inv => inv.id !== invoice.id));
      toast({
        variant: 'success',
        title: 'Schedule Deleted',
        description: `Recurring invoice for ${invoice.customerName} has been deleted.`
      });
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link 
              href="/invoices" 
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Recurring Prescriptions</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage automatic billing for repeat prescriptions</p>
            </div>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700" 
            onClick={() => setShowCreateModal(true)}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            New Recurring Rx
          </Button>
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Recurring</p>
                <p className="text-2xl font-bold text-green-600">{activeCount}</p>
              </div>
              <PlayIcon className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paused</p>
                <p className="text-2xl font-bold text-orange-600">{pausedCount}</p>
              </div>
              <PauseIcon className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold text-blue-600">${totalMonthlyRevenue.toFixed(2)}</p>
              </div>
              <DollarSignIcon className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Due Soon (30d)</p>
                <p className="text-2xl font-bold text-purple-600">{upcomingInvoices.length}</p>
              </div>
              <TrendingUpIcon className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                placeholder="Search by customer, medication, or Rx number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
                className="transition-all"
              >
                All ({recurringInvoices.length})
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('active')}
                size="sm"
                className="transition-all"
              >
                Active ({activeCount})
              </Button>
              <Button
                variant={statusFilter === 'paused' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('paused')}
                size="sm"
                className="transition-all"
              >
                Paused ({pausedCount})
              </Button>
              <Button
                variant={statusFilter === 'ended' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('ended')}
                size="sm"
                className="transition-all"
              >
                Ended
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Invoices (Next 30 Days) */}
      {upcomingInvoices.length > 0 && (
        <Card className="mb-6 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangleIcon className="h-5 w-5 text-blue-600" />
              Upcoming Invoices (Next 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingInvoices.slice(0, 5).map((invoice) => {
                const daysUntil = Math.ceil((new Date(invoice.nextBillDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{invoice.customerName}</p>
                      <p className="text-sm text-muted-foreground">{invoice.medication}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">${invoice.amount.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        in ~{daysUntil} day{daysUntil !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
              {upcomingInvoices.length > 5 && (
                <p className="text-sm text-center text-muted-foreground pt-2">
                  +{upcomingInvoices.length - 5} more upcoming
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recurring Invoices List */}
      <div className="space-y-3">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id} className="hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-blue-500">
            <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{invoice.customerName}</h3>
                      <Badge variant={
                        invoice.status === 'active' ? 'default' : 
                        invoice.status === 'paused' ? 'secondary' : 
                        'outline'
                      }>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                      {invoice.endDate && (
                        <Badge variant="outline" className="text-xs">
                          Ends: {new Date(invoice.endDate).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 mr-2" />
                        <span>{invoice.medication} (×{invoice.quantity})</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span>{invoice.frequency}</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>Next: {new Date(invoice.nextBillDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSignIcon className="h-4 w-4 mr-2" />
                        <span className="font-semibold">${invoice.amount.toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Rx: {invoice.prescriptionNumber} • Started: {new Date(invoice.startDate).toLocaleDateString()} • 
                      Generated: {invoice.totalInvoicesGenerated} invoices
                    </p>
                    {invoice.notes && (
                      <p className="text-xs text-gray-600 mt-1 italic">Note: {invoice.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {invoice.status === 'active' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleToggleStatus(invoice)}
                        title="Pause"
                        className="hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                      >
                        <PauseIcon className="h-4 w-4" />
                      </Button>
                    ) : invoice.status === 'paused' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleToggleStatus(invoice)}
                        title="Resume"
                        className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                      >
                        <PlayIcon className="h-4 w-4" />
                      </Button>
                    ) : null}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setEditingInvoice(invoice);
                        setShowCreateModal(true);
                      }}
                      title="Edit"
                      className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      onClick={() => handleDelete(invoice)}
                      title="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        
        {filteredInvoices.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <CalendarIcon className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No recurring prescriptions found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Create a new recurring prescription to get started</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create/Edit Modal */}
      <RecurringInvoiceModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingInvoice(undefined);
        }}
        invoice={editingInvoice}
        onSave={handleSaveRecurring}
      />
    </div>
  );
}
