'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Scan,
  FileCheck,
  User,
  Calendar,
  Pill,
  Clock,
  Search,
  Download,
  Eye,
  Camera,
  Shield,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Stethoscope,
  Building2,
  Phone,
  Mail,
  History,
  FileText,
  Zap,
  Database
} from 'lucide-react';

// Mock data for prescriptions
const prescriptionsData = [
  {
    id: 'RX001',
    patientName: 'John Smith',
    patientId: 'P001',
    doctorName: 'Dr. Sarah Johnson',
    hospitalName: 'City General Hospital',
    dateIssued: '2024-11-14',
    status: 'verified',
    medications: [
      { name: 'Amoxicillin 500mg', dosage: '1 tablet', frequency: '3 times daily', duration: '7 days', quantity: 21 },
      { name: 'Ibuprofen 400mg', dosage: '1 tablet', frequency: 'as needed', duration: '5 days', quantity: 10 }
    ],
    instructions: 'Take with food. Complete the full course of antibiotics.',
    uploadMethod: 'scan',
    verificationStatus: 'verified',
    pharmacistNotes: 'Verified prescription. Patient counseled on dosage.'
  },
  {
    id: 'RX002',
    patientName: 'Maria Garcia',
    patientId: 'P002',
    doctorName: 'Dr. Michael Chen',
    hospitalName: 'Metro Medical Center',
    dateIssued: '2024-11-13',
    status: 'pending',
    medications: [
      { name: 'Metformin 850mg', dosage: '1 tablet', frequency: '2 times daily', duration: '30 days', quantity: 60 },
      { name: 'Lisinopril 10mg', dosage: '1 tablet', frequency: 'once daily', duration: '30 days', quantity: 30 }
    ],
    instructions: 'Monitor blood pressure regularly. Take at the same time daily.',
    uploadMethod: 'upload',
    verificationStatus: 'pending',
    pharmacistNotes: ''
  },
  {
    id: 'RX003',
    patientName: 'Robert Wilson',
    patientId: 'P003',
    doctorName: 'Dr. Emily Davis',
    hospitalName: 'Regional Health Center',
    dateIssued: '2024-11-12',
    status: 'dispensed',
    medications: [
      { name: 'Simvastatin 20mg', dosage: '1 tablet', frequency: 'once daily', duration: '30 days', quantity: 30 }
    ],
    instructions: 'Take in the evening. Avoid grapefruit juice.',
    uploadMethod: 'emr',
    verificationStatus: 'verified',
    pharmacistNotes: 'Dispensed. Patient counseled on interactions.'
  }
];

// Patient prescription history
const patientHistoryData = [
  {
    patientId: 'P001',
    patientName: 'John Smith',
    prescriptions: [
      { id: 'RX001', date: '2024-11-14', medications: ['Amoxicillin', 'Ibuprofen'], status: 'current' },
      { id: 'RX015', date: '2024-10-28', medications: ['Acetaminophen'], status: 'completed' },
      { id: 'RX008', date: '2024-09-15', medications: ['Cetirizine'], status: 'completed' }
    ]
  },
  {
    patientId: 'P002',
    patientName: 'Maria Garcia',
    prescriptions: [
      { id: 'RX002', date: '2024-11-13', medications: ['Metformin', 'Lisinopril'], status: 'pending' },
      { id: 'RX019', date: '2024-10-30', medications: ['Metformin'], status: 'completed' }
    ]
  }
];

// EMR/EHR Integration data
const emrIntegrations = [
  { name: 'Epic Systems', status: 'connected', lastSync: '2024-11-14 10:30', prescriptions: 45, icon: '🏥' },
  { name: 'Cerner', status: 'connected', lastSync: '2024-11-14 09:15', prescriptions: 23, icon: '⚕️' },
  { name: 'AllScripts', status: 'available', lastSync: 'Never', prescriptions: 0, icon: '📋' },
  { name: 'athenahealth', status: 'available', lastSync: 'Never', prescriptions: 0, icon: '🔗' }
];

function PrescriptionUploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'scan' | 'manual'>('upload');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Add New Prescription</h3>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>

        <div className="space-y-6">
          {/* Upload Method Selection */}
          <div>
            <Label className="text-base font-medium">Upload Method</Label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <Button
                variant={uploadMethod === 'upload' ? 'default' : 'outline'}
                onClick={() => setUploadMethod('upload')}
                className="h-20 flex-col"
              >
                <Upload className="h-6 w-6 mb-1" />
                <span>Upload File</span>
              </Button>
              <Button
                variant={uploadMethod === 'scan' ? 'default' : 'outline'}
                onClick={() => setUploadMethod('scan')}
                className="h-20 flex-col"
              >
                <Camera className="h-6 w-6 mb-1" />
                <span>Scan Document</span>
              </Button>
              <Button
                variant={uploadMethod === 'manual' ? 'default' : 'outline'}
                onClick={() => setUploadMethod('manual')}
                className="h-20 flex-col"
              >
                <FileText className="h-6 w-6 mb-1" />
                <span>Manual Entry</span>
              </Button>
            </div>
          </div>

          {/* Upload Content Based on Method */}
          {uploadMethod === 'upload' && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium">Drop prescription files here</p>
              <p className="text-sm text-muted-foreground">or click to browse (PDF, JPG, PNG)</p>
              <Button className="mt-4">Browse Files</Button>
            </div>
          )}

          {uploadMethod === 'scan' && (
            <div className="border border-gray-300 rounded-lg p-8 text-center bg-gray-50 dark:bg-gray-900">
              <Camera className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <p className="text-lg font-medium">Camera Ready</p>
              <p className="text-sm text-muted-foreground">Position prescription document in camera view</p>
              <Button className="mt-4">
                <Scan className="h-4 w-4 mr-2" />
                Start Scanning
              </Button>
            </div>
          )}

          {uploadMethod === 'manual' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="text-sm font-medium">Patient Name</Label>
                  <Input id="patientName" placeholder="Enter patient name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctorName" className="text-sm font-medium">Doctor Name</Label>
                  <Input id="doctorName" placeholder="Enter doctor name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalName" className="text-sm font-medium">Hospital/Clinic</Label>
                <Input id="hospitalName" placeholder="Enter hospital or clinic name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medications" className="text-sm font-medium">Medications</Label>
                <Textarea 
                  id="medications" 
                  placeholder="Enter medications and dosage instructions" 
                  rows={4}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button>Process Prescription</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrescriptionVerificationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Prescription Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prescriptionsData.filter(p => p.verificationStatus === 'pending').map((prescription) => (
            <div key={prescription.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{prescription.id} - {prescription.patientName}</h4>
                  <p className="text-sm text-muted-foreground">Dr. {prescription.doctorName}</p>
                </div>
                <Badge variant="outline" className="text-yellow-600">
                  Pending Verification
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                {prescription.medications.map((med, index) => (
                  <div key={index} className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded">
                    <strong>{med.name}</strong> - {med.dosage} {med.frequency} for {med.duration}
                  </div>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verify
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PrescriptionHistory() {
  const [selectedPatient, setSelectedPatient] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="h-5 w-5 mr-2" />
          Patient Prescription History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Search patient name or ID"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {patientHistoryData.map((patient) => (
            <div key={patient.patientId} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{patient.patientName}</h4>
                  <p className="text-sm text-muted-foreground">Patient ID: {patient.patientId}</p>
                </div>
                <Badge>{patient.prescriptions.length} prescriptions</Badge>
              </div>

              <div className="space-y-2">
                {patient.prescriptions.map((rx) => (
                  <div key={rx.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div>
                      <p className="font-medium">{rx.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {rx.medications.join(', ')} - {rx.date}
                      </p>
                    </div>
                    <Badge variant={rx.status === 'current' ? 'default' : 'outline'}>
                      {rx.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function EMRIntegrationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="h-5 w-5 mr-2" />
          Hospital EMR/EHR Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {emrIntegrations.map((integration, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{integration.icon}</div>
                <div>
                  <h4 className="font-medium">{integration.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Last sync: {integration.lastSync}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <Badge variant={integration.status === 'connected' ? 'default' : 'outline'}>
                    {integration.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {integration.prescriptions} prescriptions
                  </p>
                </div>
                <Button 
                  variant={integration.status === 'connected' ? 'outline' : 'default'}
                  size="sm"
                >
                  {integration.status === 'connected' ? (
                    <>
                      <Zap className="h-4 w-4 mr-1" />
                      Sync
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-1" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              EMR Integration Benefits
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Automatic prescription import from hospitals</li>
              <li>• Real-time prescription verification</li>
              <li>• Reduced manual data entry errors</li>
              <li>• Seamless patient history tracking</li>
              <li>• Compliance with healthcare standards</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DosageInstructions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Pill className="h-5 w-5 mr-2" />
          Dosage Instructions & Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Active Prescriptions */}
          {prescriptionsData.filter(p => p.status !== 'dispensed').map((prescription) => (
            <div key={prescription.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">{prescription.patientName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {prescription.id} - Dr. {prescription.doctorName}
                  </p>
                </div>
                <Badge variant={
                  prescription.status === 'verified' ? 'default' : 
                  prescription.status === 'pending' ? 'outline' : 'secondary'
                }>
                  {prescription.status}
                </Badge>
              </div>

              <div className="space-y-3">
                {prescription.medications.map((medication, index) => (
                  <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-blue-600">{medication.name}</p>
                        <p className="text-muted-foreground">Medication</p>
                      </div>
                      <div>
                        <p className="font-medium">{medication.dosage}</p>
                        <p className="text-muted-foreground">Dosage</p>
                      </div>
                      <div>
                        <p className="font-medium">{medication.frequency}</p>
                        <p className="text-muted-foreground">Frequency</p>
                      </div>
                      <div>
                        <p className="font-medium">{medication.duration}</p>
                        <p className="text-muted-foreground">Duration</p>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm">
                        <strong>Quantity:</strong> {medication.quantity} tablets
                      </span>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Print Label
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {prescription.instructions && (
                <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Special Instructions:
                  </p>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    {prescription.instructions}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PrescriptionPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const prescriptionTabs = [
    { id: 'overview', label: 'Overview', icon: FileCheck },
    { id: 'upload', label: 'Upload & Scan', icon: Upload },
    { id: 'verify', label: 'Verification', icon: Shield },
    { id: 'dosage', label: 'Dosage Instructions', icon: Pill },
    { id: 'history', label: 'Patient History', icon: History },
    { id: 'emr', label: 'EMR Integration', icon: Database }
  ];

  const totalPrescriptions = prescriptionsData.length;
  const pendingVerification = prescriptionsData.filter(p => p.verificationStatus === 'pending').length;
  const verifiedToday = prescriptionsData.filter(p => 
    p.dateIssued === '2024-11-14' && p.verificationStatus === 'verified'
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Prescription Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Upload, verify, and manage doctor prescriptions with EMR integration
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button onClick={() => setShowUploadModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Prescription
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Prescriptions</p>
                  <p className="text-2xl font-bold">{totalPrescriptions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Pending Verification</p>
                  <p className="text-2xl font-bold">{pendingVerification}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Verified Today</p>
                  <p className="text-2xl font-bold">{verifiedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Connected EMRs</p>
                  <p className="text-2xl font-bold">{emrIntegrations.filter(e => e.status === 'connected').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

            {/* Prescription Tabs */}
            <div className="flex space-x-2 border-b overflow-x-auto">
          {prescriptionTabs.map((tab) => (
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
            {activeTab === 'overview' && (
              <div className="grid gap-6 md:grid-cols-2">
                <PrescriptionVerificationPanel />
                <DosageInstructions />
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload or Scan Prescriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Button 
                        className="h-32 flex-col space-y-2"
                        onClick={() => setShowUploadModal(true)}
                      >
                        <Upload className="h-8 w-8" />
                        <span>Upload File</span>
                        <span className="text-xs">PDF, JPG, PNG</span>
                      </Button>
                      <Button 
                        className="h-32 flex-col space-y-2"
                        variant="outline"
                        onClick={() => setShowUploadModal(true)}
                      >
                        <Camera className="h-8 w-8" />
                        <span>Scan Document</span>
                        <span className="text-xs">Camera Scanner</span>
                      </Button>
                      <Button 
                        className="h-32 flex-col space-y-2"
                        variant="outline"
                        onClick={() => setShowUploadModal(true)}
                      >
                        <FileText className="h-8 w-8" />
                        <span>Manual Entry</span>
                        <span className="text-xs">Type Details</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'verify' && <PrescriptionVerificationPanel />}
            {activeTab === 'dosage' && <DosageInstructions />}
            {activeTab === 'history' && <PrescriptionHistory />}
            {activeTab === 'emr' && <EMRIntegrationPanel />}

      {/* Upload Modal */}
      <PrescriptionUploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />
    </div>
  );
}