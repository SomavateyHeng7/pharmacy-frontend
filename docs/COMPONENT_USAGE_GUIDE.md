# Component Usage Guide

## Quick Start

Import components from the shared module:

```tsx
import { 
  PageHeader, 
  Toast, 
  FilterBar, 
  StatsGrid,
  EmptyState,
  AlertBadge,
  StatusBadge,
  DataTable
} from '@/components/shared';
```

## Component Examples

### PageHeader
```tsx
<PageHeader 
  title="Dashboard"
  subtitle="Welcome back!"
  action={<Button>New Item</Button>}
/>
```

### StatsGrid
```tsx
const stats = [
  { title: "Revenue", value: "$45,231", icon: DollarSign, trend: { value: 12.5, isPositive: true } },
  { title: "Orders", value: 234, icon: ShoppingCart },
];

<StatsGrid stats={stats} columns={4} />
```

### FilterBar
```tsx
<FilterBar
  searchValue={search}
  onSearchChange={setSearch}
  searchPlaceholder="Search items..."
  filters={[
    {
      label: 'Status',
      value: status,
      options: [{ label: 'All', value: 'all' }, { label: 'Active', value: 'active' }],
      onChange: setStatus
    }
  ]}
  activeFiltersCount={1}
  onClearFilters={() => reset()}
/>
```

### DataTable
```tsx
<DataTable
  columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Status', accessor: (row) => <StatusBadge status={row.status} /> },
    { header: 'Actions', accessor: (row) => <Button onClick={() => edit(row.id)}>Edit</Button> }
  ]}
  data={items}
  onRowClick={(row) => view(row)}
  pagination={{
    currentPage: page,
    totalPages: 10,
    onPageChange: setPage,
    pageSize: 20
  }}
/>
```

### EmptyState
```tsx
<EmptyState
  icon={Package}
  title="No items found"
  description="Get started by adding your first item"
  action={{ label: "Add Item", onClick: () => router.push('/add') }}
/>
```

### Badges
```tsx
<AlertBadge type="warning" label="Urgent" />
<StatusBadge status="active" />
<PriorityBadge priority="high" />
```

### Toast
```tsx
const [toast, setToast] = useState<string | null>(null);

{toast && (
  <Toast 
    message={toast}
    type="success"
    onClose={() => setToast(null)}
    duration={3000}
  />
)}
```

### TabNavigation
```tsx
const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'settings', label: 'Settings', icon: Settings }
];

<TabNavigation
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  orientation="horizontal"
/>
```

### NotificationCard
```tsx
<NotificationCard
  id="1"
  type="alert"
  category="inventory"
  title="Low Stock"
  message="Item running low"
  timestamp="2024-12-30T10:00:00"
  read={false}
  actionRequired={true}
  link="/inventory"
  onMarkRead={(id) => markRead(id)}
  onDelete={(id) => deleteItem(id)}
/>
```

## Full Page Example

```tsx
'use client';

import { useState } from 'react';
import { Package, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  PageHeader, 
  FilterBar, 
  StatsGrid, 
  DataTable,
  StatusBadge,
  EmptyState 
} from '@/components/shared';

export default function ItemsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  
  const stats = [
    { title: "Total Items", value: 567, icon: Package },
    { title: "Active", value: 450, icon: Package, iconColor: "text-green-600" },
  ];

  const columns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Stock', accessor: 'stock' as const },
    { 
      header: 'Status', 
      accessor: (row: any) => <StatusBadge status={row.status} /> 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Inventory"
        subtitle="Manage your items"
        action={<Button><Plus className="mr-2 h-4 w-4" />Add Item</Button>}
      />

      <StatsGrid stats={stats} columns={2} />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search items..."
        filters={[
          {
            label: 'Status',
            value: status,
            options: [
              { label: 'All', value: 'all' },
              { label: 'Active', value: 'active' },
            ],
            onChange: setStatus
          }
        ]}
      />

      <DataTable
        columns={columns}
        data={items}
        emptyMessage="No items found"
      />
    </div>
  );
}
```

## Tips

1. **Import once**: Use the index file for cleaner imports
2. **Type safety**: All components are fully typed with TypeScript
3. **Responsive**: All components are mobile-friendly
4. **Dark mode**: Full dark mode support built-in
5. **Customizable**: Use className prop for additional styling
6. **Accessibility**: Semantic HTML and ARIA labels included

## Common Patterns

### Loading State
```tsx
{isLoading ? (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
  </div>
) : (
  <DataTable ... />
)}
```

### Error State
```tsx
{error && (
  <Toast message={error} type="error" onClose={() => setError(null)} />
)}
```

### Conditional Actions
```tsx
<PageHeader 
  title="Items"
  action={canAdd && <Button>Add</Button>}
/>
```
