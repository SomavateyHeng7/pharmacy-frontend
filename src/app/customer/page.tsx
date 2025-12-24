"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AddCustomerForm,
  CustomerFormData,
} from "@/components/form/AddCustomerForm";
import {
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  AlertTriangle,
  Clock,
  Search,
  Plus,
  Edit,
  Eye,
  FileText,
  Bell,
  MessageSquare,
  Heart,
  DollarSign,
  History,
  Filter,
  Download,
  UserPlus,
  Shield,
  Activity,
  MapPin,
  Wallet,
  Pill,
  Stethoscope,
  CalendarClock,
  Send,
} from "lucide-react";

// Mock data for customer profiles
const customersData = [
  {
    id: "C001",
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      dateOfBirth: "1985-03-15",
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      address: "123 Main St, City, State 12345",
      emergencyContact: "Jane Smith - (555) 123-4568",
    },
    medicalInfo: {
      allergies: ["Penicillin", "Shellfish"],
      chronicConditions: ["Hypertension", "Type 2 Diabetes"],
      primaryDoctor: "Dr. Sarah Johnson",
      insuranceProvider: "HealthCare Plus",
      insuranceNumber: "HC123456789",
    },
    prescriptionHistory: [
      {
        id: "RX001",
        date: "2024-11-14",
        medications: ["Metformin 850mg", "Lisinopril 10mg"],
        doctor: "Dr. Johnson",
        status: "Active",
      },
      {
        id: "RX015",
        date: "2024-10-28",
        medications: ["Acetaminophen 500mg"],
        doctor: "Dr. Smith",
        status: "Completed",
      },
      {
        id: "RX008",
        date: "2024-09-15",
        medications: ["Amoxicillin 250mg"],
        doctor: "Dr. Davis",
        status: "Completed",
      },
    ],
    paymentHistory: [
      {
        date: "2024-11-14",
        amount: 125.5,
        method: "Credit Card",
        description: "Prescription RX001",
        status: "Paid",
      },
      {
        date: "2024-10-28",
        amount: 45.0,
        method: "Cash",
        description: "Prescription RX015",
        status: "Paid",
      },
      {
        date: "2024-09-15",
        amount: 89.25,
        method: "Insurance",
        description: "Prescription RX008",
        status: "Paid",
      },
    ],
    creditInfo: {
      creditLimit: 500.0,
      currentBalance: 0.0,
      paymentTerms: "30 days",
      creditStatus: "Good Standing",
    },
    reminders: [
      {
        type: "Refill",
        medication: "Metformin",
        dueDate: "2024-11-20",
        method: "SMS",
        status: "Scheduled",
      },
      {
        type: "Follow-up",
        description: "Blood pressure check",
        dueDate: "2024-11-25",
        method: "Email",
        status: "Scheduled",
      },
    ],
    totalSpent: 1245.75,
    visitCount: 15,
    lastVisit: "2024-11-14",
    status: "Active",
  },
  {
    id: "C002",
    personalInfo: {
      firstName: "Maria",
      lastName: "Garcia",
      dateOfBirth: "1978-07-22",
      gender: "Female",
      phone: "+1 (555) 987-6543",
      email: "maria.garcia@email.com",
      address: "456 Oak Ave, City, State 12345",
      emergencyContact: "Carlos Garcia - (555) 987-6544",
    },
    medicalInfo: {
      allergies: ["Latex", "Aspirin"],
      chronicConditions: ["Asthma"],
      primaryDoctor: "Dr. Michael Chen",
      insuranceProvider: "Blue Cross",
      insuranceNumber: "BC987654321",
    },
    prescriptionHistory: [
      {
        id: "RX002",
        date: "2024-11-13",
        medications: ["Albuterol Inhaler", "Montelukast 10mg"],
        doctor: "Dr. Chen",
        status: "Active",
      },
      {
        id: "RX019",
        date: "2024-10-30",
        medications: ["Cetirizine 10mg"],
        doctor: "Dr. Wilson",
        status: "Completed",
      },
    ],
    paymentHistory: [
      {
        date: "2024-11-13",
        amount: 165.75,
        method: "Insurance",
        description: "Prescription RX002",
        status: "Paid",
      },
      {
        date: "2024-10-30",
        amount: 25.5,
        method: "Credit Card",
        description: "Prescription RX019",
        status: "Paid",
      },
    ],
    creditInfo: {
      creditLimit: 300.0,
      currentBalance: 75.0,
      paymentTerms: "30 days",
      creditStatus: "Good Standing",
    },
    reminders: [
      {
        type: "Refill",
        medication: "Albuterol Inhaler",
        dueDate: "2024-11-18",
        method: "Email",
        status: "Sent",
      },
    ],
    totalSpent: 890.25,
    visitCount: 8,
    lastVisit: "2024-11-13",
    status: "Active",
  },
  {
    id: "C003",
    personalInfo: {
      firstName: "Robert",
      lastName: "Wilson",
      dateOfBirth: "1965-12-08",
      gender: "Male",
      phone: "+1 (555) 456-7890",
      email: "robert.wilson@email.com",
      address: "789 Pine St, City, State 12345",
      emergencyContact: "Linda Wilson - (555) 456-7891",
    },
    medicalInfo: {
      allergies: ["Sulfa drugs"],
      chronicConditions: ["High Cholesterol", "Arthritis"],
      primaryDoctor: "Dr. Emily Davis",
      insuranceProvider: "Medicare",
      insuranceNumber: "MC456789123",
    },
    prescriptionHistory: [
      {
        id: "RX003",
        date: "2024-11-12",
        medications: ["Simvastatin 20mg", "Ibuprofen 400mg"],
        doctor: "Dr. Davis",
        status: "Dispensed",
      },
    ],
    paymentHistory: [
      {
        date: "2024-11-12",
        amount: 95.0,
        method: "Medicare",
        description: "Prescription RX003",
        status: "Paid",
      },
    ],
    creditInfo: {
      creditLimit: 200.0,
      currentBalance: 0.0,
      paymentTerms: "15 days",
      creditStatus: "Good Standing",
    },
    reminders: [
      {
        type: "Follow-up",
        description: "Cholesterol recheck",
        dueDate: "2024-12-12",
        method: "Phone",
        status: "Scheduled",
      },
    ],
    totalSpent: 2156.8,
    visitCount: 23,
    lastVisit: "2024-11-12",
    status: "Active",
  },
];

