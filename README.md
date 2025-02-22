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

#### 🔹 Why This Works

- ✅ **Scalability** → Features remain **self-contained**, making it easy to expand the app.
- ✅ **Encapsulation** → Keeps related files **together**, reducing unnecessary dependencies.
- ✅ **Readability** → Developers can quickly find what they need **without deep nesting**.
- ✅ **Predictability** → Standardized naming and placement **eliminate confusion**.

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

- 1️⃣ **Hooks** (`useState`, `useEffect`, etc.).
- 2️⃣ **Variables that are not functions** (local variables, constants, etc.).
- 3️⃣ **`useEffect` hooks** (side effects).
- 4️⃣ **Functions (event handlers, derived functions, etc.).**
- 5️⃣ **Return statement (JSX).**

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
    <ProfileHeroLoading />
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

- ✅ It exceeds **150 lines**.
- ✅ It **handles multiple responsibilities** (e.g., UI and state logic).
- ✅ It **contains deeply nested JSX**.
- ✅ It **repeats similar JSX structures** that could be reused.

---

### 🔹 When to Use a `common/` Component?

- **If a component is reused across multiple features**, move it to `common/components/`.
- **If a component is only used within one feature, keep it inside that feature's folder.**

✅ **Example (Feature-Specific Component)**

```
pages/profile/common/ProfileHero.tsx
```

✅ **Example (Shared Component)**

```
common/components/ImageWithFallback.tsx
```

---

#### 🔹 Why This Works

- ✅ **Keeps component logic predictable and structured.**
- ✅ **Encourages clean, readable JSX formatting.**
- ✅ **Prevents unnecessarily large components.**
- ✅ **Standardizes naming and file placement across the codebase.**

---

## ⚡ Functions & Utilities

This section defines **where and how utility functions should be structured** to ensure **readability and maintainability**.

---

### 🔹 Utility Function Placement

- **Feature-specific utilities** should be inside a feature’s folder.
- **Shared utilities across multiple features** should be moved to `constants/featureUtils.ts`.

✅ **Example: Utility Function Placement**

```
pages/profile/profileUtils.ts # Feature-specific utilities
constants/userUtils.ts # Shared utilities across features
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

#### 🔹 Why This Works

- ✅ **Keeps the focus on utility function placement & formatting.**
- ✅ **Removes redundancy with Component Structure.**
- ✅ **Ensures consistent utility function placement across the project.**

---

## 📡 GraphQL Queries

A structured approach to handling GraphQL queries and mutations ensures readability, maintainability, and consistency across the application.

### 🔹 General Rules for GraphQL Queries & Mutations

- **Queries & Mutations should be placed within their respective feature folder**

✅ Example:

```
src/pages/profile/useGetProfileQuery.ts # Feature-specific query
src/pages/profile/useCreateProfileMutation.ts # Feature-specific mutation
src/hooks/useGetPredefinedGuideTagsQuery.ts # Sitewide query (used across features)
```

- **Use camelCase for variables** inside GraphQL operations to maintain consistency with JavaScript/TypeScript naming conventions.
- **Operation name should be based on the data being fetched/updated, ensuring consistency with file & function names.**

✅ Example:

```ts
query GetProfileQueryInProfile($id: ID!) { ... }
```

- **Sort fields alphabetically**, except for `id`, which should always be listed first as the primary identifier for consistency and quick reference.
- **GraphQL fields should match the query name** for clarity.
- **For sitewide queries**, the operation name should remain generic and should not include `In{featureName}`.

---

### 🔹 Feature-Based Queries vs. Sitewide Queries

To differentiate feature-specific GraphQL queries/mutations from global queries, we use a structured naming convention:

#### Feature-Based Queries & Mutations

- **Feature-specific queries & mutations** should include `In{featureName}` in the operation name to differentiate them from sitewide queries and avoid naming conflicts.
- **File Placement:** Should be placed within the feature folder inside `pages/featureName/`.

✅ Example:

```
src/pages/profile/useGetProfileQuery.ts # Query used only in Profile
src/pages/profile/useUpdateProfileMutation.ts # Mutation used only in Profile
```

✅ Query Example:

```ts
query GetProfileQueryInProfile($id: ID!) {
  node(id: $id) {
    ... on Profile {
      id
      accountHandle
      displayName
      image
    }
  }
}
```

#### Sitewide Queries & Mutations

- Queries that **are used across multiple features** should **not include the feature name** in their operation.
- **File Placement:** These should be placed in `src/hooks/`.

✅ Example:

```
src/hooks/useGetPredefinedGuideTagsQuery.ts # Sitewide query
```

✅ Query Example:

```ts
query GetPredefinedGuideTags {
  predefinedGuideTags {
    id
    name
  }
}
```

---

#### 🔹 Why This Naming Works

- **Feature-Based Queries Include Feature Name**
  - Queries scoped to a feature include `In{featureName}` (e.g., `GetProfileQueryInProfile`) to **prevent name collisions**.
  - This ensures clarity when multiple queries exist under the same feature.
- **Sitewide Queries Should Remain Generic**
  - If a query is used across multiple features, it should not include the feature name.
  - This prevents unnecessary feature-specific naming for shared resources.
- **Why We Avoid “QueryQuery”**
  - If a query is called `GetPredefinedGuideTagsQuery`, the auto-generated type would be `GetPredefinedGuideTagsQueryQuery`, which is **redundant**.
  - By naming the file useGetPredefinedGuideTagsQuery.ts and using the operation name GetPredefinedGuideTags, we **avoid the unnecessary duplication**.

📌 Key Takeaways:

- **If a query/mutation belongs to a single feature**, its operation should include the feature name (e.g., `GetProfileQueryInProfile`, `UpdateProfileMutationInProfile`).
- **If a query/mutation is used across multiple features**, its operation name should not include the feature name (e.g., `GetPredefinedGuideTags`, `UpdateUserSettingsMutation`).
- **Feature-based queries & mutations should be placed inside `pages/featureName/`.**
- **Sitewide queries & mutations should be placed in `src/hooks/`.**
- **Mutations should always include ‘Mutation’ in both the GraphQL operation name and the filename (e.g., `useUpdateProfileMutation.ts`). Feature-based mutations follow the same `In{featureName}` rule as queries unless they are sitewide.**
  - ✅ Example: `useUpdateProfileMutation.ts`
- **Feature mutations follow the same naming rule as feature queries, including `In{featureName}` unless they are sitewide.**
- **We avoid “QueryQuery” in auto-generated types by keeping the operation name clean.**
- **We use PascalCase for hook return types, following `Use{QueryName}Result` (e.g., `UseGetProfileQueryResult`).**

---

### 🔹 Example: Query for Fetching Profile Data

```ts
import { gql, useQuery } from '@apollo/client'

