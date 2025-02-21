# 🚀 React + TypeScript Style Guide

A **structured, scalable, and opinionated** style guide for building **maintainable React applications** with **TypeScript**. This guide ensures **consistency, clarity, and best practices** across projects.

## 📖 Table of Contents

- [Philosophy](#-philosophy)
- [Folder Structure](#-folder-structure)

---

## 🧠 Philosophy

This style guide is designed to ensure **consistency, readability, and maintainability** in React + TypeScript projects. By following a structured approach, we aim to reduce cognitive load, improve collaboration, and make codebases easier to scale.

### 🔹 Core Principles

- **Minimal Mental Overhead**  
  Code should be **easy to scan and understand** without requiring excessive comments or context switching. Developers should be able to predict where things are located and how they are structured.

- **Predictability**  
  Every file and component follows the **same structure**, reducing ambiguity. Naming conventions, folder structures, and function placements should remain consistent across the entire codebase.

- **Clarity Over Flexibility**  
  While flexibility can be useful, **clarity is prioritized**. The goal is not to support every possible way of writing code but to ensure that code is **uniform and easy to maintain**.

- **Encapsulation**  
  Each feature should be **self-contained**, meaning components, hooks, and utilities related to a feature should live in the same folder. This improves modularity and reduces cross-dependencies.

- **No Unnecessary Abstraction**  
  Over-engineering leads to **harder-to-read** code. We avoid unnecessary wrapper functions, excessive prop drilling, and premature optimizations unless there is a **clear** need for them.

- **Early Returns for Simplicity**  
  When dealing with conditionals, we **return early** to **reduce nesting** and improve readability.

- **Separation of Concerns**  
  Logic, UI, and state management should be **properly separated** to improve maintainability. Business logic should live in hooks or utility functions rather than in the UI layer.

### ✅ Summary

By following this guide, teams can write **cleaner, more scalable, and easier-to-maintain** code. The focus is on **consistency, clarity, and minimal cognitive load** while following modern React + TypeScript best practices.

---

## 📂 Folder Structure

A **structured, feature-based folder organization** ensures **scalability, maintainability, and readability**. This structure keeps related files **encapsulated** while providing clear separation between **shared logic** and **feature-specific implementations**.

### 🔹 General Folder Structure

- **Feature-based structure (`pages/featureName/`)**

  - Each feature has its own folder inside `pages/`.
  - **Example:** `pages/profile/` contains all Profile-related logic.
  - **Recommended depth:** While **there's no strict limit**, keeping **features within three levels** (`pages/profile/common/ProfileHero/`) improves maintainability.

- **`common/` for shared logic**

  - Stores **shared UI components, hooks, and utilities**.
  - **Example:** `common/hooks/useFlag.ts` is reusable across multiple features.

- **Application-wide configurations in `config/`**

  - This folder is **only for external integrations** (e.g., Google Maps, Firebase, Analytics).
  - **Example:** `config/apollo/ApolloProvider.tsx`.

- **Global constants & utils (if needed) in `constants/`**

  - This folder is for **app-wide constants and utilities** that are used in **multiple features**.
  - If a constant or utility **is used in more than one feature**, move it here.
  - **Example:** `constants/guideUtils.ts` contains `getGuideDetailsUrl` since it is used in multiple places (e.g., dashboard & profiles).
  - **Feature-specific constants and utils** should remain inside the **feature folder** (e.g., `pages/profile/profileConstants.ts`).

- **Assets Handling**

  - **Fonts remain in `assets/fonts/`** for styling purposes.
  - **Images belong in a separate repository**, not within `src/`.

- **GraphQL Queries/Mutations stay in the feature root (if needed)**

  - **Example:** `useGetProfileQuery.ts`, `useCreateProfileMutation.ts`.
  - Makes **auditing API calls easier** without deep nesting.

- **Standardized `index.ts` Usage**
  - **Wherever applicable, folders should contain an `index.ts` file** to simplify imports.
  - This allows **cleaner imports** and prevents deep import paths.
  - **Example:**
    ```tsx
    import { ProfileHero } from '@/pages/profile/common'
    ```
    Instead of:
    ```tsx
    import { ProfileHero } from '@/pages/profile/common/ProfileHero/ProfileHero'
    ```
  - Recommended for:
    - Feature directories (`pages/profile/index.ts`)
    - Common utilities and hooks (`common/hooks/index.ts`)
    - Nested components (`pages/profile/common/ProfileHero/index.ts`)

---

```
app/
├── routes/
├── src/
├── assets/
│   ├── fonts/
│   │   ├── roboto-bold.woff
│   │   ├── roboto-bold.woff2
├── common/
│   ├── components/
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useFlag.ts
├── config/                      # External service integrations only
│   ├── analytics/
│   │   ├── index.ts
│   │   ├── useLucencyNumber.ts
│   ├── apollo/
│   │   ├── ApolloProvider.tsx
│   │   ├── index.ts
├── constants/                    # Global constants/utils (if used in multiple features)
│   ├── index.ts
│   ├── user.ts
│   ├── guideUtils.ts             # Example: Used in multiple features
├── pages/
│   ├── profile/
│   │   ├── common/
│   │   │   ├── ProfileLoading.tsx
│   │   │   ├── ProfileHero/
│   │   │   │   ├── ProfileHero.tsx
│   │   │   │   ├── ProfileHeroLoading.tsx
│   │   │   │   ├── index.ts
│   │   ├── Profile.tsx
│   │   ├── index.ts               # For cleaner imports
│   │   ├── profileConstants.ts (if needed)
│   │   ├── profileUtils.ts (if needed)
│   │   ├── types.ts (if needed)
│   │   ├── useGetProfileQuery.ts (if needed)
│   │   ├── useCreateProfileMutation.ts (if needed)
```

---

### 🔹 Why This Works

✅ **Scalability** → Features remain **self-contained**, making it easy to expand the app.  
✅ **Encapsulation** → Keeps related files **together**, reducing unnecessary dependencies.  
✅ **Readability** → Developers can quickly find what they need **without deep nesting**.  
✅ **Predictability** → Standardized naming and placement **eliminate confusion**.
