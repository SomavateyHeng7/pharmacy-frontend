'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Shield,
  CreditCard,
  AlertTriangle,
  Plus,
  X,
  Save,
  UserCheck,
  Stethoscope,
  Building2,
  FileText,
  Heart,
  CheckCircle,
  XCircle
} from 'lucide-react';

export interface CustomerFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  
  // Medical Information
  allergies: string[];
  chronicConditions: string[];
  currentMedications: string[];
  primaryDoctor: string;
  doctorPhone: string;
  medicalNotes: string;
  
  // Insurance Information
  insuranceProvider: string;
  insuranceNumber: string;
  policyHolder: string;
  groupNumber: string;
  insurancePhone: string;
  
  // Account Settings
  creditLimit: number;
  paymentTerms: string;
  preferredContactMethod: 'Phone' | 'SMS' | 'Email';
  communicationPreferences: {
    appointmentReminders: boolean;
    refillReminders: boolean;
    healthTips: boolean;
    promotionalOffers: boolean;
  };
  
  // Additional Information
  pharmacyPreferences: string;
  specialInstructions: string;
  languagePreference: string;
}

interface AddCustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customerData: CustomerFormData) => void;
  initialData?: Partial<CustomerFormData>;
}

export function AddCustomerForm({ isOpen, onClose, onSave, initialData }: AddCustomerFormProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<CustomerFormData>({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'Prefer not to say',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    
    // Medical Information
    allergies: [],
    chronicConditions: [],
    currentMedications: [],
    primaryDoctor: '',
    doctorPhone: '',
    medicalNotes: '',
    
    // Insurance Information
    insuranceProvider: '',
    insuranceNumber: '',
    policyHolder: '',
    groupNumber: '',
    insurancePhone: '',
    
    // Account Settings
    creditLimit: 0,
    paymentTerms: '30 days',
    preferredContactMethod: 'Phone',
    communicationPreferences: {
      appointmentReminders: true,
      refillReminders: true,
      healthTips: false,
      promotionalOffers: false
    },
    
    // Additional Information
    pharmacyPreferences: '',
    specialInstructions: '',
    languagePreference: 'English',
    
    ...initialData
  });

  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newMedication, setNewMedication] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, title: 'Personal Info', icon: User, completed: false },
    { id: 2, title: 'Medical Info', icon: Stethoscope, completed: false },
    { id: 3, title: 'Insurance', icon: Shield, completed: false },
    { id: 4, title: 'Preferences', icon: CheckCircle, completed: false }
  ];

  const handleInputChange = (field: keyof CustomerFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCommunicationPreferenceChange = (preference: keyof CustomerFormData['communicationPreferences'], value: boolean) => {
    setFormData(prev => ({
      ...prev,
      communicationPreferences: {
        ...prev.communicationPreferences,
        [preference]: value
      }
    }));
  };

  const addAllergy = () => {
    if (newAllergy.trim() && !formData.allergies.includes(newAllergy.trim())) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy('');
    }
  };

  const removeAllergy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const addCondition = () => {
    if (newCondition.trim() && !formData.chronicConditions.includes(newCondition.trim())) {
      setFormData(prev => ({
        ...prev,
        chronicConditions: [...prev.chronicConditions, newCondition.trim()]
      }));
      setNewCondition('');
    }
  };

  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      chronicConditions: prev.chronicConditions.filter((_, i) => i !== index)
    }));
  };

  const addMedication = () => {
    if (newMedication.trim() && !formData.currentMedications.includes(newMedication.trim())) {
      setFormData(prev => ({
        ...prev,
        currentMedications: [...prev.currentMedications, newMedication.trim()]
      }));
      setNewMedication('');
    }
  };

  const removeMedication = (index: number) => {
    setFormData(prev => ({
      ...prev,
      currentMedications: prev.currentMedications.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      onSave(formData);
      onClose();
      // Reset form
      setActiveStep(1);
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: 'Prefer not to say',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        allergies: [],
        chronicConditions: [],
        currentMedications: [],
        primaryDoctor: '',
        doctorPhone: '',
        medicalNotes: '',
        insuranceProvider: '',
        insuranceNumber: '',
        policyHolder: '',
        groupNumber: '',
        insurancePhone: '',
        creditLimit: 0,
        paymentTerms: '30 days',
        preferredContactMethod: 'Phone',
        communicationPreferences: {
          appointmentReminders: true,
          refillReminders: true,
          healthTips: false,
          promotionalOffers: false
        },
        pharmacyPreferences: '',
        specialInstructions: '',
        languagePreference: 'English'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold">Add New Customer</h2>
            <p className="text-muted-foreground">Create a comprehensive customer profile</p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  activeStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${activeStep >= step.id ? 'text-blue-600' : 'text-gray-600'}`}>
                    Step {step.id}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${activeStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Step 1: Personal Information */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className={errors.dateOfBirth ? 'border-red-500' : ''}
                      />
                      {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>}
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="customer@email.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="emergencyContactName">Contact Name</Label>
                      <Input
                        id="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                        placeholder="Full Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                      <Input
                        id="emergencyContactPhone"
                        type="tel"
                        value={formData.emergencyContactPhone}
                        onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyContactRelation">Relationship</Label>
                      <Input
                        id="emergencyContactRelation"
                        value={formData.emergencyContactRelation}
                        onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                        placeholder="Spouse, Parent, Friend, etc."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Medical Information */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                    Allergies & Medical Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Allergies */}
                  <div>
                    <Label className="text-base font-medium text-red-600">Allergies</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                        placeholder="Enter allergy (e.g., Penicillin, Shellfish)"
                        onKeyPress={(e) => e.key === 'Enter' && addAllergy()}
                      />
                      <Button type="button" onClick={addAllergy} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {allergy}
                          <button
                            type="button"
                            onClick={() => removeAllergy(index)}
                            className="ml-1 hover:bg-red-700 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Chronic Conditions */}
                  <div>
                    <Label className="text-base font-medium">Chronic Conditions</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        placeholder="Enter condition (e.g., Diabetes, Hypertension)"
                        onKeyPress={(e) => e.key === 'Enter' && addCondition()}
                      />
                      <Button type="button" onClick={addCondition} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.chronicConditions.map((condition, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {condition}
                          <button
                            type="button"
                            onClick={() => removeCondition(index)}
                            className="ml-1 hover:bg-gray-200 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Current Medications */}
                  <div>
                    <Label className="text-base font-medium">Current Medications</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        value={newMedication}
                        onChange={(e) => setNewMedication(e.target.value)}
                        placeholder="Enter medication (e.g., Metformin 850mg)"
                        onKeyPress={(e) => e.key === 'Enter' && addMedication()}
                      />
                      <Button type="button" onClick={addMedication} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.currentMedications.map((medication, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {medication}
                          <button
                            type="button"
                            onClick={() => removeMedication(index)}
                            className="ml-1 hover:bg-gray-300 rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Stethoscope className="h-5 w-5 mr-2" />
                    Healthcare Provider Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryDoctor">Primary Doctor</Label>
                      <Input
                        id="primaryDoctor"
                        value={formData.primaryDoctor}
                        onChange={(e) => handleInputChange('primaryDoctor', e.target.value)}
                        placeholder="Dr. John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorPhone">Doctor's Phone</Label>
                      <Input
                        id="doctorPhone"
                        type="tel"
                        value={formData.doctorPhone}
                        onChange={(e) => handleInputChange('doctorPhone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="medicalNotes">Additional Medical Notes</Label>
                    <Textarea
                      id="medicalNotes"
                      value={formData.medicalNotes}
                      onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                      placeholder="Any additional medical information, special considerations, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Insurance Information */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Insurance Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                      <Input
                        id="insuranceProvider"
                        value={formData.insuranceProvider}
                        onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                        placeholder="Blue Cross Blue Shield, Aetna, etc."
                      />
                    </div>
                    <div>
                      <Label htmlFor="insuranceNumber">Member ID/Insurance Number</Label>
                      <Input
                        id="insuranceNumber"
                        value={formData.insuranceNumber}
                        onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
                        placeholder="Insurance member ID"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="policyHolder">Policy Holder Name</Label>
                      <Input
                        id="policyHolder"
                        value={formData.policyHolder}
                        onChange={(e) => handleInputChange('policyHolder', e.target.value)}
                        placeholder="Name on insurance policy"
                      />
                    </div>
                    <div>
                      <Label htmlFor="groupNumber">Group Number</Label>
                      <Input
                        id="groupNumber"
                        value={formData.groupNumber}
                        onChange={(e) => handleInputChange('groupNumber', e.target.value)}
                        placeholder="Group/Employer ID"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="insurancePhone">Insurance Customer Service Phone</Label>
                    <Input
                      id="insurancePhone"
                      type="tel"
                      value={formData.insurancePhone}
                      onChange={(e) => handleInputChange('insurancePhone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Account & Credit Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="creditLimit">Credit Limit ($)</Label>
                      <Input
                        id="creditLimit"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.creditLimit}
                        onChange={(e) => handleInputChange('creditLimit', parseFloat(e.target.value) || 0)}
                        placeholder="500.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="paymentTerms">Payment Terms</Label>
                      <select
                        id="paymentTerms"
                        value={formData.paymentTerms}
                        onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Cash only">Cash only</option>
                        <option value="15 days">15 days</option>
                        <option value="30 days">30 days</option>
                        <option value="45 days">45 days</option>
                        <option value="60 days">60 days</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Preferences */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2" />
                    Communication Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                    <select
                      id="preferredContactMethod"
                      value={formData.preferredContactMethod}
                      onChange={(e) => handleInputChange('preferredContactMethod', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Phone">Phone</option>
                      <option value="SMS">SMS/Text</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Communication Preferences</Label>
                    <div className="space-y-3 mt-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="appointmentReminders"
                          checked={formData.communicationPreferences.appointmentReminders}
                          onChange={(e) => handleCommunicationPreferenceChange('appointmentReminders', e.target.checked)}
                        />
                        <Label htmlFor="appointmentReminders" className="cursor-pointer">
                          Appointment reminders
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="refillReminders"
                          checked={formData.communicationPreferences.refillReminders}
                          onChange={(e) => handleCommunicationPreferenceChange('refillReminders', e.target.checked)}
                        />
                        <Label htmlFor="refillReminders" className="cursor-pointer">
                          Prescription refill reminders
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="healthTips"
                          checked={formData.communicationPreferences.healthTips}
                          onChange={(e) => handleCommunicationPreferenceChange('healthTips', e.target.checked)}
                        />
                        <Label htmlFor="healthTips" className="cursor-pointer">
                          Health tips and educational content
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="promotionalOffers"
                          checked={formData.communicationPreferences.promotionalOffers}
                          onChange={(e) => handleCommunicationPreferenceChange('promotionalOffers', e.target.checked)}
                        />
                        <Label htmlFor="promotionalOffers" className="cursor-pointer">
                          Promotional offers and discounts
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="languagePreference">Language Preference</Label>
                    <select
                      id="languagePreference"
                      value={formData.languagePreference}
                      onChange={(e) => handleInputChange('languagePreference', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="pharmacyPreferences">Pharmacy Preferences</Label>
                    <Textarea
                      id="pharmacyPreferences"
                      value={formData.pharmacyPreferences}
                      onChange={(e) => handleInputChange('pharmacyPreferences', e.target.value)}
                      placeholder="Preferred pickup times, special delivery instructions, etc."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                      placeholder="Any special handling instructions, accessibility needs, etc."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={activeStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Step {activeStep} of {steps.length}
              </span>
            </div>

            {activeStep < steps.length ? (
              <Button onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Customer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}