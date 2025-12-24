'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  FileText,
  Truck,
  Calendar,
  Search,
  Plus,
  Edit,
  Eye,
  Download,
  Filter,
  RefreshCw,
  BarChart3,
  Users,
  User,
  CreditCard,
  Building2,
  Phone,
  Mail,
  MapPin,
  Star,
  PlayCircle,
  PauseCircle,
  XCircle,
  Save,
  Send,
  ArrowRight,
  ArrowLeft,
  Calculator,
  PieChart,
  TrendingDown,
  Activity,
  Archive,
  Copy,
  MoreHorizontal,
  Zap,
  Bell,
  Target,
  Settings
} from 'lucide-react';
import Sidebar from '@/components/layout/sidebar';

// Mock data for suppliers with enhanced integration
const suppliersData = [
  {
    id: 'SUP001',
    name: 'MediCore Pharmaceuticals',
    email: 'orders@medicore.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Plaza, Healthcare City, HC 12345',
    category: 'Pharmaceuticals',
    status: 'Active',
    rating: 4.8,
    paymentTerms: '30 days',
    creditLimit: 50000.00,
    currentBalance: 12500.00,
    minimumOrderAmount: 500.00,
    shippingCost: 50.00,
    freeShippingThreshold: 1000.00,
    leadTime: '3-5 business days',
    orderCutoffTime: '14:00',
    preferredProducts: ['PROD001', 'PROD002', 'PROD006'],
    contractPricing: true,
    bulkDiscounts: [
      { minQuantity: 100, discount: 5 },
      { minQuantity: 500, discount: 10 },
      { minQuantity: 1000, discount: 15 }
    ],
    specialInstructions: 'Require temperature-controlled shipping for refrigerated items. Delivery to loading dock only.',
    accountManager: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@medicore.com'
    },
    orderingRestrictions: [],
    certifications: ['FDA', 'ISO 9001', 'Good Manufacturing Practice'],
    returnPolicy: '30 days with original packaging',
    warrantyCoverage: '1 year manufacturer warranty'
  },
  {
    id: 'SUP002',
    name: 'Global Health Supplies',
    email: 'orders@globalhealthsupplies.com',
    phone: '+1 (555) 987-6543',
    address: '456 Supply Chain Blvd, Distribution Hub, DH 67890',
    category: 'Medical Supplies',
    status: 'Active',
    rating: 4.3,
    paymentTerms: '15 days',
    creditLimit: 30000.00,
    currentBalance: 8500.00,
    minimumOrderAmount: 250.00,
    shippingCost: 25.00,
    freeShippingThreshold: 500.00,
    leadTime: '2-4 business days',
    orderCutoffTime: '16:00',
    preferredProducts: ['PROD003', 'PROD004', 'PROD007'],
    contractPricing: true,
    bulkDiscounts: [
      { minQuantity: 200, discount: 8 },
      { minQuantity: 1000, discount: 12 }
    ],
    specialInstructions: 'Standard delivery acceptable. Prefer morning deliveries between 8-11 AM.',
    accountManager: {
      name: 'Robert Martinez',
      phone: '+1 (555) 987-6543',
      email: 'r.martinez@globalhealthsupplies.com'
    },
    orderingRestrictions: ['No weekend deliveries'],
    certifications: ['ISO 13485', 'CE Marking'],
    returnPolicy: '14 days unopened items only',
    warrantyCoverage: 'Varies by product'
  },
  {
    id: 'SUP003',
    name: 'BioChem Solutions',
    email: 'orders@biochemsolutions.com',
    phone: '+1 (555) 456-7890',
    address: '789 Research Park Dr, Innovation Center, IC 54321',
    category: 'Laboratory Supplies',
    status: 'Active',
    rating: 4.1,
    paymentTerms: '45 days',
    creditLimit: 25000.00,
    currentBalance: 5200.00,
    minimumOrderAmount: 300.00,
    shippingCost: 75.00,
    freeShippingThreshold: 750.00,
    leadTime: '5-7 business days',
    orderCutoffTime: '12:00',
    preferredProducts: ['PROD005', 'PROD008'],
    contractPricing: false,
    bulkDiscounts: [
      { minQuantity: 50, discount: 3 },
      { minQuantity: 200, discount: 7 }
    ],
    specialInstructions: 'Handle with care. Fragile laboratory equipment requires special packaging.',
    accountManager: {
      name: 'Dr. Amanda Foster',
      phone: '+1 (555) 456-7890',
      email: 'a.foster@biochemsolutions.com'
    },
    orderingRestrictions: ['Requires 48-hour advance notice', 'No rush orders'],
    certifications: ['ISO 17025', 'Laboratory Accreditation'],
    returnPolicy: '7 days for defective items only',
    warrantyCoverage: '2 years on equipment, 30 days on consumables'
  }
];

// Mock data for products/inventory with enhanced supplier integration
const productsData = [
  {
    id: 'PROD001',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    category: 'Pain Relief',
    subcategory: 'Analgesics',
    manufacturer: 'PharmaCorp',
    ndc: '12345-678-90',
    barcode: '1234567890123',
    currentStock: 85,
    minStock: 100,
    maxStock: 1000,
    reorderPoint: 120,
    unitOfMeasure: 'tablets',
    packageSize: '100 tablets/bottle',
    storageRequirements: 'Store at room temperature',
    expirationTracking: true,
    controlledSubstance: false,
    lastOrderDate: '2024-11-10',
    avgMonthlyUsage: 150,
    seasonalDemand: false,
    supplierPricing: [
      {
        supplierId: 'SUP001',
        supplierName: 'MediCore Pharmaceuticals',
        contractPrice: 8.50,
        listPrice: 9.25,
        contractExpiry: '2025-12-31',
        minimumOrderQty: 50,
        leadTime: '3-5 days',
        availability: 'In Stock',
        lastUpdated: '2024-11-15',
        priceBreaks: [
          { minQty: 100, price: 8.25 },
          { minQty: 500, price: 7.95 },
          { minQty: 1000, price: 7.65 }
        ]
      },
      {
        supplierId: 'SUP002',
        supplierName: 'Global Health Supplies',
        contractPrice: 8.75,
        listPrice: 9.50,
        contractExpiry: '2025-06-30',
        minimumOrderQty: 100,
        leadTime: '5-7 days',
        availability: 'Limited Stock',
        lastUpdated: '2024-11-12',
        priceBreaks: [
          { minQty: 200, price: 8.50 },
          { minQty: 500, price: 8.25 }
        ]
      }
    ],
    preferredSupplier: 'SUP001',
    alternativeSuppliers: ['SUP002'],
    qualityRating: 4.8,
    complianceNotes: 'FDA approved, meets USP standards',
    specialHandling: false
  },
  {
    id: 'PROD002',
    name: 'Ibuprofen 400mg',
    genericName: 'Ibuprofen',
    category: 'Pain Relief',
    subcategory: 'NSAIDs',
    manufacturer: 'MediTech Labs',
    ndc: '23456-789-01',
    barcode: '2345678901234',
    currentStock: 120,
    minStock: 80,
    maxStock: 800,
    reorderPoint: 100,
    unitOfMeasure: 'tablets',
    packageSize: '100 tablets/bottle',
    storageRequirements: 'Store in dry place, room temperature',
    expirationTracking: true,
    controlledSubstance: false,
    lastOrderDate: '2024-11-08',
    avgMonthlyUsage: 100,
    seasonalDemand: false,
    supplierPricing: [
      {
        supplierId: 'SUP001',
        supplierName: 'MediCore Pharmaceuticals',
        contractPrice: 7.15,
        listPrice: 7.95,
        contractExpiry: '2025-12-31',
        minimumOrderQty: 50,
        leadTime: '3-5 days',
        availability: 'In Stock',
        lastUpdated: '2024-11-15',
        priceBreaks: [
          { minQty: 100, price: 6.95 },
          { minQty: 500, price: 6.75 }
        ]
      }
    ],
    preferredSupplier: 'SUP001',
    alternativeSuppliers: [],
    qualityRating: 4.6,
    complianceNotes: 'FDA approved',
    specialHandling: false
  },
  {
    id: 'PROD003',
    name: 'Surgical Gloves',
    genericName: 'Nitrile Examination Gloves',
    category: 'Medical Supplies',
    subcategory: 'Personal Protective Equipment',
    manufacturer: 'SafeHands Medical',
    ndc: null,
    barcode: '3456789012345',
    currentStock: 180,
    minStock: 200,
    maxStock: 2000,
    reorderPoint: 250,
    unitOfMeasure: 'pairs',
    packageSize: '100 pairs/box',
    storageRequirements: 'Store in cool, dry place',
    expirationTracking: false,
    controlledSubstance: false,
    lastOrderDate: '2024-11-05',
    avgMonthlyUsage: 500,
    seasonalDemand: true,
    supplierPricing: [
      {
        supplierId: 'SUP002',
        supplierName: 'Global Health Supplies',
        contractPrice: 2.50,
        listPrice: 2.85,
        contractExpiry: '2025-08-31',
        minimumOrderQty: 200,
        leadTime: '2-4 days',
        availability: 'In Stock',
        lastUpdated: '2024-11-16',
        priceBreaks: [
          { minQty: 500, price: 2.35 },
          { minQty: 1000, price: 2.20 },
          { minQty: 2000, price: 2.05 }
        ]
      },
      {
        supplierId: 'SUP001',
        supplierName: 'MediCore Pharmaceuticals',
        contractPrice: 2.65,
        listPrice: 2.95,
        contractExpiry: '2025-03-31',
        minimumOrderQty: 100,
        leadTime: '4-6 days',
        availability: 'In Stock',
        lastUpdated: '2024-11-10',
        priceBreaks: [
          { minQty: 500, price: 2.50 }
        ]
      }
    ],
    preferredSupplier: 'SUP002',
    alternativeSuppliers: ['SUP001'],
    qualityRating: 4.7,
    complianceNotes: 'FDA 510(k) cleared, powder-free',
    specialHandling: false
  },
  {
    id: 'PROD004',
    name: 'Bandages',
    genericName: 'Adhesive Bandages',
    category: 'Medical Supplies',
    subcategory: 'Wound Care',
    manufacturer: 'WoundCare Plus',
    ndc: null,
    barcode: '4567890123456',
    currentStock: 95,
    minStock: 150,
    maxStock: 1000,
    reorderPoint: 175,
    unitOfMeasure: 'pieces',
    packageSize: '100 pieces/box',
    storageRequirements: 'Store at room temperature',
    expirationTracking: true,
    controlledSubstance: false,
    lastOrderDate: '2024-11-12',
    avgMonthlyUsage: 200,
    seasonalDemand: false,
    supplierPricing: [
      {
        supplierId: 'SUP002',
        supplierName: 'Global Health Supplies',
        contractPrice: 7.41,
        listPrice: 8.15,
        contractExpiry: '2025-08-31',
        minimumOrderQty: 50,
        leadTime: '2-4 days',
        availability: 'In Stock',
        lastUpdated: '2024-11-16',
        priceBreaks: [
          { minQty: 200, price: 7.15 },
          { minQty: 500, price: 6.95 }
        ]
      }
    ],
    preferredSupplier: 'SUP002',
    alternativeSuppliers: [],
    qualityRating: 4.4,
    complianceNotes: 'Latex-free, hypoallergenic',
    specialHandling: false
  },
  {
    id: 'PROD005',
    name: 'Test Tubes',
    genericName: 'Laboratory Test Tubes',
    category: 'Laboratory',
    subcategory: 'Laboratory Equipment',
    manufacturer: 'LabTech Solutions',
    ndc: null,
    barcode: '5678901234567',
    currentStock: 320,
    minStock: 100,
    maxStock: 500,
    reorderPoint: 125,
    unitOfMeasure: 'pieces',
    packageSize: '100 pieces/case',
    storageRequirements: 'Handle with care, store upright',
    expirationTracking: false,
    controlledSubstance: false,
    lastOrderDate: '2024-11-01',
    avgMonthlyUsage: 80,
    seasonalDemand: false,
    supplierPricing: [
      {
        supplierId: 'SUP003',
        supplierName: 'BioChem Solutions',
        contractPrice: 9.63,
        listPrice: 10.50,
        contractExpiry: '2025-04-30',
        minimumOrderQty: 25,
        leadTime: '5-7 days',
        availability: 'In Stock',
        lastUpdated: '2024-11-08',
        priceBreaks: [
          { minQty: 100, price: 9.25 },
          { minQty: 250, price: 8.95 }
        ]
      }
    ],
    preferredSupplier: 'SUP003',
    alternativeSuppliers: [],
    qualityRating: 4.2,
    complianceNotes: 'Borosilicate glass, autoclavable',
    specialHandling: true
  }
];

