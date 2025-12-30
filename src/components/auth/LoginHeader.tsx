import { Lock } from 'lucide-react';

export function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
        <Lock className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">
        Welcome Back
      </h1>
      <p className="text-white/70">
        Sign in to access your pharmacy dashboard
      </p>
    </div>
  );
}
