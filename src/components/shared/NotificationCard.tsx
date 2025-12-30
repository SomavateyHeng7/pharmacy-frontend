"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertBadge } from "./Badges";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Eye, EyeOff, Trash2 } from "lucide-react";

interface NotificationCardProps {
  id: string;
  type: 'alert' | 'info' | 'warning' | 'success' | 'error';
  category: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  link?: string;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  isSelected?: boolean;
}

export function NotificationCard({
  id,
  type,
  category,
  title,
  message,
  timestamp,
  read,
  actionRequired,
  link,
  onMarkRead,
  onDelete,
  isSelected = false
}: NotificationCardProps) {
  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <Card 
      className={`transition-all hover:shadow-md ${
        !read ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' : ''
      } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <AlertBadge type={type} />
              <span className="text-xs text-muted-foreground capitalize">{category}</span>
              {!read && (
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">New</span>
              )}
              {actionRequired && (
                <span className="text-xs font-semibold text-red-600 dark:text-red-400">Action Required</span>
              )}
            </div>
            
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {message}
            </p>
            
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
              {link && (
                <Link href={link}>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View Details →
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkRead(id)}
              className="h-8 w-8 p-0"
              title={read ? 'Mark as unread' : 'Mark as read'}
            >
              {read ? <EyeOff size={16} /> : <Eye size={16} />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(id)}
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              title="Delete notification"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
