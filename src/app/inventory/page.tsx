'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ExcelStockUpload from '@/components/ExcelStockUpload';
import AddDrugForm from '@/components/form/AddDrugForm';
import { BarcodeQRManager } from '@/components/BarcodeQRManager';
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Calendar,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  FileSpreadsheet,
  Eye,
  ShoppingCart,
  Bell,
  ScanLine,
  Upload,
  MapPin,
  Building2,
  DollarSign,
  Hash,
  Download,
  RefreshCw,
  QrCode,
  Settings,
  Archive
} from 'lucide-react';

// Enhanced interfaces
export interface Drug {
  id: string;
  name: string;
  genericName: string;
  strength: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops' | 'inhaler' | 'powder';
  manufacturer: string;
  supplierId: string;
  supplierName?: string;
  category: string;
  therapeutic_class: string;
  barcode?: string;
  qr_code?: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderLevel: number;
  unitPrice: number;
  sellingPrice: number;
  location: string;
  shelf: string;
  description?: string;
  sideEffects?: string;
  dosageInstructions?: string;
  prescriptionRequired: boolean;
  refrigerationRequired: boolean;
  controlled_substance: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Batch {
  id: string;
  drugId: string;
  drugName: string;
  batchNumber: string;
  expiryDate: Date;
  manufacturingDate: Date;
  quantity: number;
  remainingQuantity: number;
  costPrice: number;
  supplierId: string;
  supplierName: string;
  receivedDate: Date;
  purchaseOrderId?: string;
  status: 'active' | 'expired' | 'recalled' | 'quarantine' | 'disposed';
  notes?: string;
}

export interface StockAlert {
  id: string;
  drugId: string;
  drugName: string;
  alertType: 'low_stock' | 'expired' | 'expiring_soon' | 'overstock' | 'reorder';
  priority: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  createdAt: Date;
  resolved: boolean;
  batchId?: string;
}

// Drug Detail Modal Component
function DrugDetailModal({ drug, batches, purchaseOrders, isOpen, onClose, onEdit, onDelete, onUpdateStock }: {
  drug: Drug | null;
  batches: Batch[];
  purchaseOrders: PurchaseOrder[];
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateStock: (drugId: string, newStock: number) => void;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stockAdjustment, setStockAdjustment] = useState(0);
  const [adjustmentReason, setAdjustmentReason] = useState('');
  
  if (!isOpen || !drug) return null;
  
  const drugBatches = batches.filter(batch => batch.drugId === drug.id);
  const drugPurchaseOrders = purchaseOrders.filter(po => 
    po.items.some(item => item.drugId === drug.id)
  );
  const stockStatus = drug.currentStock <= drug.minStockLevel ? 'low' : 
                     drug.currentStock >= drug.maxStockLevel ? 'high' : 'normal';

  const handleStockUpdate = () => {
    if (stockAdjustment !== 0 && adjustmentReason.trim()) {
      const newStock = drug.currentStock + stockAdjustment;
      onUpdateStock(drug.id, Math.max(0, newStock));
      setStockAdjustment(0);
      setAdjustmentReason('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold">{drug.name}</h3>
            <p className="text-muted-foreground">{drug.genericName} • {drug.strength} • {drug.form}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" onClick={onDelete} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b mb-6 overflow-x-auto">
          {['overview', 'batches', 'stock', 'supplier', 'orders', 'barcodes'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab)}
              className="capitalize whitespace-nowrap"
            >
              {tab === 'orders' ? 'Purchase Orders' : tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Basic Information
                </h4>
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Drug ID:</span>
                    <span className="font-medium">{drug.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{drug.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Therapeutic Class:</span>
                    <span className="font-medium">{drug.therapeutic_class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manufacturer:</span>
                    <span className="font-medium">{drug.manufacturer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{drug.location} ({drug.shelf})</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Clinical Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Description:</span>
                    <p className="text-sm mt-1">{drug.description || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Dosage Instructions:</span>
                    <p className="text-sm mt-1">{drug.dosageInstructions || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Side Effects:</span>
                    <p className="text-sm mt-1">{drug.sideEffects || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Stock Information
                </h4>
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Current Stock:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{drug.currentStock}</span>
                      <Badge variant={stockStatus === 'low' ? 'destructive' : stockStatus === 'high' ? 'secondary' : 'default'}>
                        {stockStatus === 'low' ? 'Low Stock' : stockStatus === 'high' ? 'Overstock' : 'Normal'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Minimum Level:</span>
                    <span className="font-medium">{drug.minStockLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Maximum Level:</span>
                    <span className="font-medium">{drug.maxStockLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reorder Level:</span>
                    <span className="font-medium">{drug.reorderLevel}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pricing & Financial
                </h4>
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unit Cost:</span>
                    <span className="font-medium">${drug.unitPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Selling Price:</span>
                    <span className="font-medium">${drug.sellingPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profit Margin:</span>
                    <span className="font-medium text-green-600">
                      {(((drug.sellingPrice - drug.unitPrice) / drug.sellingPrice) * 100).toFixed(1)}%
                    </span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-medium">${(drug.currentStock * drug.sellingPrice).toFixed(2)}</span>
                  </div> */}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Regulatory Status
                </h4>
                <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-2">
                    {drug.prescriptionRequired ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                    <span className="text-sm">Prescription Required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {drug.controlled_substance ? <CheckCircle className="h-4 w-4 text-orange-500" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                    <span className="text-sm">Controlled Substance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {drug.refrigerationRequired ? <CheckCircle className="h-4 w-4 text-blue-500" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                    <span className="text-sm">Refrigeration Required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'batches' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Batch Information & Expiry Tracking
              </h4>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Batch
              </Button>
            </div>
            {drugBatches.length > 0 ? (
              <div className="space-y-3">
                {drugBatches.map((batch) => {
                  const daysUntilExpiry = Math.ceil((batch.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isExpired = daysUntilExpiry <= 0;
                  const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
                  
                  return (
                    <div key={batch.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-medium">Batch #{batch.batchNumber}</h5>
                          <p className="text-sm text-muted-foreground">
                            Received: {batch.receivedDate.toLocaleDateString()} • Supplier: {batch.supplierName}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={batch.status === 'active' ? 'default' : 
                                        batch.status === 'expired' ? 'destructive' : 'secondary'}>
                            {batch.status}
                          </Badge>
                          {isExpired && <Badge variant="destructive">Expired</Badge>}
                          {isExpiringSoon && <Badge variant="outline" className="border-orange-500 text-orange-600">
                            Expires in {daysUntilExpiry} days
                          </Badge>}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <p className="font-medium">{batch.remainingQuantity}/{batch.quantity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expiry Date:</span>
                          <p className={`font-medium ${isExpired ? 'text-red-600' : isExpiringSoon ? 'text-orange-600' : ''}`}>
                            {batch.expiryDate.toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cost Price:</span>
                          <p className="font-medium">${batch.costPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">PO Number:</span>
                          <p className="font-medium">{batch.purchaseOrderId || 'N/A'}</p>
                        </div>
                      </div>
                      {batch.notes && (
                        <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-muted-foreground">Notes:</span>
                          <p className="text-sm">{batch.notes}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                No batch information available
              </div>
            )}
          </div>
        )}

        {activeTab === 'stock' && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium flex items-center">
              <RefreshCw className="h-5 w-5 mr-2" />
              Stock Adjustments
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Adjust Stock Level</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Current Stock:</span>
                    <p className="text-2xl font-bold">{drug.currentStock}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Adjustment Quantity:</label>
                    <Input 
                      type="number" 
                      value={stockAdjustment} 
                      onChange={(e) => setStockAdjustment(parseInt(e.target.value) || 0)}
                      placeholder="+/- quantity"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Reason for Adjustment:</label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={adjustmentReason}
                      onChange={(e) => setAdjustmentReason(e.target.value)}
                    >
                      <option value="">Select reason...</option>
                      <option value="received">Stock Received</option>
                      <option value="sold">Stock Sold</option>
                      <option value="damaged">Damaged/Expired</option>
                      <option value="theft">Theft/Loss</option>
                      <option value="transfer">Transfer</option>
                      <option value="correction">Inventory Correction</option>
                    </select>
                  </div>
                  {stockAdjustment !== 0 && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <span className="text-sm text-muted-foreground">New Stock Level:</span>
                      <p className="font-medium">
                        {drug.currentStock} {stockAdjustment >= 0 ? '+' : ''}{stockAdjustment} = {Math.max(0, drug.currentStock + stockAdjustment)}
                      </p>
                    </div>
                  )}
                  <Button 
                    onClick={handleStockUpdate} 
                    className="w-full"
                    disabled={stockAdjustment === 0 || !adjustmentReason.trim()}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Update Stock Level
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Stock History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div>
                        <p className="text-sm font-medium">Initial Stock</p>
                        <p className="text-xs text-muted-foreground">Created: {drug.createdAt.toLocaleDateString()}</p>
                      </div>
                      <span className="text-sm font-medium">{drug.currentStock}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-xs text-muted-foreground">{drug.updatedAt.toLocaleDateString()}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">Current levels</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'supplier' && (
          <div className="space-y-4">
            <h4 className="text-lg font-medium flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Supplier Information
            </h4>
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div>
                  <h5 className="font-medium">{drug.supplierName || 'No supplier assigned'}</h5>
                  <p className="text-sm text-muted-foreground">Primary Supplier (ID: {drug.supplierId})</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Order:</span>
                  <p className="font-medium">Nov 12, 2024</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Lead Time:</span>
                  <p className="font-medium">3-5 days</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Min Order Qty:</span>
                  <p className="font-medium">100 units</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Unit Cost:</span>
                  <p className="font-medium">${drug.unitPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Supplier
                </Button>
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Create Order
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Auto Reorder
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Purchase Order History
              </h4>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </div>
            {drugPurchaseOrders.length > 0 ? (
              <div className="space-y-3">
                {drugPurchaseOrders.map((po) => {
                  const drugItem = po.items.find(item => item.drugId === drug.id);
                  if (!drugItem) return null;
                  
                  return (
                    <div key={po.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h5 className="font-medium">{po.id} - {po.supplierName}</h5>
                          <p className="text-sm text-muted-foreground">
                            Ordered: {po.orderDate.toLocaleDateString()} • Expected: {po.expectedDelivery.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={po.status === 'delivered' ? 'default' : 
                                        po.status === 'shipped' ? 'outline' : 'secondary'}>
                            {po.status}
                          </Badge>
                          <Badge variant={po.paymentStatus === 'paid' ? 'default' : 'destructive'}>
                            {po.paymentStatus}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <p className="font-medium">{drugItem.quantity}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Unit Price:</span>
                          <p className="font-medium">${drugItem.unitPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total:</span>
                          <p className="font-medium">${drugItem.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                No purchase orders found for this drug
              </div>
            )}
          </div>
        )}

        {activeTab === 'barcodes' && (
          <div className="space-y-6">
            <h4 className="text-lg font-medium flex items-center">
              <QrCode className="h-5 w-5 mr-2" />
              Barcode & QR Code Management
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Barcode</label>
                  <Input defaultValue={drug.barcode || 'Not assigned'} readOnly />
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="text-2xl font-mono tracking-widest border p-2 inline-block bg-white">
                    ||||| |||| ||||| |||||
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{drug.barcode || 'No barcode assigned'}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Print Barcode
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">QR Code</label>
                  <Input defaultValue={drug.qr_code || 'Not assigned'} readOnly />
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-24 h-24 border-2 border-dashed border-gray-400 mx-auto flex items-center justify-center bg-white">
                    <QrCode className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{drug.qr_code || 'No QR code assigned'}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Print QR Code
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-medium mb-3">Generate New Codes</h5>
              <BarcodeQRManager 
                onBarcodeScanned={(barcode) => {
                  console.log('Barcode scanned:', barcode);
                  // Update drug barcode in state
                }}
                onQRCodeGenerated={(qrData) => {
                  console.log('QR Code generated:', qrData);
                  // Update drug QR code in state
                }}
                drugData={{
                  name: drug.name,
                  genericName: drug.genericName,
                  strength: drug.strength,
                  manufacturer: drug.manufacturer,
                  ndc: drug.barcode || '',
                  lotNumber: '',
                  expiryDate: ''
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Edit Drug Modal Component
function EditDrugModal({ drug, isOpen, onClose, onSave }: {
  drug: Drug | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedDrug: Drug) => void;
}) {
  const [formData, setFormData] = useState<Partial<Drug>>({});

  useEffect(() => {
    if (drug) {
      setFormData(drug);
    }
  }, [drug]);

  if (!isOpen || !drug) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.genericName) {
      onSave({
        ...drug,
        ...formData,
        updatedAt: new Date()
      } as Drug);
    }
  };

  const handleInputChange = (field: keyof Drug, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Edit Drug Information</h3>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Basic Information</h4>
              <div>
                <label className="block text-sm font-medium mb-2">Drug Name *</label>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Generic Name *</label>
                <Input
                  value={formData.genericName || ''}
                  onChange={(e) => handleInputChange('genericName', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Strength</label>
                  <Input
                    value={formData.strength || ''}
                    onChange={(e) => handleInputChange('strength', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Form</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.form || ''}
                    onChange={(e) => handleInputChange('form', e.target.value)}
                  >
                    <option value="tablet">Tablet</option>
                    <option value="capsule">Capsule</option>
                    <option value="syrup">Syrup</option>
                    <option value="injection">Injection</option>
                    <option value="cream">Cream</option>
                    <option value="drops">Drops</option>
                    <option value="inhaler">Inhaler</option>
                    <option value="powder">Powder</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Manufacturer</label>
                <Input
                  value={formData.manufacturer || ''}
                  onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Input
                  value={formData.category || ''}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Therapeutic Class</label>
                <Input
                  value={formData.therapeutic_class || ''}
                  onChange={(e) => handleInputChange('therapeutic_class', e.target.value)}
                />
              </div>
            </div>

            {/* Stock & Pricing */}
            <div className="space-y-4">
              <h4 className="font-medium text-lg">Stock & Pricing</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Stock</label>
                  <Input
                    type="number"
                    value={formData.currentStock || 0}
                    onChange={(e) => handleInputChange('currentStock', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Min Stock Level</label>
                  <Input
                    type="number"
                    value={formData.minStockLevel || 0}
                    onChange={(e) => handleInputChange('minStockLevel', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Max Stock Level</label>
                  <Input
                    type="number"
                    value={formData.maxStockLevel || 0}
                    onChange={(e) => handleInputChange('maxStockLevel', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reorder Level</label>
                  <Input
                    type="number"
                    value={formData.reorderLevel || 0}
                    onChange={(e) => handleInputChange('reorderLevel', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Unit Price ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.unitPrice || 0}
                    onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Selling Price ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice || 0}
                    onChange={(e) => handleInputChange('sellingPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={formData.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Shelf</label>
                  <Input
                    value={formData.shelf || ''}
                    onChange={(e) => handleInputChange('shelf', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Barcode</label>
                  <Input
                    value={formData.barcode || ''}
                    onChange={(e) => handleInputChange('barcode', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">QR Code</label>
                  <Input
                    value={formData.qr_code || ''}
                    onChange={(e) => handleInputChange('qr_code', e.target.value)}
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="prescriptionRequired"
                    checked={formData.prescriptionRequired || false}
                    onChange={(e) => handleInputChange('prescriptionRequired', e.target.checked)}
                  />
                  <label htmlFor="prescriptionRequired" className="text-sm">Prescription Required</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="refrigerationRequired"
                    checked={formData.refrigerationRequired || false}
                    onChange={(e) => handleInputChange('refrigerationRequired', e.target.checked)}
                  />
                  <label htmlFor="refrigerationRequired" className="text-sm">Refrigeration Required</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="controlledSubstance"
                    checked={formData.controlled_substance || false}
                    onChange={(e) => handleInputChange('controlled_substance', e.target.checked)}
                  />
                  <label htmlFor="controlledSubstance" className="text-sm">Controlled Substance</label>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Instructions */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Dosage Instructions</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
                value={formData.dosageInstructions || ''}
                onChange={(e) => handleInputChange('dosageInstructions', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Side Effects</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={2}
                value={formData.sideEffects || ''}
                onChange={(e) => handleInputChange('sideEffects', e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Purchase Order integration interface
export interface PurchaseOrder {
  id: string;
  supplierId: string;
  supplierName: string;
  orderDate: Date;
  expectedDelivery: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  items: {
    drugId: string;
    drugName: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  paymentStatus: 'pending' | 'paid' | 'overdue';
}

// Mock data
const mockDrugs: Drug[] = [
  {
    id: 'DRG001',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    strength: '500mg',
    form: 'tablet',
    manufacturer: 'PharmaCorp Ltd.',
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    category: 'Analgesics',
    therapeutic_class: 'Non-opioid analgesic',
    barcode: '1234567890123',
    qr_code: 'QR_PAR_500_001',
    currentStock: 85,
    minStockLevel: 100,
    maxStockLevel: 1000,
    reorderLevel: 150,
    unitPrice: 0.25,
    sellingPrice: 0.65,
    location: 'Shelf A-1',
    shelf: 'A1-B2-C3',
    description: 'Pain relief and fever reducer',
    sideEffects: 'Nausea, skin rash (rare)',
    dosageInstructions: '1-2 tablets every 6-8 hours, max 8 tablets/day',
    prescriptionRequired: false,
    refrigerationRequired: false,
    controlled_substance: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-12'),
  },
  {
    id: 'DRG002',
    name: 'Amoxicillin',
    genericName: 'Amoxicillin trihydrate',
    strength: '250mg',
    form: 'capsule',
    manufacturer: 'BioPharm Industries',
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    category: 'Antibiotics',
    therapeutic_class: 'Penicillin antibiotic',
    barcode: '2345678901234',
    qr_code: 'QR_AMX_250_002',
    currentStock: 45,
    minStockLevel: 50,
    maxStockLevel: 500,
    reorderLevel: 75,
    unitPrice: 0.85,
    sellingPrice: 1.25,
    location: 'Refrigerator R-1',
    shelf: 'R1-A1-B2',
    description: 'Broad-spectrum antibiotic',
    sideEffects: 'Diarrhea, nausea, allergic reactions',
    dosageInstructions: '250-500mg every 8 hours for 7-10 days',
    prescriptionRequired: true,
    refrigerationRequired: true,
    controlled_substance: false,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-11-10'),
  },
  {
    id: 'DRG003',
    name: 'Insulin Glargine',
    genericName: 'Insulin glargine',
    strength: '100 units/ml',
    form: 'injection',
    manufacturer: 'DiabetesCare Corp',
    supplierId: 'SUP002',
    supplierName: 'Global Health Supplies',
    category: 'Diabetes Medications',
    therapeutic_class: 'Long-acting insulin',
    barcode: '3456789012345',
    qr_code: 'QR_INS_100_003',
    currentStock: 25,
    minStockLevel: 20,
    maxStockLevel: 100,
    reorderLevel: 30,
    unitPrice: 45.50,
    sellingPrice: 62.00,
    location: 'Refrigerator R-2',
    shelf: 'R2-C1-D2',
    description: 'Long-acting insulin for diabetes management',
    sideEffects: 'Hypoglycemia, injection site reactions',
    dosageInstructions: 'Inject subcutaneously once daily at same time',
    prescriptionRequired: true,
    refrigerationRequired: true,
    controlled_substance: false,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-11-08'),
  },
  {
    id: 'DRG004',
    name: 'Codeine Phosphate',
    genericName: 'Codeine phosphate',
    strength: '30mg',
    form: 'tablet',
    manufacturer: 'ControlledMeds Ltd.',
    supplierId: 'SUP003',
    supplierName: 'BioChem Solutions',
    category: 'Controlled Substances',
    therapeutic_class: 'Opioid analgesic',
    barcode: '4567890123456',
    qr_code: 'QR_COD_30_004',
    currentStock: 15,
    minStockLevel: 10,
    maxStockLevel: 50,
    reorderLevel: 20,
    unitPrice: 2.75,
    sellingPrice: 4.50,
    location: 'Controlled Safe CS-1',
    shelf: 'CS1-L1-T1',
    description: 'Opioid pain medication for moderate pain',
    sideEffects: 'Drowsiness, constipation, nausea, potential dependency',
    dosageInstructions: '15-60mg every 4 hours as needed for pain',
    prescriptionRequired: true,
    refrigerationRequired: false,
    controlled_substance: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-11-11'),
  }
];

const mockBatches: Batch[] = [
  {
    id: 'BAT001',
    drugId: 'DRG001',
    drugName: 'Paracetamol 500mg',
    batchNumber: 'PCT2024001',
    expiryDate: new Date('2025-03-15'),
    manufacturingDate: new Date('2024-03-15'),
    quantity: 1000,
    remainingQuantity: 85,
    costPrice: 0.20,
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    receivedDate: new Date('2024-03-20'),
    purchaseOrderId: 'PO001',
    status: 'active',
    notes: 'Regular stock batch'
  },
  {
    id: 'BAT002',
    drugId: 'DRG002',
    drugName: 'Amoxicillin 250mg',
    batchNumber: 'AMX2024008',
    expiryDate: new Date('2024-12-31'),
    manufacturingDate: new Date('2024-01-15'),
    quantity: 500,
    remainingQuantity: 45,
    costPrice: 0.75,
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    receivedDate: new Date('2024-01-20'),
    purchaseOrderId: 'PO002',
    status: 'active',
    notes: 'Expiring soon - use first'
  }
];

// Mock purchase orders
const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    supplierId: 'SUP001',
    supplierName: 'MediCore Pharmaceuticals',
    orderDate: new Date('2024-11-10'),
    expectedDelivery: new Date('2024-11-15'),
    status: 'delivered',
    totalAmount: 2450.50,
    items: [
      {
        drugId: 'DRG001',
        drugName: 'Paracetamol 500mg',
        quantity: 1000,
        unitPrice: 0.20,
        total: 200.00
      },
      {
        drugId: 'DRG002',
        drugName: 'Amoxicillin 250mg',
        quantity: 500,
        unitPrice: 0.75,
        total: 375.00
      }
    ],
    paymentStatus: 'paid'
  },
  {
    id: 'PO002',
    supplierId: 'SUP002',
    supplierName: 'Global Pharma Supply',
    orderDate: new Date('2024-11-12'),
    expectedDelivery: new Date('2024-11-18'),
    status: 'shipped',
    totalAmount: 1875.00,
    items: [
      {
        drugId: 'DRG003',
        drugName: 'Ibuprofen 400mg',
        quantity: 750,
        unitPrice: 0.35,
        total: 262.50
      },
      {
        drugId: 'DRG004',
        drugName: 'Aspirin 75mg',
        quantity: 1200,
        unitPrice: 0.15,
        total: 180.00
      }
    ],
    paymentStatus: 'pending'
  }
];

// Generate stock alerts
const generateStockAlerts = (drugs: Drug[], batches: Batch[]): StockAlert[] => {
  const alerts: StockAlert[] = [];
  
  drugs.forEach(drug => {
    if (drug.currentStock <= drug.minStockLevel) {
      alerts.push({
        id: `ALT_LOW_${drug.id}`,
        drugId: drug.id,
        drugName: drug.name,
        alertType: 'low_stock',
        priority: drug.currentStock === 0 ? 'critical' : 'high',
        message: `${drug.name} is ${drug.currentStock === 0 ? 'out of stock' : 'running low'} (${drug.currentStock} remaining)`,
        createdAt: new Date(),
        resolved: false
      });
    }
    
    if (drug.currentStock <= drug.reorderLevel) {
      alerts.push({
        id: `ALT_REORDER_${drug.id}`,
        drugId: drug.id,
        drugName: drug.name,
        alertType: 'reorder',
        priority: 'medium',
        message: `${drug.name} has reached reorder level (${drug.currentStock}/${drug.reorderLevel})`,
        createdAt: new Date(),
        resolved: false
      });
    }
  });
  
  batches.forEach(batch => {
    if (batch.status === 'active') {
      const daysUntilExpiry = Math.ceil((batch.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 0) {
        alerts.push({
          id: `ALT_EXP_${batch.id}`,
          drugId: batch.drugId,
          drugName: batch.drugName,
          alertType: 'expired',
          priority: 'critical',
          message: `Batch ${batch.batchNumber} of ${batch.drugName} has expired`,
          createdAt: new Date(),
          resolved: false,
          batchId: batch.id
        });
      } else if (daysUntilExpiry <= 30) {
        alerts.push({
          id: `ALT_EXPSOON_${batch.id}`,
          drugId: batch.drugId,
          drugName: batch.drugName,
          alertType: 'expiring_soon',
          priority: daysUntilExpiry <= 7 ? 'high' : 'medium',
          message: `Batch ${batch.batchNumber} of ${batch.drugName} expires in ${daysUntilExpiry} days`,
          createdAt: new Date(),
          resolved: false,
          batchId: batch.id
        });
      }
    }
  });
  
  return alerts;
};

function InventoryMetrics({ drugs, batches }: { drugs: Drug[], batches: Batch[] }) {
  const totalProducts = drugs.length;
  const lowStockCount = drugs.filter(drug => drug.currentStock <= drug.minStockLevel).length;
  const expiredBatches = batches.filter(batch => new Date() > batch.expiryDate).length;
  const expiringBatches = batches.filter(batch => {
    const daysUntilExpiry = Math.ceil((batch.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  }).length;
  const totalValue = drugs.reduce((sum, drug) => sum + (drug.currentStock * drug.sellingPrice), 0);
  const controlledSubstances = drugs.filter(drug => drug.controlled_substance).length;
  const refrigeratedItems = drugs.filter(drug => drug.refrigerationRequired).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 shrink-0" />
            <div className="ml-3">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Products</p>
              <p className="text-lg sm:text-xl font-bold">{totalProducts}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 shrink-0" />
            <div className="ml-3">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Low Stock</p>
              <p className="text-lg sm:text-xl font-bold">{lowStockCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 shrink-0" />
            <div className="ml-3">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Expiring Soon</p>
              <p className="text-lg sm:text-xl font-bold">{expiringBatches}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center">
            <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-700 shrink-0" />
            <div className="ml-3">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Expired</p>
              <p className="text-lg sm:text-xl font-bold">{expiredBatches}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 shrink-0" />
            <div className="ml-3">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Total Value</p>
              <p className="text-lg sm:text-xl font-bold">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card> */}
      
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center">
            <Archive className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 shrink-0" />
            <div className="ml-3">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Controlled</p>
              <p className="text-lg sm:text-xl font-bold">{controlledSubstances}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-cyan-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-muted-foreground">Refrigerated</p>
              <p className="text-xl font-bold">{refrigeratedItems}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StockAlertsPanel({ alerts }: { alerts: StockAlert[] }) {
  const criticalAlerts = alerts.filter(alert => alert.priority === 'critical');
  const highAlerts = alerts.filter(alert => alert.priority === 'high');
  const mediumAlerts = alerts.filter(alert => alert.priority === 'medium');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Stock Alerts ({alerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {criticalAlerts.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-red-600 mb-2">Critical ({criticalAlerts.length})</h4>
              {criticalAlerts.slice(0, 3).map(alert => (
                <div key={alert.id} className="flex items-center space-x-2 p-2 bg-red-50 dark:bg-red-950 rounded">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm">{alert.message}</span>
                </div>
              ))}
            </div>
          )}
          
          {highAlerts.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-orange-600 mb-2">High Priority ({highAlerts.length})</h4>
              {highAlerts.slice(0, 3).map(alert => (
                <div key={alert.id} className="flex items-center space-x-2 p-2 bg-orange-50 dark:bg-orange-950 rounded">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{alert.message}</span>
                </div>
              ))}
            </div>
          )}
          
          {mediumAlerts.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-yellow-600 mb-2">Medium Priority ({mediumAlerts.length})</h4>
              {mediumAlerts.slice(0, 2).map(alert => (
                <div key={alert.id} className="flex items-center space-x-2 p-2 bg-yellow-50 dark:bg-yellow-950 rounded">
                  <Package className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{alert.message}</span>
                </div>
              ))}
            </div>
          )}
          
          {alerts.length > 8 && (
            <Button variant="outline" size="sm" className="w-full">
              View All Alerts ({alerts.length})
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function DrugInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [drugs, setDrugs] = useState<Drug[]>(mockDrugs);
  const [batches] = useState<Batch[]>(mockBatches);
  const [purchaseOrders] = useState<PurchaseOrder[]>(mockPurchaseOrders);
  const [isAddingDrug, setIsAddingDrug] = useState(false);
  const [isUploadingExcel, setIsUploadingExcel] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [activeTab, setActiveTab] = useState('inventory');
  
  // Drug detail modal state
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [isDrugDetailModalOpen, setIsDrugDetailModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const stockAlerts = useMemo(() => generateStockAlerts(drugs, batches), [drugs, batches]);
  
  const categories = ['All', ...Array.from(new Set(drugs.map(drug => drug.category)))];
  const statusOptions = ['All', 'Low Stock', 'Normal', 'Overstock', 'Out of Stock'];

  const handleAddDrug = (formData: any) => {
    const newDrug: Drug = {
      id: `DRG${String(drugs.length + 1).padStart(3, '0')}`,
      name: formData.name,
      genericName: formData.genericName,
      strength: formData.strength,
      form: formData.form as Drug['form'],
      manufacturer: formData.manufacturer,
      supplierId: formData.supplierId || 'SUP001',
      supplierName: formData.supplierName || 'Default Supplier',
      category: formData.category,
      therapeutic_class: formData.therapeutic_class || '',
      barcode: formData.barcode,
      qr_code: formData.qr_code,
      currentStock: parseInt(formData.currentStock) || 0,
      minStockLevel: parseInt(formData.minStockLevel) || 10,
      maxStockLevel: parseInt(formData.maxStockLevel) || 100,
      reorderLevel: parseInt(formData.reorderLevel) || 20,
      unitPrice: parseFloat(formData.unitPrice) || 0,
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      location: formData.location,
      shelf: formData.shelf || '',
      description: formData.description || '',
      sideEffects: formData.sideEffects || '',
      dosageInstructions: formData.dosageInstructions || '',
      prescriptionRequired: formData.prescriptionRequired || false,
      refrigerationRequired: formData.refrigerationRequired || false,
      controlled_substance: formData.controlled_substance || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setDrugs(prev => [...prev, newDrug]);
    setIsAddingDrug(false);
  };

  const handleExcelImport = (excelData: any[]) => {
    const newDrugs: Drug[] = excelData.map((row, index) => ({
      id: `DRG${String(drugs.length + index + 1).padStart(3, '0')}`,
      name: row.drugName || row.name,
      genericName: row.genericName || '',
      strength: row.strength || '',
      form: (row.form || 'tablet') as Drug['form'],
      manufacturer: row.manufacturer || '',
      supplierId: row.supplierId || 'SUP001',
      supplierName: row.supplierName || 'Default Supplier',
      category: row.category || 'General',
      therapeutic_class: row.therapeutic_class || '',
      barcode: row.barcode,
      qr_code: row.qr_code,
      currentStock: parseInt(row.currentStock) || 0,
      minStockLevel: parseInt(row.minStockLevel) || 10,
      maxStockLevel: parseInt(row.maxStockLevel) || 100,
      reorderLevel: parseInt(row.reorderLevel) || 20,
      unitPrice: parseFloat(row.unitCost || row.unitPrice) || 0,
      sellingPrice: parseFloat(row.sellingPrice) || 0,
      location: row.location || 'Not assigned',
      shelf: row.shelf || '',
      description: row.description || '',
      sideEffects: row.sideEffects || '',
      dosageInstructions: row.dosageInstructions || '',
      prescriptionRequired: row.prescriptionRequired === 'true' || false,
      refrigerationRequired: row.refrigerationRequired === 'true' || false,
      controlled_substance: row.controlled_substance === 'true' || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    setDrugs(prev => [...prev, ...newDrugs]);
    setIsUploadingExcel(false);
    alert(`Successfully imported ${newDrugs.length} drugs from Excel!`);
  };

  const handleBarcodeScanned = (barcode: string) => {
    const foundDrug = drugs.find(drug => drug.barcode === barcode || drug.qr_code === barcode);
    if (foundDrug) {
      setShowBarcodeScanner(false);
      alert(`Found: ${foundDrug.name} - Stock: ${foundDrug.currentStock}`);
    } else {
      alert('Drug not found with this barcode/QR code');
    }
  };

  // Drug detail modal handlers
  const handleDrugClick = (drug: Drug) => {
    setSelectedDrug(drug);
    setIsDrugDetailModalOpen(true);
  };

  const handleEditDrug = () => {
    setIsDrugDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSaveEditedDrug = (updatedDrug: Drug) => {
    setDrugs(prev => prev.map(drug => 
      drug.id === updatedDrug.id ? updatedDrug : drug
    ));
    setIsEditModalOpen(false);
    setSelectedDrug(null);
  };

  const handleDeleteDrug = () => {
    if (selectedDrug && confirm(`Are you sure you want to delete ${selectedDrug.name}?`)) {
      setDrugs(prev => prev.filter(drug => drug.id !== selectedDrug.id));
      setIsDrugDetailModalOpen(false);
      setSelectedDrug(null);
    }
  };

  const handleStockUpdate = (drugId: string, newStock: number) => {
    setDrugs(prev => prev.map(drug => 
      drug.id === drugId 
        ? { ...drug, currentStock: newStock, updatedAt: new Date() }
        : drug
    ));
  };

  const filteredDrugs = useMemo(() => {
    return drugs.filter(drug => {
      const matchesSearch = 
        drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drug.barcode?.includes(searchTerm) ||
        drug.qr_code?.includes(searchTerm);
      
      const matchesCategory = categoryFilter === 'All' || drug.category === categoryFilter;
      
      let matchesStatus = true;
      if (statusFilter === 'Low Stock') matchesStatus = drug.currentStock <= drug.minStockLevel;
      else if (statusFilter === 'Normal') matchesStatus = drug.currentStock > drug.minStockLevel && drug.currentStock < drug.maxStockLevel;
      else if (statusFilter === 'Overstock') matchesStatus = drug.currentStock >= drug.maxStockLevel;
      else if (statusFilter === 'Out of Stock') matchesStatus = drug.currentStock === 0;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [drugs, searchTerm, categoryFilter, statusFilter]);

  const getStockStatus = (drug: Drug) => {
    if (drug.currentStock === 0) return 'out';
    if (drug.currentStock <= drug.minStockLevel) return 'low';
    if (drug.currentStock >= drug.maxStockLevel) return 'high';
    return 'normal';
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'out': return <Badge variant="destructive">Out of Stock</Badge>;
      case 'low': return <Badge variant="destructive">Low Stock</Badge>;
      case 'high': return <Badge variant="secondary">Overstock</Badge>;
      default: return <Badge variant="default">Normal</Badge>;
    }
  };

  return (
    <div className="min-h-screen from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Drug Inventory Management</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Comprehensive drug tracking with batch management, barcode scanning, and automated alerts
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button 
            onClick={() => setShowBarcodeScanner(true)}
            variant="outline"
            className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <ScanLine className="w-4 h-4 mr-2" />
            Scan Barcode
          </Button>
          <Button 
            onClick={() => setIsUploadingExcel(true)}
            variant="outline"
            className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Excel
          </Button>
          <Button onClick={() => setIsAddingDrug(true)} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add Drug
          </Button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <InventoryMetrics drugs={drugs} batches={batches} />

      {/* Tabs */}
      <div className="flex space-x-2 border-b overflow-x-auto pb-2 scrollbar-hide">
        {[{id: 'inventory', label: 'Drug Inventory', icon: Package}, 
          {id: 'batches', label: 'Batch Tracking', icon: Calendar}, 
          {id: 'alerts', label: 'Stock Alerts', icon: Bell}].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center space-x-2 whitespace-nowrap"
          >
            <tab.icon className="h-4 w-4" />
            <span className="text-sm sm:text-base">{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1 min-w-full sm:min-w-64">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, manufacturer, barcode, or QR code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select 
          className="px-3 py-2 border rounded-md text-sm sm:text-base"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select 
          className="px-3 py-2 border rounded-md text-sm sm:text-base"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'inventory' && (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {/* Drug List */}
            <div className="grid gap-4">
              {filteredDrugs.map((drug) => {
                const stockStatus = getStockStatus(drug);
                const drugBatches = batches.filter(batch => batch.drugId === drug.id && batch.status === 'active');
                const nearestExpiry = drugBatches.length > 0 ? 
                  Math.min(...drugBatches.map(batch => batch.expiryDate.getTime())) : null;
                
                return (
                  <Card 
                    key={drug.id} 
                    className="cursor-pointer hover:shadow-lg transition-all"
                    onClick={() => handleDrugClick(drug)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-base sm:text-lg">{drug.name}</h3>
                            {getStockBadge(stockStatus)}
                            {drug.controlled_substance && <Badge variant="outline" className="border-purple-500 text-purple-600 text-xs">Controlled</Badge>}
                            {drug.refrigerationRequired && <Badge variant="outline" className="border-blue-500 text-blue-600 text-xs">Refrigerated</Badge>}
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {drug.genericName} • {drug.strength} • {drug.form}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {drug.category} • {drug.manufacturer}
                          </p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {drug.location}
                            </span>
                            {drug.barcode && (
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Hash className="h-3 w-3 mr-1" />
                                {drug.barcode}
                              </span>
                            )}
                            {drug.supplierName && (
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Building2 className="h-3 w-3 mr-1" />
                                {drug.supplierName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <p className="text-2xl font-bold">{drug.currentStock}</p>
                              <p className="text-xs text-muted-foreground">
                                Min: {drug.minStockLevel} | Reorder: {drug.reorderLevel}
                              </p>
                            </div>
                            <div className={`w-3 h-12 rounded ${
                              stockStatus === 'out' ? 'bg-red-500' :
                              stockStatus === 'low' ? 'bg-orange-500' :
                              stockStatus === 'high' ? 'bg-blue-500' : 'bg-green-500'
                            }`} />
                          </div>
                          <p className="text-sm font-medium">
                            ${drug.sellingPrice.toFixed(2)} each
                          </p>
                          {nearestExpiry && (
                            <p className="text-xs text-orange-600">
                              Next expiry: {new Date(nearestExpiry).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              {filteredDrugs.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No drugs found matching your criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <StockAlertsPanel alerts={stockAlerts.slice(0, 10)} />
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Stock Levels
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Inventory
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Reports
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Inventory Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'batches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Batch Tracking & Expiry Management</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Batch
            </Button>
          </div>
          
          {batches.map(batch => {
            const daysUntilExpiry = Math.ceil((batch.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const isExpired = daysUntilExpiry <= 0;
            const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
            
            return (
              <Card key={batch.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{batch.drugName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Batch #{batch.batchNumber} • {batch.supplierName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={batch.status === 'active' ? 'default' : 
                                    batch.status === 'expired' ? 'destructive' : 'secondary'}>
                        {batch.status}
                      </Badge>
                      {isExpired && <Badge variant="destructive">Expired</Badge>}
                      {isExpiringSoon && <Badge variant="outline" className="border-orange-500 text-orange-600">
                        Expires in {daysUntilExpiry} days
                      </Badge>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Quantity:</span>
                      <p className="font-medium">{batch.remainingQuantity}/{batch.quantity}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expiry Date:</span>
                      <p className={`font-medium ${isExpired ? 'text-red-600' : isExpiringSoon ? 'text-orange-600' : ''}`}>
                        {batch.expiryDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Received:</span>
                      <p className="font-medium">{batch.receivedDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cost:</span>
                      <p className="font-medium">${batch.costPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Total Value:</span>
                      <p className="font-medium">${(batch.remainingQuantity * batch.costPrice).toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <StockAlertsPanel alerts={stockAlerts} />
        </div>
      )}

      {/* Modals */}
      {isAddingDrug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <AddDrugForm
              onSubmit={handleAddDrug}
              onCancel={() => setIsAddingDrug(false)}
              isEditing={false}
            />
          </div>
        </div>
      )}

      {isUploadingExcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <ExcelStockUpload 
              onDataImport={handleExcelImport}
              onClose={() => setIsUploadingExcel(false)}
            />
          </div>
        </div>
      )}

      {/* Drug Detail Modal */}
      <DrugDetailModal
        drug={selectedDrug}
        batches={batches}
        purchaseOrders={purchaseOrders}
        isOpen={isDrugDetailModalOpen}
        onClose={() => {
          setIsDrugDetailModalOpen(false);
          setSelectedDrug(null);
        }}
        onEdit={handleEditDrug}
        onDelete={handleDeleteDrug}
        onUpdateStock={handleStockUpdate}
      />

      {/* Edit Drug Modal */}
      <EditDrugModal
        drug={selectedDrug}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDrug(null);
        }}
        onSave={handleSaveEditedDrug}
      />

      {showBarcodeScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Barcode/QR Scanner</h3>
              <Button variant="ghost" onClick={() => setShowBarcodeScanner(false)}>×</Button>
            </div>
            <BarcodeQRManager 
              onBarcodeScanned={handleBarcodeScanned}
              onQRCodeGenerated={() => {}}
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return <DrugInventory />;
}