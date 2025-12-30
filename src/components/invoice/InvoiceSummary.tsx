import { CalculatorIcon } from "lucide-react";

interface InvoiceSummaryProps {
  subtotal: number;
  dispensingFee: number;
  discountAmount: number;
  taxAmount: number;
  insuranceCoverage: number;
  grandTotal: number;
}

export function InvoiceSummary({
  subtotal,
  dispensingFee,
  discountAmount,
  taxAmount,
  insuranceCoverage,
  grandTotal,
}: InvoiceSummaryProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm border border-blue-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <CalculatorIcon className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Invoice Summary</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-semibold text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {dispensingFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Dispensing Fee:</span>
            <span className="font-semibold text-gray-900">
              ${dispensingFee.toFixed(2)}
            </span>
          </div>
        )}

        {discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount:</span>
            <span className="font-semibold text-red-600">
              -${discountAmount.toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax:</span>
          <span className="font-semibold text-gray-900">
            ${taxAmount.toFixed(2)}
          </span>
        </div>

        {insuranceCoverage > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Insurance Coverage:</span>
            <span className="font-semibold text-green-600">
              -${insuranceCoverage.toFixed(2)}
            </span>
          </div>
        )}

        <div className="border-t border-blue-200 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
