import type {Config} from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{tsx,mdx}", "./theme.config.tsx"],
  presets: [require("@echo-webkom/tailwind-config")],
} satisfies Config;
