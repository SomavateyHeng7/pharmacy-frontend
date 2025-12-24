"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Shield,
  Edit,
  Save,
  ArrowLeft,
  MapPin,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const user = {
    name: "Dr. Alex Johnson",
    role: "Pharmacist",
    email: "alex.johnson@pharmacy.com",
    phone: "+1 (555) 234-5678",
    pharmacy: "CityCare Pharmacy",
    address: "123 Health St, New York, NY",
    license: "PHM-2024-01923",
    status: "Active",
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">
              Manage your account and pharmacy information
            </p>
          </div>
        </div>

        <Button
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6 flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-10 w-10 text-blue-600" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground">{user.role}</p>
            <div className="mt-2 flex gap-2">
              <Badge variant="outline">
                <Shield className="h-3 w-3 mr-1" />
                {user.license}
              </Badge>
              <Badge>{user.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input defaultValue={user.name} disabled={!isEditing} />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user.email} disabled={!isEditing} />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue={user.phone} disabled={!isEditing} />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Input defaultValue={user.role} disabled />
          </div>
        </CardContent>
      </Card>

      {/* Pharmacy Information */}
      <Card>
        <CardHeader>
          <CardTitle>Pharmacy Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Pharmacy Name</Label>
              <Input defaultValue={user.pharmacy} disabled={!isEditing} />
            </div>

            <div className="space-y-2">
              <Label>License Number</Label>
              <Input defaultValue={user.license} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input defaultValue={user.address} disabled={!isEditing} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">Password</p>
            <p className="text-sm text-muted-foreground">
              Last updated 30 days ago
            </p>
          </div>
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
