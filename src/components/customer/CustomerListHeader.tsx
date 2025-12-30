import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CustomerListHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddCustomer: () => void;
}

export function CustomerListHeader({
  searchTerm,
  onSearchChange,
  onAddCustomer,
}: CustomerListHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button
            onClick={onAddCustomer}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>
    </div>
  );
}
