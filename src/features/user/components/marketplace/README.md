# DataMarketplace Refactor

This document explains the refactoring of the DataMarketplace component into smaller, reusable components.

## Structure

### Components (`src/features/user/components/marketplace/`)

1. **HeroSection** - The top hero section with title, subtitle, and statistics
2. **SearchAndSortBar** - Search input and sort dropdown controls
3. **CategoryPills** - Category filter buttons and paid toggle
4. **FilterSidebar** - Complete sidebar with all filter options
5. **DataTable** - Main data table with pagination
6. **MobileMenu** - Mobile hamburger menu with cart and profile buttons

### Utils (`src/features/user/utils/`)

1. **categoryHashtags.ts** - Category hashtag mappings
2. **marketplaceHelpers.ts** - Helper functions and types including:
   - Source interface
   - Pagination helpers
   - Sort options

### Hooks (`src/features/user/hooks/`)

1. **useMarketplaceData.ts** - Custom hook for data fetching and state management

## Main Benefits

1. **Modularity** - Each component has a single responsibility
2. **Reusability** - Components can be reused in other parts of the app
3. **Maintainability** - Easier to debug and modify individual sections
4. **Testing** - Each component can be tested independently
5. **Code Organization** - Related logic is grouped together

## Usage

Import components individually or use the barrel export:

```tsx
// Individual imports
import HeroSection from './components/marketplace/HeroSection';
import DataTable from './components/marketplace/DataTable';

// Barrel import
import { HeroSection, DataTable } from './components/marketplace';
```

## Props

Each component receives only the props it needs, making the data flow clear and preventing unnecessary re-renders.

## State Management

The main DataMarketplace component manages:
- Filter states
- UI states (dropdowns, mobile menu)
- Pagination states

The useMarketplaceData hook manages:
- Data fetching
- API calls
- Loading and error states
