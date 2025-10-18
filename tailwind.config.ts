import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'tangerine': ['Tangerine', 'cursive'],
        'brush': ['Kaushan Script', 'cursive'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Cosmic Colors
        cosmic: {
          "nebula-green": "hsl(var(--cosmic-nebula-green))",
          "nebula-purple": "hsl(var(--cosmic-nebula-purple))",
          "stellar-gold": "hsl(var(--cosmic-stellar-gold))",
          "deep-space": "hsl(var(--cosmic-deep-space))",
          "star-white": "hsl(var(--cosmic-star-white))",
          "purple-pink": "hsl(var(--cosmic-purple-pink))",
          "royal-blue": "hsl(var(--cosmic-royal-blue))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-5px)",
          },
        },
        "stellar-spin": {
          "0%": {
            transform: "perspective(800px) rotateY(0deg) scale(1)",
          },
          "50%": {
            transform: "perspective(800px) rotateY(180deg) scale(1.1)",
          },
          "100%": {
            transform: "perspective(800px) rotateY(360deg) scale(1)",
          },
        },
        "galactic-rotate": {
          "0%": {
            transform: "perspective(1000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)",
          },
          "25%": {
            transform: "perspective(1000px) rotateY(90deg) rotateX(5deg) rotateZ(2deg)",
          },
          "50%": {
            transform: "perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg)",
          },
          "75%": {
            transform: "perspective(1000px) rotateY(270deg) rotateX(-5deg) rotateZ(-2deg)",
          },
          "100%": {
            transform: "perspective(1000px) rotateY(360deg) rotateX(0deg) rotateZ(0deg)",
          },
        },
        "cosmic-pulse": {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))",
          },
          "50%": {
            transform: "scale(1.05)",
            filter: "drop-shadow(0 0 40px rgba(168, 85, 247, 0.8))",
          },
        },
        "nebula-drift": {
          "0%": {
            transform: "perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
          },
          "33%": {
            transform: "perspective(1200px) rotateY(120deg) rotateX(10deg) translateZ(20px)",
          },
          "66%": {
            transform: "perspective(1200px) rotateY(240deg) rotateX(-10deg) translateZ(-20px)",
          },
          "100%": {
            transform: "perspective(1200px) rotateY(360deg) rotateX(0deg) translateZ(0px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 25s ease-in-out infinite",
        "stellar-spin": "stellar-spin 20s linear infinite",
        "galactic-rotate": "galactic-rotate 30s ease-in-out infinite",
        "cosmic-pulse": "cosmic-pulse 12s ease-in-out infinite",
        "nebula-drift": "nebula-drift 35s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
