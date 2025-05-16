import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8ab4f8", // Bright blue like in the image
        secondary: "#f28b82", // Soft red
        accent: "#fdd663", // Yellow
        purple: "#c58af9", // Purple
        green: "#81c995", // Green
        background: "#202124", // Dark background
        "background-light": "#303134", // Lighter dark background
        foreground: "#e8eaed", // Light text
        "chat-user": "#303134", // Dark message bubble
        "chat-ai": "#303134", // Dark message bubble
        border: "#5f6368", // Border color
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(138, 180, 248, 0.5)',
        'glow-purple': '0 0 15px rgba(197, 138, 249, 0.5)',
        'glow-red': '0 0 15px rgba(242, 139, 130, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config; 