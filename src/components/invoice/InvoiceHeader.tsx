import Link from "next/link";
import { ArrowLeftIcon, SaveIcon, MailIcon } from "lucide-react";

interface InvoiceHeaderProps {
  invoiceNo: string;
  onSaveDraft: () => void;
  onCreateSend: () => void;
}

export function InvoiceHeader({
  invoiceNo,
  onSaveDraft,
  onCreateSend,
}: InvoiceHeaderProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/invoices" className="text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-6 w-6" />
          </Link>
          <div className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Create Pharmacy Invoice
              </h1>
              <p className="text-sm text-gray-600">
                Invoice medications, OTC items, and dispensing fees
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onSaveDraft}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
          >
            <SaveIcon className="h-4 w-4" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={onCreateSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
          >
            <MailIcon className="h-4 w-4" />
            <span>Create & Send</span>
          </button>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Invoice No:{" "}
        <span className="font-semibold text-gray-900">{invoiceNo}</span>
      </div>
    </div>
  );
}