// Enhanced tracking and delivery data
const deliveryProviders = [
  { id: 'fedex', name: 'FedEx', apiEndpoint: 'https://api.fedex.com/track', trackingUrlTemplate: 'https://www.fedex.com/apps/fedextrack/?tracknumber=' },
  { id: 'ups', name: 'UPS', apiEndpoint: 'https://api.ups.com/track', trackingUrlTemplate: 'https://wwwapps.ups.com/tracking/tracking.cgi?tracknum=' },
  { id: 'dhl', name: 'DHL', apiEndpoint: 'https://api.dhl.com/track', trackingUrlTemplate: 'https://www.dhl.com/track?trackingNumber=' },
  { id: 'usps', name: 'USPS', apiEndpoint: 'https://api.usps.com/track', trackingUrlTemplate: 'https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=' }
];

const statusPipeline = [
  { 
    id: 'pending_approval', 
    name: 'Pending Approval', 
    description: 'Order submitted and awaiting approval', 
    color: 'orange',
    icon: 'Clock',
    nextStates: ['approved', 'rejected']
  },
  { 
    id: 'approved', 
    name: 'Approved', 
    description: 'Order approved and being prepared', 
    color: 'blue',
    icon: 'CheckCircle',
    nextStates: ['in_transit', 'cancelled']
  },
  { 
    id: 'in_transit', 
    name: 'In Transit', 
    description: 'Order shipped and on the way', 
    color: 'purple',
    icon: 'Truck',
    nextStates: ['delivered', 'delayed']
  },
  { 
    id: 'delivered', 
    name: 'Delivered', 
    description: 'Order successfully delivered', 
    color: 'green',
    icon: 'Package',
    nextStates: []
  },
  { 
    id: 'delayed', 
    name: 'Delayed', 
    description: 'Delivery delayed beyond expected date', 
    color: 'red',
    icon: 'AlertTriangle',
    nextStates: ['delivered', 'cancelled']
  },
  { 
    id: 'cancelled', 
    name: 'Cancelled', 
    description: 'Order cancelled', 
    color: 'gray',
    icon: 'XCircle',
    nextStates: []
  },
  { 
    id: 'rejected', 
    name: 'Rejected', 
    description: 'Order rejected during approval', 
    color: 'red',
    icon: 'XCircle',
    nextStates: []
  }
];

// Enhanced delivery performance data
const deliveryMetrics = {
  onTimeDeliveryRate: 92.5,
  averageDeliveryTime: 4.2,
  orderAccuracyRate: 98.1,
  customerSatisfactionScore: 4.6,
  lastUpdated: '2024-11-18 10:30:00',
  monthlyTrends: [
    { month: 'Jul', onTime: 89, avgDays: 4.8, accuracy: 97.2 },
    { month: 'Aug', onTime: 91, avgDays: 4.5, accuracy: 97.8 },
    { month: 'Sep', onTime: 93, avgDays: 4.3, accuracy: 98.1 },
    { month: 'Oct', onTime: 94, avgDays: 4.1, accuracy: 98.5 },
    { month: 'Nov', onTime: 92.5, avgDays: 4.2, accuracy: 98.1 }
  ],
  supplierPerformance: [
    { 
      supplierId: 'SUP001', 
      name: 'MediCore Pharmaceuticals', 
      onTimeRate: 95.2, 
      avgDeliveryDays: 3.8, 
      totalOrders: 45,
      delayedOrders: 2,
      rating: 4.8
    },
    { 
      supplierId: 'SUP002', 
      name: 'Global Health Supplies', 
      onTimeRate: 88.5, 
      avgDeliveryDays: 4.6, 
      totalOrders: 32,
      delayedOrders: 4,
      rating: 4.3
    },
    { 
      supplierId: 'SUP003', 
      name: 'BioChem Solutions', 
      onTimeRate: 82.1, 
      avgDeliveryDays: 5.1, 
      totalOrders: 18,
      delayedOrders: 3,
      rating: 4.1
    }
  ],
  deliveryIssues: [
    {
      id: 'ISS001',
      orderId: 'PO-2024-008',
      issue: 'Weather Delay',
      description: 'Shipment delayed due to severe weather conditions',
      expectedResolution: '2024-11-19',
      status: 'In Progress',
      impact: 'Medium'
    },
    {
      id: 'ISS002', 
      orderId: 'PO-2024-009',
      issue: 'Address Incorrect',
      description: 'Delivery attempted but address verification failed',
      expectedResolution: '2024-11-18',
      status: 'Resolved',
      impact: 'Low'
    }
  ]
};