type UseGetProfileQueryResult = {
  hasError: ApolloError
  isLoading: boolean
  profileData: Extract<
    GetProfileQueryInProfileQuery['node'],
    {
      __typename?: 'Profile'
    }
  >
}

const profileQuery = gql(`
  query GetProfileQueryInProfile($id: ID!) {
    node (id: $id) {
      ... on Profile {
        id
        accountHandle
        displayName
        image
      }
    }
  }
`)

export const useGetProfileQuery = (id: string): UseGetProfileQueryResult => {
  const {
    data,
    error: hasError,
    loading: isLoading,
  } = useQuery(profileQuery, {
    variables: {
      id,
    },
  })

  return {
    hasError,
    isLoading,
    profileData: data?.node,
  }
}
```

#### 🔹 Why This Works

- ✅ **CamelCase is used for variables** (accountHandle, displayName, etc.).
- ✅ **id is prominently placed at the top** for consistency.
- ✅ **Query follows a predictable naming structure** (`GetProfileQueryInProfile`).
- ✅ **Custom hook abstracts error and loading states** for better readability (`hasError`, `isLoading`).

---

### 🔹 Example: Mutation for Updating Profile

```ts
import { gql, useMutation } from '@apollo/client'

const updateProfileMutation = gql(`
  mutation UpdateProfileMutationInProfile($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
      displayName
    }
  }
`)

