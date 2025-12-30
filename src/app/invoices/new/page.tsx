"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  SearchIcon,
  UserIcon,
  CalendarIcon,
  ReceiptIcon,
  SaveIcon,
  MailIcon,
  CalculatorIcon,
  PillIcon,
  CreditCardIcon,
} from "lucide-react";

/**
 * PHARMACY MODELS
 */
type PaymentStatus = "unpaid" | "paid" | "partial" | "refunded";

interface Customer {
  id: number;
  name: string;
  phone: string;
  insurance?: string;
  memberId?: string;
}

interface Product {
  id: string; // internal product id
  sku: string; // pharmacy SKU / NDC
  name: string;
  category: "Rx" | "OTC" | "Supply";
  unitPrice: number;
  stock: number;
  taxable: boolean;
}

interface InvoiceLineItem {
  id: string;
  productId: string;
  sku: string;
  name: string;
  category: Product["category"];
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
}

interface PharmacyInvoiceData {
  invoiceNo: string;
  customerId: number | null;
  customerName: string;

  dateIssued: string;
  dueDate: string;

  pharmacistName: string;

  paymentStatus: PaymentStatus;
  paymentMethod: "cash" | "card" | "transfer" | "insurance";
  insuranceCoverageAmount: number; // amount covered by insurance (flat)

  dispensingFee: number; // optional per invoice fee
  discountAmount: number;
  taxRate: number; // percent, applied only to taxable items

  notes: string;
  lineItems: InvoiceLineItem[];
}

/**
 * MOCK DATA (Replace later with NestJS + Prisma)
 */
const mockCustomers: Customer[] = [
  { id: 1, name: "John Smith", phone: "(555) 123-4567", insurance: "Blue Cross", memberId: "BC-10293" },
  { id: 2, name: "Sarah Johnson", phone: "(555) 987-6543", insurance: "Aetna", memberId: "AE-77412" },
  { id: 3, name: "Michael Brown", phone: "(555) 456-7890", insurance: "Medicare", memberId: "MC-99881" },
];

const mockProducts: Product[] = [
  { id: "P001", sku: "NDC-12345-678", name: "Paracetamol 500mg (100)", category: "OTC", unitPrice: 8.5, stock: 85, taxable: true },
  { id: "P002", sku: "NDC-23456-789", name: "Ibuprofen 400mg (100)", category: "OTC", unitPrice: 7.15, stock: 120, taxable: true },
  { id: "P003", sku: "RX-0001", name: "Amoxicillin 500mg (Capsules)", category: "Rx", unitPrice: 12.0, stock: 35, taxable: false },
  { id: "P004", sku: "SUP-GLV-L", name: "Nitrile Gloves (Box)", category: "Supply", unitPrice: 2.5, stock: 180, taxable: true },
];

function formatInvoiceNo() {
  const ts = Date.now().toString().slice(-6);
  return `INV-${ts}`;
}

