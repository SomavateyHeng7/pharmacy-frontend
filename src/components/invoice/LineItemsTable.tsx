import { TrashIcon } from "lucide-react";

interface InvoiceLineItem {
  id: string;
  productId: string;
  sku: string;
  name: string;
  category: "Rx" | "OTC" | "Supply";
  quantity: number;
  unitPrice: number;
  total: number;
  notes?: string;
}

interface LineItemsTableProps {
  items: InvoiceLineItem[];
  error?: string;
  onUpdateItem: (id: string, field: keyof InvoiceLineItem, value: string | number) => void;
  onRemoveItem: (id: string) => void;
}

export function LineItemsTable({
  items,
  error,
  onUpdateItem,
  onRemoveItem,
}: LineItemsTableProps) {
  if (items.length === 0) {
    return (
      <div>
        <div className="text-center py-8 text-gray-500">
          No items added yet. Click "Add Product" to start.
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              SKU / Product
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Qty
            </th>
            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Unit Price
            </th>
            <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase">
              Total
            </th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-3 py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.sku}</p>
                </div>
              </td>
              <td className="px-3 py-3">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    item.category === "Rx"
                      ? "bg-purple-100 text-purple-800"
                      : item.category === "OTC"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {item.category}
                </span>
              </td>
              <td className="px-3 py-3 text-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    onUpdateItem(item.id, "quantity", Number(e.target.value))
                  }
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                />
              </td>
              <td className="px-3 py-3 text-right">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    onUpdateItem(item.id, "unitPrice", Number(e.target.value))
                  }
                  className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-sm"
                />
              </td>
              <td className="px-3 py-3 text-right font-semibold text-gray-900">
                ${item.total.toFixed(2)}
              </td>
              <td className="px-3 py-3 text-center">
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