export const useUpdateProfileMutation = () => useMutation(updateProfileMutation)
```

```tsx
export const ProfileForm = () => {
  const [updateProfile, updateProfileResult] = useUpdateProfileMutation()

  const onSubmit = async (id: string, displayName: string) => {
    try {
      await updateProfile({
        variables: {
          updateProfileInput: {
            displayName,
            id,
          },
        },
      })
    } catch (error) {
      console.error('Failed to update profile', error)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <button type='submit'>Update Profile</button>
    </form>
  )
}
```

#### 🔹 Why This Works

- ✅ **Mutation follows the naming pattern** (UpdateProfileMutationInProfile).
- ✅ **onSubmit replaces handleUpdateProfile for clarity**.
- ✅ **Refetching the profile query ensures UI consistency**.
- ✅ **Error and loading states are aliased as hasError and isLoading** for better readability.

---

## 🚩 Feature Flags

Feature flags enable us to **conditionally enable or disable features** without deploying new code. This approach allows for **progressive rollouts**, **A/B testing**, and **safe feature releases**.

### 🔹 General Structure

Feature flags are managed using **two primary components**:

1. **Feature Flags Configuration (`featureFlags.ts`)**

   - This file defines all **available feature flags**.
   - Flags are stored as a **record of boolean values**.

2. **Feature Flag Hook (`useFlag.ts`)**
   - A **custom hook** to read feature flag values.
   - Uses **local storage overrides**, allowing developers to toggle features locally.

---

### 📂 File Structure

```ts
src/
├── config/
│   ├── feature-flags/
│   │   ├── featureFlags.ts    # Central feature flag configuration
├── common/
│   ├── hooks/
│   │   ├── useFlag.ts         # Hook to check feature flag status
```

---

### 🔹 Feature Flags Configuration

Feature flags are **centrally defined** in `src/config/feature-flags/featureFlags.ts`. This ensures all available flags are explicitly listed.

#### ✅ **Example: Defining Feature Flags**

```ts
// src/config/feature-flags/featureFlags.ts

type FeatureFlagNames = 'profileHeroV2' | 'profileV2'

const featureFlags: Record<FeatureFlagNames, boolean> = {
  profileHeroV2: false,
  profileV2: false,
}

export type { FeatureFlagNames }
export { featureFlags }
```

---

### 🔹 Accessing Feature Flags with useFlag

The useFlag hook retrieves the current state of a feature flag, checking for local storage overrides.

✅ Example: Feature Flag Hook

```ts
// src/common/hooks/useFlag.ts

import { useState, useEffect } from 'react'
import type { FeatureFlagNames } from 'src/config/feature-flags/featureFlags'
import { useLocalStorageFlags } from './useLocalStorageFlags'

export const useFlag = (flagKey: FeatureFlagNames | string): boolean => {
  const [isFlagEnabled, setIsFlagEnabled] = useState(false)
  const [localFlags] = useLocalStorageFlags()

  useEffect(() => {
    if (flagKey in localFlags) {
      const { [flagKey]: localStorageFlag } = localFlags
      setIsFlagEnabled(String(localStorageFlag).toLowerCase() === 'true')
    }
  }, [flagKey, localFlags])

  return isFlagEnabled
}
```

---

### 🔹 Using Feature Flags in Components

✅ Example: Conditionally Rendering Components

Feature flags allow conditional rendering of components within a section.

```tsx
import { useFlag } from 'src/common/hooks/useFlag'
import { ProfileHero } from './ProfileHero'
import { ProfileHeroOld } from './ProfileHeroOld'

export const Profile = () => {
  const isProfileHeroV2Enabled = useFlag('profileHeroV2')

  return (
    <section>
      {isProfileHeroV2Enabled ? <ProfileHero /> : <ProfileHeroOld />}
    </section>
  )
}
```

---

### 🔹 Using Feature Flags for Route-Based Feature Toggles

For **larger changes**, such as enabling an entirely new Profile redesign, we rename the existing feature folder (profile) to `profile-old` and introduce a new `profile/` folder.

Then, in `PageRoutes.tsx`, we dynamically choose which version of `Profile` to render based on the feature flag.

✅ Example: Routing Feature Flag Usage

```tsx
import { useFlag } from 'src/common/hooks/useFlag'
import { Routes, Route } from 'react-router-dom'
import { Home } from 'src/pages/home'
import { Profile } from 'src/pages/profile'
import { ProfileOld } from 'src/pages/profile-old'

export const PageRoutes = () => {
  const isProfileV2Enabled = useFlag('profileV2')

  return (
    <ScrollToTop>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route
          element={isProfileV2Enabled ? <Profile /> : <ProfileOld />}
          path='/profile/:accountHandle'
        />
      </Routes>
    </ScrollToTop>
  )
}
```

---

### 🔹 Feature Flag Guidelines

- **Feature flags should be short-lived**
  - Avoid leaving feature flags in the codebase for an extended period.
  - Flags should be **removed once the feature is stable**.
- **New feature flags must be added to featureFlags.ts**
  - This ensures **visibility** and prevents unexpected feature toggles.
- **Use feature flags only for meaningful toggles**
  - Avoid flagging trivial UI changes.
  - Flags should be used for **significant features, redesigns, or experiments**.
- **Local storage overrides take precedence**
  - Developers can **manually toggle flags via local storage**, making testing easier.

---

### ✅ Summary

- **Feature flags are stored in `src/config/feature-flags/featureFlags.ts`.**
- **The `useFlag` hook checks feature flag values, including local storage overrides.**
- **Flags can be used for component toggles (`ProfileHeroV2`) or route-based toggles (`ProfileV2`).**
- **Short-lived flags should be cleaned up after rollout is complete.**

---

## 🔠 Types & Interfaces

A **consistent approach** to defining types and interfaces ensures **clarity, maintainability, and flexibility** across the codebase.

---

### 🔹 General Rules

- **Use `interface` for functional components.**

  - Interfaces provide better readability when defining **props** for components.
  - Ensures a **clear contract** for component usage.
  - Supports **extending** when needed.

- **Use `type` for everything else.**

  - `type` provides better flexibility, particularly when defining **utility types, hooks, function return values, and GraphQL queries**.
  - Use `Extract<>` when working with **GraphQL queries that return multiple types**, ensuring type safety while extracting a **specific expected type** from a union.

- **Use `Pick<>` and `Omit<>` to create subsets of types.**

  - `Pick<>` is used when selecting **only specific properties** from a type.
  - `Omit<>` is used when removing **specific properties** from a type.

---

### 🔹 Component Props: Use `interface`

✅ **Example: Functional Component Props**

```tsx
interface ProfileHeroProps {
  title: string
  onClick: () => void
}

export const ProfileHero = ({ title, onClick }: ProfileHeroProps) => (
  <div onClick={onClick}>{title}</div>
)
```

✅ Example: Extending an Interface

Use `interface` to extend props cleanly, while type uses `&` for merging multiple types.

```tsx
import { Button } from '@travelpass/design-system'
import type { GenericAddress } from 'src/__generated__/graphql'

interface ProfileAddressProps extends GenericAddress {
  onClick: VoidFunction
}

export const ProfileAddress = ({
  addressLine1,
  city,
  country,
  onClick,
}: ProfileAddressProps) => (
  <section>
    <h2>{name}</h2>
    <p>{getAddress(addressLine1, city, country)}</p>
    <Button onClick={onClick}>Edit</Button>
  </section>
)
```

---

### 🔹 Utility Types: Use `type`

Use `Pick<>` when selecting only specific properties from a type, and `Omit<>` when removing specific properties.

These help create lightweight, flexible types for better reusability.

✅ Example: Utility Type for Query Results

```ts
type UseGetProfileQueryResult = {
  hasError: ApolloError
  isLoading: boolean
  profileData: Extract<
    GetProfileQueryInProfileQuery['node'],
    {
      __typename?: 'Profile'
    }
  >
}
```

✅ Example: Extracting Only Specific Keys from an Object

```ts
type UserKeys = 'id' | 'email'

type UserInfo = Pick<User, UserKeys>
```

✅ Example: Omitting Unnecessary Fields from an Object

```ts
type User = {
  id: string
  email: string
  password: string
}

type PublicUser = Omit<User, 'password'>
```

✅ Example: Combining Multiple Types

Use `&` to merge multiple types, providing more flexibility than `interface` extension.

```ts
type Base = {
  createdAt: string
}

type Profile = {
  id: string
  name: string
}

type ProfileWithBase = Profile & Base
```

---

### 🔹 When to Use `Extract<>` in GraphQL

- Use `Extract<>` to ensure type safety when selecting a specific type from a GraphQL query result.

✅ Example: Extracting the Profile Type from a Query

```ts
type UseGetProfileQueryResult = {
  hasError: ApolloError
  isLoading: boolean
  profileData: Extract<
    GetProfileQueryInProfileQuery['node'],
    { __typename?: 'Profile' }
  >
}
```

---

### 🔹 Avoid Unnecessary interface Usage

❌ Bad Example: Using interface for Utility Types

```ts
interface UseGetProfileQueryResult {
  hasError: ApolloError
  isLoading: boolean
  profileData: Profile | null
}
```

✅ Good Example: Using type for Flexibility

```ts
type UseGetProfileQueryResult = {
  hasError: ApolloError
  isLoading: boolean
  profileData: Profile | null
}
```

---

### ✅ Summary

- **Use interface for defining props in functional components.**
- **Use type for everything else (utilities, hooks, GraphQL queries, API responses).**
- **Use `Extract<>` to ensure type safety when narrowing GraphQL query results.**
- **Keep types minimal and readable—avoid unnecessary abstractions.**
