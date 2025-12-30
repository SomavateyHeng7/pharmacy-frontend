# Toast Notification System

## 🎨 Beautiful UI Features

### Visual Design
- **Gradient backgrounds** with variant-specific colors
- **Smooth animations** - slide in from top with fade effect
- **Progress bar** - visual countdown showing remaining time
- **Icon indicators** - context-aware icons for each variant
- **Dark mode support** - seamless theme transitions
- **Responsive design** - works on all screen sizes

### Toast Variants

#### 1. Success (Green) ✅
```tsx
toast({
  title: "Success!",
  description: "Your action completed successfully.",
  variant: "success",
  duration: 5000 // optional, defaults to 5000ms
})
```

#### 2. Error (Red) ❌
```tsx
toast({
  title: "Error",
  description: "Something went wrong. Please try again.",
  variant: "error"
})
```

#### 3. Warning (Amber) ⚠️
```tsx
toast({
  title: "Warning",
  description: "Please review your input before proceeding.",
  variant: "warning"
})
```

#### 4. Info (Blue) ℹ️
```tsx
toast({
  title: "Information",
  description: "Here's some helpful information for you.",
  variant: "info"
})
```

#### 5. Default (Neutral) 📝
```tsx
toast({
  title: "Notification",
  description: "This is a general notification."
  // variant: "default" is implicit
})
```

## 📦 Implementation

### Usage in Components

```tsx
"use client"

import { useToast } from "@/components/ui/use-toast"

export function MyComponent() {
  const { toast } = useToast()
  
  const handleAction = () => {
    toast({
      title: "Batch Added",
      description: "Batch #12345 has been added to inventory.",
      variant: "success",
      duration: 4000
    })
  }
  
  return <button onClick={handleAction}>Add Batch</button>
}
```

## 🎯 Current Integration

### ✅ Profile Page
- **Password change success**: Green success toast
- **Password change error**: Red error toast

### ✅ Inventory Page
- **Batch added**: Green success toast with batch number
- **Batch error**: Red error toast

## 🔧 Technical Details

### Components
- **Toast** (`/components/ui/toast.tsx`) - Individual toast component
- **Toaster** (`/components/ui/toaster.tsx`) - Toast container/manager
- **useToast** (`/components/ui/use-toast.tsx`) - Hook and context provider

### Features
- Auto-dismiss after duration (default 5 seconds)
- Manual dismiss via X button
- Progress bar shows remaining time
- Stacked display (up to multiple toasts)
- Click-outside safe (won't close)
- Positioned top-right on desktop, top-center on mobile

### Styling
- Gradient backgrounds per variant
- Icon colors match variant theme
- Smooth CSS animations
- Shadow and border effects
- Responsive max-width

## 🎨 Animation Details

- **Entry**: Slide down from top (300ms ease-out)
- **Exit**: Fade out (automatic after duration)
- **Progress bar**: Smooth countdown animation
- **Hover effects**: Close button highlights on hover

## 📱 Responsive Behavior

- **Desktop**: Fixed top-right, max-width 24rem
- **Mobile**: Fixed top-center, full-width with padding
- **Tablet**: Adapts between desktop and mobile layout

## 🌈 Color Palette

| Variant | Background | Icon Color | Progress Bar |
|---------|-----------|------------|--------------|
| Success | Green gradient | Green-600 | Green-500 |
| Error | Red gradient | Red-600 | Red-500 |
| Warning | Amber gradient | Amber-600 | Amber-500 |
| Info | Blue gradient | Blue-600 | Blue-500 |
| Default | White/Gray | - | Gray-400 |

---

**Note**: Toast system is globally available through ToastProvider in the root layout.
