import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom background and foreground colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Enhanced primary color palette
        primary: {
          50: '#e6f1ff',
          100: '#b3d7ff',
          200: '#80bdff',
          300: '#4da3ff',
          400: '#1a89ff',
          500: '#0070f3',
          600: '#0059c2',
          700: '#004391',
          800: '#002c61',
          900: '#001530',
        },
        
        // Dark mode color palette
        dark: {
          50: '#f2f2f2',
          100: '#d9d9d9',
          200: '#bfbfbf',
          300: '#a6a6a6',
          400: '#8c8c8c',
          500: '#737373',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#0d0d0d',
        },
        
        // Task status colors
        task: {
          pending: '#ffa500',   // Orange
          'in-progress': '#1e90ff', // Dodger Blue
          completed: '#2ecc71',  // Emerald Green
          overdue: '#e74c3c'    // Alizarin Crimson
        }
      },
      
      // Custom animations for loading and interactions
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'task-hover': 'hover 0.3s ease-in-out',
      },
      
      // Custom transition durations
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      
      // Custom box shadows for depth and interaction
      boxShadow: {
        'task-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'task-active': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      
      // Custom border radius for consistent design
      borderRadius: {
        'task': '12px',
      },
    },
  },
  plugins: [
    // Optional: Add a plugin for custom utilities if needed
    function({ addUtilities }) {
      const newUtilities = {
        '.task-transition': {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          }
        }
      }
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
