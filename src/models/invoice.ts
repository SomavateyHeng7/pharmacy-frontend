export interface InvoiceItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  customerName: string;
  customerPhone: string;
  pharmacistName: string;
  issuedAt: string;
  items: InvoiceItem[];
  dispensingFee: number;
  taxRate: number;
  discount: number;
  paymentStatus: "PAID" | "UNPAID" | "PENDING";
}
