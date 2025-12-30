import { useState } from 'react';
import { X, Plus, Calendar, Package, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BatchFormData {
  drugId: string;
  batchNumber: string;
  expiryDate: string;
  quantity: number;
  costPrice: number;
  sellingPrice: number;
  supplier: string;
  manufacturingDate: string;
  notes: string;
}

interface AddBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BatchFormData) => void;
  drugId?: string;
  drugName?: string;
}

export function AddBatchModal({
  isOpen,
  onClose,
  onSubmit,
  drugId = '',
  drugName = '',
}: AddBatchModalProps) {
  const [formData, setFormData] = useState<BatchFormData>({
    drugId,
    batchNumber: '',
    expiryDate: '',
    quantity: 0,
    costPrice: 0,
    sellingPrice: 0,
    supplier: '',
    manufacturingDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BatchFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BatchFormData, string>> = {};

    if (!formData.drugId) newErrors.drugId = 'Drug selection is required';
    if (!formData.batchNumber.trim()) newErrors.batchNumber = 'Batch number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (formData.quantity <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (formData.costPrice <= 0) newErrors.costPrice = 'Cost price must be greater than 0';
    if (formData.sellingPrice <= 0) newErrors.sellingPrice = 'Selling price must be greater than 0';

    // Check if expiry date is in the future
    const expiryDate = new Date(formData.expiryDate);
    const today = new Date();
    if (expiryDate <= today) {
      newErrors.expiryDate = 'Expiry date must be in the future';
    }

    // Check if manufacturing date is before expiry date
    if (formData.manufacturingDate) {
      const mfgDate = new Date(formData.manufacturingDate);
      if (mfgDate >= expiryDate) {
        newErrors.manufacturingDate = 'Manufacturing date must be before expiry date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      drugId: '',
      batchNumber: '',
      expiryDate: '',
      quantity: 0,
      costPrice: 0,
      sellingPrice: 0,
      supplier: '',
      manufacturingDate: '',
      notes: '',
    });
    setErrors({});
    onClose();
  };

  const handleChange = (field: keyof BatchFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Add New Batch
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Drug Info */}
            {drugName && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm font-medium text-blue-900">
                  Adding batch for: <span className="font-bold">{drugName}</span>
                </p>
              </div>
            )}

            {/* Batch Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="batchNumber">
                  Batch Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => handleChange('batchNumber', e.target.value)}
                  placeholder="e.g., BATCH-2024-001"
                  className={errors.batchNumber ? 'border-red-500' : ''}
                />
                {errors.batchNumber && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.batchNumber}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity || ''}
                  onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className={errors.quantity ? 'border-red-500' : ''}
                />
                {errors.quantity && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.quantity}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="manufacturingDate"
                    type="date"
                    value={formData.manufacturingDate}
                    onChange={(e) => handleChange('manufacturingDate', e.target.value)}
                    className={`pl-10 ${errors.manufacturingDate ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.manufacturingDate && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.manufacturingDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">
                  Expiry Date <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange('expiryDate', e.target.value)}
                    className={`pl-10 ${errors.expiryDate ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.expiryDate && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.expiryDate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="costPrice">
                  Cost Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.costPrice || ''}
                    onChange={(e) => handleChange('costPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`pl-10 ${errors.costPrice ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.costPrice && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.costPrice}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellingPrice">
                  Selling Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.sellingPrice || ''}
                    onChange={(e) => handleChange('sellingPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={`pl-10 ${errors.sellingPrice ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.sellingPrice && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.sellingPrice}
                  </p>
                )}
                {formData.sellingPrice > 0 && formData.costPrice > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Margin: {((formData.sellingPrice - formData.costPrice) / formData.costPrice * 100).toFixed(1)}%
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => handleChange('supplier', e.target.value)}
                  placeholder="Supplier name"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Additional notes about this batch..."
                  className="w-full min-h-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Summary */}
            {formData.quantity > 0 && formData.costPrice > 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Batch Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total Cost:</span>
                    <span className="font-bold ml-2">
                      ${(formData.quantity * formData.costPrice).toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-bold ml-2">
                      ${(formData.quantity * formData.sellingPrice).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Add Batch
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