// Enhanced tracking status updates
const trackingUpdates = [
  {
    id: 'TU001',
    orderId: 'PO-2024-001',
    timestamp: '2024-11-18 08:30:00',
    status: 'Out for Delivery',
    location: 'Local Facility - Downtown',
    description: 'Package is on delivery vehicle and will be delivered today',
    provider: 'FedEx',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'TU002',
    orderId: 'PO-2024-003', 
    timestamp: '2024-11-17 16:45:00',
    status: 'In Transit',
    location: 'Sort Facility - Regional Hub',
    description: 'Package has departed from regional sorting facility',
    provider: 'UPS',
    trackingNumber: 'TRK456789123'
  },
  {
    id: 'TU003',
    orderId: 'PO-2024-005',
    timestamp: '2024-11-16 14:20:00',
    status: 'Picked Up',
    location: 'Origin Facility',
    description: 'Package picked up from supplier and in transit',
    provider: 'DHL',
    trackingNumber: 'TRK789123456'
  }
];

// Mock data for approval workflow
const approvalRules = {
  autoApproval: { threshold: 1000, description: 'Automatic approval for orders under $1,000' },
  managerApproval: { threshold: 5000, description: 'Manager approval required for orders $1,000 - $5,000', roles: ['Pharmacy Manager', 'Operations Manager'] },
  executiveApproval: { threshold: Infinity, description: 'Executive approval required for orders above $5,000', roles: ['Director', 'CEO', 'CFO'] }
};

const approvers = [
  { id: 'APP001', name: 'Dr. Sarah Wilson', role: 'Pharmacy Manager', email: 'sarah.wilson@pharmacy.com', status: 'Active' },
  { id: 'APP002', name: 'John Matthews', role: 'Operations Manager', email: 'john.matthews@pharmacy.com', status: 'Active' },
  { id: 'APP003', name: 'Lisa Chang', role: 'Director', email: 'lisa.chang@pharmacy.com', status: 'Active' },
  { id: 'APP004', name: 'Michael Roberts', role: 'CFO', email: 'michael.roberts@pharmacy.com', status: 'Active' },
  { id: 'APP005', name: 'David Kim', role: 'CEO', email: 'david.kim@pharmacy.com', status: 'Active' }
];

// Mock data for purchase orders
const purchaseOrdersData = [
  {
    id: 'PO-2024-001',
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    orderDate: '2024-11-15',
    expectedDelivery: '2024-11-20',
    actualDelivery: null,
    status: 'Approved',
    priority: 'High',
    approvalStatus: 'Approved',
    approvedBy: 'Dr. Sarah Wilson',
    approvalDate: '2024-11-15',
    approvalLevel: 'Executive',
    requiredApprovals: 2,
    completedApprovals: 2,
    totalAmount: 8945.50,
    taxAmount: 894.55,
    grandTotal: 9840.05,
    approvalHistory: [
      {
        id: 'AH001',
        approverId: 'APP001',
        approverName: 'Dr. Sarah Wilson',
        approverRole: 'Pharmacy Manager',
        action: 'Approved',
        timestamp: '2024-11-15 09:30:00',
        comments: 'Urgent medical supplies needed. Approved for immediate processing.',
        level: 'Manager'
      },
      {
        id: 'AH002',
        approverId: 'APP003',
        approverName: 'Lisa Chang',
        approverRole: 'Director',
        action: 'Approved',
        timestamp: '2024-11-15 10:15:00',
        comments: 'High value order approved due to urgent patient needs.',
        level: 'Executive'
      }
    ],
    rejectionReason: null,
    paymentStatus: 'Pending',
    paymentTerms: '30 days',
    shippingCost: 150.00,
    discountAmount: 250.00,
    deliveryProvider: 'FedEx',
    estimatedDeliveryTime: '3-5 business days',
    actualDeliveryDays: null,
    deliveryStatus: 'On Schedule',
    lastTrackingUpdate: '2024-11-18 08:30:00',
    deliveryAttempts: 0,
    signatureRequired: true,
    specialInstructions: 'Deliver to pharmacy receiving dock',
    items: [
      { productId: 'PROD001', productName: 'Paracetamol 500mg', quantity: 500, unitPrice: 8.50, total: 4250.00, urgency: 'High' },
      { productId: 'PROD002', productName: 'Ibuprofen 400mg', quantity: 300, unitPrice: 7.15, total: 2145.00, urgency: 'Medium' },
      { productId: 'PROD004', productName: 'Bandages', quantity: 350, unitPrice: 7.41, total: 2593.50, urgency: 'High' }
    ],
    notes: 'Urgent order for low stock items. Please expedite delivery.',
    createdBy: 'John Pharmacist',
    createdDate: '2024-11-14',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'PO-2024-002',
    supplierId: 'SUP002',
    supplierName: 'Global Health Supplies',
    orderDate: '2024-11-12',
    expectedDelivery: '2024-11-18',
    actualDelivery: '2024-11-16',
    status: 'Delivered',
    priority: 'Medium',
    approvalStatus: 'Approved',
    approvedBy: 'John Matthews',
    approvalDate: '2024-11-12',
    approvalLevel: 'Manager',
    requiredApprovals: 1,
    completedApprovals: 1,
    totalAmount: 5750.00,
    taxAmount: 575.00,
    grandTotal: 6325.00,
    approvalHistory: [
      {
        id: 'AH003',
        approverId: 'APP002',
        approverName: 'John Matthews',
        approverRole: 'Operations Manager',
        action: 'Approved',
        timestamp: '2024-11-12 14:20:00',
        comments: 'Regular monthly supply order. Approved.',
        level: 'Manager'
      }
    ],
    rejectionReason: null,
    paymentStatus: 'Paid',
    paymentTerms: '15 days',
    shippingCost: 100.00,
    discountAmount: 0.00,
    deliveryProvider: 'UPS',
    estimatedDeliveryTime: '2-4 business days',
    actualDeliveryDays: 4,
    deliveryStatus: 'Delivered On Time',
    lastTrackingUpdate: '2024-11-16 10:15:00',
    deliveryAttempts: 1,
    signatureRequired: false,
    specialInstructions: 'Standard delivery',
    items: [
      { productId: 'PROD003', productName: 'Surgical Gloves', quantity: 1000, unitPrice: 2.50, total: 2500.00, urgency: 'Medium' },
      { productId: 'PROD004', productName: 'Bandages', quantity: 200, unitPrice: 7.41, total: 1482.00, urgency: 'Low' }
    ],
    notes: 'Regular monthly order for medical supplies.',
    createdBy: 'Jane Manager',
    createdDate: '2024-11-10',
    trackingNumber: 'TRK987654321',
    invoiceNumber: 'INV-2024-045'
  },
  {
    id: 'PO-2024-003',
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    orderDate: '2024-11-10',
    expectedDelivery: '2024-11-16',
    actualDelivery: null,
    status: 'In Transit',
    priority: 'Medium',
    approvalStatus: 'Approved',
    approvedBy: 'Dr. Sarah Wilson',
    approvalDate: '2024-11-10',
    totalAmount: 3580.50,
    taxAmount: 358.05,
    grandTotal: 3938.55,
    paymentStatus: 'Pending',
    paymentTerms: '30 days',
    shippingCost: 75.00,
    discountAmount: 100.00,
    items: [
      { productId: 'PROD002', productName: 'Ibuprofen 400mg', quantity: 500, unitPrice: 7.15, total: 3575.00, urgency: 'Medium' }
    ],
    notes: 'Restock order based on sales forecast.',
    createdBy: 'Mike Assistant',
    createdDate: '2024-11-08',
    trackingNumber: 'TRK456789123'
  },
  {
    id: 'PO-2024-004',
    supplierId: 'SUP003',
    supplierName: 'BioChem Solutions',
    orderDate: '2024-11-08',
    expectedDelivery: '2024-11-14',
    actualDelivery: null,
    status: 'Pending Approval',
    priority: 'Low',
    approvalStatus: 'Pending',
    approvedBy: null,
    approvalDate: null,
    approvalLevel: 'Manager',
    requiredApprovals: 1,
    completedApprovals: 0,
    totalAmount: 2408.25,
    taxAmount: 240.83,
    grandTotal: 2649.08,
    paymentStatus: 'Not Applicable',
    paymentTerms: '45 days',
    shippingCost: 50.00,
    discountAmount: 0.00,
    items: [
      { productId: 'PROD005', productName: 'Test Tubes', quantity: 250, unitPrice: 9.63, total: 2407.50, urgency: 'Low' }
    ],
    notes: 'Laboratory supplies for routine testing.',
    createdBy: 'Lab Manager',
    createdDate: '2024-11-07',
    trackingNumber: null,
    approvalHistory: [],
    rejectionReason: null
  },
  {
    id: 'PO-2024-005',
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    orderDate: '2024-11-16',
    expectedDelivery: '2024-11-22',
    actualDelivery: null,
    status: 'Pending Approval',
    priority: 'High',
    approvalStatus: 'Pending',
    approvedBy: null,
    approvalDate: null,
    approvalLevel: 'Executive',
    requiredApprovals: 2,
    completedApprovals: 1,
    totalAmount: 12500.00,
    taxAmount: 1250.00,
    grandTotal: 13750.00,
    paymentStatus: 'Not Applicable',
    paymentTerms: '30 days',
    shippingCost: 200.00,
    discountAmount: 500.00,
    items: [
      { productId: 'PROD001', productName: 'Paracetamol 500mg', quantity: 1000, unitPrice: 8.50, total: 8500.00, urgency: 'High' },
      { productId: 'PROD002', productName: 'Ibuprofen 400mg', quantity: 600, unitPrice: 7.15, total: 4290.00, urgency: 'High' }
    ],
    notes: 'Large order for seasonal demand increase. Requires executive approval.',
    createdBy: 'Senior Pharmacist',
    createdDate: '2024-11-16',
    trackingNumber: null,
    approvalHistory: [
      {
        id: 'AH004',
        approverId: 'APP001',
        approverName: 'Dr. Sarah Wilson',
        approverRole: 'Pharmacy Manager',
        action: 'Approved',
        timestamp: '2024-11-16 11:45:00',
        comments: 'First level approval granted. Awaiting executive approval.',
        level: 'Manager'
      }
    ],
    rejectionReason: null
  },
  {
    id: 'PO-2024-006',
    supplierId: 'SUP002',
    supplierName: 'Global Health Supplies',
    orderDate: '2024-11-14',
    expectedDelivery: '2024-11-20',
    actualDelivery: null,
    status: 'Rejected',
    priority: 'Medium',
    approvalStatus: 'Rejected',
    approvedBy: null,
    approvalDate: null,
    approvalLevel: 'Manager',
    requiredApprovals: 1,
    completedApprovals: 0,
    totalAmount: 3200.00,
    taxAmount: 320.00,
    grandTotal: 3520.00,
    paymentStatus: 'Not Applicable',
    paymentTerms: '15 days',
    shippingCost: 75.00,
    discountAmount: 0.00,
    items: [
      { productId: 'PROD003', productName: 'Surgical Gloves', quantity: 800, unitPrice: 2.50, total: 2000.00, urgency: 'Medium' },
      { productId: 'PROD004', productName: 'Bandages', quantity: 150, unitPrice: 7.41, total: 1111.50, urgency: 'Low' }
    ],
    notes: 'Additional supplies for emergency preparedness.',
    createdBy: 'Assistant Manager',
    createdDate: '2024-11-13',
    trackingNumber: null,
    approvalHistory: [
      {
        id: 'AH005',
        approverId: 'APP002',
        approverName: 'John Matthews',
        approverRole: 'Operations Manager',
        action: 'Rejected',
        timestamp: '2024-11-14 16:30:00',
        comments: 'Current inventory levels are sufficient. Order rejected to avoid overstocking.',
        level: 'Manager'
      }
    ],
    rejectionReason: 'Sufficient inventory levels - overstocking concern'
  },
  {
    id: 'PO-2024-007',
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    orderDate: '2024-11-17',
    expectedDelivery: '2024-11-19',
    actualDelivery: null,
    status: 'Auto-Approved',
    priority: 'Medium',
    approvalStatus: 'Auto-Approved',
    approvedBy: 'System',
    approvalDate: '2024-11-17',
    approvalLevel: 'Auto',
    requiredApprovals: 0,
    completedApprovals: 1,
    totalAmount: 750.00,
    taxAmount: 75.00,
    grandTotal: 825.00,
    paymentStatus: 'Pending',
    paymentTerms: '30 days',
    shippingCost: 25.00,
    discountAmount: 0.00,
    items: [
      { productId: 'PROD001', productName: 'Paracetamol 500mg', quantity: 100, unitPrice: 8.50, total: 850.00, urgency: 'Medium' }
    ],
    notes: 'Small restock order - auto-approved due to low value.',
    createdBy: 'Pharmacist',
    createdDate: '2024-11-17',
    trackingNumber: 'TRK789123456',
    approvalHistory: [
      {
        id: 'AH006',
        approverId: 'SYSTEM',
        approverName: 'Auto-Approval System',
        approverRole: 'System',
        action: 'Auto-Approved',
        timestamp: '2024-11-17 08:00:00',
        comments: 'Order automatically approved - under $1,000 threshold.',
        level: 'Auto'
      }
    ],
    rejectionReason: null
  }
];

