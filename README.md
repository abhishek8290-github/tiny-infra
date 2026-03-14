# React Starter Kit

A reusable, configurable React + Vite SaaS starter. Clone it, change 5 things, ship a new product.

## Stack

- **React + Vite** — fast dev, fast builds
- **Clerk** — auth with Google, GitHub, Apple, Magic Link
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — accessible component primitives
- **TanStack Router** — type-safe routing
- **Lucide React** — icons

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/you/react-starter.git my-new-app
cd my-new-app

# 2. Install
npm install

# 3. Set up env
cp .env.example .env.local
# Fill in your Clerk key from clerk.com

# 4. Run
npm run dev
```

---

## Per-Project Customisation (5 minutes)

Open `src/theme.config.ts` and change:

| Setting | What it does |
|---|---|
| `fonts.display` | Heading font |
| `fonts.body` | Body text font |
| `radius` | Border radius personality |
| `brand.hsl` | Primary/brand color |
| `defaultMode` | light / dark / system |
| `app.name` | Your app name |

That's it. The entire app updates.

---

## Folder Structure

```
src/
├── components/
│   ├── ui/          ← shadcn primitives (Button, Card, etc.)
│   ├── layout/      ← Sidebar, Navbar, PageWrapper
│   └── shared/      ← LoadingSpinner, EmptyState, ErrorBoundary
├── pages/           ← Dashboard, Settings, Projects, Auth
├── hooks/           ← useAuth, custom hooks
├── lib/             ← utils, cn()
├── styles/          ← globals.css with all design tokens
├── types/           ← shared TypeScript types
└── theme.config.ts  ← 🎯 THE ONE FILE YOU CHANGE PER PROJECT
```

---

## Adding shadcn Components

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
# etc.
```

Components land in `src/components/ui/` as files you own and edit.