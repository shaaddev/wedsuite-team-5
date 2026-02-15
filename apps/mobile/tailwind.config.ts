import type { Config } from "tailwindcss";

export default {
  content: ["./App.tsx", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
