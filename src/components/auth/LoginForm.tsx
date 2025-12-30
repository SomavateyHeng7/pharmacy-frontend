import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginForm({
  email,
  password,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15"
            placeholder="pharmacist@example.com"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
          <Input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="pl-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
            Signing in...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            Sign In
            <ArrowRight className="ml-2 h-5 w-5" />
          </span>
        )}
      </Button>
    </form>
  );
}
