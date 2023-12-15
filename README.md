# [Themix](https://github.com/TheEdoRan/themix)

A Next.js theme manager that uses cookies to store and manage the switch between light, dark and system modes.

## Why?

This package was built because storing the cookie in the browser local storage doesn't work too well with Next.js and Server Components. So, with Themix you get:

- Initial load with no flashing
- No hydration warnings

## Installation

```sh
npm i themix
```

## Usage

1. Set up your root layout component:

```tsx
// layout.tsx
import { ThemixProvider } from "themix/client";
import { getThemixServerData } from "themix/server";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { initialTheme, bodyThemeClass } = getThemixServerData();

  return (
    <html lang="en">
      <body className={`${inter.className} ${bodyThemeClass}`}>
        <ThemixProvider initialTheme={initialTheme}>
          {children}
        </ThemixProvider>
      </body>
    </html>
  );
}
```

2. Use the `useThemix()` hook to get and set the current theme in your Client Components.

```tsx
// theme-switcher.tsx
"use client";

import { useThemix } from "themix/client";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemix();
  return <button onClick={() => setTheme("dark")}>Dark mode</button>;
}
```

### Disable transition on switch

You can pass the `noTransition` prop to `ThemixProvider` to disable the transition on theme switch.

## Types

[`themix/types`](src/types.ts) exports `ThemixTheme` and `ThemixCookie` types:

```typescript
export type ThemixTheme = "light" | "dark" | "system";
export type ThemixCookie = "light" | "dark" | "system-light" | "system-dark";
```

## Credits

Many thanks to the [next-themes](https://github.com/pacocoursey/next-themes) package for inspiring this and for the disable transition on switch feature.

## License

Themix is released under the [MIT license](https://opensource.org/license/mit/).