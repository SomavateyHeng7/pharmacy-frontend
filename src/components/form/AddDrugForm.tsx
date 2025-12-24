"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Pill,
  Package,
  Calendar,
  DollarSign,
  MapPin,
  Building2,
  AlertCircle,
  Save,
  X,
  Barcode,
  FileText,
  Shield,
  QrCode,
  Scan,
  Download
} from 'lucide-react';

interface DrugFormData {
  name: string;
  genericName: string;
  brandName: string;
  strength: string;
  form: string;
  manufacturer: string;
  supplierId: string;
  category: string;
  description: string;
  activeIngredients: string;
  
  // Inventory Details
  currentStock: string;
  minStockLevel: string;
  maxStockLevel: string;
  reorderLevel: string;
  location: string;
  barcode: string;
  qrCode: string;
  
  // Pricing
  unitCost: string;
  sellingPrice: string;
  wholesalePrice: string;
  
  // Regulatory
  ndc: string; // National Drug Code
  lotNumber: string;
  expiryDate: string;
  manufacturingDate: string;
  
  // Additional Info
  storageConditions: string;
  sideEffects: string;
  contraindications: string;
  dosageInstructions: string;
  requiresPrescription: boolean;
  isControlledSubstance: boolean;
  scheduleClass: string;
}

interface AddDrugFormProps {
  onSubmit: (data: DrugFormData) => void;
  onCancel: () => void;
  initialData?: Partial<DrugFormData>;
  isEditing?: boolean;
}

const initialFormData: DrugFormData = {
  name: '',
  genericName: '',
  brandName: '',
  strength: '',
  form: '',
  manufacturer: '',
  supplierId: '',
  category: '',
  description: '',
  activeIngredients: '',
  
  currentStock: '0',
  minStockLevel: '10',
  maxStockLevel: '100',
  reorderLevel: '20',
  location: '',
  barcode: '',
  qrCode: '',
  
  unitCost: '0.00',
  sellingPrice: '0.00',
  wholesalePrice: '0.00',
  
  ndc: '',
  lotNumber: '',
  expiryDate: '',
  manufacturingDate: '',
  
  storageConditions: 'Room Temperature',
  sideEffects: '',
  contraindications: '',
  dosageInstructions: '',
  requiresPrescription: false,
  isControlledSubstance: false,
  scheduleClass: ''
};

const drugForms = [
  'Tablet', 'Capsule', 'Liquid/Syrup', 'Injection', 'Cream/Ointment',
  'Gel', 'Drops', 'Spray', 'Inhaler', 'Patch', 'Suppository', 'Powder'
];

const drugCategories = [
  'Prescription Drugs', 'Over-the-Counter', 'Antibiotics', 'Pain Relief',
  'Cardiovascular', 'Diabetes', 'Respiratory', 'Digestive', 'Neurological',
  'Vitamins & Supplements', 'Dermatological', 'Ophthalmological', 'Emergency'
];

const storageConditions = [
  'Room Temperature', 'Refrigerated (2-8°C)', 'Frozen (-20°C)',
  'Cool & Dry', 'Protected from Light', 'Controlled Room Temperature'
];

const scheduleClasses = [
  '', 'Schedule I', 'Schedule II', 'Schedule III', 'Schedule IV', 'Schedule V'
];

