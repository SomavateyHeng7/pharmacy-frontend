import { CustomerCard } from "./CustomerCard";

interface Customer {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
  };
  totalSpent: number;
  visitCount: number;
  lastVisit: string;
  status: string;
}

interface CustomerGridProps {
  customers: Customer[];
  onViewCustomer: (id: string) => void;
  onEditCustomer: (id: string) => void;
}

export function CustomerGrid({
  customers,
  onViewCustomer,
  onEditCustomer,
}: CustomerGridProps) {
  if (customers.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500">No customers found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onView={onViewCustomer}
          onEdit={onEditCustomer}
        />
      ))}
    </div>
  );
}
