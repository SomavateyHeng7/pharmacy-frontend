"use client";

import InvoiceView from "@/components/invoice/InvoiceView";
import { Invoice } from "@/models/invoice";

const mockInvoice: Invoice = {
  id: "1",
  invoiceNo: "INV-2025-001",
  customerName: "John Smith",
  customerPhone: "555-123-4567",
  pharmacistName: "Alex Johnson",
  issuedAt: new Date().toISOString(),

  items: [
    { id: "1", sku: "NDC-001", name: "Paracetamol 500mg", category: "OTC", quantity: 2, unitPrice: 5 },
    { id: "2", sku: "RX-022", name: "Amoxicillin 500mg", category: "Rx", quantity: 1, unitPrice: 12 },
  ],

  dispensingFee: 3,
  taxRate: 7,
  discount: 0,
  paymentStatus: "UNPAID",
};

export default function InvoicePage() {
  return <InvoiceView invoice={mockInvoice} />;
}
