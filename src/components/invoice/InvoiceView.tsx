"use client";

import { Invoice } from "@/models/invoice";
import { generateInvoicePDF } from "@/lib/pdf";
import InvoicePrint from "./InvoicePrint";

export default function InvoiceView({ invoice }: { invoice: Invoice }) {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Invoice #{invoice.invoiceNo}</h1>

        <div className="space-x-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 border rounded"
          >
            Print
          </button>

          <button
            onClick={() => generateInvoicePDF()}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Printable Area */}
      <InvoicePrint invoice={invoice} />
    </div>
  );
}
