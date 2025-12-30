"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PageHeader, PageContainer, Toast, TabNavigation } from "@/components/shared";
import {
  Settings,
  Store,
  Bell,
  Save,
  Percent,
  Clock,
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Database,
  Globe,
  FileText
} from "lucide-react";

interface SettingsData {
  businessInfo: {
    name: string;
    licenseNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email: string;
    taxId: string;
  };
  operatingHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  taxSettings: {
    defaultTaxRate: number;
    prescriptionTaxExempt: boolean;
    taxIdDisplay: boolean;
  };
  notificationSettings: {
    lowStockAlert: boolean;
    expiryAlert: boolean;
    lowStockThreshold: number;
    expiryDaysThreshold: number;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  systemSettings: {
    currency: string;
    dateFormat: string;
    timeFormat: string;
    language: string;
    backupFrequency: string;
    autoLogoutMinutes: number;
  };
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'business' | 'hours' | 'tax' | 'notifications' | 'system'>('business');
  const [toast, setToast] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsData>({
    businessInfo: {
      name: "City Pharmacy",
      licenseNumber: "PH-2024-001234",
      address: "123 Main Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      phone: "(415) 555-0123",
      email: "contact@citypharmacy.com",
      taxId: "12-3456789"
    },
    operatingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "", close: "", closed: true }
    },
    taxSettings: {
      defaultTaxRate: 8.5,
      prescriptionTaxExempt: true,
      taxIdDisplay: true
    },
    notificationSettings: {
      lowStockAlert: true,
      expiryAlert: true,
      lowStockThreshold: 50,
      expiryDaysThreshold: 90,
      emailNotifications: true,
      smsNotifications: false
    },
    systemSettings: {
      currency: "USD",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12-hour",
      language: "English",
      backupFrequency: "daily",
      autoLogoutMinutes: 30
    }
  });

  const handleSave = () => {
    // API call to save settings
    setToast("Settings saved successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  const tabs = [
    { id: 'business', label: 'Business Info', icon: Store },
    { id: 'hours', label: 'Operating Hours', icon: Clock },
    { id: 'tax', label: 'Tax Settings', icon: Percent },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'system', label: 'System', icon: Settings }
  ];

  return (
    <PageContainer>
      {toast && (
        <Toast
          message={toast}
          type="success"
          onClose={() => setToast(null)}
        />
      )}

      <PageHeader
        title="Settings"
        subtitle="Configure system settings and preferences"
        action={
          <Button onClick={handleSave} size="lg">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <TabNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as typeof activeTab)}
            orientation="vertical"
          />
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Business Info */}
          {activeTab === 'business' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={settings.businessInfo.name}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessInfo: { ...settings.businessInfo, name: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Pharmacy License Number *</Label>
                    <Input
                      id="licenseNumber"
                      value={settings.businessInfo.licenseNumber}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessInfo: { ...settings.businessInfo, licenseNumber: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={settings.businessInfo.address}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessInfo: { ...settings.businessInfo, address: e.target.value }
                    })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={settings.businessInfo.city}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessInfo: { ...settings.businessInfo, city: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={settings.businessInfo.state}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessInfo: { ...settings.businessInfo, state: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                      value={settings.businessInfo.zipCode}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessInfo: { ...settings.businessInfo, zipCode: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={settings.businessInfo.phone}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessInfo: { ...settings.businessInfo, phone: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.businessInfo.email}
                      onChange={(e) => setSettings({
                        ...settings,
                        businessInfo: { ...settings.businessInfo, email: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID / EIN *</Label>
                  <Input
                    id="taxId"
                    value={settings.businessInfo.taxId}
                    onChange={(e) => setSettings({
                      ...settings,
                      businessInfo: { ...settings.businessInfo, taxId: e.target.value }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Operating Hours */}
          {activeTab === 'hours' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Operating Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings.operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-32">
                      <p className="font-medium capitalize">{day}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-1">
                      {!hours.closed ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Open:</Label>
                            <Input
                              type="time"
                              value={hours.open}
                              className="w-32"
                              onChange={(e) => setSettings({
                                ...settings,
                                operatingHours: {
                                  ...settings.operatingHours,
                                  [day]: { ...hours, open: e.target.value }
                                }
                              })}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label className="text-sm">Close:</Label>
                            <Input
                              type="time"
                              value={hours.close}
                              className="w-32"
                              onChange={(e) => setSettings({
                                ...settings,
                                operatingHours: {
                                  ...settings.operatingHours,
                                  [day]: { ...hours, close: e.target.value }
                                }
                              })}
                            />
                          </div>
                        </>
                      ) : (
                        <Badge variant="secondary">Closed</Badge>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSettings({
                        ...settings,
                        operatingHours: {
                          ...settings.operatingHours,
                          [day]: { ...hours, closed: !hours.closed }
                        }
                      })}
                    >
                      {hours.closed ? 'Open' : 'Close'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Tax Settings */}
          {activeTab === 'tax' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="h-5 w-5 mr-2" />
                  Tax Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.1"
                    value={settings.taxSettings.defaultTaxRate}
                    onChange={(e) => setSettings({
                      ...settings,
                      taxSettings: { ...settings.taxSettings, defaultTaxRate: parseFloat(e.target.value) }
                    })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Current rate: {settings.taxSettings.defaultTaxRate}%
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Prescription Tax Exemption</p>
                    <p className="text-sm text-muted-foreground">
                      Exclude prescriptions from sales tax
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.taxSettings.prescriptionTaxExempt}
                    onChange={(e) => setSettings({
                      ...settings,
                      taxSettings: { ...settings.taxSettings, prescriptionTaxExempt: e.target.checked }
                    })}
                    className="h-5 w-5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Display Tax ID on Receipts</p>
                    <p className="text-sm text-muted-foreground">
                      Show tax identification number on printed receipts
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.taxSettings.taxIdDisplay}
                    onChange={(e) => setSettings({
                      ...settings,
                      taxSettings: { ...settings.taxSettings, taxIdDisplay: e.target.checked }
                    })}
                    className="h-5 w-5"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Low Stock Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Notify when inventory falls below threshold
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notificationSettings.lowStockAlert}
                      onChange={(e) => setSettings({
                        ...settings,
                        notificationSettings: { ...settings.notificationSettings, lowStockAlert: e.target.checked }
                      })}
                      className="h-5 w-5"
                    />
                  </div>

                  {settings.notificationSettings.lowStockAlert && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                      <Input
                        id="lowStockThreshold"
                        type="number"
                        value={settings.notificationSettings.lowStockThreshold}
                        onChange={(e) => setSettings({
                          ...settings,
                          notificationSettings: { ...settings.notificationSettings, lowStockThreshold: parseInt(e.target.value) }
                        })}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Expiry Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Notify about upcoming product expiration
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notificationSettings.expiryAlert}
                      onChange={(e) => setSettings({
                        ...settings,
                        notificationSettings: { ...settings.notificationSettings, expiryAlert: e.target.checked }
                      })}
                      className="h-5 w-5"
                    />
                  </div>

                  {settings.notificationSettings.expiryAlert && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="expiryThreshold">Alert Days Before Expiry</Label>
                      <Input
                        id="expiryThreshold"
                        type="number"
                        value={settings.notificationSettings.expiryDaysThreshold}
                        onChange={(e) => setSettings({
                          ...settings,
                          notificationSettings: { ...settings.notificationSettings, expiryDaysThreshold: parseInt(e.target.value) }
                        })}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts via email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notificationSettings.emailNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notificationSettings: { ...settings.notificationSettings, emailNotifications: e.target.checked }
                      })}
                      className="h-5 w-5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive alerts via text message
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notificationSettings.smsNotifications}
                      onChange={(e) => setSettings({
                        ...settings,
                        notificationSettings: { ...settings.notificationSettings, smsNotifications: e.target.checked }
                      })}
                      className="h-5 w-5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      id="currency"
                      value={settings.systemSettings.currency}
                      onChange={(e) => setSettings({
                        ...settings,
                        systemSettings: { ...settings.systemSettings, currency: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <select
                      id="dateFormat"
                      value={settings.systemSettings.dateFormat}
                      onChange={(e) => setSettings({
                        ...settings,
                        systemSettings: { ...settings.systemSettings, dateFormat: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <select
                      id="timeFormat"
                      value={settings.systemSettings.timeFormat}
                      onChange={(e) => setSettings({
                        ...settings,
                        systemSettings: { ...settings.systemSettings, timeFormat: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="12-hour">12-hour (AM/PM)</option>
                      <option value="24-hour">24-hour</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={settings.systemSettings.language}
                      onChange={(e) => setSettings({
                        ...settings,
                        systemSettings: { ...settings.systemSettings, language: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">Backup Frequency</Label>
                    <select
                      id="backupFrequency"
                      value={settings.systemSettings.backupFrequency}
                      onChange={(e) => setSettings({
                        ...settings,
                        systemSettings: { ...settings.systemSettings, backupFrequency: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="autoLogout">Auto Logout (minutes)</Label>
                    <Input
                      id="autoLogout"
                      type="number"
                      value={settings.systemSettings.autoLogoutMinutes}
                      onChange={(e) => setSettings({
                        ...settings,
                        systemSettings: { ...settings.systemSettings, autoLogoutMinutes: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Database Management</h4>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Backup Now
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
