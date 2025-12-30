"use client";

import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { LoginBackground } from "@/components/auth/LoginBackground";
// import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // TODO: Uncomment when backend is ready
  // const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // await login(email, password);
      
      // Temporary mock login
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (email === "admin@pharmacy.com" && password === "admin123") {
        window.location.href = "/";
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <LoginBackground />

      <div className="w-full max-w-md relative">
        {/* Glassmorphism card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <LoginHeader />
          <LoginForm
            email={email}
            password={password}
            error={error}
            isLoading={isLoading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleLogin}
          />

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white/60">
              Default credentials: admin@pharmacy.com / admin123
            </p>
          </div>
        </div>

        {/* Bottom hint */}
        <p className="mt-6 text-center text-sm text-white/50">
          Pharmacy Management System v1.0
        </p>
      </div>
    </div>
  );
}