"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Camera, 
  Scan, 
  Download, 
  QrCode, 
  Barcode, 
  X, 
  Check,
  AlertCircle,
  Copy,
  RefreshCw
} from 'lucide-react';

interface BarcodeQRManagerProps {
  onBarcodeScanned: (barcode: string) => void;
  onQRCodeGenerated: (qrData: string) => void;
  drugData?: {
    name: string;
    genericName: string;
    strength: string;
    manufacturer: string;
    ndc: string;
    lotNumber: string;
    expiryDate: string;
  };
}

interface ScannedData {
  type: 'barcode' | 'qr';
  data: string;
  timestamp: Date;
}

export function BarcodeQRManager({ onBarcodeScanned, onQRCodeGenerated, drugData }: BarcodeQRManagerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedHistory, setScannedHistory] = useState<ScannedData[]>([]);
  const [currentBarcode, setCurrentBarcode] = useState('');
  const [currentQRCode, setCurrentQRCode] = useState('');
  const [manualInput, setManualInput] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize camera for scanning
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied or not available');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  // Simulate barcode detection (in real implementation, use a library like ZXing or QuaggaJS)
  const simulateBarcodeDetection = () => {
    const mockBarcodes = [
      '1234567890123',
      '9876543210987',
      '5555666677778',
      '1111222233334'
    ];
    const detectedBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
    
    setCurrentBarcode(detectedBarcode);
    onBarcodeScanned(detectedBarcode);
    
    // Add to history
    const newScan: ScannedData = {
      type: 'barcode',
      data: detectedBarcode,
      timestamp: new Date()
    };
    setScannedHistory(prev => [newScan, ...prev.slice(0, 9)]); // Keep last 10
    
    stopCamera();
  };

  // Generate comprehensive QR code
  const generateQRCode = () => {
    if (!drugData) return;

    const qrCodeData = {
      type: 'pharmaceutical_product',
      version: '1.0',
      timestamp: new Date().toISOString(),
      product: {
        name: drugData.name,
        generic_name: drugData.genericName,
        strength: drugData.strength,
        manufacturer: drugData.manufacturer,
        ndc: drugData.ndc,
        lot_number: drugData.lotNumber,
        expiry_date: drugData.expiryDate
      },
      verification: {
        checksum: generateChecksum(drugData),
        generated_by: 'PharmaCare System'
      }
    };

    const qrString = JSON.stringify(qrCodeData, null, 2);
    setCurrentQRCode(qrString);
    onQRCodeGenerated(qrString);
  };

  const generateChecksum = (data: any): string => {
    // Simple checksum generation (in production, use proper hash function)
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  };

  // Generate different types of barcodes
  const generateBarcode = (type: 'ean13' | 'code128' | 'upc') => {
    let barcode = '';
    
    switch (type) {
      case 'ean13':
        // Generate EAN-13 (European Article Number)
        barcode = generateEAN13();
        break;
      case 'code128':
        // Generate Code 128 (common for pharmaceuticals)
        barcode = generateCode128();
        break;
      case 'upc':
        // Generate UPC-A (Universal Product Code)
        barcode = generateUPC();
        break;
    }

    setCurrentBarcode(barcode);
    onBarcodeScanned(barcode);
  };

  const generateEAN13 = (): string => {
    // Generate 12 digits + 1 check digit
    let digits = '';
    for (let i = 0; i < 12; i++) {
      digits += Math.floor(Math.random() * 10);
    }
    
    // Calculate check digit
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(digits[i]);
      sum += (i % 2 === 0) ? digit : digit * 3;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    
    return digits + checkDigit;
  };

  const generateCode128 = (): string => {
    // Simplified Code 128 generation
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8);
    return `PH${timestamp.slice(-6)}${random}`.toUpperCase();
  };

  const generateUPC = (): string => {
    // Generate UPC-A (12 digits)
    let digits = '';
    for (let i = 0; i < 11; i++) {
      digits += Math.floor(Math.random() * 10);
    }
    
    // Calculate check digit for UPC
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      const digit = parseInt(digits[i]);
      sum += (i % 2 === 0) ? digit * 3 : digit;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    
    return digits + checkDigit;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadBarcode = () => {
    // Create a simple barcode representation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx && currentBarcode) {
      canvas.width = 300;
      canvas.height = 100;
      
      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 300, 100);
      
      // Draw barcode bars (simplified representation)
      ctx.fillStyle = 'black';
      for (let i = 0; i < currentBarcode.length; i++) {
        const digit = parseInt(currentBarcode[i]);
        const barWidth = digit % 2 === 0 ? 3 : 6;
        const x = 20 + (i * 20);
        ctx.fillRect(x, 20, barWidth, 50);
      }
      
      // Add barcode text
      ctx.font = '12px Arial';
      ctx.fillText(currentBarcode, 20, 85);
      
      // Download
      const link = document.createElement('a');
      link.download = `barcode-${currentBarcode}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadQRCode = () => {
    // Create a simple QR code representation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (ctx && currentQRCode) {
      canvas.width = 200;
      canvas.height = 200;
      
      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 200, 200);
      
      // Draw QR code pattern (simplified)
      ctx.fillStyle = 'black';
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * 10, j * 10, 10, 10);
          }
        }
      }
      
      // Download
      const link = document.createElement('a');
      link.download = `qrcode-${drugData?.name || 'drug'}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Scanner Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Barcode Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isScanning ? (
              <div className="text-center">
                <Button onClick={startCamera} className="mr-2">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera Scanner
                </Button>
                <Button variant="outline" onClick={simulateBarcodeDetection}>
                  <Scan className="h-4 w-4 mr-2" />
                  Simulate Scan
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full max-w-md mx-auto rounded-lg border"
                    autoPlay
                    playsInline
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute inset-0 border-2 border-red-500 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-24 border-2 border-red-500"></div>
                  </div>
                </div>
                <div className="text-center">
                  <Button onClick={simulateBarcodeDetection} className="mr-2">
                    <Check className="h-4 w-4 mr-2" />
                    Capture Barcode
                  </Button>
                  <Button variant="outline" onClick={stopCamera}>
                    <X className="h-4 w-4 mr-2" />
                    Stop Scanner
                  </Button>
                </div>
              </div>
            )}
            
            {/* Manual Input */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium mb-2">Manual Barcode Entry</label>
              <div className="flex space-x-2">
                <Input
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="Enter barcode manually"
                  className="flex-1"
                />
                <Button 
                  onClick={() => {
                    if (manualInput.trim()) {
                      onBarcodeScanned(manualInput.trim());
                      setCurrentBarcode(manualInput.trim());
                      setManualInput('');
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barcode Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Barcode className="h-5 w-5 mr-2" />
            Barcode Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Button variant="outline" onClick={() => generateBarcode('ean13')}>
                Generate EAN-13
              </Button>
              <Button variant="outline" onClick={() => generateBarcode('code128')}>
                Generate Code 128
              </Button>
              <Button variant="outline" onClick={() => generateBarcode('upc')}>
                Generate UPC-A
              </Button>
            </div>
            
            {currentBarcode && (
              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Generated Barcode:</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(currentBarcode)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadBarcode}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="font-mono text-lg bg-white dark:bg-gray-700 p-2 rounded border text-center">
                  {currentBarcode}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* QR Code Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <QrCode className="h-5 w-5 mr-2" />
            QR Code Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={generateQRCode} disabled={!drugData} className="w-full">
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code with Drug Information
            </Button>
            
            {!drugData && (
              <p className="text-sm text-muted-foreground flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Fill in basic drug information to generate QR code
              </p>
            )}
            
            {currentQRCode && (
              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Generated QR Code Data:</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => copyToClipboard(currentQRCode)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={downloadQRCode}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <pre className="text-xs bg-white dark:bg-gray-700 p-2 rounded border overflow-auto max-h-32">
                  {currentQRCode}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scan History */}
      {scannedHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <RefreshCw className="h-5 w-5 mr-2" />
              Recent Scans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scannedHistory.map((scan, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center space-x-2">
                    <Badge variant={scan.type === 'barcode' ? 'default' : 'secondary'}>
                      {scan.type === 'barcode' ? 'Barcode' : 'QR Code'}
                    </Badge>
                    <span className="font-mono text-sm">{scan.data}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {scan.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default BarcodeQRManager;