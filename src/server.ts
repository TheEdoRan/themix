import "server-only";

import { type ThemixTheme } from "./types";

export function getThemixServerData(value?: string): {
	bodyThemeClass: "dark" | "";
	initialTheme: ThemixTheme;
} {
	if (
		value === "light" ||
		value === "dark" ||
		value === "system-light" ||
		value === "system-dark"
	) {
		return {
			bodyThemeClass: value === "dark" || value === "system-dark" ? "dark" : "",
			initialTheme: (value.startsWith("system") ? "system" : value) as ThemixTheme,
		};
	}

	return {
		bodyThemeClass: "",
		initialTheme: "system",
	};
}
