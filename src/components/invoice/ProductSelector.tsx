import { SearchIcon, PillIcon } from "lucide-react";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: "Rx" | "OTC" | "Supply";
  unitPrice: number;
  stock: number;
  taxable: boolean;
}

interface ProductSelectorProps {
  searchTerm: string;
  showDropdown: boolean;
  products: Product[];
  onSearch: (term: string) => void;
  onSelect: (product: Product) => void;
  onToggle: () => void;
}

export function ProductSelector({
  searchTerm,
  showDropdown,
  products,
  onSearch,
  onSelect,
  onToggle,
}: ProductSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Line Items</h3>
        <button
          onClick={onToggle}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
        >
          <SearchIcon className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {showDropdown && (
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by SKU, name, or category..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              autoFocus
            />
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                  onClick={() => onSelect(p)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <PillIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-500">
                          {p.sku} • {p.category} •{" "}
                          <span className={p.stock < 10 ? "text-red-600" : ""}>
                            Stock: {p.stock}
                          </span>
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${p.unitPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="p-3 text-sm text-gray-500">No products found.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
