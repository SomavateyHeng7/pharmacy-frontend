import { Plus, Search, FileText, Package, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface PurchaseOrder {
  poNumber: string;
  supplier: string;
  date: string;
  status: string;
  items: number;
  total: number;
}

interface PurchaseOrderListProps {
  orders: PurchaseOrder[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCreateNew: () => void;
  onViewOrder: (poNumber: string) => void;
}

export function PurchaseOrderList({
  orders,
  searchTerm,
  onSearchChange,
  onCreateNew,
  onViewOrder,
}: PurchaseOrderListProps) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-800",
      Approved: "bg-green-100 text-green-800",
      Received: "bg-blue-100 text-blue-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Orders</h1>
          <p className="text-gray-600 mt-1">Manage your supplier orders</p>
        </div>
        <Button
          onClick={onCreateNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Purchase Order
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by PO number, supplier..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="grid gap-4">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No purchase orders found.
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => (
            <Card
              key={order.poNumber}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewOrder(order.poNumber)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.poNumber}
                      </h3>
                      <p className="text-sm text-gray-600">{order.supplier}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {order.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Package className="h-3 w-3 mr-1" />
                        {order.items} items
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      <p className="text-lg font-semibold text-gray-900 mt-2">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
