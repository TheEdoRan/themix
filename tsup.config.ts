import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/server.ts", "src/client.tsx", "src/theme.ts"],
	format: ["esm"],
	clean: true,
	splitting: false,
	sourcemap: true,
	dts: true,
});
