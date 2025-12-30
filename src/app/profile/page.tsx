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
} from "lucide-react";
import { ChangePasswordModal } from "@/components/profile/ChangePasswordModal";
import { useToast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

  const handlePasswordChange = async (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    try {
      // TODO: Integrate with backend API
      // await api.profile.changePassword(data);
      console.log('Password change data:', data);
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "error",
      });
    }
  };

  return (
    <>
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSubmit={handlePasswordChange}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                aria-label="Back"
                className="shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Profile</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Manage your account and pharmacy information
                </p>
              </div>
            </div>

            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
              className="w-full sm:w-auto"
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
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <User className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold">{user.name}</h2>
                <p className="text-sm sm:text-base text-muted-foreground">{user.role}</p>
                <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="outline" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    {user.license}
                  </Badge>
                  <Badge className="text-xs">{user.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

          {/* Security */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Security</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-medium text-sm sm:text-base">Password</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Last updated 30 days ago
                </p>
              </div>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