// Budget and cost analysis data
const budgetData = {
  monthlyBudget: 25000.00,
  currentMonthSpent: 18475.50,
  lastMonthSpent: 22150.75,
  yearlyBudget: 300000.00,
  yearToDateSpent: 245680.25,
  pendingOrders: 15384.18,
  categoryBreakdown: [
    { category: 'Pharmaceuticals', spent: 8950.00, budget: 12000.00, percentage: 74.6 },
    { category: 'Medical Supplies', spent: 6750.50, budget: 8000.00, percentage: 84.4 },
    { category: 'Laboratory', spent: 2775.00, budget: 5000.00, percentage: 55.5 }
  ],
  monthlyTrends: [
    { month: 'Jul', amount: 19500 },
    { month: 'Aug', amount: 21200 },
    { month: 'Sep', amount: 18750 },
    { month: 'Oct', amount: 22150 },
    { month: 'Nov', amount: 18475 }
  ]
};

// Order Tracking Components
function OrderStatusPipeline({ currentStatus, orderId }: { currentStatus: string; orderId: string }) {
  const currentIndex = statusPipeline.findIndex(status => status.name === currentStatus);

  return (
    <div className="flex items-center space-x-2 overflow-x-auto py-4">
      {statusPipeline.slice(0, 5).map((status, index) => {
        const isActive = index <= currentIndex;
        const isCurrent = status.name === currentStatus;
        
        return (
          <div key={status.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              isActive 
                ? isCurrent 
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-green-600 border-green-600 text-white'
                : 'bg-gray-200 border-gray-300 text-gray-500'
            }`}>
              {status.icon === 'Clock' && <Clock className="h-5 w-5" />}
              {status.icon === 'CheckCircle' && <CheckCircle className="h-5 w-5" />}
              {status.icon === 'Truck' && <Truck className="h-5 w-5" />}
              {status.icon === 'Package' && <Package className="h-5 w-5" />}
              {status.icon === 'AlertTriangle' && <AlertTriangle className="h-5 w-5" />}
              {status.icon === 'XCircle' && <XCircle className="h-5 w-5" />}
            </div>
            <div className="ml-2 min-w-0">
              <p className={`text-sm font-medium ${
                isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500'
              }`}>
                {status.name}
              </p>
              <p className="text-xs text-gray-500 max-w-24 truncate">
                {status.description}
              </p>
            </div>
            {index < statusPipeline.length - 2 && (
              <ArrowRight className={`h-4 w-4 mx-2 ${
                isActive ? 'text-green-600' : 'text-gray-300'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function TrackingDetailsModal({ isOpen, onClose, order }: { isOpen: boolean; onClose: () => void; order: any }) {
  if (!isOpen || !order) return null;

  const relatedUpdates = trackingUpdates.filter(update => update.orderId === order.id);
  const provider = deliveryProviders.find(p => p.name === order.deliveryProvider);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">Order Tracking - {order.id}</h3>
            <p className="text-muted-foreground">{order.supplierName}</p>
          </div>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        {/* Status Pipeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Status Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderStatusPipeline currentStatus={order.status} orderId={order.id} />
          </CardContent>
        </Card>

        {/* Tracking Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Carrier:</span>
                <span className="font-medium">{order.deliveryProvider || 'TBD'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tracking Number:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-sm">{order.trackingNumber || 'Pending'}</span>
                  {order.trackingNumber && provider && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`${provider.trackingUrlTemplate}${order.trackingNumber}`, '_blank')}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Track
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span>{order.estimatedDeliveryTime || 'TBD'}</span>
              </div>
              <div className="flex justify-between">
                <span>Expected Date:</span>
                <span>{order.expectedDelivery}</span>
              </div>
              {order.actualDelivery && (
                <div className="flex justify-between">
                  <span>Actual Delivery:</span>
                  <span className="font-medium text-green-600">{order.actualDelivery}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Status:</span>
                <Badge variant={order.deliveryStatus?.includes('On Time') ? 'default' : 'destructive'}>
                  {order.deliveryStatus || 'Pending'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.actualDeliveryDays && (
                <div className="flex justify-between">
                  <span>Delivery Time:</span>
                  <span className="font-medium">{order.actualDeliveryDays} days</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Attempts:</span>
                <span>{order.deliveryAttempts || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Signature Required:</span>
                <span>{order.signatureRequired ? 'Yes' : 'No'}</span>
              </div>
              {order.specialInstructions && (
                <div>
                  <span className="text-sm font-medium">Special Instructions:</span>
                  <p className="text-sm text-muted-foreground mt-1">{order.specialInstructions}</p>
                </div>
              )}
              {order.lastTrackingUpdate && (
                <div>
                  <span className="text-sm font-medium">Last Update:</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.lastTrackingUpdate).toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tracking Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Tracking Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {relatedUpdates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Truck className="h-12 w-12 mx-auto mb-4" />
                <p>No tracking updates available yet.</p>
                <p className="text-sm">Updates will appear here once the order is shipped.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {relatedUpdates.map((update, index) => (
                  <div key={update.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{update.status}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(update.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{update.location}</p>
                      <p className="text-sm">{update.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">via {update.provider}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {order.trackingNumber && (
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Tracking
            </Button>
          )}
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Details
          </Button>
        </div>
      </div>
    </div>
  );
}

function DeliveryPerformanceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Delivery Performance Analytics</h3>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{deliveryMetrics.onTimeDeliveryRate}%</p>
              <p className="text-sm text-muted-foreground">On-Time Delivery</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{deliveryMetrics.averageDeliveryTime}</p>
              <p className="text-sm text-muted-foreground">Avg Delivery Days</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{deliveryMetrics.orderAccuracyRate}%</p>
              <p className="text-sm text-muted-foreground">Order Accuracy</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">{deliveryMetrics.customerSatisfactionScore}/5.0</p>
              <p className="text-sm text-muted-foreground">Satisfaction Score</p>
            </CardContent>
          </Card>
        </div>

        {/* Supplier Performance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Supplier Delivery Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deliveryMetrics.supplierPerformance.map(supplier => (
                <div key={supplier.supplierId} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{supplier.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {supplier.totalOrders} orders • {supplier.delayedOrders} delayed
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{supplier.onTimeRate}%</p>
                      <p className="text-xs text-muted-foreground">On-Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{supplier.avgDeliveryDays}</p>
                      <p className="text-xs text-muted-foreground">Avg Days</p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Issues */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Delivery Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deliveryMetrics.deliveryIssues.map(issue => (
                <div key={issue.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{issue.issue}</h4>
                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                    <p className="text-xs text-muted-foreground">Order: {issue.orderId}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={issue.status === 'Resolved' ? 'default' : 'destructive'}>
                      {issue.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      Expected: {issue.expectedResolution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

// Approval Management Components
function BulkApprovalModal({ isOpen, onClose, selectedOrders }: { isOpen: boolean; onClose: () => void; selectedOrders: any[] }) {
  const [bulkAction, setBulkAction] = useState('approve');
  const [bulkComments, setBulkComments] = useState('');

  if (!isOpen) return null;

  const totalValue = selectedOrders.reduce((sum, order) => sum + order.grandTotal, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Bulk Approval Action</h3>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              You have selected {selectedOrders.length} orders with a total value of ${totalValue.toLocaleString()}
            </p>
            <div className="max-h-32 overflow-y-auto border rounded p-2">
              {selectedOrders.map(order => (
                <div key={order.id} className="text-sm py-1">
                  {order.id} - {order.supplierName} - ${order.grandTotal.toLocaleString()}
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Action</Label>
            <select 
              className="w-full mt-1 p-2 border rounded-md"
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
            >
              <option value="approve">Approve All</option>
              <option value="reject">Reject All</option>
              <option value="request_info">Request Additional Information</option>
            </select>
          </div>

          <div>
            <Label>Comments</Label>
            <Textarea 
              rows={3}
              value={bulkComments}
              onChange={(e) => setBulkComments(e.target.value)}
              placeholder="Add comments for this bulk action..."
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            className={bulkAction === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            {bulkAction === 'approve' ? 'Approve All' : 
             bulkAction === 'reject' ? 'Reject All' : 'Request Information'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ApprovalHistoryModal({ isOpen, onClose, order }: { isOpen: boolean; onClose: () => void; order: any }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Approval History - {order.id}</h3>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Order Value</Label>
              <p className="text-lg font-bold">${order.grandTotal.toLocaleString()}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Approval Level Required</Label>
              <p className="text-lg font-bold">{order.approvalLevel}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Required Approvals</Label>
              <p className="text-lg font-bold">{order.requiredApprovals}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Completed Approvals</Label>
              <p className="text-lg font-bold text-green-600">{order.completedApprovals}</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Approval Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {order.approvalHistory.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No approval actions recorded yet.</p>
              ) : (
                <div className="space-y-4">
                  {order.approvalHistory.map((approval: any, index: number) => (
                    <div key={approval.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        approval.action === 'Approved' ? 'bg-green-100 dark:bg-green-900' :
                        approval.action === 'Rejected' ? 'bg-red-100 dark:bg-red-900' :
                        'bg-blue-100 dark:bg-blue-900'
                      }`}>
                        {approval.action === 'Approved' ? 
                          <CheckCircle className="h-5 w-5 text-green-600" /> :
                          approval.action === 'Rejected' ? 
                          <XCircle className="h-5 w-5 text-red-600" /> :
                          <Clock className="h-5 w-5 text-blue-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{approval.approverName}</h4>
                          <Badge variant={
                            approval.action === 'Approved' ? 'default' :
                            approval.action === 'Rejected' ? 'destructive' : 'outline'
                          }>
                            {approval.action}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {approval.approverRole} • {approval.level} Level
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(approval.timestamp).toLocaleString()}
                        </p>
                        {approval.comments && (
                          <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">
                            {approval.comments}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {order.rejectionReason && (
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Rejection Reason</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">{order.rejectionReason}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

// Purchase Order Creation Modal Component with Enhanced Integration
function CreatePurchaseOrderModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [priority, setPriority] = useState<string>('Medium');
  const [notes, setNotes] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [expectedDelivery, setExpectedDelivery] = useState<string>('');
  const [requestedDeliveryTime, setRequestedDeliveryTime] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('default');
  const [orderType, setOrderType] = useState<string>('standard');
  const [departmentCode, setDepartmentCode] = useState<string>('');
  const [costCenter, setCostCenter] = useState<string>('');
  const [approvalRequired, setApprovalRequired] = useState<boolean>(false);

  // Get selected supplier data
  const supplier = suppliersData.find(s => s.id === selectedSupplier);
  
  // Get available products for selected supplier
  const availableProducts = productsData.filter(product => {
    if (!selectedSupplier) return false;
    return product.supplierPricing.some(pricing => pricing.supplierId === selectedSupplier);
  });

  const addItem = () => {
    setOrderItems([...orderItems, { 
      productId: '', 
      quantity: 0, 
      unitPrice: 0, 
      requestedPrice: 0,
      notes: '',
      urgency: 'Medium',
      departmentRequest: '',
      budgetCode: '',
      expectedUsage: '',
      substituteAcceptable: false
    }]);
  };

  const removeItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Auto-update pricing when product is selected
    if (field === 'productId' && value) {
      const product = productsData.find(p => p.id === value);
      const supplierPricing = product?.supplierPricing.find(sp => sp.supplierId === selectedSupplier);
      if (supplierPricing && product) {
        updatedItems[index].unitPrice = supplierPricing.contractPrice;
        updatedItems[index].listPrice = supplierPricing.listPrice;
        updatedItems[index].minimumOrderQty = supplierPricing.minimumOrderQty;
        updatedItems[index].leadTime = supplierPricing.leadTime;
        updatedItems[index].availability = supplierPricing.availability;
        updatedItems[index].productName = product.name;
        updatedItems[index].currentStock = product.currentStock;
        updatedItems[index].minStock = product.minStock;
      }
    }
    
    // Calculate bulk pricing
    if ((field === 'quantity' || field === 'productId') && updatedItems[index].productId && value > 0) {
      const product = productsData.find(p => p.id === updatedItems[index].productId);
      const supplierPricing = product?.supplierPricing.find(sp => sp.supplierId === selectedSupplier);
      if (supplierPricing && supplierPricing.priceBreaks) {
        const quantity = field === 'quantity' ? value : updatedItems[index].quantity;
        const applicableBreak = supplierPricing.priceBreaks
          .filter(pb => quantity >= pb.minQty)
          .sort((a, b) => b.minQty - a.minQty)[0];
        
        if (applicableBreak) {
          updatedItems[index].unitPrice = applicableBreak.price;
          updatedItems[index].bulkPricing = true;
          updatedItems[index].originalPrice = supplierPricing.contractPrice;
        } else {
          updatedItems[index].unitPrice = supplierPricing.contractPrice;
          updatedItems[index].bulkPricing = false;
        }
      }
    }
    
    setOrderItems(updatedItems);
  };

  // Calculate order totals
  const calculateSubTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice || 0), 0);
  };

  const calculateBulkDiscount = () => {
    if (!supplier || !supplier.bulkDiscounts) return 0;
    const subtotal = calculateSubTotal();
    const applicableDiscount = supplier.bulkDiscounts
      .filter(bd => subtotal >= bd.minQuantity)
      .sort((a, b) => b.minQuantity - a.minQuantity)[0];
    return applicableDiscount ? (subtotal * applicableDiscount.discount / 100) : 0;
  };

  const calculateShipping = () => {
    if (!supplier) return 0;
    const subtotal = calculateSubTotal();
    return subtotal >= supplier.freeShippingThreshold ? 0 : supplier.shippingCost;
  };

  const subtotal = calculateSubTotal();
  const bulkDiscount = calculateBulkDiscount();
  const shippingCost = calculateShipping();
  const taxRate = 0.10;
  const taxAmount = (subtotal - bulkDiscount) * taxRate;
  const grandTotal = subtotal - bulkDiscount + taxAmount + shippingCost;

  // Check if approval is required based on amount
  const checkApprovalRequired = (total: number) => {
    setApprovalRequired(total >= 1000);
  };

  React.useEffect(() => {
    checkApprovalRequired(grandTotal);
  }, [grandTotal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Create Purchase Order</h3>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Supplier & Order Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="supplier">Supplier *</Label>
              <select 
                className="w-full mt-1 p-2 border rounded-md"
                value={selectedSupplier}
                onChange={(e) => {
                  setSelectedSupplier(e.target.value);
                  setOrderItems([]); // Clear items when supplier changes
                }}
              >
                <option value="">Select Supplier</option>
                {suppliersData.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name} - {supplier.category}
                  </option>
                ))}
              </select>
              {supplier && (
                <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>Payment Terms: {supplier.paymentTerms}</div>
                    <div>Lead Time: {supplier.leadTime}</div>
                    <div>Min Order: ${supplier.minimumOrderAmount}</div>
                    <div>Free Shipping: ${supplier.freeShippingThreshold}+</div>
                  </div>
                  {supplier.specialInstructions && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <strong>Special Instructions:</strong> {supplier.specialInstructions}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select 
                  className="w-full mt-1 p-2 border rounded-md"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div>
                <Label htmlFor="orderType">Order Type</Label>
                <select 
                  className="w-full mt-1 p-2 border rounded-md"
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <option value="standard">Standard Order</option>
                  <option value="emergency">Emergency Order</option>
                  <option value="restock">Restock Order</option>
                  <option value="trial">Trial Order</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedDelivery">Expected Delivery</Label>
                <Input 
                  type="date" 
                  value={expectedDelivery}
                  onChange={(e) => setExpectedDelivery(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="requestedTime">Preferred Delivery Time</Label>
                <select 
                  className="w-full mt-1 p-2 border rounded-md"
                  value={requestedDeliveryTime}
                  onChange={(e) => setRequestedDeliveryTime(e.target.value)}
                >
                  <option value="">Any Time</option>
                  <option value="morning">Morning (8-12 PM)</option>
                  <option value="afternoon">Afternoon (12-5 PM)</option>
                  <option value="evening">Evening (5-8 PM)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="departmentCode">Department Code</Label>
                <Input 
                  value={departmentCode}
                  onChange={(e) => setDepartmentCode(e.target.value)}
                  placeholder="e.g., PHARM-001"
                />
              </div>
              <div>
                <Label htmlFor="costCenter">Cost Center</Label>
                <Input 
                  value={costCenter}
                  onChange={(e) => setCostCenter(e.target.value)}
                  placeholder="e.g., CC-PHARMACY"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Order Notes</Label>
              <Textarea 
                rows={3} 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="General order notes and comments..."
              />
            </div>

            <div>
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea 
                rows={3} 
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Delivery instructions, handling requirements, etc..."
              />
            </div>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Order Summary
                  {approvalRequired && (
                    <Badge variant="outline" className="ml-2">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Approval Required
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {bulkDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Bulk Discount:</span>
                      <span>-${bulkDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Grand Total:</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  {supplier && subtotal < supplier.minimumOrderAmount && (
                    <div className="text-sm text-red-600 mt-2">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Minimum order amount: ${supplier.minimumOrderAmount}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium">Order Items</h4>
              <Button onClick={addItem} size="sm" disabled={!selectedSupplier}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {!selectedSupplier && (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4" />
                <p>Select a supplier first to add products.</p>
              </div>
            )}

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {orderItems.map((item, index) => {
                const product = productsData.find(p => p.id === item.productId);
                const supplierPricing = product?.supplierPricing.find(sp => sp.supplierId === selectedSupplier);
                
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium">Item {index + 1}</h5>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div>
                          <Label>Product *</Label>
                          <select 
                            className="w-full mt-1 p-2 border rounded-md text-sm"
                            value={item.productId}
                            onChange={(e) => updateItem(index, 'productId', e.target.value)}
                          >
                            <option value="">Select Product</option>
                            {availableProducts.map(product => {
                              const stockStatus = product.currentStock <= product.minStock ? 'LOW STOCK' : 'In Stock';
                              const stockColor = product.currentStock <= product.minStock ? 'text-red-600' : 'text-green-600';
                              return (
                                <option key={product.id} value={product.id}>
                                  {product.name} - {stockStatus} ({product.currentStock} available)
                                </option>
                              );
                            })}
                          </select>
                          {product && (
                            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
                              <div className="grid grid-cols-2 gap-2">
                                <div>Current Stock: <span className={product.currentStock <= product.minStock ? 'text-red-600 font-bold' : 'text-green-600'}>
                                  {product.currentStock} {product.unitOfMeasure}
                                </span></div>
                                <div>Min Stock: {product.minStock}</div>
                                <div>Category: {product.category}</div>
                                <div>Manufacturer: {product.manufacturer}</div>
                              </div>
                              {product.specialHandling && (
                                <div className="mt-1 text-orange-600 font-medium">
                                  ⚠️ Special Handling Required
                                </div>
                              )}
                              {product.controlledSubstance && (
                                <div className="mt-1 text-red-600 font-medium">
                                  🔒 Controlled Substance
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Quantity *</Label>
                            <Input 
                              type="number" 
                              value={item.quantity}
                              onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                              className="text-sm"
                              min="1"
                            />
                            {supplierPricing && item.quantity < supplierPricing.minimumOrderQty && (
                              <p className="text-xs text-red-600 mt-1">
                                Min order: {supplierPricing.minimumOrderQty}
                              </p>
                            )}
                          </div>
                          <div>
                            <Label>Unit Price</Label>
                            <div className="relative">
                              <Input 
                                type="number" 
                                step="0.01"
                                value={item.unitPrice}
                                onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                                className="text-sm"
                                readOnly={!item.productId}
                              />
                              {item.bulkPricing && (
                                <Badge className="absolute -top-2 -right-2 text-xs" variant="secondary">
                                  Bulk Price
                                </Badge>
                              )}
                            </div>
                            {supplierPricing && (
                              <div className="text-xs text-muted-foreground mt-1">
                                <div>Contract: ${supplierPricing.contractPrice}</div>
                                {supplierPricing.listPrice !== supplierPricing.contractPrice && (
                                  <div className="line-through">List: ${supplierPricing.listPrice}</div>
                                )}
                                <div>Lead time: {supplierPricing.leadTime}</div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bulk Pricing Display */}
                        {supplierPricing && supplierPricing.priceBreaks && supplierPricing.priceBreaks.length > 0 && (
                          <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded text-xs">
                            <div className="font-medium mb-1">Volume Pricing:</div>
                            {supplierPricing.priceBreaks.map((pb, pbIndex) => (
                              <div key={pbIndex} className={`${item.quantity >= pb.minQty ? 'text-green-600 font-bold' : ''}`}>
                                {pb.minQty}+ units: ${pb.price}
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Urgency</Label>
                            <select 
                              className="w-full mt-1 p-2 border rounded-md text-sm"
                              value={item.urgency}
                              onChange={(e) => updateItem(index, 'urgency', e.target.value)}
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                              <option value="Critical">Critical</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2 mt-6">
                            <input 
                              type="checkbox" 
                              id={`substitute-${index}`}
                              checked={item.substituteAcceptable}
                              onChange={(e) => updateItem(index, 'substituteAcceptable', e.target.checked)}
                            />
                            <Label htmlFor={`substitute-${index}`} className="text-sm">
                              Accept Substitutes
                            </Label>
                          </div>
                        </div>

                        <div>
                          <Label>Item Notes</Label>
                          <Textarea 
                            rows={2} 
                            value={item.notes}
                            onChange={(e) => updateItem(index, 'notes', e.target.value)}
                            placeholder="Special requirements, usage notes..."
                            className="text-sm"
                          />
                        </div>

                        <div className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                          <span className="text-sm font-medium">
                            Line Total: ${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                          </span>
                          {item.bulkPricing && item.originalPrice && (
                            <span className="text-xs text-green-600">
                              Saved: ${((item.originalPrice - item.unitPrice) * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {orderItems.length === 0 && selectedSupplier && (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4" />
                  <p>No items added yet.</p>
                  <p className="text-sm">Click "Add Item" to start building your order.</p>
                  {availableProducts.length > 0 && (
                    <p className="text-sm mt-2 text-blue-600">
                      {availableProducts.length} products available from this supplier
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Purchase Order</Button>
        </div>
      </div>
    </div>
  );
}

// Order Detail Modal Component
function OrderDetailModal({ order, isOpen, onClose }: { order: any; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold">{order.id}</h3>
            <p className="text-muted-foreground">{order.supplierName}</p>
          </div>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <Label className="text-sm font-medium">Order Date</Label>
            <p>{order.orderDate}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Expected Delivery</Label>
            <p>{order.expectedDelivery}</p>
          </div>
          <div>
            <Label className="text-sm font-medium">Status</Label>
            <Badge variant={order.status === 'Delivered' ? 'default' : 'outline'}>
              {order.status}
            </Badge>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × ${item.unitPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.total.toFixed(2)}</p>
                    <Badge variant="outline" className="text-xs">
                      {item.urgency}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Created By:</span>
                <span>{order.createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span>Priority:</span>
                <Badge variant="outline">{order.priority}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Payment Terms:</span>
                <span>{order.paymentTerms}</span>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <span>Tracking:</span>
                  <span className="font-mono text-sm">{order.trackingNumber}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-${order.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Grand Total:</span>
                  <span>${order.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {order.notes && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{order.notes}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          {order.status === 'Pending Approval' && (
            <>
              <Button variant="outline">
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Purchase Management Component
export default function PurchasePage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showBulkApproval, setShowBulkApproval] = useState(false);
  const [selectedOrdersForApproval, setSelectedOrdersForApproval] = useState<any[]>([]);
  const [showApprovalHistory, setShowApprovalHistory] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);

  const tabs = [
    { id: 'orders', label: 'Purchase Orders', icon: ShoppingCart },
    { id: 'approval', label: 'Approval Workflow', icon: CheckCircle },
    { id: 'inventory', label: 'Inventory Needs', icon: Package },
    { id: 'budget', label: 'Budget & Cost Analysis', icon: BarChart3 },
    { id: 'tracking', label: 'Order Tracking', icon: Truck }
  ];

  // Filter purchase orders based on search and status
  const filteredOrders = useMemo(() => {
    return purchaseOrdersData.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalOrders = purchaseOrdersData.length;
    const pendingOrders = purchaseOrdersData.filter(o => o.status === 'Pending Approval').length;
    const approvedOrders = purchaseOrdersData.filter(o => o.approvalStatus === 'Approved').length;
    const totalValue = purchaseOrdersData.reduce((sum, o) => sum + o.grandTotal, 0);
    const pendingPayments = purchaseOrdersData.filter(o => o.paymentStatus === 'Pending').length;

    return {
      totalOrders,
      pendingOrders,
      approvedOrders,
      totalValue,
      pendingPayments
    };
  }, []);

  // Get products that need reordering
  const reorderNeeded = useMemo(() => {
    return productsData.filter(product => product.currentStock <= product.minStock);
  }, []);

  // Get pending orders for approval workflow
  const pendingOrders = useMemo(() => {
    return purchaseOrdersData.filter(order => order.approvalStatus === 'Pending');
  }, []);

  // Determine approval level for a given amount
  const getApprovalLevel = (amount: number) => {
    if (amount < approvalRules.autoApproval.threshold) return 'Auto';
    if (amount < approvalRules.managerApproval.threshold) return 'Manager';
    return 'Executive';
  };

  // Get required approvals count for a given amount
  const getRequiredApprovals = (amount: number) => {
    if (amount < approvalRules.autoApproval.threshold) return 0;
    if (amount < approvalRules.managerApproval.threshold) return 1;
    return 2;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Purchase Order
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
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
                  <p className="text-2xl font-bold">{stats.pendingOrders}</p>
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
                  <p className="text-2xl font-bold">{stats.approvedOrders}</p>
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
                  <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Reorder Needed</p>
                  <p className="text-2xl font-bold">{reorderNeeded.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders by ID or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                className="px-4 py-2 border rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-lg">{order.id}</h3>
                        <p className="text-muted-foreground">{order.supplierName}</p>
                        <p className="text-sm text-muted-foreground">
                          Created by {order.createdBy} on {order.orderDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xl">${order.grandTotal.toLocaleString()}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={
                            order.status === 'Delivered' ? 'default' :
                            order.status === 'In Transit' ? 'outline' :
                            order.status === 'Approved' ? 'secondary' : 'destructive'
                          }>
                            {order.status}
                          </Badge>
                          <Badge variant={order.priority === 'High' || order.priority === 'Urgent' ? 'destructive' : 'outline'}>
                            {order.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">Due: {order.expectedDelivery}</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm">{order.items.length} items</span>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                        <Badge variant={order.paymentStatus === 'Paid' ? 'default' : 'outline'}>
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {order.approvalStatus === 'Approved' && order.approvedBy && (
                          <span>Approved by {order.approvedBy}</span>
                        )}
                        {order.trackingNumber && (
                          <span className="ml-4">Tracking: {order.trackingNumber}</span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'approval' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Purchase Order Approval Workflow</h3>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowBulkApproval(true)} disabled={selectedOrdersForApproval.length === 0}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Bulk Approve ({selectedOrdersForApproval.length})
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Approvers
                </Button>
              </div>
            </div>
            
            {/* Approval Rules */}
            <Card>
              <CardHeader>
                <CardTitle>Tiered Approval System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                    <h4 className="font-medium flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-green-600" />
                      Auto-Approval
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">Orders under $1,000</p>
                    <p className="text-lg font-bold text-green-600 mt-2">Instant Processing</p>
                    <p className="text-xs text-muted-foreground mt-1">No manual approval required</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                    <h4 className="font-medium flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-600" />
                      Manager Approval
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">Orders $1,000 - $5,000</p>
                    <p className="text-lg font-bold text-blue-600 mt-2">1 Approver Required</p>
                    <p className="text-xs text-muted-foreground mt-1">Pharmacy/Operations Manager</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950">
                    <h4 className="font-medium flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-600" />
                      Executive Approval
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">Orders above $5,000</p>
                    <p className="text-lg font-bold text-purple-600 mt-2">2 Approvers Required</p>
                    <p className="text-xs text-muted-foreground mt-1">Manager + Director/C-Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Approvers */}
            <Card>
              <CardHeader>
                <CardTitle>Active Approvers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {approvers.filter(a => a.status === 'Active').map(approver => (
                    <div key={approver.id} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{approver.name}</h4>
                      <p className="text-sm text-muted-foreground">{approver.role}</p>
                      <p className="text-xs text-muted-foreground">{approver.email}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals with Bulk Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Pending Approvals ({purchaseOrdersData.filter(o => o.approvalStatus === 'Pending').length})
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      checked={selectedOrdersForApproval.length === pendingOrders.length && pendingOrders.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrdersForApproval([...pendingOrders]);
                        } else {
                          setSelectedOrdersForApproval([]);
                        }
                      }}
                      className="mr-2"
                    />
                    <Label className="text-sm">Select All</Label>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox"
                          checked={selectedOrdersForApproval.some(o => o.id === order.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrdersForApproval([...selectedOrdersForApproval, order]);
                            } else {
                              setSelectedOrdersForApproval(selectedOrdersForApproval.filter(o => o.id !== order.id));
                            }
                          }}
                        />
                        <div>
                          <h4 className="font-medium">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {order.supplierName} • ${order.grandTotal.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Created by {order.createdBy} on {order.createdDate} • {order.approvalLevel} Level Required
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{order.completedApprovals}/{order.requiredApprovals} Approvals</Badge>
                            <Badge variant={order.priority === 'High' ? 'destructive' : 'outline'}>
                              {order.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowApprovalHistory(true);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          History
                        </Button>
                        <Button size="sm" variant="outline">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                  {pendingOrders.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
                      <p>No pending approvals at this time.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Approval Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Approval Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {purchaseOrdersData
                    .filter(order => order.approvalHistory && order.approvalHistory.length > 0)
                    .slice(0, 5)
                    .map(order => {
                      const latestApproval = order.approvalHistory![order.approvalHistory!.length - 1];
                      return (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div>
                            <p className="font-medium">{order.id} - {order.supplierName}</p>
                            <p className="text-sm text-muted-foreground">
                              {latestApproval.action} by {latestApproval.approverName} • {new Date(latestApproval.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={latestApproval.action === 'Approved' ? 'default' : 
                                        latestApproval.action === 'Rejected' ? 'destructive' : 'outline'}>
                            {latestApproval.action}
                          </Badge>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Inventory Purchase Needs</h3>

            {/* Reorder Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                  Immediate Reorder Required ({reorderNeeded.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reorderNeeded.map(product => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg bg-red-50 dark:bg-red-950">
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Current Stock: {product.currentStock} | Min Stock: {product.minStock}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Preferred Supplier: {suppliersData.find(s => s.id === product.preferredSupplier)?.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">Low Stock</Badge>
                        <Button size="sm">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Create Order
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Needs */}
            <Card>
              <CardHeader>
                <CardTitle>Forecasted Purchase Needs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productsData
                    .filter(product => {
                      const monthsUntilReorder = (product.currentStock - product.minStock) / product.avgMonthlyUsage;
                      return monthsUntilReorder > 0 && monthsUntilReorder <= 2;
                    })
                    .map(product => {
                      const monthsUntilReorder = (product.currentStock - product.minStock) / product.avgMonthlyUsage;
                      return (
                        <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Estimated reorder needed in {monthsUntilReorder.toFixed(1)} months
                            </p>
                          </div>
                          <Badge variant="outline">
                            {monthsUntilReorder <= 1 ? 'Soon' : 'Monitor'}
                          </Badge>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Budget & Cost Analysis</h3>
            
            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Budget:</span>
                      <span className="font-bold">${budgetData.monthlyBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Spent:</span>
                      <span className="font-bold text-blue-600">${budgetData.currentMonthSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Remaining:</span>
                      <span className="font-bold text-green-600">
                        ${(budgetData.monthlyBudget - budgetData.currentMonthSpent).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(budgetData.currentMonthSpent / budgetData.monthlyBudget) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {((budgetData.currentMonthSpent / budgetData.monthlyBudget) * 100).toFixed(1)}% utilized
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Annual Budget</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Budget:</span>
                      <span className="font-bold">${budgetData.yearlyBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Spent:</span>
                      <span className="font-bold text-purple-600">${budgetData.yearToDateSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Remaining:</span>
                      <span className="font-bold text-green-600">
                        ${(budgetData.yearlyBudget - budgetData.yearToDateSpent).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${(budgetData.yearToDateSpent / budgetData.yearlyBudget) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {((budgetData.yearToDateSpent / budgetData.yearlyBudget) * 100).toFixed(1)}% utilized
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Commitments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-orange-600">
                        ${budgetData.pendingOrders.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Pending Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium">
                        ${(budgetData.currentMonthSpent + budgetData.pendingOrders).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Committed This Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.categoryBreakdown.map(category => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.category}</span>
                        <span className="text-sm text-muted-foreground">
                          ${category.spent.toLocaleString()} / ${category.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            category.percentage > 90 ? 'bg-red-500' :
                            category.percentage > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(category.percentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground">{category.percentage.toFixed(1)}% utilized</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Order Tracking & Fulfillment</h3>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowPerformanceModal(true)}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Performance Analytics
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh All Tracking
                </Button>
              </div>
            </div>
            
            {/* Status Pipeline Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {statusPipeline.map(status => {
                    const count = purchaseOrdersData.filter(order => {
                      if (status.id === 'pending_approval') return order.status === 'Pending Approval';
                      if (status.id === 'approved') return order.status === 'Approved';
                      if (status.id === 'in_transit') return order.status === 'In Transit';
                      if (status.id === 'delivered') return order.status === 'Delivered';
                      if (status.id === 'delayed') return order.deliveryStatus?.includes('Delayed');
                      if (status.id === 'cancelled') return order.status === 'Cancelled';
                      if (status.id === 'rejected') return order.status === 'Rejected';
                      return false;
                    }).length;

                    return (
                      <Card key={status.id} className={`text-center ${status.color === 'green' ? 'bg-green-50 dark:bg-green-950' : 
                                                                     status.color === 'blue' ? 'bg-blue-50 dark:bg-blue-950' :
                                                                     status.color === 'purple' ? 'bg-purple-50 dark:bg-purple-950' :
                                                                     status.color === 'orange' ? 'bg-orange-50 dark:bg-orange-950' :
                                                                     status.color === 'red' ? 'bg-red-50 dark:bg-red-950' : 'bg-gray-50 dark:bg-gray-950'}`}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-center mb-2">
                            {status.icon === 'Clock' && <Clock className={`h-6 w-6 text-${status.color}-600`} />}
                            {status.icon === 'CheckCircle' && <CheckCircle className={`h-6 w-6 text-${status.color}-600`} />}
                            {status.icon === 'Truck' && <Truck className={`h-6 w-6 text-${status.color}-600`} />}
                            {status.icon === 'Package' && <Package className={`h-6 w-6 text-${status.color}-600`} />}
                            {status.icon === 'AlertTriangle' && <AlertTriangle className={`h-6 w-6 text-${status.color}-600`} />}
                            {status.icon === 'XCircle' && <XCircle className={`h-6 w-6 text-${status.color}-600`} />}
                          </div>
                          <p className="text-2xl font-bold">{count}</p>
                          <p className="text-sm font-medium">{status.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{status.description}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Active Shipments with Enhanced Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Active Shipments & Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseOrdersData
                    .filter(order => ['In Transit', 'Approved'].includes(order.status))
                    .map(order => {
                      const provider = deliveryProviders.find(p => p.name === order.deliveryProvider);
                      const isDelayed = order.expectedDelivery && new Date(order.expectedDelivery) < new Date();
                      
                      return (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-medium">{order.id} - {order.supplierName}</h4>
                              <p className="text-sm text-muted-foreground">
                                Expected: {order.expectedDelivery} via {order.deliveryProvider || 'TBD'}
                              </p>
                              {order.trackingNumber && (
                                <p className="text-xs text-muted-foreground font-mono">
                                  Tracking: {order.trackingNumber}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={order.status === 'In Transit' ? 'default' : 'outline'}>
                                {order.status}
                              </Badge>
                              {isDelayed && (
                                <Badge variant="destructive">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Delayed
                                </Badge>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowTrackingModal(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Track
                              </Button>
                              {order.trackingNumber && provider && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(`${provider.trackingUrlTemplate}${order.trackingNumber}`, '_blank')}
                                >
                                  <ArrowRight className="h-4 w-4 mr-1" />
                                  Carrier Site
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {/* Status Pipeline for this order */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                            <OrderStatusPipeline currentStatus={order.status} orderId={order.id} />
                          </div>
                          
                          {order.lastTrackingUpdate && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Last update: {new Date(order.lastTrackingUpdate).toLocaleString()}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  
                  {purchaseOrdersData.filter(order => ['In Transit', 'Approved'].includes(order.status)).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Truck className="h-12 w-12 mx-auto mb-4" />
                      <p>No active shipments at this time.</p>
                      <p className="text-sm">Orders will appear here once they're approved and shipped.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{deliveryMetrics.onTimeDeliveryRate}%</p>
                      <p className="text-sm text-muted-foreground">On-Time Delivery Rate</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${deliveryMetrics.onTimeDeliveryRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{deliveryMetrics.averageDeliveryTime} days</p>
                      <p className="text-sm text-muted-foreground">Average Delivery Time</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{deliveryMetrics.orderAccuracyRate}%</p>
                      <p className="text-sm text-muted-foreground">Order Accuracy Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Tracking Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {trackingUpdates.slice(0, 3).map(update => (
                      <div key={update.id} className="flex items-start space-x-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <Truck className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{update.orderId}</p>
                          <p className="text-xs text-muted-foreground">{update.status}</p>
                          <p className="text-xs text-muted-foreground">{update.location}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(update.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {deliveryMetrics.deliveryIssues.slice(0, 3).map(issue => (
                      <div key={issue.id} className="p-2 border rounded">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{issue.issue}</p>
                          <Badge variant={issue.status === 'Resolved' ? 'default' : 'destructive'}>
                            {issue.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{issue.orderId}</p>
                        <p className="text-xs text-muted-foreground">Impact: {issue.impact}</p>
                      </div>
                    ))}
                    {deliveryMetrics.deliveryIssues.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="text-sm">No current delivery issues</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreatePurchaseOrderModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
      
      <OrderDetailModal
        order={selectedOrder}
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
      />

      <BulkApprovalModal
        isOpen={showBulkApproval}
        onClose={() => {
          setShowBulkApproval(false);
          setSelectedOrdersForApproval([]);
        }}
        selectedOrders={selectedOrdersForApproval}
      />

      <ApprovalHistoryModal
        isOpen={showApprovalHistory}
        onClose={() => {
          setShowApprovalHistory(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />

      <TrackingDetailsModal
        isOpen={showTrackingModal}
        onClose={() => {
          setShowTrackingModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />

      <DeliveryPerformanceModal
        isOpen={showPerformanceModal}
        onClose={() => setShowPerformanceModal(false)}
      />
    </div>
  );
}
