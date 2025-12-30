"use client";

import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'alert';

interface AlertBadgeProps {
  type: AlertType;
  label?: string;
  className?: string;
}

const alertConfig: Record<AlertType, { color: string; icon: LucideIcon }> = {
  success: { 
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800', 
    icon: CheckCircle 
  },
  error: { 
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800', 
    icon: XCircle 
  },
  warning: { 
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800', 
    icon: AlertTriangle 
  },
  info: { 
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800', 
    icon: Info 
  },
  alert: { 
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800', 
    icon: AlertTriangle 
  },
};

export function AlertBadge({ type, label, className = '' }: AlertBadgeProps) {
  const config = alertConfig[type];
  const Icon = config.icon;
  
  return (
    <Badge 
      variant="outline" 
      className={`${config.color} flex items-center gap-1.5 ${className}`}
    >
      <Icon size={14} />
      {label || type}
    </Badge>
  );
}

interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'cancelled' | 'verified' | 'unverified';
  className?: string;
}

const statusConfig: Record<StatusBadgeProps['status'], string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  inactive: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300',
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  verified: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  unverified: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className={`${statusConfig[status]} ${className} capitalize`}>
      {status}
    </Badge>
  );
}

interface PriorityBadgeProps {
  priority: 'critical' | 'high' | 'medium' | 'low';
  className?: string;
}

const priorityConfig: Record<PriorityBadgeProps['priority'], string> = {
  critical: 'bg-red-500 text-white',
  high: 'bg-orange-500 text-white',
  medium: 'bg-yellow-500 text-white',
  low: 'bg-blue-500 text-white',
};

export function PriorityBadge({ priority, className = '' }: PriorityBadgeProps) {
  return (
    <Badge className={`${priorityConfig[priority]} ${className} capitalize`}>
      {priority}
    </Badge>
  );
}