export default function NewPharmacyInvoicePage() {
  const [invoiceData, setInvoiceData] = useState<PharmacyInvoiceData>({
    invoiceNo: formatInvoiceNo(),
    customerId: null,
    customerName: "",
    dateIssued: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    pharmacistName: "",
    paymentStatus: "unpaid",
    paymentMethod: "cash",
    insuranceCoverageAmount: 0,
    dispensingFee: 0,
    discountAmount: 0,
    taxRate: 7, // example
    notes: "",
    lineItems: [],
  });

  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCustomers = useMemo(() => {
    const t = customerSearchTerm.toLowerCase();
    return mockCustomers.filter((c) => c.name.toLowerCase().includes(t) || c.phone.includes(customerSearchTerm));
  }, [customerSearchTerm]);

  const filteredProducts = useMemo(() => {
    const t = productSearchTerm.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.sku.toLowerCase().includes(t) ||
        p.name.toLowerCase().includes(t) ||
        p.category.toLowerCase().includes(t)
    );
  }, [productSearchTerm]);

  const selectedCustomer = useMemo(
    () => mockCustomers.find((c) => c.id === invoiceData.customerId) || null,
    [invoiceData.customerId]
  );

  const handleCustomerSelect = (customer: Customer) => {
    setInvoiceData((prev) => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
      // If paying with insurance, you might default method:
      // paymentMethod: customer.insurance ? "insurance" : prev.paymentMethod,
    }));
    setShowCustomerSearch(false);
    setCustomerSearchTerm("");
  };

  const addLineItem = (product: Product) => {
    const newItem: InvoiceLineItem = {
      id: Date.now().toString(),
      productId: product.id,
      sku: product.sku,
      name: product.name,
      category: product.category,
      quantity: 1,
      unitPrice: product.unitPrice,
      total: product.unitPrice,
      notes: "",
    };

    setInvoiceData((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem],
    }));

    setShowProductSearch(false);
    setProductSearchTerm("");
  };

  const updateLineItem = (id: string, field: keyof InvoiceLineItem, value: string | number) => {
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) => {
        if (item.id !== id) return item;

        const updated = { ...item, [field]: value } as InvoiceLineItem;
        if (field === "quantity" || field === "unitPrice") {
          updated.total = Number(updated.quantity) * Number(updated.unitPrice);
        }
        return updated;
      }),
    }));
  };

  const removeLineItem = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((item) => item.id !== id),
    }));
  };

  const subtotal = useMemo(() => {
    return invoiceData.lineItems.reduce((sum, item) => sum + item.total, 0);
  }, [invoiceData.lineItems]);

  const taxableSubtotal = useMemo(() => {
    const taxableProductIds = new Set(mockProducts.filter((p) => p.taxable).map((p) => p.id));
    return invoiceData.lineItems
      .filter((li) => taxableProductIds.has(li.productId))
      .reduce((sum, li) => sum + li.total, 0);
  }, [invoiceData.lineItems]);

  const taxAmount = useMemo(() => {
    // tax only on taxable items; discount is applied to overall subtotal (simple approach)
    const effectiveTaxBase = Math.max(0, taxableSubtotal - invoiceData.discountAmount);
    return effectiveTaxBase * (invoiceData.taxRate / 100);
  }, [taxableSubtotal, invoiceData.discountAmount, invoiceData.taxRate]);

  const totalBeforeInsurance = useMemo(() => {
    return (
      subtotal +
      invoiceData.dispensingFee -
      invoiceData.discountAmount +
      taxAmount
    );
  }, [subtotal, invoiceData.dispensingFee, invoiceData.discountAmount, taxAmount]);

  const grandTotal = useMemo(() => {
    return Math.max(0, totalBeforeInsurance - invoiceData.insuranceCoverageAmount);
  }, [totalBeforeInsurance, invoiceData.insuranceCoverageAmount]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!invoiceData.customerId) newErrors.customer = "Please select a customer";
    if (!invoiceData.pharmacistName.trim()) newErrors.pharmacistName = "Pharmacist name is required";
    if (invoiceData.lineItems.length === 0) newErrors.lineItems = "At least one product is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (action: "draft" | "send") => {
    if (!validateForm()) return;

    // Replace later with API call to NestJS:
    console.log("Saving pharmacy invoice:", action, invoiceData, { subtotal, taxAmount, grandTotal });
    alert(`Invoice ${action === "draft" ? "saved as draft" : "created and sent"} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/invoices" className="text-blue-600 hover:text-blue-800">
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Pharmacy Invoice</h1>
                <p className="text-sm text-gray-600">Invoice medications, OTC items, and dispensing fees</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => handleSave("draft")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <SaveIcon className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => handleSave("send")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
            >
              <MailIcon className="h-4 w-4" />
              <span>Create & Send</span>
            </button>
          </div>
        </div>
        {/* Invoice number line */}
        <div className="mt-4 text-sm text-gray-600">
          Invoice No: <span className="font-semibold text-gray-900">{invoiceData.invoiceNo}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoice Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer *</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search and select customer..."
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.customer ? "border-red-500" : "border-gray-300"
                      }`}
                      value={invoiceData.customerName || customerSearchTerm}
                      onChange={(e) => {
                        setCustomerSearchTerm(e.target.value);
                        setShowCustomerSearch(true);
                        if (invoiceData.customerId) {
                          setInvoiceData((prev) => ({ ...prev, customerId: null, customerName: "" }));
                        }
                      }}
                      onFocus={() => setShowCustomerSearch(true)}
                    />

                    {showCustomerSearch && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredCustomers.map((c) => (
                          <div
                            key={c.id}
                            className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                            onClick={() => handleCustomerSelect(c)}
                          >
                            <div className="flex items-center space-x-3">
                              <UserIcon className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{c.name}</p>
                                <p className="text-xs text-gray-500">
                                  {c.insurance ? `${c.insurance}${c.memberId ? ` • ${c.memberId}` : ""}` : "No insurance"} • {c.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredCustomers.length === 0 && (
                          <div className="p-3 text-sm text-gray-500">No customers found.</div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.customer && <p className="text-red-500 text-sm mt-1">{errors.customer}</p>}
                </div>

                {/* Pharmacist */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pharmacist *</label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.pharmacistName ? "border-red-500" : "border-gray-300"
                    }`}
                    value={invoiceData.pharmacistName}
                    onChange={(e) => setInvoiceData((prev) => ({ ...prev, pharmacistName: e.target.value }))}
                    placeholder="e.g., Pharmacist Alex"
                  />
                  {errors.pharmacistName && <p className="text-red-500 text-sm mt-1">{errors.pharmacistName}</p>}
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Issued</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={invoiceData.dateIssued}
                    onChange={(e) => setInvoiceData((prev) => ({ ...prev, dateIssued: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={invoiceData.dueDate}
                    onChange={(e) => setInvoiceData((prev) => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>

                {/* Payment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={invoiceData.paymentStatus}
                    onChange={(e) => setInvoiceData((prev) => ({ ...prev, paymentStatus: e.target.value as PaymentStatus }))}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={invoiceData.paymentMethod}
                    onChange={(e) => setInvoiceData((prev) => ({ ...prev, paymentMethod: e.target.value as PharmacyInvoiceData["paymentMethod"] }))}
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="transfer">Bank Transfer</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Medications & Items</h3>
                <button
                  onClick={() => setShowProductSearch(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                >
                  <PlusIcon className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              </div>

              {errors.lineItems && <p className="text-red-500 text-sm mb-4">{errors.lineItems}</p>}

              {/* Product Search Modal */}
              {showProductSearch && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg max-w-4xl w-full max-h-96 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Select Product</h3>
                        <button onClick={() => setShowProductSearch(false)} className="text-gray-400 hover:text-gray-600">
                          ×
                        </button>
                      </div>
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by SKU/NDC, name, category..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={productSearchTerm}
                          onChange={(e) => setProductSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="overflow-y-auto max-h-80 p-4">
                      <div className="grid grid-cols-1 gap-2">
                        {filteredProducts.map((p) => (
                          <div
                            key={p.id}
                            className="p-3 hover:bg-gray-50 cursor-pointer border border-gray-200 rounded-lg"
                            onClick={() => addLineItem(p)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3">
                                  <span className="text-sm font-medium text-blue-600">{p.sku}</span>
                                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                    {p.category}
                                  </span>
                                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                    Stock: {p.stock}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-900 mt-1">{p.name}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">${p.unitPrice.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {filteredProducts.length === 0 && (
                          <div className="p-3 text-sm text-gray-500">No products found.</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Items Table */}
              {invoiceData.lineItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU/NDC</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {invoiceData.lineItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-4 text-sm font-medium text-blue-600">{item.sku}</td>
                          <td className="px-4 py-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                              <PillIcon className="h-3 w-3" />
                              {item.category}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <input
                              type="number"
                              min={1}
                              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={item.quantity}
                              onChange={(e) => updateLineItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                            />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-500">$</span>
                              <input
                                type="number"
                                step="0.01"
                                min={0}
                                className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={item.unitPrice}
                                onChange={(e) => updateLineItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                            ${item.total.toFixed(2)}
                          </td>
                          <td className="px-4 py-4">
                            <button onClick={() => removeLineItem(item.id)} className="text-red-600 hover:text-red-900">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ReceiptIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No items added yet</p>
                  <p className="text-sm text-gray-400 mt-2">Click “Add Item” to start building your invoice</p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Dispensing notes, counseling notes, or special instructions..."
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <div className="flex items-center space-x-2 mb-6">
                <CalculatorIcon className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Invoice Summary</h3>
              </div>

              {selectedCustomer && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <div className="font-medium text-gray-900">{selectedCustomer.name}</div>
                  <div className="text-gray-600">{selectedCustomer.phone}</div>
                  <div className="text-gray-600">
                    {selectedCustomer.insurance ? `${selectedCustomer.insurance}${selectedCustomer.memberId ? ` • ${selectedCustomer.memberId}` : ""}` : "No insurance"}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                {/* Dispensing Fee */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dispensing Fee</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                      value={invoiceData.dispensingFee}
                      onChange={(e) => setInvoiceData((prev) => ({ ...prev, dispensingFee: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                {/* Discount */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Discount</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                      value={invoiceData.discountAmount}
                      onChange={(e) => setInvoiceData((prev) => ({ ...prev, discountAmount: parseFloat(e.target.value) || 0 }))}
                    />
                  </div>
                </div>

                {/* Tax */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tax Rate (%)</span>
                  <div className="flex items-center space-x-1">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                      value={invoiceData.taxRate}
                      onChange={(e) => setInvoiceData((prev) => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                    />
                    <span className="text-sm text-gray-500">%</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax Amount</span>
                  <span className="text-sm font-medium text-gray-900">${taxAmount.toFixed(2)}</span>
                </div>

                {/* Insurance coverage */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Insurance Coverage</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                      value={invoiceData.insuranceCoverageAmount}
                      onChange={(e) =>
                        setInvoiceData((prev) => ({ ...prev, insuranceCoverageAmount: parseFloat(e.target.value) || 0 }))
                      }
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-blue-600">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-700">
                    <CreditCardIcon className="h-4 w-4" />
                    <span>{invoiceData.paymentMethod.toUpperCase()}</span>
                  </div>
                  <div className="font-medium text-gray-900">{invoiceData.paymentStatus.toUpperCase()}</div>
                </div>
              </div>
            </div>
          </div>
          {/* end summary */}
        </div>
      </div>
    </div>
  );
}
