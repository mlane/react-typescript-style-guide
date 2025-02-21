# 🚀 React + TypeScript Style Guide

A **structured, scalable, and opinionated** style guide for building **maintainable React applications** with **TypeScript**. This guide ensures **consistency, clarity, and best practices** across projects.

## 📖 Table of Contents

- [Philosophy](#-philosophy)
- [Folder Structure](#-folder-structure)
- [Component Structure](#-component-structure)
- [Functions & Utilities](#-functions--utilities)
- [GraphQL Queries](#-graphql-queries)
- [Feature Flags](#-feature-flags)
- [Types & Interfaces](#-types--interfaces)
- [Comments & Documentation](#-comments--documentation)
- [Contributing](#-contributing)
- [License](#-license)

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
    import { ProfileHero } from 'src/pages/profile/common'
    ```
    Instead of:
    ```tsx
    import { ProfileHero } from 'src/pages/profile/common/ProfileHero/ProfileHero'
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

---

## 🎭 Component Structure

A well-structured React component improves **readability, maintainability, and consistency**. This section defines **how components should be structured**, including **ordering hooks, variables, functions, and the return statement**.

### 🔹 General Rules for Components

- **Always use functional components (`const MyComponent = () => {}`)**.
- **Component file names should match the folder name** if applicable.
  - **Example:** `ProfileHero.tsx` inside `ProfileHero/` should match the folder name.
- **Each component should be self-contained** and only handle **one responsibility**.
- **Avoid deep nesting of JSX**—break into smaller components when necessary.
- **Keep components under ~150 lines** for readability.
- **Early return for loading/error states** to reduce indentation.
- **Hooks, variables, and functions should follow a consistent order**.

---

### 🔹 Component Order

Components should follow this order:

1️⃣ **Hooks** (`useState`, `useEffect`, etc.).  
2️⃣ **Variables that are not functions** (local variables, constants, etc.).  
3️⃣ **`useEffect` hooks** (side effects).  
4️⃣ **Functions (event handlers, derived functions, etc.).**  
5️⃣ **Return statement (JSX).**

---

### ✅ **Example: Standard Component Structure**

```tsx
export const Profile = () => {
  const navigate = useNavigate()
  const { accountHandle } = useParams()
  const { hasError, isLoading, profileData } = useGetProfileQuery(accountHandle)
  const [searchParams] = useSearchParams()
  const { id, image } = profileData ?? {}

  useEffect(() => {
    // Example: Track analytics
  }, [])

  const getProfileAvatar = () => {}

  const getProfileName = () => {}

  if (isLoading || isEmpty(profileData)) return <ProfileLoading />

  if (hasError) return <ProfileEmpty />

  return (
    <section>
      <ProfileHero />
      <div>
        <ProfileSidebar />
        <ProfileContent />
      </div>
    </section>
  )
}
```

---

### 🔹 JSX Formatting Rules

- **One-line return when there is no logic.**

```tsx
export const Profile = () => <section>...</section>
```

- **Use multiple lines for JSX if it improves readability.**

```tsx
export const Profile = () => (
  <section>
    <ProfileHero />
    <ProfileSidebar />
  </section>
)
```

---

### 🔹 Function & Hook Spacing Rules

- **No extra space between hooks and variables.**

```tsx
const navigate = useNavigate()
const { accountHandle } = useParams()
const { hasError, isLoading, profileData } = useGetProfileQuery(accountHandle)
const [searchParams] = useSearchParams()
const { id, image } = profileData ?? {}
```

- **Add a space between function declarations for readability.**

```tsx
const getProfileAvatar = () => {}

const getProfileName = () => {}
```

- **Space out `useEffect` from other hooks.**

```tsx
const navigate = useNavigate()
const { accountHandle } = useParams()

useEffect(() => {
  // Example: Sync data on mount
}, [])
```

---

### 🔹 Component Naming Conventions

- **Use `PascalCase` for component names.**

```tsx
export const ProfileHero = () => <div>Profile Hero</div>
```

- **Use `camelCase` for non-component functions.**

```tsx
const getProfileName = () => {}
```

---

### 🔹 Loading & Empty State Components

- **Loading states should mirror the component structure** but with skeleton placeholders.
- **A `ProfileLoading.tsx` should match `Profile.tsx`** and replace dynamic content with skeletons.

```tsx
export const Profile = () => (
  <section className='bg-red'>
    <ProfileHero />
    <div>
      <ProfileSidebar />
      <ProfileContent />
      <Button>Click me</Button>
    </div>
  </section>
)
```

```tsx
export const ProfileLoading = () => (
  <section className='bg-red'>
    <ProfileHeroLoading height={200} />
    <div>
      <ProfileSidebarLoading />
      <ProfileContentLoading />
      <div className='h-12 w-20'>
        <Skeleton variant='rounded' />
      </div>
    </div>
  </section>
)
```

---

### 🔹 When to Split Components?

A component should be **split into smaller components if:**  
✅ It exceeds **150 lines**.  
✅ It **handles multiple responsibilities** (e.g., UI and state logic).  
✅ It **contains deeply nested JSX**.  
✅ It **repeats similar JSX structures** that could be reused.

---

### 🔹 When to Use a `common/` Component?

- **If a component is reused across multiple features**, move it to `common/components/`.
- **If a component is only used within one feature, keep it inside that feature's folder.**

✅ **Example (Feature-Specific Component)**

```
pages / profile / common / ProfileHero.tsx
```

✅ **Example (Shared Component)**

```
common / components / Button.tsx
```

---

## 🔹 Why This Works

✅ **Keeps component logic predictable and structured.**  
✅ **Encourages clean, readable JSX formatting.**  
✅ **Prevents unnecessarily large components.**  
✅ **Standardizes naming and file placement across the codebase.**

---

## ⚡ Functions & Utilities

This section defines **where and how utility functions should be structured** to ensure **readability and maintainability**.

---

### 🔹 Utility Function Placement

- **Feature-specific utilities** should be inside a feature’s folder.
- **Shared utilities across multiple features** should be moved to `constants/featureUtils.ts`.

✅ **Example: Utility Function Placement**

```
pages/profile/profileUtils.ts  # Feature-specific utilities
constants/userUtils.ts         # Shared utilities across features
```

✅ **Example: Exporting Multiple Utilities**

```ts
const getProfileAvatar = () => {}

const getProfileName = () => {}

export { getProfileAvatar, getProfileName }
```

---

### 🔹 Formatting Rules for Functions

- **Avoid unnecessary function nesting** → Functions should be **flat and readable**, avoiding deeply nested logic.

❌ **Bad Example (Unnecessary Nesting)**

```ts
const getUserDetails = user => {
  if (user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  } else {
    return null
  }
}
```

✅ **Good Example (Flat and Readable)**

```ts
const getUserDetails = user => {
  if (!user) return null

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}
```

---

## 🔹 Why This Works

✅ **Keeps the focus on utility function placement & formatting.**  
✅ **Removes redundancy with Component Structure.**  
✅ **Ensures consistent utility function placement across the project.**

---
