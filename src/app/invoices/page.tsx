'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  ShieldCheckIcon
} from 'lucide-react';

// Mock pharmacy invoice data
const mockInvoices = [
  {
    id: 'RX-2024-001',
    customerId: 1,
    customerName: 'John Smith',
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
    customerName: 'Sarah Johnson',
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
    customerName: 'Michael Brown',
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
    customerName: 'John Smith',
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

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ReceiptIcon className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pharmacy Invoices</h1>
              <p className="text-sm text-gray-600">Manage prescription and OTC invoices, insurance claims, and payments</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link 
              href="/invoices/recurring"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
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
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
              <p className="text-xs text-gray-500 mt-1">{prescriptionCount} Rx / {totalInvoices - prescriptionCount} OTC</p>
            </div>
            <ReceiptIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${totalAmount.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">Collected: ${totalPaid.toFixed(2)}</p>
            </div>
            <DollarSignIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Outstanding</p>
              <p className="text-2xl font-bold text-orange-600">${totalOutstanding.toFixed(2)}</p>
              <p className="text-xs text-red-500 mt-1">{overdueCount} Overdue</p>
            </div>
            <ClockIcon className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        {/* <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Insurance Claims</p>
              <p className="text-2xl font-bold text-purple-600">{pendingClaimsCount}</p>
              <p className="text-xs text-gray-500 mt-1">Pending Approval</p>
            </div>
            <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div> */}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, invoice ID, or prescription number..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="prescription">Prescription</option>
                <option value="otc">OTC</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link href="/invoices/new" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center group">
          <PlusIcon className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
          <p className="text-sm font-medium text-gray-900">New Invoice</p>
        </Link>
        <Link href="/invoices/templates" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center group">
          <FileTextIcon className="h-8 w-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
          <p className="text-sm font-medium text-gray-900">Rx Templates</p>
        </Link>
        {/* <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center group">
          <ShieldCheckIcon className="h-8 w-8 text-purple-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
          <p className="text-sm font-medium text-gray-900">Insurance Claims</p>
        </button> */}
        <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 text-center group">
          <PillIcon className="h-8 w-8 text-orange-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-200" />
          <p className="text-sm font-medium text-gray-900">Rx History</p>
        </button>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Invoice List</h3>
          <p className="text-sm text-gray-600">Showing {filteredInvoices.length} invoices</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prescription</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insurance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-gray-500">{new Date(invoice.dateIssued).toLocaleDateString()}</div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                        invoice.type === 'Prescription' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {invoice.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{invoice.customerName}</div>
                        <div className="text-sm text-gray-500">{invoice.pharmacist}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      {invoice.prescriptionNumber ? (
                        <>
                          <div className="text-sm font-medium text-gray-900">{invoice.prescriptionNumber}</div>
                          <div className="text-sm text-gray-500">{invoice.prescribingDoctor}</div>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">No Rx Required</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {invoice.medications.slice(0, 2).map((med, idx) => (
                        <div key={idx} className="mb-1">
                          <div className="font-medium">{med.name}</div>
                          <div className="text-xs text-gray-500">Qty: {med.quantity} {med.daysSupply && `• ${med.daysSupply} days`}</div>
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
                    <div className="text-xs text-gray-500 mt-1">Copay: ${invoice.totalCopay.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.insurance}</div>
                      {invoice.insuranceClaimId && (
                        <>
                          <div className="text-xs text-gray-500">{invoice.insuranceClaimId}</div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                            invoice.insuranceClaimStatus === 'Approved' ? 'bg-green-100 text-green-800' :
                            invoice.insuranceClaimStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link 
                        href={`/invoices/${invoice.id}`}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <Link 
                        href={`/invoices/${invoice.id}/edit`}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button 
                        className="text-purple-600 hover:text-purple-900"
                        title="Download PDF"
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-orange-600 hover:text-orange-900"
                        title="Send Email"
                      >
                        <MailIcon className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
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