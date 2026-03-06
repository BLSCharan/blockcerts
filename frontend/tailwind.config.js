/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#06b6d4",
          foreground: "#ffffff",
        },
        secondary: "#1f2937",
        "muted-foreground": "#9ca3af",
        foreground: "#1f2937",
        border: "#e5e7eb",
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      },
    },
  },
  plugins: [],
}