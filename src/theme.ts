import { z } from "zod";

export const ThemixThemeSchema = z.enum(["light", "dark", "system"]);
export type ThemixTheme = z.infer<typeof ThemixThemeSchema>;

export const ThemixCookieSchema = z.enum(["light", "dark", "system-light", "system-dark"]);
export type ThemixCookie = z.infer<typeof ThemixCookieSchema>;
