# Pay Forward Project Framework

> **For AI Agents:** This document is the **Single Source of Truth** for the Pay Forward project. All design, coding, and deployment decisions must align with this framework.

## 1. Project Identity
- **Name**: Pay Forward
- **Core Value**: [To be defined by Product Owner - e.g., A platform to pay for someone else's product/service in advance]
- **Target Audience**: [To be defined]

## 2. Technology Stack (Non-Negotiable)
- **Runtime**: Node.js
- **Mobile/Web Framework**: **React Native** with **Expo** (Managed Workflow)
  - `expo-router` for navigation (File-based routing)
  - `NativeWind` (Tailwind CSS for RN) for styling
- **Language**: TypeScript
- **Backend as a Service (BaaS)**: **Google Firebase**
  - Auth: Email/Password, Google Sign-In, Apple Sign-In
  - Database: Cloud Firestore
  - Storage: Cloud Storage
  - Hosting: Firebase Hosting (for Web App)
- **State Management**: React Context API or Zustand (Keep it simple initially)

## 3. Directory Structure
```
/
├── app/                 # Expo Router pages
├── components/          # Reusable UI components
├── services/            # Firebase service wrappers
├── hooks/               # Custom React hooks
├── types/               # TypeScript interfaces/types
├── constants/           # Colors, configuration, strings
└── assets/              # Images, fonts
```

## 4. Coding Conventions
- **Functional Components**: Use React Functional Components with Hooks.
- **Styling**: Utility-first using NativeWind (`className="..."`).
- **File Naming**: PascalCase for components (`MyComponent.tsx`), camelCase for logic (`useAuth.ts`).
- **Path Aliases**: Use `@/components`, `@/services` etc.

## 5. Agent Workflow Rules
1. **Read-First**: Before writing code, read this file to understand the architecture.
2. **One-Way Data Flow**: Data flows down, actions flow up.
3. **Type Safety**: No `any` types unless absolutely necessary (and commented why).
