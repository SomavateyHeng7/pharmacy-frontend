'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Clock,
  AlertTriangle,
  CheckCircle,
  Search,
  Plus,
  Edit,
  Eye,
  FileText,
  ShoppingCart,
  Truck,
  Calendar,
  Star,
  Activity,
  Download,
  Filter,
  RefreshCw,
  BarChart3,
  Users,
  CreditCard,
  Zap,
  PlayCircle,
  PauseCircle,
  Settings,
  XCircle
} from 'lucide-react';

// Mock data for products/inventory for order creation
const productsData = [
  {
    id: 'PROD001',
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    manufacturer: 'PharmaCorp',
    currentStock: 85,
    minStock: 100,
    maxStock: 1000,
    unitCost: 8.50,
    supplierPrice: 8.50,
    preferredSupplier: 'SUP001',
    lastOrderDate: '2024-11-10',
    avgMonthlyUsage: 150,
    sku: 'PAR-500-100',
    barcode: '1234567890123',
    description: 'Paracetamol tablets 500mg for pain and fever relief',
    packageSize: '100 tablets/bottle',
    expiryTracking: true,
    storageConditions: 'Store at room temperature, dry place',
    priceBreaks: [
      { minQty: 100, price: 8.25 },
      { minQty: 500, price: 7.95 },
      { minQty: 1000, price: 7.65 }
    ]
  },
  {
    id: 'PROD002',
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    manufacturer: 'MediTech Labs',
    currentStock: 120,
    minStock: 80,
    maxStock: 800,
    unitCost: 7.15,
    supplierPrice: 7.15,
    preferredSupplier: 'SUP001',
    lastOrderDate: '2024-11-08',
    avgMonthlyUsage: 100,
    sku: 'IBU-400-100',
    barcode: '2345678901234',
    description: 'Ibuprofen tablets 400mg anti-inflammatory pain relief',
    packageSize: '100 tablets/bottle',
    expiryTracking: true,
    storageConditions: 'Store in dry place, room temperature',
    priceBreaks: [
      { minQty: 200, price: 6.95 },
      { minQty: 500, price: 6.75 }
    ]
  },
  {
    id: 'PROD003',
    name: 'Surgical Gloves',
    category: 'Medical Supplies',
    manufacturer: 'SafeHands Medical',
    currentStock: 180,
    minStock: 200,
    maxStock: 2000,
    unitCost: 2.50,
    supplierPrice: 2.50,
    preferredSupplier: 'SUP002',
    lastOrderDate: '2024-11-05',
    avgMonthlyUsage: 500,
    sku: 'GLV-NIT-L',
    barcode: '3456789012345',
    description: 'Nitrile examination gloves, powder-free, latex-free',
    packageSize: '100 pairs/box',
    expiryTracking: false,
    storageConditions: 'Store in cool, dry place',
    priceBreaks: [
      { minQty: 500, price: 2.35 },
      { minQty: 1000, price: 2.20 },
      { minQty: 2000, price: 2.05 }
    ]
  }
];

// Mock data for suppliers with comprehensive information
const suppliersData = [
  {
    id: 'SUP001',
    companyName: 'MediCore Pharmaceuticals',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.johnson@medicore.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Plaza, Healthcare City, HC 12345',
    category: 'Pharmaceuticals',
    status: 'Active',
    rating: 4.8,
    totalOrders: 45,
    totalSpent: 125680.50,
    lastOrderDate: '2024-11-12',
    paymentTerms: '30 days',
    creditLimit: 50000.00,
    currentBalance: 12500.00
  },
  {
    id: 'SUP002',
    companyName: 'Global Health Supplies',
    contactPerson: 'Robert Martinez',
    email: 'r.martinez@globalhealthsupplies.com',
    phone: '+1 (555) 987-6543',
    address: '456 Supply Chain Blvd, Distribution Hub, DH 67890',
    category: 'Medical Supplies',
    status: 'Active',
    rating: 4.3,
    totalOrders: 32,
    totalSpent: 89250.75,
    lastOrderDate: '2024-11-10',
    paymentTerms: '15 days',
    creditLimit: 30000.00,
    currentBalance: 8500.00
  }
];

