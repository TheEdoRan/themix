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

1. Create a new Client Component that wraps your app with a `ThemixProvider`, imported from `themix/client`, and pass the initial theme as a prop.

```tsx
// client-providers.tsx
"use client";

import { ThemixProvider, useThemix } from "themix/client";
import { type ThemixTheme } from "themix/types";

type Props = {
  children: React.ReactNode;
  initialTheme: ThemixTheme;
}

export function ClientProviders({ initialTheme, children }: Props) {
  return (
    <>
      <ThemixProvider initialTheme={initialTheme}>
        {children}
      </ThemixProvider>
    </>
  )
}
```

### Disable transition on switch

You can pass the `noTransition` prop to `ThemixProvider` to disable the transition on theme switch.

2. Import `ClientProviders` in the root layout and use the initial `getThemixServerData()`, from `themix/server`, to get data from the server.

```tsx
// layout.tsx
import { getThemixServerData } from "themix/server";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { initialTheme, bodyThemeClass } = getThemixServerData();

  return (
    <html lang="en" className={sans.variable}>
      <body className={`${inter.className} ${bodyThemeClass}`}>
        <ClientProviders initialTheme={initialTheme}>{children}</ClientProviders>
      </body>
    </html>
  );
}
```

3. Use the `useThemix()` hook, imported from `themix/client`, to get and set the current theme in your Client Components.

```tsx
// theme-switcher.tsx
"use client";

import { useThemix } from "themix/client";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemix();
  return <button onClick={() => setTheme("dark")}>Dark mode</button>;
}
```

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