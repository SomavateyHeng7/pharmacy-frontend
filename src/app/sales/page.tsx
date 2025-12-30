'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  DollarSign,
  User,
  ShoppingCart,
  Printer,
  X,
  Check,
  Barcode,
  ArrowLeft,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader, PageContainer } from '@/components/shared';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  requiresPrescription: boolean;
}

interface CartItem extends Product {
  quantity: number;
  discount: number;
}

// Mock products - replace with API call
const mockProducts: Product[] = [
  { id: '1', name: 'Paracetamol 500mg', sku: 'NDC-001', price: 5.99, stock: 150, category: 'OTC', requiresPrescription: false },
  { id: '2', name: 'Ibuprofen 400mg', sku: 'NDC-002', price: 7.49, stock: 200, category: 'OTC', requiresPrescription: false },
  { id: '3', name: 'Amoxicillin 500mg', sku: 'RX-001', price: 12.99, stock: 80, category: 'Prescription', requiresPrescription: true },
  { id: '4', name: 'Vitamin C 1000mg', sku: 'SUP-001', price: 9.99, stock: 300, category: 'Supplement', requiresPrescription: false },
  { id: '5', name: 'Hand Sanitizer 500ml', sku: 'OTC-001', price: 4.99, stock: 120, category: 'OTC', requiresPrescription: false },
  { id: '6', name: 'Face Masks (50 pack)', sku: 'PPE-001', price: 15.99, stock: 90, category: 'PPE', requiresPrescription: false },
  { id: '7', name: 'Blood Pressure Monitor', sku: 'DEV-001', price: 45.99, stock: 25, category: 'Device', requiresPrescription: false },
  { id: '8', name: 'Thermometer Digital', sku: 'DEV-002', price: 12.99, stock: 60, category: 'Device', requiresPrescription: false },
];

export default function POSPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('Walk-in Customer');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'insurance'>('cash');
  const [showReceipt, setShowReceipt] = useState(false);
  const [cashReceived, setCashReceived] = useState('');
  const [discount, setDiscount] = useState(0);
  const [taxRate] = useState(7); // 7% tax

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Add product to cart
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1, discount: 0 }]);
    }
    setSearchTerm('');
  };

  // Update cart item quantity
  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, Math.min(item.quantity + delta, item.stock));
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const total = taxableAmount + taxAmount;
  const change = cashReceived ? Math.max(0, parseFloat(cashReceived) - total) : 0;

  // Complete sale
  const completeSale = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    if (paymentMethod === 'cash' && parseFloat(cashReceived) < total) {
      alert('Insufficient cash received!');
      return;
    }

    // TODO: Replace with actual API call to create invoice
    console.log('Completing sale:', {
      customer: selectedCustomer,
      items: cart,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      paymentMethod,
      cashReceived: paymentMethod === 'cash' ? parseFloat(cashReceived) : total,
      change,
    });

    setShowReceipt(true);
  };

  // Reset POS
  const resetPOS = () => {
    setCart([]);
    setSelectedCustomer('Walk-in Customer');
    setPaymentMethod('cash');
    setCashReceived('');
    setDiscount(0);
    setShowReceipt(false);
    setSearchTerm('');
  };

  // Print receipt
  const printReceipt = () => {
    window.print();
  };

  if (showReceipt) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="print:shadow-none">
            <CardHeader className="text-center border-b">
              <CardTitle className="text-2xl">Sale Complete!</CardTitle>
              <p className="text-sm text-muted-foreground">Transaction #{new Date().getTime()}</p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Receipt Header */}
              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold">My Pharmacy</h2>
                <p className="text-sm text-muted-foreground">123 Health Street</p>
                <p className="text-sm text-muted-foreground">Phone: (555) 123-4567</p>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleString()}</p>
              </div>

              {/* Customer Info */}
              <div className="border-t border-b py-3">
                <p className="text-sm">
                  <span className="font-semibold">Customer:</span> {selectedCustomer}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Payment:</span> {paymentMethod.toUpperCase()}
                </p>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({discount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Tax ({taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {paymentMethod === 'cash' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Cash Received:</span>
                      <span>${parseFloat(cashReceived).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-green-600">
                      <span>Change:</span>
                      <span>${change.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-muted-foreground border-t pt-3">
                <p>Thank you for your purchase!</p>
                <p>Please retain this receipt for your records</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 print:hidden">
                <Button onClick={printReceipt} className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
                <Button onClick={resetPOS} variant="outline" className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  New Sale
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <PageContainer maxWidth="7xl">
      <PageHeader
        title="Point of Sale"
        subtitle="Quick checkout and sales processing"
        action={
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Badge variant="outline" className="text-lg px-4 py-2">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </Badge>
          </div>
        }
      />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Search & Selection */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name, SKU, or scan barcode..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10 h-12 text-lg"
                    autoFocus
                  />
                  <Barcode className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {(searchTerm ? filteredProducts : mockProducts.slice(0, 8)).map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => addToCart(product)}
                >
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">{product.sku}</p>
                      </div>
                      {product.requiresPrescription && (
                        <Badge variant="destructive" className="text-xs shrink-0 ml-1">
                          Rx
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {product.stock} in stock
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Cart & Checkout */}
          <div className="space-y-4">
            {/* Cart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => setCart([])}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Cart is empty</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 border rounded">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-red-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer & Payment */}
            {cart.length > 0 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Customer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={selectedCustomer}
                        onChange={(e) => setSelectedCustomer(e.target.value)}
                        placeholder="Customer name or 'Walk-in'"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('cash')}
                        className="flex flex-col h-auto py-3"
                      >
                        <DollarSign className="h-5 w-5 mb-1" />
                        <span className="text-xs">Cash</span>
                      </Button>
                      <Button
                        variant={paymentMethod === 'card' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('card')}
                        className="flex flex-col h-auto py-3"
                      >
                        <CreditCard className="h-5 w-5 mb-1" />
                        <span className="text-xs">Card</span>
                      </Button>
                      <Button
                        variant={paymentMethod === 'insurance' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('insurance')}
                        className="flex flex-col h-auto py-3"
                      >
                        <User className="h-5 w-5 mb-1" />
                        <span className="text-xs">Insurance</span>
                      </Button>
                    </div>

                    {paymentMethod === 'cash' && (
                      <div>
                        <label className="text-sm font-medium">Cash Received</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={cashReceived}
                          onChange={(e) => setCashReceived(e.target.value)}
                          placeholder="0.00"
                          className="mt-1"
                        />
                        {cashReceived && parseFloat(cashReceived) >= total && (
                          <p className="text-sm text-green-600 mt-1">
                            Change: ${change.toFixed(2)}
                          </p>
                        )}
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">Discount (%)</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={discount}
                        onChange={(e) => setDiscount(Math.max(0, Math.min(100, parseFloat(e.target.value) || 0)))}
                        placeholder="0"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Total */}
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({discount}%):</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Tax ({taxRate}%):</span>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Complete Sale Button */}
          <Button
            onClick={completeSale}
            className="w-full h-14 text-lg font-semibold"
            size="lg"
          >
            <Check className="h-5 w-5 mr-2" />
            Complete Sale - ${total.toFixed(2)}
          </Button>
        </>
      )}
    </div>
  </div>
</PageContainer>
);
}
