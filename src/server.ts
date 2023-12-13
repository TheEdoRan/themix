import "server-only";

import { cookies } from "next/headers";
import { ThemixCookieSchema, type ThemixTheme } from "./theme";

export function getThemixServerData() {
	const parsedThemeCookie = ThemixCookieSchema.safeParse(cookies().get("theme")?.value);
	let bodyThemeClass = "";
	let initialTheme: ThemixTheme = "system";

	if (parsedThemeCookie.success) {
		bodyThemeClass =
			parsedThemeCookie.data === "dark" || parsedThemeCookie.data === "system-dark" ? "dark" : "";
		initialTheme = (
			parsedThemeCookie.data.startsWith("system") ? "system" : parsedThemeCookie.data
		) as ThemixTheme;
	}

	return {
		bodyThemeClass,
		initialTheme,
	};
}
