# Dark Mode Implementation Guide

This document explains how dark mode was implemented in this Next.js project using **Tailwind CSS v4** and **next-themes**.

## Overview

The dark mode system allows users to:
- Automatically inherit their system preference (light/dark)
- Manually toggle between light and dark mode via the theme switcher in the navbar
- Have their preference persisted in localStorage

---

## Key Components

### 1. Tailwind CSS v4 Configuration

**Important:** Tailwind v4 handles dark mode differently than v3. The `darkMode: "class"` option in `tailwind.config.ts` is **not sufficient** in v4.

You must add this directive in your main CSS file (`app/globals.css`):

```css
@import "tailwindcss";

/* Tailwind v4: Configure dark mode to use class selector instead of media query */
@variant dark (&:where(.dark, .dark *));
```

This tells Tailwind v4 to use the `.dark` class on the `<html>` element instead of the `prefers-color-scheme` media query for all `dark:` utilities.

### 2. CSS Variables

Define your color variables to respond to the `.dark` class:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

/* Dark mode - responds to .dark class on html element */
.dark {
  --background: #000000;
  --foreground: #ededed;
}

body {
  color: var(--foreground);
  background: var(--background);
}
```

**Note:** Do NOT use `@media (prefers-color-scheme: dark)` for the CSS variables if you want manual theme switching to work. That only responds to system settings.

### 3. next-themes Package

Install the package:

```bash
npm install next-themes
```

Create a ThemeProvider wrapper (`components/providers/ThemeProvider.tsx`):

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 4. Layout Integration

Wrap your app with the ThemeProvider in `app/[locale]/layout.tsx`:

```tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default async function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Key props:**
- `attribute="class"` - Adds `class="dark"` or `class="light"` to `<html>`
- `defaultTheme="system"` - Uses system preference by default
- `enableSystem` - Enables system preference detection
- `suppressHydrationWarning` - Required on `<html>` to avoid hydration mismatch warnings

### 5. Theme Switcher Component

Use the `useTheme` hook from next-themes:

```tsx
"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "@phosphor-icons/react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />;
  }

  return (
    <button onClick={toggleTheme}>
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};
```

**Important:** Always check `mounted` before rendering theme-dependent UI to avoid hydration mismatches.

---

## Using Dark Mode in Components

Use Tailwind's `dark:` variant for all theme-aware styles:

```tsx
// Text colors
<p className="text-gray-900 dark:text-white">...</p>

// Background colors
<div className="bg-white dark:bg-black">...</div>

// Border colors
<div className="border-gray-200 dark:border-white/20">...</div>

// Divide colors
<div className="divide-x divide-gray-200 dark:divide-white/20">...</div>
```

---

## Troubleshooting

### Theme toggle doesn't work but system preference does
- **Cause:** CSS variables are using `@media (prefers-color-scheme: dark)` instead of `.dark` class
- **Fix:** Change to `.dark { ... }` selector in globals.css

### `dark:` utilities not working at all in Tailwind v4
- **Cause:** Missing `@variant dark` directive
- **Fix:** Add `@variant dark (&:where(.dark, .dark *));` after `@import "tailwindcss";`

### Hydration mismatch warnings
- **Cause:** Server doesn't know the theme, client does
- **Fix:** Add `suppressHydrationWarning` to `<html>` and use `mounted` check in ThemeSwitcher

### Theme flickers on page load
- **Cause:** Theme is applied after hydration
- **Fix:** Use `disableTransitionOnChange` prop on ThemeProvider

---

## File Summary

| File | Purpose |
|------|---------|
| `app/globals.css` | `@variant dark` directive + CSS variables |
| `tailwind.config.ts` | `darkMode: "class"` (for IDE support) |
| `components/providers/ThemeProvider.tsx` | Client wrapper for next-themes |
| `app/[locale]/layout.tsx` | ThemeProvider integration |
| `components/ui/floating-navbar.tsx` | ThemeSwitcher component |

---

## Dependencies

```json
{
  "next-themes": "^0.4.6",
  "tailwindcss": "^4.1.4",
  "@phosphor-icons/react": "^2.x" // for Sun/Moon icons
}
```
