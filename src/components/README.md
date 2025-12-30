# Component Architecture Documentation

This directory contains the modular, reusable components for the Pharmacy Management System frontend.

## Directory Structure

```
components/
├── auth/           # Authentication related components
├── customer/       # Customer management components
├── dashboard/      # Dashboard widgets and cards
├── form/          # Form components (legacy, to be refactored)
├── invoice/       # Invoice management components
├── layout/        # Layout components (sidebar, header, etc.)
├── purchase/      # Purchase order components
├── shared/        # Shared/common components
├── ui/           # shadcn/ui base components
└── README.md     # This file
```

## Component Categories

### Feature Components
Located in feature-specific folders (`auth/`, `customer/`, `invoice/`, etc.)
- Self-contained, feature-specific components
- Imported via barrel exports: `import { LoginForm } from '@/components/auth'`
- Each folder has an `index.ts` for clean exports

### Shared Components
Located in `shared/` folder
- Generic, reusable across features
- Examples: `Loading`, `ErrorMessage`, `EmptyState`
- Used by multiple features

### UI Components
Located in `ui/` folder
- Base shadcn/ui components
- Customized with Tailwind CSS
- Low-level building blocks

## Import Patterns

### Feature Components (Recommended)
```typescript
// Use barrel exports from feature folders
import { LoginForm, LoginHeader } from '@/components/auth';
import { StatCard, QuickActions } from '@/components/dashboard';
import { CustomerCard, CustomerGrid } from '@/components/customer';
```

### Individual Components (When Needed)
```typescript
// Import specific component file
import { LoginForm } from '@/components/auth/LoginForm';
```

### UI Components
```typescript
// Always import from ui/
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
```

## Component Guidelines

### 1. File Naming
- PascalCase for component files: `CustomerCard.tsx`
- Match component name to filename
- Use `index.ts` for barrel exports

### 2. Component Structure
```typescript
// 1. Imports
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

// 2. Types/Interfaces
interface ComponentProps {
  data: string;
  onAction: () => void;
}

// 3. Component
export function Component({ data, onAction }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Handlers
  const handleClick = () => { /* ... */ };
  
  // 6. Render
  return (/* JSX */);
}
```

### 3. Props Interface
- Always define props interface
- Use descriptive names
- Document complex props with JSDoc

```typescript
interface CustomerCardProps {
  /** Customer data object */
  customer: Customer;
  
  /** Callback when edit button is clicked */
  onEdit: (id: string) => void;
  
  /** Optional custom styling */
  className?: string;
}
```

### 4. Composition
Build complex UIs from simple components:
```typescript
// Bad: Monolithic component
function Dashboard() {
  return (
    <div>
      {/* 500 lines of JSX */}
    </div>
  );
}

// Good: Composed components
function Dashboard() {
  return (
    <div>
      <DashboardHeader />
      <StatsGrid stats={stats} />
      <RecentActivity activities={activities} />
    </div>
  );
}
```

## Feature Folders

### Auth Components
**Location**: `components/auth/`

Components:
- `LoginForm` - Main authentication form
- `LoginHeader` - Welcome message and branding
- `LoginBackground` - Decorative background

Usage:
```typescript
import { LoginForm, LoginHeader } from '@/components/auth';
```

### Dashboard Components
**Location**: `components/dashboard/`

Components:
- `StatCard` - Statistics display card with trends
- `LowStockAlert` - Low inventory warnings
- `ExpiringItemsAlert` - Expiration warnings
- `QuickActions` - Quick action buttons
- `SalesOverview` - Sales performance chart

Usage:
```typescript
import { StatCard, LowStockAlert } from '@/components/dashboard';
```

### Customer Components
**Location**: `components/customer/`

Components:
- `CustomerListHeader` - Search and filter controls
- `CustomerCard` - Individual customer display
- `CustomerGrid` - Grid layout of customers

Usage:
```typescript
import { CustomerCard, CustomerGrid } from '@/components/customer';
```

### Invoice Components
**Location**: `components/invoice/`

Components:
- `InvoiceHeader` - Page header with actions
- `CustomerSelector` - Customer search/select
- `ProductSelector` - Product search/select
- `LineItemsTable` - Editable line items
- `InvoiceSummary` - Totals calculation

Usage:
```typescript
import { 
  InvoiceHeader, 
  LineItemsTable, 
  InvoiceSummary 
} from '@/components/invoice';
```

### Purchase Components
**Location**: `components/purchase/`

Components:
- `PurchaseOrderList` - Purchase order listing

Usage:
```typescript
import { PurchaseOrderList } from '@/components/purchase';
```

## Creating New Components

### Step 1: Choose Location
- Feature-specific? → Create in appropriate feature folder
- Reusable across features? → Create in `shared/`
- Base UI element? → Consider extending `ui/` components

### Step 2: Create Component File
```bash
# Example: New product card component
touch src/components/inventory/ProductCard.tsx
```

### Step 3: Define Interface
```typescript
interface ProductCardProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
```

### Step 4: Implement Component
```typescript
export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card>
      {/* Component JSX */}
    </Card>
  );
}
```

### Step 5: Add to Barrel Export
```typescript
// components/inventory/index.ts
export { ProductCard } from './ProductCard';
export { ProductList } from './ProductList';
```

### Step 6: Use in Page
```typescript
import { ProductCard } from '@/components/inventory';

export default function InventoryPage() {
  return <ProductCard product={product} onEdit={handleEdit} />;
}
```

## Testing Components

### Unit Tests
```typescript
// ProductCard.test.tsx
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Product Name')).toBeInTheDocument();
  });
});
```

### Integration Tests
Test component composition and interactions.

## Component Best Practices

### ✅ Do
- Keep components under 150 lines
- Use TypeScript for all props
- Export interfaces alongside components
- Use barrel exports (`index.ts`)
- Follow single responsibility principle
- Make components reusable

### ❌ Don't
- Mix business logic with presentation
- Create god components (500+ lines)
- Use `any` type
- Duplicate code across components
- Tightly couple to specific pages

## Performance Tips

### 1. Memoization
Use `React.memo()` for expensive components:
```typescript
export const ExpensiveComponent = React.memo(
  function ExpensiveComponent({ data }: Props) {
    return (/* JSX */);
  }
);
```

### 2. Code Splitting
Use dynamic imports for heavy components:
```typescript
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'));
```

### 3. Lazy Loading
Load components only when needed:
```typescript
const Modal = lazy(() => import('@/components/Modal'));
```

## Migration Checklist

When refactoring a page into components:

- [ ] Identify logical sections (header, form, table, etc.)
- [ ] Define TypeScript interfaces for each component
- [ ] Extract components into feature folder
- [ ] Create barrel export (`index.ts`)
- [ ] Update page to use new components
- [ ] Remove duplicate code
- [ ] Test all functionality
- [ ] Update documentation

## Additional Resources

- [COMPONENT_GUIDE.md](../COMPONENT_GUIDE.md) - Detailed development guide
- [COMPONENT_REFACTORING_SUMMARY.md](../COMPONENT_REFACTORING_SUMMARY.md) - Refactoring progress
- [REFACTORING_SUMMARY.md](../REFACTORING_SUMMARY.md) - Overall architecture changes

## Support

For questions about components:
1. Check this README
2. Review existing similar components
3. Refer to component guide documentation
4. Follow established patterns in the codebase