// Purchase Order Creation Modal Component
function CreatePurchaseOrderModal({ isOpen, onClose, supplierId = null }: { 
  isOpen: boolean; 
  onClose: () => void; 
  supplierId?: string | null;
}) {
  const [selectedSupplier, setSelectedSupplier] = useState<string>(supplierId || '');
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [priority, setPriority] = useState<string>('Medium');
  const [notes, setNotes] = useState<string>('');
  const [expectedDelivery, setExpectedDelivery] = useState<string>('');
  const [requestedDeliveryTime, setRequestedDeliveryTime] = useState<string>('');
  const [departmentCode, setDepartmentCode] = useState<string>('');
  const [orderType, setOrderType] = useState<string>('standard');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [approvalRequired, setApprovalRequired] = useState<boolean>(false);

  // Get selected supplier data
  const supplier = suppliersData.find(s => s.id === selectedSupplier);
  
  // Get available products for selected supplier
  const availableProducts = selectedSupplier ? productsData.filter(product => 
    product.preferredSupplier === selectedSupplier
  ) : [];

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      productId: '',
      quantity: 1,
      unitPrice: 0,
      notes: '',
      urgency: 'Medium'
    };
    setOrderItems([...orderItems, newItem]);
  };

  const removeItem = (itemId: number) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const updateItem = (itemId: number, field: string, value: any) => {
    const updatedItems = orderItems.map(item => {
      if (item.id !== itemId) return item;
      
      const updatedItem = { ...item, [field]: value };
      
      // Auto-update pricing when product is selected
      if (field === 'productId' && value) {
        const product = productsData.find(p => p.id === value);
        if (product) {
          updatedItem.unitPrice = product.supplierPrice;
          updatedItem.productName = product.name;
        }
      }
      
      return updatedItem;
    });
    
    setOrderItems(updatedItems);
  };

  // Calculate totals
  const calculateSubTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice || 0), 0);
  };

  const subtotal = calculateSubTotal();
  const taxRate = 0.10;
  const taxAmount = subtotal * taxRate;
  const shippingCost = subtotal >= 1000 ? 0 : 50.00; // Free shipping over $1000
  const grandTotal = subtotal + taxAmount + shippingCost;

  // Check approval requirements
  React.useEffect(() => {
    setApprovalRequired(grandTotal >= 1000);
  }, [grandTotal]);

  const handleSubmit = () => {
    if (!selectedSupplier) {
      alert('Please select a supplier');
      return;
    }
    
    if (orderItems.length === 0) {
      alert('Please add at least one item');
      return;
    }
    
    const newOrder = {
      id: `PO${Date.now().toString().slice(-3)}`,
      supplierId: selectedSupplier,
      supplierName: supplier?.companyName,
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery,
      status: approvalRequired ? 'Pending Approval' : 'Processing',
      priority,
      totalAmount: grandTotal,
      items: orderItems.filter(item => item.productId),
      notes,
      specialInstructions,
      departmentCode,
      approvalRequired
    };
    
    alert(`Purchase Order ${newOrder.id} created successfully!${approvalRequired ? ' (Pending Approval)' : ''}`);
    
    // Reset form
    setOrderItems([]);
    setNotes('');
    setSpecialInstructions('');
    setDepartmentCode('');
    setExpectedDelivery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold">Create Purchase Order</h3>
            <p className="text-muted-foreground">Generate a new purchase order with automated calculations</p>
          </div>
          <Button variant="ghost" onClick={onClose} size="sm">×</Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column - Supplier & Order Details */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Supplier Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="supplier">Supplier *</Label>
                    <select 
                      className="w-full mt-1 p-2 border rounded-md"
                      value={selectedSupplier}
                      onChange={(e) => {
                        setSelectedSupplier(e.target.value);
                        setOrderItems([]); // Clear items when supplier changes
                      }}
                    >
                      <option value="">Select Supplier</option>
                      {suppliersData.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.companyName} - {supplier.category}
                        </option>
                      ))}
                    </select>
                    {supplier && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>Payment Terms: {supplier.paymentTerms}</div>
                          <div>Credit Limit: ${supplier.creditLimit.toLocaleString()}</div>
                          <div>Current Balance: ${supplier.currentBalance.toLocaleString()}</div>
                          <div className="flex items-center">
                            Rating: 
                            <div className="flex items-center ml-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < Math.floor(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-1 text-xs">{supplier.rating}/5</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Order Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="priority">Priority Level *</Label>
                      <select 
                        className="w-full mt-1 p-2 border rounded-md"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="Low">🟢 Low</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="High">🟠 High</option>
                        <option value="Urgent">🔴 Urgent</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="orderType">Order Type</Label>
                      <select 
                        className="w-full mt-1 p-2 border rounded-md"
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                      >
                        <option value="standard">Standard Order</option>
                        <option value="emergency">Emergency Order</option>
                        <option value="restock">Restock Order</option>
                        <option value="trial">Trial Order</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="expectedDelivery">Expected Delivery Date *</Label>
                    <Input 
                      type="date" 
                      value={expectedDelivery}
                      onChange={(e) => setExpectedDelivery(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryTime">Preferred Delivery Time</Label>
                    <select 
                      className="w-full mt-1 p-2 border rounded-md"
                      value={requestedDeliveryTime}
                      onChange={(e) => setRequestedDeliveryTime(e.target.value)}
                    >
                      <option value="">Any Time</option>
                      <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                      <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="departmentCode">Department Code</Label>
                    <Input 
                      value={departmentCode}
                      onChange={(e) => setDepartmentCode(e.target.value)}
                      placeholder="e.g., PHARM-001"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Order Notes</Label>
                    <Textarea 
                      rows={3} 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="General order notes and comments..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea 
                      rows={3} 
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Delivery instructions, handling requirements, etc..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Items & Summary */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Order Items ({orderItems.length})
                  </div>
                  <Button onClick={addItem} size="sm" disabled={!selectedSupplier}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedSupplier && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4" />
                    <p>Select a supplier first to add products.</p>
                  </div>
                )}

                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {orderItems.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium">Item #{index + 1}</h5>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label>Product *</Label>
                          <select 
                            className="w-full mt-1 p-2 border rounded-md text-sm"
                            value={item.productId}
                            onChange={(e) => updateItem(item.id, 'productId', e.target.value)}
                          >
                            <option value="">Select Product</option>
                            {availableProducts.map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name} - Stock: {product.currentStock}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <Label>Quantity *</Label>
                            <Input 
                              type="number" 
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                              className="text-sm"
                              min="1"
                            />
                          </div>
                          <div>
                            <Label>Unit Price</Label>
                            <Input 
                              type="number" 
                              step="0.01"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                              className="text-sm"
                            />
                          </div>
                          <div>
                            <Label>Total</Label>
                            <div className="text-sm font-bold bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1">
                              ${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label>Item Urgency</Label>
                          <select 
                            className="w-full mt-1 p-1 border rounded text-xs"
                            value={item.urgency}
                            onChange={(e) => updateItem(item.id, 'urgency', e.target.value)}
                          >
                            <option value="Low">🟢 Low</option>
                            <option value="Medium">🟡 Medium</option>
                            <option value="High">🟠 High</option>
                            <option value="Critical">🔴 Critical</option>
                          </select>
                        </div>

                        <div>
                          <Label>Item Notes</Label>
                          <Textarea 
                            rows={2} 
                            value={item.notes}
                            onChange={(e) => updateItem(item.id, 'notes', e.target.value)}
                            placeholder="Special requirements..."
                            className="text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {selectedSupplier && orderItems.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-4" />
                      <p>No items added yet.</p>
                      <p className="text-sm">Click "Add Item" to start building your order.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Order Summary
                  {approvalRequired && (
                    <Badge variant="outline" className="ml-2">
                      <Clock className="h-3 w-3 mr-1" />
                      Approval Required
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax (10%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Grand Total:</span>
                      <span className="text-green-600">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {shippingCost > 0 && (
                    <div className="text-xs text-blue-600 mt-2">
                      💡 Free shipping on orders over $1,000
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              {orderItems.filter(item => item.productId).length} items • Total: ${grandTotal.toFixed(2)}
              {approvalRequired && " • Pending Approval"}
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="outline"
              onClick={() => alert('Order saved as draft!')}
              disabled={orderItems.length === 0}
            >
              <FileText className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!selectedSupplier || orderItems.filter(item => item.productId).length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {approvalRequired ? 'Submit for Approval' : 'Create Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SupplierPage() {
  const [activeTab, setActiveTab] = useState('suppliers');
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [preselectedSupplierId, setPreselectedSupplierId] = useState<string | null>(null);

  const supplierTabs = [
    { id: 'suppliers', label: 'Suppliers', icon: Building2 },
    { id: 'orders', label: 'Purchase Orders', icon: ShoppingCart },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'reorder', label: 'Auto Reorder', icon: RefreshCw }
  ];

  const filteredSuppliers = suppliersData.filter(supplier =>
    supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSuppliers = suppliersData.length;
  const activeSuppliers = suppliersData.filter(s => s.status === 'Active').length;
  const totalSpent = suppliersData.reduce((sum, s) => sum + s.totalSpent, 0);
  const avgRating = suppliersData.reduce((sum, s) => sum + s.rating, 0) / suppliersData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Supplier Management</h1>
            <p className="text-muted-foreground">
              Manage vendors, purchase orders, and automated reordering
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={() => setShowCreateOrderModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Purchase Order
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Suppliers</p>
                  <p className="text-2xl font-bold">{totalSuppliers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Suppliers</p>
                  <p className="text-2xl font-bold">{activeSuppliers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">{avgRating.toFixed(1)}/5.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supplier Management Tabs */}
        <div className="flex space-x-2 border-b overflow-x-auto">
          {supplierTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'suppliers' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers by name or contact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Supplier List */}
            <div className="space-y-4">
              {filteredSuppliers.map((supplier) => (
                <Card key={supplier.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{supplier.companyName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {supplier.contactPerson} • {supplier.category}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {supplier.phone}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {supplier.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < Math.floor(supplier.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">{supplier.rating}/5.0</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${supplier.totalSpent.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{supplier.totalOrders} orders</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={supplier.status === 'Active' ? 'default' : 'outline'}>
                            {supplier.status}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => {
                              setPreselectedSupplierId(supplier.id);
                              setShowCreateOrderModal(true);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Create Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Purchase Order Creation Modal */}
      <CreatePurchaseOrderModal
        isOpen={showCreateOrderModal}
        onClose={() => {
          setShowCreateOrderModal(false);
          setPreselectedSupplierId(null);
        }}
        supplierId={preselectedSupplierId}
      />
    </div>
  );
}