export function AddDrugForm({ onSubmit, onCancel, initialData, isEditing = false }: AddDrugFormProps) {
  const [formData, setFormData] = useState<DrugFormData>({
    ...initialFormData,
    ...initialData
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBarcodePreview, setShowBarcodePreview] = useState(false);
  const [showQRPreview, setShowQRPreview] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleInputChange = (field: keyof DrugFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Required field validations
    if (!formData.name.trim()) newErrors.name = 'Drug name is required';
    if (!formData.genericName.trim()) newErrors.genericName = 'Generic name is required';
    if (!formData.strength.trim()) newErrors.strength = 'Strength is required';
    if (!formData.form.trim()) newErrors.form = 'Form is required';
    if (!formData.manufacturer.trim()) newErrors.manufacturer = 'Manufacturer is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';

    // Inventory validations
    if (!formData.currentStock.trim()) newErrors.currentStock = 'Current stock is required';
    if (!formData.minStockLevel.trim()) newErrors.minStockLevel = 'Minimum stock level is required';
    if (!formData.location.trim()) newErrors.location = 'Storage location is required';

    // Pricing validations
    if (!formData.unitCost.trim()) newErrors.unitCost = 'Unit cost is required';
    if (!formData.sellingPrice.trim()) newErrors.sellingPrice = 'Selling price is required';

    // Date validations
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.manufacturingDate.trim()) newErrors.manufacturingDate = 'Manufacturing date is required';

    // Numeric validations
    const numericFields = ['currentStock', 'minStockLevel', 'maxStockLevel', 'unitCost', 'sellingPrice'];
    numericFields.forEach(field => {
      const value = formData[field as keyof DrugFormData] as string;
      if (value && isNaN(Number(value))) {
        newErrors[field] = 'Must be a valid number';
      }
    });

    // Date logic validation
    if (formData.expiryDate && formData.manufacturingDate) {
      const expiry = new Date(formData.expiryDate);
      const manufacturing = new Date(formData.manufacturingDate);
      if (expiry <= manufacturing) {
        newErrors.expiryDate = 'Expiry date must be after manufacturing date';
      }
    }

    // Controlled substance validation
    if (formData.isControlledSubstance && !formData.scheduleClass) {
      newErrors.scheduleClass = 'Schedule class is required for controlled substances';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateBarcode = () => {
    // Generate EAN-13 style barcode for pharmaceuticals
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 3);
    const barcode = `${timestamp.substr(-8)}${random}`.padStart(13, '0').substr(0, 13);
    handleInputChange('barcode', barcode);
  };

  const generateQRCode = () => {
    // Generate QR code data with comprehensive drug information
    const qrData = {
      drugName: formData.name,
      genericName: formData.genericName,
      strength: formData.strength,
      form: formData.form,
      manufacturer: formData.manufacturer,
      ndc: formData.ndc,
      lotNumber: formData.lotNumber,
      expiryDate: formData.expiryDate,
      barcode: formData.barcode
    };
    const qrCodeString = JSON.stringify(qrData);
    handleInputChange('qrCode', qrCodeString);
  };

  const startBarcodeScanner = () => {
    setIsScanning(true);
    // Simulate scanner - in real implementation, use camera API
    // For demo, we'll generate a sample barcode
    setTimeout(() => {
      const scannedBarcode = '1234567890123';
      handleInputChange('barcode', scannedBarcode);
      setIsScanning(false);
    }, 2000);
  };

  const downloadBarcode = () => {
    // In real implementation, generate actual barcode image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 200;
      canvas.height = 50;
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 200, 50);
      ctx.fillStyle = 'black';
      ctx.font = '12px monospace';
      ctx.fillText(formData.barcode, 10, 30);
      
      // Download
      const link = document.createElement('a');
      link.download = `barcode-${formData.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadQRCode = () => {
    // In real implementation, generate actual QR code image
    alert('QR Code download functionality would generate a QR code image with drug data');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Pill className="h-6 w-6 mr-2" />
              {isEditing ? 'Edit Drug' : 'Add New Drug'}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={onCancel}>
              <X />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Drug Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Pill className="h-5 w-5 mr-2" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Drug Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter drug name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Generic Name *
                  </label>
                  <Input
                    value={formData.genericName}
                    onChange={(e) => handleInputChange('genericName', e.target.value)}
                    placeholder="Enter generic name"
                    className={errors.genericName ? 'border-red-500' : ''}
                  />
                  {errors.genericName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.genericName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Brand Name
                  </label>
                  <Input
                    value={formData.brandName}
                    onChange={(e) => handleInputChange('brandName', e.target.value)}
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Strength *
                  </label>
                  <Input
                    value={formData.strength}
                    onChange={(e) => handleInputChange('strength', e.target.value)}
                    placeholder="e.g., 500mg, 10ml"
                    className={errors.strength ? 'border-red-500' : ''}
                  />
                  {errors.strength && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.strength}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Form *
                  </label>
                  <select
                    value={formData.form}
                    onChange={(e) => handleInputChange('form', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md ${errors.form ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select form</option>
                    {drugForms.map(form => (
                      <option key={form} value={form}>{form}</option>
                    ))}
                  </select>
                  {errors.form && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.form}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select category</option>
                    {drugCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Manufacturer *
                  </label>
                  <Input
                    value={formData.manufacturer}
                    onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                    placeholder="Enter manufacturer name"
                    className={errors.manufacturer ? 'border-red-500' : ''}
                  />
                  {errors.manufacturer && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.manufacturer}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Active Ingredients
                  </label>
                  <Input
                    value={formData.activeIngredients}
                    onChange={(e) => handleInputChange('activeIngredients', e.target.value)}
                    placeholder="List active ingredients"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter drug description and uses..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                />
              </div>
            </div>

            {/* Inventory Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Inventory Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Current Stock *
                  </label>
                  <Input
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => handleInputChange('currentStock', e.target.value)}
                    placeholder="0"
                    min="0"
                    className={errors.currentStock ? 'border-red-500' : ''}
                  />
                  {errors.currentStock && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.currentStock}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Min Stock Level *
                  </label>
                  <Input
                    type="number"
                    value={formData.minStockLevel}
                    onChange={(e) => handleInputChange('minStockLevel', e.target.value)}
                    placeholder="10"
                    min="0"
                    className={errors.minStockLevel ? 'border-red-500' : ''}
                  />
                  {errors.minStockLevel && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.minStockLevel}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Max Stock Level
                  </label>
                  <Input
                    type="number"
                    value={formData.maxStockLevel}
                    onChange={(e) => handleInputChange('maxStockLevel', e.target.value)}
                    placeholder="100"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reorder Level
                  </label>
                  <Input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => handleInputChange('reorderLevel', e.target.value)}
                    placeholder="20"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Storage Location *
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., A1-B2"
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Barcode Management
                  </label>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        value={formData.barcode}
                        onChange={(e) => handleInputChange('barcode', e.target.value)}
                        placeholder="Enter barcode or scan"
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={generateBarcode}>
                        <Barcode className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={startBarcodeScanner}
                        disabled={isScanning}
                      >
                        {isScanning ? (
                          <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                        ) : (
                          <Scan className="h-4 w-4 mr-1" />
                        )}
                        {isScanning ? 'Scanning...' : 'Scan'}
                      </Button>
                    </div>
                    
                    {formData.barcode && (
                      <div className="flex items-center space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowBarcodePreview(!showBarcodePreview)}
                        >
                          <Barcode className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={downloadBarcode}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    )}
                    
                    {showBarcodePreview && formData.barcode && (
                      <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <div className="text-center">
                          <div className="font-mono text-sm bg-white dark:bg-gray-700 p-2 border rounded">
                            ||||||||||||||||||||||||||||||||||||||||||||
                          </div>
                          <p className="text-xs mt-1 font-mono">{formData.barcode}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    QR Code Management
                  </label>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={generateQRCode}
                        className="flex-1"
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        Generate QR Code with Drug Data
                      </Button>
                    </div>
                    
                    {formData.qrCode && (
                      <div className="flex items-center space-x-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowQRPreview(!showQRPreview)}
                        >
                          <QrCode className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={downloadQRCode}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    )}
                    
                    {showQRPreview && formData.qrCode && (
                      <div className="p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <div className="text-center">
                          <div className="w-32 h-32 bg-white dark:bg-gray-700 border rounded mx-auto flex items-center justify-center">
                            <div className="grid grid-cols-8 gap-0.5">
                              {Array.from({length: 64}, (_, i) => (
                                <div key={i} className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}></div>
                              ))}
                            </div>
                          </div>
                          <p className="text-xs mt-2 text-muted-foreground">QR Code contains drug information</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Storage Conditions
                  </label>
                  <select
                    value={formData.storageConditions}
                    onChange={(e) => handleInputChange('storageConditions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {storageConditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Pricing Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Unit Cost *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.unitCost}
                    onChange={(e) => handleInputChange('unitCost', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    className={errors.unitCost ? 'border-red-500' : ''}
                  />
                  {errors.unitCost && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.unitCost}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Selling Price *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    className={errors.sellingPrice ? 'border-red-500' : ''}
                  />
                  {errors.sellingPrice && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.sellingPrice}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Wholesale Price
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.wholesalePrice}
                    onChange={(e) => handleInputChange('wholesalePrice', e.target.value)}
                    placeholder="0.00"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Regulatory & Date Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Regulatory & Date Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    NDC Number
                  </label>
                  <Input
                    value={formData.ndc}
                    onChange={(e) => handleInputChange('ndc', e.target.value)}
                    placeholder="National Drug Code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lot Number
                  </label>
                  <Input
                    value={formData.lotNumber}
                    onChange={(e) => handleInputChange('lotNumber', e.target.value)}
                    placeholder="Enter lot number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Manufacturing Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.manufacturingDate}
                    onChange={(e) => handleInputChange('manufacturingDate', e.target.value)}
                    className={errors.manufacturingDate ? 'border-red-500' : ''}
                  />
                  {errors.manufacturingDate && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.manufacturingDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Expiry Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className={errors.expiryDate ? 'border-red-500' : ''}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.expiryDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Regulatory Flags */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.requiresPrescription}
                      onChange={(e) => handleInputChange('requiresPrescription', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Requires Prescription</span>
                    <Shield className="h-4 w-4 text-blue-500" />
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isControlledSubstance}
                      onChange={(e) => handleInputChange('isControlledSubstance', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">Controlled Substance</span>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </label>
                </div>

                {formData.isControlledSubstance && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium mb-2">
                      Schedule Class *
                    </label>
                    <select
                      value={formData.scheduleClass}
                      onChange={(e) => handleInputChange('scheduleClass', e.target.value)}
                      className={`w-full max-w-xs px-3 py-2 border rounded-md ${errors.scheduleClass ? 'border-red-500' : 'border-gray-300'}`}
                    >
                      {scheduleClasses.map(schedule => (
                        <option key={schedule} value={schedule}>
                          {schedule || 'Select schedule class'}
                        </option>
                      ))}
                    </select>
                    {errors.scheduleClass && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.scheduleClass}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Additional Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dosage Instructions
                  </label>
                  <textarea
                    value={formData.dosageInstructions}
                    onChange={(e) => handleInputChange('dosageInstructions', e.target.value)}
                    placeholder="Enter dosage instructions..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Side Effects
                  </label>
                  <textarea
                    value={formData.sideEffects}
                    onChange={(e) => handleInputChange('sideEffects', e.target.value)}
                    placeholder="List known side effects..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Contraindications
                  </label>
                  <textarea
                    value={formData.contraindications}
                    onChange={(e) => handleInputChange('contraindications', e.target.value)}
                    placeholder="List contraindications and warnings..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditing ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update Drug' : 'Add Drug'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddDrugForm;
