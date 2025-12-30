import { UserIcon } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  phone: string;
  insurance?: string;
  memberId?: string;
}

interface CustomerSelectorProps {
  value: string;
  error?: string;
  showDropdown: boolean;
  customers: Customer[];
  onSearch: (term: string) => void;
  onSelect: (customer: Customer) => void;
  onFocus: () => void;
}

export function CustomerSelector({
  value,
  error,
  showDropdown,
  customers,
  onSearch,
  onSelect,
  onFocus,
}: CustomerSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Customer *
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Search and select customer..."
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          onFocus={onFocus}
        />

        {showDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {customers.map((c) => (
              <div
                key={c.id}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                onClick={() => onSelect(c)}
              >
                <div className="flex items-center space-x-3">
                  <UserIcon className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">
                      {c.insurance
                        ? `${c.insurance}${c.memberId ? ` • ${c.memberId}` : ""}`
                        : "No insurance"}{" "}
                      • {c.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {customers.length === 0 && (
              <div className="p-3 text-sm text-gray-500">No customers found.</div>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
