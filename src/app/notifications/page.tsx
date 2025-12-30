"use client";

import { useState, useMemo } from "react";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, PageContainer, FilterBar, NotificationCard, EmptyState, StatsCard } from "@/components/shared";

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'warning' | 'success' | 'error';
  category: 'inventory' | 'order' | 'customer' | 'system' | 'prescription';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
  link?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    category: 'inventory',
    title: 'Critical Low Stock Alert',
    message: 'Paracetamol 500mg has fallen below minimum stock level (15 units remaining, minimum: 50)',
    timestamp: '2024-12-30T10:30:00',
    read: false,
    actionRequired: true,
    link: '/inventory'
  },
  {
    id: '2',
    type: 'warning',
    category: 'inventory',
    title: 'Products Expiring Soon',
    message: '8 products will expire within the next 30 days. Review batch expiry management.',
    timestamp: '2024-12-30T09:15:00',
    read: false,
    actionRequired: true,
    link: '/inventory/batches'
  },
  {
    id: '3',
    type: 'info',
    category: 'order',
    title: 'New Purchase Order',
    message: 'Purchase order PO-2024-089 has been received from PharmaCorp Ltd.',
    timestamp: '2024-12-30T08:45:00',
    read: false,
    actionRequired: false,
    link: '/purchase'
  },
  {
    id: '4',
    type: 'success',
    category: 'order',
    title: 'Order Approved',
    message: 'Purchase order PO-2024-088 has been approved and ready for goods receipt.',
    timestamp: '2024-12-29T16:20:00',
    read: true,
    actionRequired: false,
    link: '/purchase'
  },
  {
    id: '5',
    type: 'info',
    category: 'prescription',
    title: 'Prescription Pending Verification',
    message: 'Prescription RX-2024-345 for John Smith requires pharmacist verification.',
    timestamp: '2024-12-29T14:30:00',
    read: false,
    actionRequired: true,
    link: '/prescription'
  },
  {
    id: '6',
    type: 'warning',
    category: 'customer',
    title: 'Customer Payment Overdue',
    message: 'Invoice INV-2024-234 for Maria Garcia is 15 days overdue ($125.50)',
    timestamp: '2024-12-29T11:00:00',
    read: true,
    actionRequired: true,
    link: '/invoices'
  },
  {
    id: '7',
    type: 'alert',
    category: 'system',
    title: 'System Backup Scheduled',
    message: 'Automatic system backup will begin at 2:00 AM. No action required.',
    timestamp: '2024-12-28T23:00:00',
    read: true,
    actionRequired: false
  },
  {
    id: '8',
    type: 'success',
    category: 'inventory',
    title: 'Stock Replenished',
    message: 'Amoxicillin 500mg inventory has been restocked. New quantity: 250 units.',
    timestamp: '2024-12-28T15:45:00',
    read: true,
    actionRequired: false,
    link: '/inventory'
  },
  {
    id: '9',
    type: 'error',
    category: 'system',
    title: 'Failed Email Notification',
    message: 'Unable to send email notification to customer@email.com. Please check email settings.',
    timestamp: '2024-12-28T12:20:00',
    read: false,
    actionRequired: true,
    link: '/settings'
  },
  {
    id: '10',
    type: 'info',
    category: 'customer',
    title: 'New Customer Registration',
    message: 'New customer David Wilson (ID: C-2024-456) has registered.',
    timestamp: '2024-12-27T10:15:00',
    read: true,
    actionRequired: false,
    link: '/customer'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'actionRequired'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | Notification['category']>('all');

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notif => {
      const matchesSearch = searchQuery === '' ||
        notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notif.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = filterType === 'all' ||
        (filterType === 'unread' && !notif.read) ||
        (filterType === 'actionRequired' && notif.actionRequired);

      const matchesCategory = filterCategory === 'all' || notif.category === filterCategory;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [notifications, searchQuery, filterType, filterCategory]);

  const stats = useMemo(() => ({
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    actionRequired: notifications.filter(n => n.actionRequired && !n.read).length
  }), [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filterOptions = [
    {
      label: 'Status',
      value: filterType,
      options: [
        { label: 'All', value: 'all' },
        { label: 'Unread Only', value: 'unread' },
        { label: 'Action Required', value: 'actionRequired' }
      ],
      onChange: (value: string) => setFilterType(value as typeof filterType)
    },
    {
      label: 'Category',
      value: filterCategory,
      options: [
        { label: 'All Categories', value: 'all' },
        { label: 'Inventory', value: 'inventory' },
        { label: 'Orders', value: 'order' },
        { label: 'Customers', value: 'customer' },
        { label: 'Prescriptions', value: 'prescription' },
        { label: 'System', value: 'system' }
      ],
      onChange: (value: string) => setFilterCategory(value as typeof filterCategory)
    }
  ];

  const activeFiltersCount = (filterType !== 'all' ? 1 : 0) + (filterCategory !== 'all' ? 1 : 0);

  return (
    <PageContainer>
      <PageHeader 
        title="Notifications"
        subtitle="Stay updated with important alerts and messages"
        action={
          <div className="flex gap-2">
            <Button onClick={markAllAsRead} variant="outline" size="sm" disabled={stats.unread === 0}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button onClick={clearAll} variant="outline" size="sm" disabled={notifications.length === 0}>
              <BellOff className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        }
      />

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <StatsCard
          title="Total Notifications"
          value={stats.total}
          icon={Bell}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Unread"
          value={stats.unread}
          icon={BellOff}
          iconColor="text-orange-600"
        />
        <StatsCard
          title="Action Required"
          value={stats.actionRequired}
          icon={Bell}
          iconColor="text-red-600"
        />
      </div>

      {/* Filters */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search notifications..."
        filters={filterOptions}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={() => {
          setFilterType('all');
          setFilterCategory('all');
        }}
      />

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications found"
          description={
            searchQuery || filterType !== 'all' || filterCategory !== 'all'
              ? "Try adjusting your filters"
              : "You're all caught up!"
          }
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <NotificationCard
              key={notif.id}
              {...notif}
              onMarkRead={markAsRead}
              onDelete={deleteNotification}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
