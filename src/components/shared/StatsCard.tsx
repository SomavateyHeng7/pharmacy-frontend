"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
  className?: string;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  iconColor = 'text-blue-600',
  className = '',
  onClick
}: StatsCardProps) {
  return (
    <Card 
      className={`hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <p className={`text-xs mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.isPositive ? 'increase' : 'decrease'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: Array<Omit<StatsCardProps, 'className'>>;
  columns?: 2 | 3 | 4 | 5;
}

export function StatsGrid({ stats, columns = 4 }: StatsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5',
  };

  return (
    <div className={`grid gap-4 ${gridCols[columns]}`}>
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
