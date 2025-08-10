# Kuinbee Admin Frontend

A clean, modular admin frontend built with React, TypeScript, and Material-UI.

## 🏗️ Project Structure

```
src/
├── assets/                 # Static assets (images, logos, etc.)
├── core/                   # Core application setup
│   ├── config/            # Configuration files (theme, constants)
│   ├── services/          # Core API services
│   └── store/             # Redux store configuration
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   │   ├── components/    # Auth-specific components
│   │   ├── services/      # Auth API services
│   │   ├── store/         # Auth Redux slice
│   │   ├── types/         # Auth TypeScript types
│   │   └── index.ts       # Barrel export
│   ├── admin/             # Admin management feature
│   │   ├── components/    # Admin components & layouts
│   │   ├── hooks/         # Admin-specific hooks
│   │   ├── pages/         # Admin pages
│   │   └── index.ts       # Barrel export
│   └── superadmin/        # SuperAdmin management feature
│       ├── components/    # SuperAdmin components & layouts
│       ├── hooks/         # SuperAdmin-specific hooks
│       ├── pages/         # SuperAdmin pages
│       └── index.ts       # Barrel export
├── shared/                # Shared utilities and components
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components (buttons, modals, etc.)
│   │   └── layout/       # Layout components
│   ├── hooks/            # Shared React hooks
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Utility functions
├── App.tsx               # Main application component
└── main.tsx             # Application entry point
```

## 🎯 Architecture Principles

### 1. **Feature-Based Organization**
- Each major feature (auth, admin, superadmin) has its own directory
- Self-contained modules with their own components, services, and state
- Easy to scale and maintain

### 2. **Separation of Concerns**
- **Core**: Application-wide configuration and setup
- **Features**: Business logic and feature-specific code
- **Shared**: Reusable components and utilities

### 3. **Barrel Exports**
- Each feature/module exports through an `index.ts` file
- Clean and organized imports throughout the application
- Easy to refactor and maintain

### 4. **Type Safety**
- Strong TypeScript typing throughout
- Feature-specific types organized within each feature
- Shared types in the shared directory

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Configure VITE_API_BASE_URL
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Redux Toolkit
- **UI Framework**: Material-UI (MUI)
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: Sonner
- **Build Tool**: Vite

---

**Architecture organized for better developer experience and maintainability.**
