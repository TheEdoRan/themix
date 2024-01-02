"use server";

import { cookies } from "next/headers";
import { type ThemixCookie } from "./types";

export async function setCookieThemeAction(theme: ThemixCookie) {
	cookies().set("theme", theme, {
		httpOnly: false,
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 365, // 1 year
	});
}
