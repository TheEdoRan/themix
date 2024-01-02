"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { setCookieThemeAction } from "./action";
import { type ThemixCookie, type ThemixTheme } from "./types";

type ThemixContext = {
	theme: ThemixTheme;
	setTheme: (theme: ThemixTheme) => void;
};

const themixContext = createContext<ThemixContext>({
	theme: "system",
	setTheme: () => {},
});

type Props = {
	initialTheme: ThemixTheme;
	children: ReactNode;
	noTransition?: boolean;
};

export function ThemixProvider({ initialTheme, noTransition, children }: Props) {
	const [theme, setThemeState] = useState<ThemixTheme>(initialTheme);

	// Comes from https://github.com/pacocoursey/next-themes/blob/main/packages/next-themes/src/index.tsx#L285C1-L303C2
	function disableTransition() {
		const css = document.createElement("style");
		css.appendChild(
			document.createTextNode(
				`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
			)
		);
		document.head.appendChild(css);

		return () => {
			// Force restyle
			(() => window.getComputedStyle(document.body))();

			// Wait for next tick before removing
			setTimeout(() => {
				document.head.removeChild(css);
			}, 1);
		};
	}

	const updateClassesSetCookie = useCallback(
		(theme: ThemixCookie) => {
			const restyle = noTransition ? disableTransition() : undefined;

			if (theme === "dark" || theme === "system-dark") {
				document.body.classList.add("dark");
			} else {
				document.body.classList.remove("dark");
			}

			setCookieThemeAction(theme)
				.then(() => {
					restyle?.();
				})
				.catch(console.error);
		},
		[noTransition]
	);

	useEffect(() => {
		// Handle system theme change only.
		if (theme !== "system") {
			return;
		}

		const dark = window.matchMedia("(prefers-color-scheme: dark)");

		// Update on first load.
		updateClassesSetCookie(dark.matches ? "system-dark" : "system-light");

		// Setup change listener.
		function handleSystemChange(e: MediaQueryListEvent) {
			updateClassesSetCookie(e.matches ? "system-dark" : "system-light");
		}

		dark.addEventListener("change", handleSystemChange);

		return () => {
			dark.removeEventListener("change", handleSystemChange);
		};
	}, [theme, updateClassesSetCookie]);

	function setTheme(theme: ThemixTheme) {
		// System theme change is handled by useEffect.
		if (theme !== "system") {
			updateClassesSetCookie(theme);
		}
		setThemeState(theme);
	}

	return <themixContext.Provider value={{ theme, setTheme }}>{children}</themixContext.Provider>;
}

export function useThemix() {
	return useContext(themixContext);
}
