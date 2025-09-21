# Frontend CLAUDE.md

This file provides frontend-specific guidance for the Next.js React application with HeroUI and Apollo Client.

## Frontend Stack
- **Next.js 14** with App Router
- **Apollo Client** for GraphQL with experimental Next.js support
- **HeroUI** component library (migrated from NextUI)
- **Tailwind CSS** for styling
- **Stack Auth** for authentication
- **TypeScript** with auto-generated GraphQL types

## Project Structure (`front/src/`)

### App Router Structure (`app/`)
- **`(authenticated)/`** - Protected routes requiring authentication
  - `components/[id]/page.tsx` - Component detail pages
  - `_hooks/` - Authenticated route-specific hooks
- **`_components/`** - Shared UI components
  - `auth/` - Authentication components (LoginButton, LogoutButton)
  - `dialogs/` - Modal dialogs (ConfirmDeleteDialog)
  - `navigation/` - Navigation components (NavBar, ComponentHistory)
- **`_config/`** - Application configuration and providers
- **`_hooks/`** - Global custom hooks
- **`_utils/`** - Utility functions

### Configuration (`_config/`)
- **`ClientProviders.tsx`** - Root providers wrapper (HeroUI, Apollo, Auth)
- **`ApolloProviderWrapper.tsx`** - Apollo Client configuration
- **`AuthProvider.tsx`** - Stack Auth configuration
- **`globals.css`** - Global styles

## HeroUI Component Library

### Migration from NextUI
- Updated from `@nextui-org/react@^2.6.5` to `@heroui/react@^2.8.1`
- Import pattern: `import { Button, Input, Card } from '@heroui/react'`
- Provider: `HeroUIProvider` (updated from NextUIProvider)
- Tailwind config: Uses `heroui` plugin instead of `nextui`

### Common HeroUI Components
- **Navigation**: `Navbar`, `NavbarBrand`, `NavbarContent`, `NavbarItem`
- **Layout**: `Card`, `CardBody`, `CardHeader`, `Divider`
- **Forms**: `Input`, `Textarea`, `Button`
- **Feedback**: `Spinner`, `Modal`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter`

## GraphQL Integration

### Apollo Client Setup
- Configuration in `_config/ApolloProviderWrapper.tsx`
- Experimental Next.js support with `@apollo/experimental-nextjs-app-support`
- Auto-generated types in `src/__generated__/graphql.ts`

### Code Generation
- Config file: `codegen.ts` (watches backend schema changes)
- Commands:
  - `yarn graphql-codegen-compile` - Generate GraphQL types
  - `yarn graphql-codegen-watch` - Watch for GraphQL changes
- Generated files in `src/__generated__/`

### GraphQL Hooks Pattern
- Custom hooks in `_hooks/` directories
- Example: `useGenerateComponent.ts`, `useListComponents.ts`, `useDeleteComponent.ts`
- Include cache management and error handling
- Support redirect options for better UX

## Authentication Flow
- **Stack Auth** integration with JWT tokens
- Protected routes via Next.js middleware
- Login/logout components in `_components/auth/`
- Authentication context available throughout app

## Tailwind CSS Configuration

### Design System (Updated January 2025)
The UI has been redesigned with an **Anthropic-inspired design system** focusing on soft, human-centered aesthetics:

#### Color Palette
- **Primary**: Slate scale (50-950) for muted, professional tones
- **Secondary**: Cloud scale (50-950) for subtle contrast
- **Accent**: Coral scale (50-950) for warm highlights (inspired by Anthropic's #CC785C)
- **Semantic**: Success (emerald), Warning (amber), Danger (coral) in muted tones

#### Typography
- **Font**: Inter for clean readability with system fallbacks
- **Mono**: Fira Code, Monaco, Cascadia Code for code elements
- **Scale**: Responsive typography with proper line heights

#### Spacing & Layout
- **8px grid system** with extended spacing utilities (18, 88, 128)
- **Soft shadows**: `shadow-soft` and `shadow-soft-lg` for subtle depth
- **Rounded corners**: Extended radius scale (xl, 2xl, 3xl)

#### Animation
- **Gentle transitions**: 200-300ms duration for human-feeling interactions
- **Micro-interactions**: Subtle hover states and focus rings
- **Custom animations**: `fade-in` and `slide-up` for smooth reveals

### Custom CSS Elimination
All custom CSS files have been **completely removed** and replaced with pure Tailwind implementations:
- ✅ `grid-background.css` → Tailwind arbitrary values and responsive utilities
- ✅ `parameter-panel.css` → HeroUI components (not actually used)
- ✅ `resizable-container.css` → Tailwind classes with minimal inline styles for react-resizable

### HeroUI Theme Integration
- **Semantic color mapping**: Anthropic colors mapped to HeroUI's color system
- **Dark mode support**: Full theme coverage for light/dark modes
- **Component consistency**: All UI elements use HeroUI with custom theming

### Configuration
- Config file: `tailwind.config.ts`
- HeroUI plugin integration: `require('@heroui/react/plugin')`
- Extended theme with custom colors, fonts, spacing, shadows, and animations
- Theme paths: `'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'`

### Design Philosophy & Usage
- **Prefer HeroUI components** over custom implementations for consistency
- **Use semantic colors** (primary, secondary, success, warning, danger) instead of direct color values
- **Embrace soft aesthetics**: rounded corners, gentle shadows, subtle transitions
- **Maintain accessibility**: proper contrast ratios and focus states
- **Mobile-first approach**: all components are responsive by default
- **Minimal custom CSS**: only use when Tailwind + HeroUI cannot achieve the desired effect

### Reusable Design Components
- **`_design/` folder**: Contains reusable UI components that extend HeroUI functionality
- **`CollapsibleCard.tsx`**: Standardized collapsible card component with Heroicons
  - Used for consistent expand/collapse behavior across Component Info and Parameters panels
  - Features: Heroicons chevrons, soft hover states, customizable header extras
  - Replaces inconsistent SVG implementations with unified design pattern

## Component Patterns

### Component History Navigation
- ChatGPT-style sidebar navigation
- Component initials as icons (first 2 letters)
- Active state highlighting for current component
- Scrollable list with loading and empty states

### Component Generation Flow
- Prompt-based generation with auto-focused textarea
- Loading states during AI generation
- Automatic redirect to component detail page after creation
- Real-time cache updates for component list

### Component Display
- Syntax-highlighted code display with `react-syntax-highlighter`
- Component metadata display (name, description, timestamps)
- Version information and content display

## Development Commands (from `front/` directory)
- `yarn dev` - Start Next.js development server (port 5200)
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn graphql-codegen-compile` - Generate GraphQL types
- `yarn graphql-codegen-watch` - Watch for GraphQL changes

## Key Frontend Files
- `src/app/_config/ClientProviders.tsx` - Root provider configuration
- `codegen.ts` - GraphQL code generation config
- `tailwind.config.ts` - Tailwind and HeroUI configuration
- `src/__generated__/graphql.ts` - Auto-generated GraphQL types
- `src/app/_components/navigation/NavBar.tsx` - Main navigation component

## Frontend-Specific Code Quality
- **ALWAYS follow ALL ESLint rules** defined in `front/.eslintrc.json` (Airbnb + Next.js)
- **NEVER leave dead code** - Always remove unused imports, variables, functions, and components
- Include proper TypeScript typing for all components
- Use App Router patterns for new pages
- Implement proper loading and error states
- Use HeroUI components for consistent design
- Follow GraphQL hooks pattern for data fetching
- Use Next.js Link for navigation with active state detection