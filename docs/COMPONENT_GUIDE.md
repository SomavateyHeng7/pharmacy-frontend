# Component Refactoring Guide

## Overview
This document describes the component structure and refactoring patterns used in the application.

## Dashboard Components (`/components/dashboard/`)

### StatCard
**File:** `StatCard.tsx`
**Purpose:** Displays a single statistic with icon, title, value, and optional trend
**Props:**
- `title` - Card title
- `value` - Main value to display
- `subtitle` - Additional context
- `icon` - Lucide icon component
- `trend` - Optional growth/decline indicator

**Usage:**
```tsx
<StatCard
  title="Total Revenue"
  value="$45,231"
  subtitle="from yesterday"
  icon={DollarSign}
  trend={{ value: 12.5, isPositive: true }}
/>
```

### LowStockAlert
**File:** `LowStockAlert.tsx`
**Purpose:** Shows items with low stock levels
**Props:**
- `items` - Array of low stock items
- `totalCount` - Total number of low stock items
- `onViewAll` - Callback for "View All" button

### ExpiringItemsAlert
**File:** `ExpiringItemsAlert.tsx`
**Purpose:** Displays items expiring soon
**Props:**
- `items` - Array of expiring items
- `totalCount` - Total count of expiring items
- `onViewAll` - Callback for "View All" button

### QuickActions
**File:** `QuickActions.tsx`
**Purpose:** Provides quick action buttons
**Props:**
- `actions` - Array of action objects with id, label, icon, and onClick

### SalesOverview
**File:** `SalesOverview.tsx`
**Purpose:** Shows sales progress and statistics
**Props:**
- `data` - Sales data object with revenue, targets, and growth

## Benefits of Component-Based Structure

### 1. **Reusability**
Components can be reused across different pages:
```tsx
// Use StatCard in multiple dashboards
<StatCard title="Revenue" value="$1000" icon={DollarSign} />
```

### 2. **Testability**
Each component can be tested independently:
```tsx
test('StatCard displays correct value', () => {
  render(<StatCard title="Test" value="100" icon={DollarSign} />);
  expect(screen.getByText('100')).toBeInTheDocument();
});
```

### 3. **Maintainability**
Changes to one component don't affect others:
- Update StatCard styling without touching LowStockAlert
- Fix bugs in isolation
- Easier to locate and fix issues

### 4. **Type Safety**
Each component has clear TypeScript interfaces:
```tsx
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
}
```

### 5. **Performance**
Smaller components can be optimized individually:
- Memoization with React.memo
- Lazy loading specific components
- Code splitting by component

## Component Structure Pattern

```
/components
├── dashboard/          # Feature-specific components
│   ├── StatCard.tsx   # Presentational component
│   ├── LowStockAlert.tsx
│   └── index.ts       # Barrel export
├── shared/            # Shared across features
│   ├── Loading.tsx
│   └── ErrorMessage.tsx
└── ui/                # Base UI primitives
    ├── button.tsx
    └── card.tsx
```

## Best Practices

### 1. **Component Naming**
- Use PascalCase for components
- Descriptive names (StatCard, not Card1)
- Feature prefix for specificity (DashboardStatCard)

### 2. **Props Interface**
Always define TypeScript interfaces:
```tsx
interface ComponentProps {
  // Required props
  title: string;
  // Optional props
  subtitle?: string;
  // Callbacks
  onClick?: () => void;
}
```

### 3. **Single Responsibility**
Each component should do one thing well:
- ✅ StatCard displays a statistic
- ❌ StatCard doesn't fetch data or manage state

### 4. **Composition over Configuration**
Prefer composing small components:
```tsx
<Card>
  <CardHeader>
    <StatCard... />
  </CardHeader>
</Card>
```

### 5. **Prop Drilling Solutions**
For deeply nested components:
- Use Context API for global state
- Use composition to avoid prop drilling
- Pass only necessary props

## Migration Pattern

When refactoring a large component:

1. **Identify sections** that can be extracted
2. **Define props interface** for the new component
3. **Extract JSX and logic** into new file
4. **Test the component** independently
5. **Replace in original** with new component
6. **Clean up unused** code

Example:
```tsx
// Before: Large dashboard component
export default function Dashboard() {
  return (
    <div>
      {/* 500 lines of code */}
    </div>
  );
}

// After: Composition of smaller components
export default function Dashboard() {
  return (
    <div>
      <StatCard ... />
      <LowStockAlert ... />
      <QuickActions ... />
    </div>
  );
}
```

## Performance Optimization

### React.memo
Use for components that receive the same props:
```tsx
export const StatCard = React.memo(({ title, value }) => {
  return <Card>...</Card>;
});
```

### Callback Memoization
Use useCallback for passed functions:
```tsx
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);
```

### Lazy Loading
Load heavy components on demand:
```tsx
const HeavyChart = lazy(() => import('./HeavyChart'));
```

## Testing Strategy

### Unit Tests
Test each component in isolation:
```tsx
describe('StatCard', () => {
  it('renders title and value', () => {
    render(<StatCard title="Test" value="100" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Integration Tests
Test component interactions:
```tsx
describe('Dashboard', () => {
  it('navigates to inventory on View All click', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText('View All'));
    expect(mockRouter.push).toHaveBeenCalledWith('/inventory');
  });
});
```

## Next Steps

As you refactor other pages:
1. Follow the same component extraction pattern
2. Create feature-specific component folders
3. Document props and usage
4. Write tests for new components
5. Update this guide with new patterns

## Component Checklist

When creating a new component:
- [ ] Define TypeScript interface for props
- [ ] Add JSDoc comments
- [ ] Export from index.ts
- [ ] Write basic test
- [ ] Document usage in this guide
- [ ] Check for reusability opportunities
- [ ] Consider performance implications
