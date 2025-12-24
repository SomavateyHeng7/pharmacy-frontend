# Barcode and QR Code Implementation Guide

## Overview
This implementation provides comprehensive barcode and QR code support for your pharmacy management system.

## Features Implemented

### 1. **Barcode Support**
- **EAN-13 Generation**: European Article Number (13 digits)
- **Code 128 Generation**: Common pharmaceutical barcode format  
- **UPC-A Generation**: Universal Product Code (12 digits)
- **Manual Barcode Entry**: For existing barcodes
- **Barcode Scanning**: Camera-based scanning with fallback
- **Barcode Download**: Generate printable barcode images

### 2. **QR Code Support**
- **Comprehensive Drug Data**: All drug information in QR code
- **JSON Format**: Structured data with verification
- **Checksum Validation**: Data integrity verification
- **Download Capability**: Generate printable QR codes
- **Version Control**: QR code format versioning

### 3. **Scanner Integration**
- **Camera Access**: Use device camera for scanning
- **Real-time Detection**: Live barcode/QR detection
- **Manual Input Fallback**: Enter codes manually
- **Scan History**: Track recent scans
- **Multiple Format Support**: Various barcode types

## Required Dependencies

To implement full functionality, install these packages:

```bash
# Core barcode/QR libraries
npm install jsbarcode qrcode

# Camera and scanning
npm install quagga html5-qrcode

# Image processing
npm install canvas

# Type definitions
npm install @types/qrcode @types/jsbarcode
```

## Implementation Steps

### 1. **Install Dependencies**
```bash
cd /Users/teyyyyyheng/my-pharmacy
npm install jsbarcode qrcode quagga html5-qrcode canvas @types/qrcode @types/jsbarcode
```

### 2. **Update AddDrugForm Integration**
The AddDrugForm component now includes:
- Enhanced barcode generation with multiple formats
- QR code generation with complete drug data
- Preview functionality for both codes
- Download capabilities

### 3. **Use BarcodeQRManager Component**
```tsx
import BarcodeQRManager from '@/components/BarcodeQRManager';

// In your component
<BarcodeQRManager
  onBarcodeScanned={(barcode) => setFormData(prev => ({...prev, barcode}))}
  onQRCodeGenerated={(qrData) => setFormData(prev => ({...prev, qrCode: qrData}))}
  drugData={{
    name: formData.name,
    genericName: formData.genericName,
    strength: formData.strength,
    manufacturer: formData.manufacturer,
    ndc: formData.ndc,
    lotNumber: formData.lotNumber,
    expiryDate: formData.expiryDate
  }}
/>
```

## Real-World Integration

### 1. **Production Barcode Generation**
```tsx
import JsBarcode from 'jsbarcode';

const generateBarcodeImage = (code: string, format: 'EAN13' | 'CODE128' | 'UPC') => {
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, code, { format });
  return canvas.toDataURL();
};
```

### 2. **Production QR Code Generation**
```tsx
import QRCode from 'qrcode';

const generateQRCodeImage = async (data: string) => {
  try {
    const url = await QRCode.toDataURL(data, {
      width: 200,
      margin: 2,
      errorCorrectionLevel: 'M'
    });
    return url;
  } catch (err) {
    console.error(err);
  }
};
```

### 3. **Production Scanner Integration**
```tsx
import { Html5QrcodeScanner } from 'html5-qrcode';

const initializeScanner = () => {
  const html5QrcodeScanner = new Html5QrcodeScanner(
    "qr-reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    false
  );
  
  html5QrcodeScanner.render(onScanSuccess, onScanFailure);
};
```

## Database Schema Updates

Add these fields to your Drug model:

```sql
ALTER TABLE drugs ADD COLUMN barcode VARCHAR(50);
ALTER TABLE drugs ADD COLUMN qr_code TEXT;
ALTER TABLE drugs ADD COLUMN barcode_format VARCHAR(20);
ALTER TABLE drugs ADD COLUMN last_scanned_at TIMESTAMP;

-- Create barcode history table
CREATE TABLE barcode_scans (
  id SERIAL PRIMARY KEY,
  drug_id INTEGER REFERENCES drugs(id),
  barcode VARCHAR(50),
  scan_type VARCHAR(20), -- 'manual', 'camera', 'import'
  scanned_by INTEGER REFERENCES users(id),
  scanned_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Create Drug with Barcode
```typescript
POST /api/drugs
{
  "name": "Paracetamol",
  "genericName": "Acetaminophen", 
  "barcode": "1234567890123",
  "qrCode": "{\"drugName\":\"Paracetamol\",...}",
  "barcodeFormat": "EAN13"
}
```

### Scan Lookup
```typescript
GET /api/drugs/scan/:barcode
// Returns drug information by barcode
```

## Security Considerations

1. **QR Code Validation**: Always validate QR data structure
2. **Checksum Verification**: Verify data integrity
3. **Access Control**: Restrict barcode generation to authorized users
4. **Audit Logging**: Log all scan activities
5. **Data Encryption**: Consider encrypting sensitive QR data

## Testing

Test with these sample barcodes:
- EAN-13: `1234567890123`
- Code 128: `PH123456ABC`
- UPC-A: `123456789012`

## Browser Permissions

Camera access requires HTTPS in production:
```javascript
// Check camera permissions
navigator.permissions.query({name: 'camera'}).then(result => {
  console.log('Camera permission:', result.state);
});
```

This implementation provides a complete barcode/QR code solution for your pharmacy management system with room for production enhancements.