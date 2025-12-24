"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  X,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  Globe,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

interface SupplierFormData {
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  taxId: string
  paymentTerms: string
  category: string
  isActive: boolean
  website?: string
  notes?: string
}

interface SupplierFormProps {
  onSubmit: (data: SupplierFormData) => void
  onCancel: () => void
  initialData?: SupplierFormData
  isEditing?: boolean
}

export default function SupplierForm({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}: SupplierFormProps) {
  const [formData, setFormData] = useState<SupplierFormData>(
    initialData || {
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "USA",
      taxId: "",
      paymentTerms: "Net 30 days",
      category: "Prescription Drugs",
      isActive: true,
      website: "",
      notes: "",
    }
  )

  const [errors, setErrors] = useState<Partial<SupplierFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    "Prescription Drugs",
    "Over-the-Counter",
    "Medical Equipment",
    "Vitamins & Supplements",
    "Emergency Supplies",
    "Surgical Supplies",
    "Laboratory Supplies",
    "Personal Care",
    "Other",
  ]

  const paymentTermsOptions = [
    "Net 7 days",
    "Net 15 days",
    "Net 30 days",
    "Net 45 days",
    "Net 60 days",
    "Net 90 days",
    "Cash on Delivery",
    "Prepaid",
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<SupplierFormData> = {}

    if (!formData.name.trim()) newErrors.name = "Company name is required"
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.taxId.trim()) newErrors.taxId = "Tax ID is required"

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email"

    if (formData.phone && !/^[\+]?[\d\s\-\(\)]+$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number"

    if (formData.country === "USA" && formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode))
      newErrors.zipCode = "ZIP must be 12345 or 12345-6789"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof SupplierFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    onSubmit(formData)
    setIsSubmitting(false)
  }

  const renderInput = (
    field: keyof SupplierFormData,
    label: string,
    placeholder: string,
    icon?: React.ReactNode,
    type = "text"
  ) => (
    <div className="space-y-1">
      <Label className="flex items-center gap-2 text-sm font-medium">
        {icon} {label}
      </Label>
      <Input
        type={type}
        value={formData[field] as string}
        placeholder={placeholder}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className={errors[field] ? "border-red-500" : ""}
      />
      {errors[field] && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" /> {errors[field]}
        </p>
      )}
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto py-6">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">
              {isEditing ? "Edit Supplier" : "Add New Supplier"}
            </h2>
          </div>
          <Button type="button" variant="ghost" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* COMPANY INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {renderInput("name", "Company Name", "Enter company name")}
            {renderInput("contactPerson", "Contact Person", "Enter contact person")}
            {renderInput("email", "Email", "Enter email", <Mail className="h-4 w-4" />, "email")}
            {renderInput("phone", "Phone Number", "Enter phone number", <Phone className="h-4 w-4" />)}
            {/* Category */}
            <div className="space-y-1">
              <Label>Category</Label>
              <select
                className="w-full border rounded-md p-2"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            {renderInput("website", "Website (Optional)", "https://example.com", <Globe className="h-4 w-4" />, "url")}
          </CardContent>
        </Card>

        {/* ADDRESS INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderInput("address", "Street Address", "Enter address")}
            <div className="grid gap-4 md:grid-cols-3">
              {renderInput("city", "City", "Enter city")}
              {renderInput("state", "State/Province", "Enter state")}
              {renderInput("zipCode", "ZIP Code", "Enter ZIP")}
            </div>

            {/* Country */}
            <div className="space-y-1">
              <Label>Country</Label>
              <select
                className="w-full border rounded-md p-2"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              >
                {["USA", "Canada", "UK", "Germany", "France", "Mexico", "Other"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* BUSINESS INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {renderInput("taxId", "Tax ID / EIN", "Enter tax ID", <CreditCard className="h-4 w-4" />)}

              {/* Payment Terms */}
              <div className="space-y-1">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Payment Terms
                </Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={formData.paymentTerms}
                  onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                >
                  {paymentTermsOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <Label>Notes (Optional)</Label>
              <Textarea
                rows={3}
                placeholder="Add any additional notes..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange("isActive", e.target.checked)}
              />
              <Label>Active Supplier</Label>
            </div>
          </CardContent>
        </Card>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end gap-3 border-t pt-6">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="min-w-32">
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                {isEditing ? "Update Supplier" : "Add Supplier"}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
