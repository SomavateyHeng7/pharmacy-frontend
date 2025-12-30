import { useState } from 'react';
import { X, Eye, EyeOff, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PasswordFormData) => void;
}

export function ChangePasswordModal({
  isOpen,
  onClose,
  onSubmit,
}: ChangePasswordModalProps) {
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PasswordFormData, string>>>({});

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    return strength;
  };

  const strength = getPasswordStrength(formData.newPassword);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ];

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PasswordFormData, string>> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase and lowercase letters';
    } else if (!/(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain at least one number';
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setErrors({});
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
    onClose();
  };

  const handleChange = (field: keyof PasswordFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">
                Current Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => handleChange('currentPassword', e.target.value)}
                  placeholder="Enter current password"
                  className={errors.currentPassword ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((prev) => ({ ...prev, current: !prev.current }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">
                New Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => handleChange('newPassword', e.target.value)}
                  placeholder="Enter new password"
                  className={errors.newPassword ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.newPassword}
                </p>
              )}

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded ${
                          i < strength ? strengthColors[strength - 1] : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Strength: {strengthLabels[strength - 1] || 'Very Weak'}
                  </p>
                </div>
              )}

              {/* Password Requirements */}
              <div className="space-y-1 text-xs text-muted-foreground">
                <p className="flex items-center gap-1">
                  {formData.newPassword.length >= 8 ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-gray-300" />
                  )}
                  At least 8 characters
                </p>
                <p className="flex items-center gap-1">
                  {/(?=.*[a-z])(?=.*[A-Z])/.test(formData.newPassword) ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-gray-300" />
                  )}
                  Uppercase and lowercase letters
                </p>
                <p className="flex items-center gap-1">
                  {/(?=.*\d)/.test(formData.newPassword) ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-gray-300" />
                  )}
                  At least one number
                </p>
                <p className="flex items-center gap-1">
                  {/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-gray-300" />
                  )}
                  Special character (recommended)
                </p>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm New Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                  className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </p>
              )}
              {!errors.confirmPassword &&
                formData.confirmPassword &&
                formData.newPassword === formData.confirmPassword && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Passwords match
                  </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Update Password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
