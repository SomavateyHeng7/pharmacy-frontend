/**
 * API Types - Matching backend models
 */

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  PHARMACIST = 'PHARMACIST',
  CASHIER = 'CASHIER',
  INVENTORY_MANAGER = 'INVENTORY_MANAGER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum DrugForm {
  TABLET = 'TABLET',
  CAPSULE = 'CAPSULE',
  SYRUP = 'SYRUP',
  INJECTION = 'INJECTION',
  CREAM = 'CREAM',
  DROPS = 'DROPS',
  INHALER = 'INHALER',
  POWDER = 'POWDER',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  PARTIAL = 'PARTIAL',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  TRANSFER = 'TRANSFER',
  INSURANCE = 'INSURANCE',
}

export enum PrescriptionStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  FILLED = 'FILLED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export enum PurchaseOrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  ORDERED = 'ORDERED',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  license?: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  dateOfBirth?: string;
  gender?: Gender;
  insuranceProvider?: string;
  insurancePolicyNo?: string;
  allergies?: string;
  medicalHistory?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Supplier {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  category?: string;
  status: string;
  paymentTerms?: string;
  creditLimit?: number;
  rating?: number;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface Drug {
  id: string;
  name: string;
  genericName: string;
  strength: string;
  form: DrugForm;
  manufacturer: string;
  category: string;
  therapeuticClass?: string;
  barcode?: string;
  qrCode?: string;
  sku?: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderLevel: number;
  unitPrice: number;
  sellingPrice: number;
  location?: string;
  shelf?: string;
  description?: string;
  sideEffects?: string;
  dosageInstructions?: string;
  prescriptionRequired: boolean;
  refrigerationRequired: boolean;
  controlledSubstance: boolean;
  supplierId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Batch {
  id: string;
  batchNumber: string;
  drugId: string;
  expiryDate: string;
  manufacturingDate: string;
  quantity: number;
  remainingQuantity: number;
  costPrice: number;
  supplierId: string;
  receivedDate: string;
  purchaseOrderId?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  customerId: string;
  dateIssued: string;
  dueDate: string;
  pharmacistId: string;
  pharmacistName: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paidAmount: number;
  insuranceCoverageAmount: number;
  subtotal: number;
  dispensingFee: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string;
  invoiceType: string;
  prescriptionId?: string;
  createdAt: string;
  updatedAt: string;
  lineItems: InvoiceLine[];
}

export interface InvoiceLine {
  id: string;
  invoiceId: string;
  drugId: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
  createdAt: string;
}

export interface Prescription {
  id: string;
  prescriptionNo: string;
  customerId: string;
  doctorName: string;
  doctorPhone?: string;
  doctorLicense?: string;
  pharmacistId?: string;
  status: PrescriptionStatus;
  dateIssued: string;
  dateVerified?: string;
  dateFilled?: string;
  medications: any; // JSON
  notes?: string;
  imageUrl?: string;
  counselingProvided: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrder {
  id: string;
  orderNo: string;
  supplierId: string;
  createdById: string;
  orderDate: string;
  expectedDate?: string;
  receivedDate?: string;
  status: PurchaseOrderStatus;
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  lineItems: PurchaseOrderLine[];
}

export interface PurchaseOrderLine {
  id: string;
  purchaseOrderId: string;
  drugId: string;
  quantity: number;
  unitPrice: number;
  total: number;
  receivedQuantity: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
