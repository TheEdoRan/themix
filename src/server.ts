import "server-only";

import { cookies } from "next/headers";
import { type ThemixCookie, type ThemixTheme } from "./types";

export async function setCookieThemeAction(theme: ThemixCookie) {
	"use server";

	cookies().set("theme", theme, {
		httpOnly: false,
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 365, // 1 year
	});
}

export function getThemixServerData(): {
	bodyThemeClass: "dark" | "";
	initialTheme: ThemixTheme;
} {
	const value = cookies().get("theme")?.value;

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