// Reminder templates
const reminderTemplates = [
  {
    type: "Refill",
    template:
      "Hi {name}, your {medication} prescription is ready for refill. Please visit or call us.",
    methods: ["SMS", "Email"],
  },
  {
    type: "Follow-up",
    template:
      "Hello {name}, this is a reminder for your {description} scheduled for {date}.",
    methods: ["SMS", "Email", "Phone"],
  },
  {
    type: "Payment",
    template:
      "Dear {name}, your account has a balance of ${amount}. Please settle at your convenience.",
    methods: ["Email", "Phone"],
  },
  {
    type: "Appointment",
    template:
      "Hi {name}, confirming your appointment for {description} on {date}.",
    methods: ["SMS", "Email"],
  },
];

function CustomerProfileModal({
  customer,
  isOpen,
  onClose,
}: {
  customer: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState("profile");

  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            {customer.personalInfo.firstName} {customer.personalInfo.lastName}
          </h3>
          <Button variant="ghost" onClick={onClose}>
            ×
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b mb-6">
          {["profile", "medical", "prescriptions", "payments", "reminders"].map(
            (tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab)}
                className="capitalize"
              >
                {tab === "prescriptions" ? "Rx History" : tab}
              </Button>
            )
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium">
                  Personal Information
                </Label>
                <div className="space-y-3 mt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input defaultValue={customer.personalInfo.firstName} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input defaultValue={customer.personalInfo.lastName} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input defaultValue={customer.personalInfo.email} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input defaultValue={customer.personalInfo.phone} />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea defaultValue={customer.personalInfo.address} />
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-base font-medium">
                  Account Information
                </Label>
                <div className="space-y-3 mt-2">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm">
                      <strong>Customer ID:</strong> {customer.id}
                    </p>
                    <p className="text-sm">
                      <strong>Date of Birth:</strong>{" "}
                      {customer.personalInfo.dateOfBirth}
                    </p>
                    <p className="text-sm">
                      <strong>Gender:</strong> {customer.personalInfo.gender}
                    </p>
                    <p className="text-sm">
                      <strong>Total Spent:</strong> $
                      {customer.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-sm">
                      <strong>Visit Count:</strong> {customer.visitCount}
                    </p>
                    <p className="text-sm">
                      <strong>Last Visit:</strong> {customer.lastVisit}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      defaultValue={customer.personalInfo.emergencyContact}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "medical" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-base font-medium text-red-600">
                  Allergies
                </Label>
                <div className="space-y-2 mt-2">
                  {customer.medicalInfo.allergies.map(
                    (allergy: string, index: number) => (
                      <Badge key={index} variant="destructive" className="mr-2">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {allergy}
                      </Badge>
                    )
                  )}
                  <Input placeholder="Add new allergy" className="mt-2" />
                </div>
              </div>
              <div>
                <Label className="text-base font-medium">
                  Chronic Conditions
                </Label>
                <div className="space-y-2 mt-2">
                  {customer.medicalInfo.chronicConditions.map(
                    (condition: string, index: number) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {condition}
                      </Badge>
                    )
                  )}
                  <Input placeholder="Add new condition" className="mt-2" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label htmlFor="primaryDoctor">Primary Doctor</Label>
                <Input defaultValue={customer.medicalInfo.primaryDoctor} />
              </div>
              <div>
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input defaultValue={customer.medicalInfo.insuranceProvider} />
              </div>
            </div>
            <div>
              <Label htmlFor="insuranceNumber">Insurance Number</Label>
              <Input defaultValue={customer.medicalInfo.insuranceNumber} />
            </div>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <div className="space-y-4">
            {customer.prescriptionHistory.map(
              (prescription: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{prescription.id}</h4>
                      <p className="text-sm text-muted-foreground">
                        {prescription.doctor} • {prescription.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        prescription.status === "Active" ? "default" : "outline"
                      }
                    >
                      {prescription.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {prescription.medications.map(
                      (med: string, medIndex: number) => (
                        <p
                          key={medIndex}
                          className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded"
                        >
                          {med}
                        </p>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Credit Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Credit Limit:</span>
                      <span className="font-medium">
                        ${customer.creditInfo.creditLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Balance:</span>
                      <span
                        className={`font-medium ${
                          customer.creditInfo.currentBalance > 0
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        ${customer.creditInfo.currentBalance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available Credit:</span>
                      <span className="font-medium">
                        $
                        {(
                          customer.creditInfo.creditLimit -
                          customer.creditInfo.currentBalance
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="default">
                        {customer.creditInfo.creditStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {customer.paymentHistory
                      .slice(0, 3)
                      .map((payment: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <p className="text-sm font-medium">
                              ${payment.amount}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {payment.date}
                            </p>
                          </div>
                          <Badge variant="outline">{payment.method}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "reminders" && (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Active Reminders</Label>
              <div className="space-y-3 mt-2">
                {customer.reminders.map((reminder: any, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {reminder.type} -{" "}
                          {reminder.medication || reminder.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due: {reminder.dueDate} • Method: {reminder.method}
                        </p>
                      </div>
                      <Badge
                        variant={
                          reminder.status === "Sent" ? "default" : "outline"
                        }
                      >
                        {reminder.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-base font-medium">Send New Reminder</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <Input placeholder="Reminder type" />
                <Input placeholder="Due date" type="date" />
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

function CustomerListView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  const filteredCustomers = customersData.filter(
    (customer) =>
      `${customer.personalInfo.firstName} ${customer.personalInfo.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveCustomer = (customerData: CustomerFormData) => {
    console.log("New customer data:", customerData);
    // Here you would typically save to your backend/database
    // For now, we'll just log it and show a success message
    alert(
      `Customer ${customerData.firstName} ${customerData.lastName} has been successfully added!`
    );
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button onClick={() => setIsAddingCustomer(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Customer List */}
      <div className="space-y-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {customer.personalInfo.firstName}{" "}
                      {customer.personalInfo.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {customer.id} • {customer.personalInfo.phone} •{" "}
                      {customer.personalInfo.email}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />$
                        {customer.totalSpent.toLocaleString()} total
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Activity className="h-3 w-3 mr-1" />
                        {customer.visitCount} visits
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Last: {customer.lastVisit}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {customer.medicalInfo.allergies.length > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Allergies
                    </Badge>
                  )}
                  {customer.creditInfo.currentBalance > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Wallet className="h-3 w-3 mr-1" />
                      Balance Due
                    </Badge>
                  )}
                  <Badge variant="default">{customer.status}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowProfile(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Profile Modal */}
      <CustomerProfileModal
        customer={selectedCustomer}
        isOpen={showProfile}
        onClose={() => {
          setShowProfile(false);
          setSelectedCustomer(null);
        }}
      />

      {/* Add Customer Form Modal */}
      <AddCustomerForm
        isOpen={isAddingCustomer}
        onClose={() => setIsAddingCustomer(false)}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}

function ReminderManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          SMS/Email Reminder Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Reminder Templates */}
          <div>
            <h4 className="font-medium mb-3">Reminder Templates</h4>
            <div className="space-y-3">
              {reminderTemplates.map((template, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{template.type} Reminder</h5>
                    <div className="flex space-x-1">
                      {template.methods.map((method, methodIndex) => (
                        <Badge
                          key={methodIndex}
                          variant="outline"
                          className="text-xs"
                        >
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {template.template}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Template
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Reminders */}
          <div>
            <h4 className="font-medium mb-3">Upcoming Reminders</h4>
            <div className="space-y-2">
              {customersData.flatMap((customer) =>
                customer.reminders.map((reminder, index) => (
                  <div
                    key={`${customer.id}-${index}`}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {customer.personalInfo.firstName}{" "}
                        {customer.personalInfo.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reminder.type}:{" "}
                        {reminder.medication || reminder.description} - Due:{" "}
                        {reminder.dueDate}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{reminder.method}</Badge>
                      <Badge
                        variant={
                          reminder.status === "Sent" ? "default" : "outline"
                        }
                      >
                        {reminder.status}
                      </Badge>
                      {reminder.status === "Scheduled" && (
                        <Button size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Send Now
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CustomerPage() {
  const [activeTab, setActiveTab] = useState("customers");
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  const handleSaveCustomer = (customerData: CustomerFormData) => {
    console.log("New customer data:", customerData);
    alert(
      `Customer ${customerData.firstName} ${customerData.lastName} has been successfully added!`
    );
  };

  const customerTabs = [
    { id: "customers", label: "Customer Profiles", icon: User },
    { id: "medical", label: "Medical Records", icon: Stethoscope },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "reminders", label: "Reminders", icon: Bell },
  ];

  const totalCustomers = customersData.length;
  const activeCustomers = customersData.filter(
    (c) => c.status === "Active"
  ).length;
  const customersWithAlergies = customersData.filter(
    (c) => c.medicalInfo.allergies.length > 0
  ).length;
  const pendingReminders = customersData
    .flatMap((c) => c.reminders)
    .filter((r) => r.status === "Scheduled").length;
  const outstandingBalance = customersData.reduce(
    (sum, c) => sum + c.creditInfo.currentBalance,
    0
  );

  return (
    <div className="space-y-6">
          {/* Page Title and Actions */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Customer & Patient Management
              </h1>
              <p className="text-muted-foreground">
                Comprehensive patient profiles with medical records and communication
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button onClick={() => setIsAddingCustomer(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                New Customer
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <User className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Customers
                    </p>
                    <p className="text-2xl font-bold">{totalCustomers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Activity className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Active Customers
                    </p>
                    <p className="text-2xl font-bold">{activeCustomers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      With Allergies
                    </p>
                    <p className="text-2xl font-bold">
                      {customersWithAlergies}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Bell className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Pending Reminders
                    </p>
                    <p className="text-2xl font-bold">{pendingReminders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Outstanding Balance
                    </p>
                    <p className="text-2xl font-bold">
                      ${outstandingBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Management Tabs */}
          <div className="flex space-x-2 border-b overflow-x-auto">
            {customerTabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "customers" && <CustomerListView />}

          {activeTab === "medical" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Medical Records Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customersData.map((customer) => (
                      <div key={customer.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">
                            {customer.personalInfo.firstName}{" "}
                            {customer.personalInfo.lastName}
                          </h4>
                          <Badge>{customer.id}</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-red-600">
                              Allergies:
                            </p>
                            {customer.medicalInfo.allergies.length > 0 ? (
                              customer.medicalInfo.allergies.map(
                                (allergy, index) => (
                                  <Badge
                                    key={index}
                                    variant="destructive"
                                    className="mr-1 mb-1 text-xs"
                                  >
                                    {allergy}
                                  </Badge>
                                )
                              )
                            ) : (
                              <span className="text-muted-foreground">
                                None
                              </span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">Conditions:</p>
                            {customer.medicalInfo.chronicConditions.map(
                              (condition, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="mr-1 mb-1 text-xs"
                                >
                                  {condition}
                                </Badge>
                              )
                            )}
                          </div>
                          <div>
                            <p className="font-medium">Primary Doctor:</p>
                            <p className="text-muted-foreground">
                              {customer.medicalInfo.primaryDoctor}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wallet className="h-5 w-5 mr-2" />
                      Credit & Payment Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customersData.map((customer) => (
                        <div
                          key={customer.id}
                          className="border rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">
                              {customer.personalInfo.firstName}{" "}
                              {customer.personalInfo.lastName}
                            </h4>
                            <Badge
                              variant={
                                customer.creditInfo.currentBalance > 0
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              {customer.creditInfo.creditStatus}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">
                                Credit Limit
                              </p>
                              <p className="font-medium">
                                $
                                {customer.creditInfo.creditLimit.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Current Balance
                              </p>
                              <p
                                className={`font-medium ${
                                  customer.creditInfo.currentBalance > 0
                                    ? "text-red-600"
                                    : "text-green-600"
                                }`}
                              >
                                $
                                {customer.creditInfo.currentBalance.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">
                                Total Spent
                              </p>
                              <p className="font-medium">
                                ${customer.totalSpent.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="h-5 w-5 mr-2" />
                      Recent Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {customersData.flatMap((customer) =>
                        customer.paymentHistory
                          .slice(0, 2)
                          .map((payment, index) => (
                            <div
                              key={`${customer.id}-${index}`}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div>
                                <p className="font-medium">
                                  {customer.personalInfo.firstName}{" "}
                                  {customer.personalInfo.lastName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {payment.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${payment.amount}</p>
                                <p className="text-xs text-muted-foreground">
                                  {payment.method}
                                </p>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "reminders" && <ReminderManagement />}

          {/* Add Customer Form Modal */}
          <AddCustomerForm
            isOpen={isAddingCustomer}
            onClose={() => setIsAddingCustomer(false)}
            onSave={handleSaveCustomer}
          />
    </div>
  );
}
