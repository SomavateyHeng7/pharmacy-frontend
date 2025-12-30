"use client";

import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const colorMap = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-orange-500',
  info: 'bg-blue-500',
};

export function Toast({ message, type = 'success', onClose, duration = 3000 }: ToastProps) {
  const Icon = iconMap[type];

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed top-6 right-6 ${colorMap[type]} text-white px-5 py-3 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-2 flex items-center gap-3`}>
      <Icon size={20} />
      <span className="font-medium">{message}</span>
      <button
        className="ml-2 hover:bg-white/20 rounded-full p-1 transition"
        onClick={onClose}
      >
        <X size={16} />
      </button>
    </div>
  );
}
