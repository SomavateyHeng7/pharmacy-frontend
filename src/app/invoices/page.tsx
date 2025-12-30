'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ReceiptIcon,
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DownloadIcon,
  MailIcon,
  DollarSignIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  CalendarIcon,
  UserIcon,
  PillIcon,
  FileTextIcon,
  ShieldCheckIcon,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react';

// Mock pharmacy invoice data
const mockInvoices = [
  {
    id: 'RX-2024-001',
    customerId: 1,
    prescriptionNumber: 'RX-789456123',
    dateIssued: '2024-11-01',
    dueDate: '2024-11-15',
    amount: 285.50,
    paidAmount: 0.00,
    status: 'Sent',
    type: 'Prescription',
    description: 'Prescription Medications',
    pharmacist: 'Alex Johnson',
    prescribingDoctor: 'Dr. Martinez',
    medications: [
      { 
        ndc: '00378-4325-93', 
        name: 'Lisinopril 10mg', 
        quantity: 30, 
        daysSupply: 30,
        unitPrice: 8.50,
        insuranceCovered: 6.50,
        copay: 2.00
      },
      { 
        ndc: '00093-7347-56', 
        name: 'Metformin 500mg', 
        quantity: 60, 
        daysSupply: 30,
        unitPrice: 12.00,
        insuranceCovered: 10.00,
        copay: 2.00
      },
      { 
        ndc: '00378-0615-05', 
        name: 'Atorvastatin 20mg', 
        quantity: 30, 
        daysSupply: 30,
        unitPrice: 15.00,
        insuranceCovered: 12.00,
        copay: 3.00
      }
    ],
    lastPaymentDate: null,
    insurance: 'Blue Cross Blue Shield',
    insuranceClaimId: 'CLM-2024-1156',
    insuranceClaimStatus: 'Pending',
    totalInsuranceCovered: 28.50,
    totalCopay: 7.00,
    counselingProvided: true
  },
  {
    id: 'RX-2024-002',
    customerId: 2,
    prescriptionNumber: 'RX-789456124',
    dateIssued: '2024-10-28',
    dueDate: '2024-11-12',
    amount: 45.99,
    paidAmount: 45.99,
    status: 'Paid',
    type: 'Prescription',
    description: 'Antibiotic Prescription',
    pharmacist: 'Michael Chen',
    prescribingDoctor: 'Dr. Smith',
    medications: [
      { 
        ndc: '00093-1074-01', 
        name: 'Amoxicillin 500mg', 
        quantity: 21, 
        daysSupply: 7,
        unitPrice: 15.99,
        insuranceCovered: 10.00,
        copay: 5.99
      }
    ],
    lastPaymentDate: '2024-10-28',
    insurance: 'Aetna',
    insuranceClaimId: 'CLM-2024-1157',
    insuranceClaimStatus: 'Approved',
    totalInsuranceCovered: 10.00,
    totalCopay: 5.99,
    counselingProvided: true
  },
  {
    id: 'OTC-2024-003',
    customerId: 3,
    prescriptionNumber: null,
    dateIssued: '2024-10-25',
    dueDate: '2024-10-25',
    amount: 67.50,
    paidAmount: 67.50,
    status: 'Paid',
    type: 'OTC',
    description: 'Over-the-Counter Products',
    pharmacist: 'Alex Johnson',
    prescribingDoctor: null,
    medications: [
      { 
        ndc: '00067-6426-24', 
        name: 'Tylenol Extra Strength 500mg', 
        quantity: 100, 
        daysSupply: null,
        unitPrice: 12.99,
        insuranceCovered: 0,
        copay: 12.99
      },
      { 
        ndc: '00363-0213-26', 
        name: 'Vitamin D3 2000 IU', 
        quantity: 120, 
        daysSupply: null,
        unitPrice: 18.99,
        insuranceCovered: 0,
        copay: 18.99
      },
      { 
        ndc: '00067-2091-30', 
        name: 'Claritin 10mg', 
        quantity: 30, 
        daysSupply: null,
        unitPrice: 24.99,
        insuranceCovered: 0,
        copay: 24.99
      }
    ],
    lastPaymentDate: '2024-10-25',
    insurance: 'None',
    insuranceClaimId: null,
    insuranceClaimStatus: 'N/A',
    totalInsuranceCovered: 0,
    totalCopay: 56.97,
    counselingProvided: false
  },
  {
    id: 'RX-2024-004',
    customerId: 1,
    prescriptionNumber: 'RX-789456120',
    dateIssued: '2024-09-20',
    dueDate: '2024-10-04',
    amount: 125.00,
    paidAmount: 25.00,
    status: 'Overdue',
    type: 'Prescription',
    description: 'Monthly Diabetes Supplies',
    pharmacist: 'Alex Johnson',
    prescribingDoctor: 'Dr. Martinez',
    medications: [
      { 
        ndc: '00169-3380-11', 
        name: 'Insulin Glargine 100U/mL', 
        quantity: 1, 
        daysSupply: 30,
        unitPrice: 120.00,
        insuranceCovered: 95.00,
        copay: 25.00
      }
    ],
    lastPaymentDate: '2024-09-25',
    insurance: 'Medicare Part D',
    insuranceClaimId: 'CLM-2024-1145',
    insuranceClaimStatus: 'Approved',
    totalInsuranceCovered: 95.00,
    totalCopay: 25.00,
    counselingProvided: true
  }
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  // Calculate statistics
  const stats = useMemo(() => {
    const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalPaid = mockInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const totalOutstanding = totalRevenue - totalPaid;
    const paidCount = mockInvoices.filter(inv => inv.status === 'Paid').length;
    const unpaidCount = mockInvoices.filter(inv => inv.status === 'Sent' || inv.status === 'Overdue').length;
    const overdueCount = mockInvoices.filter(inv => inv.status === 'Overdue').length;
    
    const paymentMethods = mockInvoices.reduce((acc, inv) => {
      // Use type as payment method proxy since mock data doesn't have paymentMethod field
      const method = inv.type || 'Other';
      if (inv.paidAmount > 0) {
        acc[method] = (acc[method] || 0) + inv.paidAmount;
      }
      return acc;
    }, {} as Record<string, number>);

    const topCustomers = Object.entries(
      mockInvoices.reduce((acc, inv) => {
        const name = `Customer ${inv.customerId}`;
        acc[name] = (acc[name] || 0) + inv.amount;
        return acc;
      }, {} as Record<string, number>)
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      totalRevenue,
      totalPaid,
      totalOutstanding,
      paidCount,
      unpaidCount,
      overdueCount,
      avgInvoiceValue: totalRevenue / mockInvoices.length,
      paymentMethods,
      topCustomers,
      collectionRate: (totalPaid / totalRevenue) * 100
    };
  }, []);
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.prescriptionNumber && invoice.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    
    const matchesType = typeFilter === 'all' || invoice.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'sent':
        return <ClockIcon className="h-5 w-5 text-blue-600" />;
      case 'partial':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-600" />;
      case 'overdue':
        return <AlertTriangleIcon className="h-5 w-5 text-red-600" />;
      case 'draft':
        return <PencilIcon className="h-5 w-5 text-gray-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate statistics
  const totalInvoices = mockInvoices.length;
  const totalAmount = mockInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = mockInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalOutstanding = totalAmount - totalPaid;
  const overdueCount = mockInvoices.filter(inv => inv.status === 'Overdue').length;
  const prescriptionCount = mockInvoices.filter(inv => inv.type === 'Prescription').length;
  const pendingClaimsCount = mockInvoices.filter(inv => inv.insuranceClaimStatus === 'Pending').length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Invoices</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage prescription and OTC invoices, insurance claims, and payments</p>
          </div>
          <div className="flex space-x-3">
            <Link 
              href="/invoices/recurring"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Recurring Rx</span>
            </Link>
            <Link 
              href="/invoices/new" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>New Invoice</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Avg: ${stats.avgInvoiceValue.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="h-10 w-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Collected</p>
                  <p className="text-2xl font-bold text-blue-600">${stats.totalPaid.toFixed(2)}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" />
                    {stats.collectionRate.toFixed(1)}% rate
                  </p>
                </div>
                <Wallet className="h-10 w-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding</p>
                  <p className="text-2xl font-bold text-orange-600">${stats.totalOutstanding.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stats.unpaidCount} invoices
                  </p>
                </div>
                <ClockIcon className="h-10 w-10 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{stats.overdueCount}</p>
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertTriangleIcon className="h-3 w-3" />
                    Requires action
                  </p>
                </div>
                <AlertTriangleIcon className="h-10 w-10 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by invoice ID, or prescription number..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="prescription">Prescription</option>
                <option value="otc">OTC</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="partial">Partial Payment</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Link href="/invoices/new" className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-center group">
          <PlusIcon className="h-7 w-7 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">New Invoice</p>
        </Link>
        <Link href="/invoices/templates" className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-center group">
          <FileTextIcon className="h-7 w-7 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Rx Templates</p>
        </Link>
        <button className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 text-center group">
          <PillIcon className="h-7 w-7 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Rx History</p>
        </button>
      </div>

      {/* Invoice Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Invoices</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{filteredInvoices.length} total</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Prescription</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Medications</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Insurance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{invoice.id}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{new Date(invoice.dateIssued).toLocaleDateString()}</div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${invoice.type === 'Prescription' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {invoice.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      {invoice.prescriptionNumber ? (
                        <>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{invoice.prescriptionNumber}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{invoice.prescribingDoctor}</div>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">No Rx Required</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {invoice.medications.slice(0, 2).map((med, idx) => (
                        <div key={idx} className="mb-1">
                          <div className="font-medium">{med.name}</div>
                          <div className="text-xs text-gray-500">Qty: {med.quantity} {med.daysSupply && <>• {med.daysSupply} days</>}</div>
                        </div>
                      ))}
                      {invoice.medications.length > 2 && (
                        <div className="text-xs text-blue-600">+{invoice.medications.length - 2} more</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</div>
                    {invoice.paidAmount > 0 && (
                      <div className="text-sm text-green-600">Paid: ${invoice.paidAmount.toFixed(2)}</div>
                    )}
                    {invoice.amount > invoice.paidAmount && (
                      <div className="text-sm text-red-600">Due: ${(invoice.amount - invoice.paidAmount).toFixed(2)}</div>
                    )}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Copay: ${invoice.totalCopay.toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{invoice.insurance}</div>
                      {invoice.insuranceClaimId && (
                        <>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{invoice.insuranceClaimId}</div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${invoice.insuranceClaimStatus === 'Approved' ? 'bg-green-100 text-green-800' : invoice.insuranceClaimStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                            {invoice.insuranceClaimStatus}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(invoice.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        href={`/invoices/${invoice.id}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <Link 
                        href={`/invoices/${invoice.id}/edit`}
                        className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors p-1 rounded hover:bg-green-50 dark:hover:bg-green-900/20"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button 
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors p-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                        title="Download PDF"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-orange-600 hover:text-orange-800 dark:text-orange-400 dark:hover:text-orange-300 transition-colors p-1 rounded hover:bg-orange-50 dark:hover:bg-orange-900/20"
                        title="Send Email"
                      >
                        <MailIcon className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}