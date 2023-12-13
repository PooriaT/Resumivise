import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#111B47",
          secondary: "#ffffff",
          accent: "#324080",
          neutral: "#ccd6fc",
          "base-100": "#E7ECFF",
          info: "#ffffff",
          success: "#00ffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
      },
    ],
  },
};
export default config;
