import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import type { PluginAPI } from "tailwindcss/types/config";

// Enhance scrollbar style, small size and smooth color
const scrollbar = ({ addBase }: PluginAPI) => {
  addBase({
    // Light mode scrollbar style
    "::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      background: "rgba(0, 0, 0, 0.2)",
      borderRadius: "100px",
      border: "2px solid transparent",
      backgroundClip: "padding-box",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "rgba(0, 0, 0, 0.3)",
    },
    // Firefox scrollbar style
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
    },
    // Dark mode scrollbar style
    ".dark ::-webkit-scrollbar-thumb": {
      background: "rgba(255, 255, 255, 0.2)",
      border: "2px solid transparent",
      backgroundClip: "padding-box",
    },
    ".dark ::-webkit-scrollbar-thumb:hover": {
      background: "rgba(255, 255, 255, 0.3)",
    },
    ".dark *": {
      scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
    },
  });
};
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pageBackground: "hsl(var(--page-background))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate, typography, scrollbar],
};
export default config;
