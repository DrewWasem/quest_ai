/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Baloo 2', 'Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
        body: ['Nunito', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        quest: {
          // Primary Brand (Quest Blue — was purple)
          purple: '#4A90D9',
          'purple-deep': '#3A7BC8',
          'purple-light': '#7DB8F0',
          'purple-soft': '#B3D4F7',
          orange: '#FF8C42',
          'orange-deep': '#F97316',
          'orange-light': '#FDBA74',
          green: '#22C55E',
          'green-deep': '#16A34A',
          'green-light': '#86EFAC',
          yellow: '#F5C842',
          'yellow-light': '#FCE088',
          blue: '#4ECDC4',
          'blue-deep': '#3BADA5',
          'blue-light': '#8BE0D9',

          // Supporting & Celebration
          pink: '#EC4899',
          'pink-light': '#F9A8D4',
          violet: '#7DB8F0',
          peach: '#FDBA74',
          mint: '#86EFAC',
          sunshine: '#FCE088',

          // UI Backgrounds (Light Base — Cloud Gray)
          'page-bg': '#EDF2F7',
          'card-bg': '#FFFFFF',
          'panel-bg': '#E8EFF7',
          'border': '#D8E4F0',
          'border-light': '#E4ECF5',

          // Game Canvas (Deep Ocean)
          'canvas-void': '#0A1628',
          'canvas-night': '#122240',
          'canvas-card': '#1A3055',
          'canvas-surface': '#234068',
          'canvas-border': '#2E5078',
          'canvas-bg': '#0D1B33',

          // Text
          text: {
            dark: '#1A2332',
            mid: '#3D5068',
            light: '#6B8098',
            muted: '#98AEBF',
            white: '#FFFFFF',
          },

          // Game States
          state: {
            thinking: '#4ECDC4',
            animating: '#4A90D9',
            success: '#22C55E',
            'funny-fail': '#F5C842',
            'try-again': '#FF8C42',
          },

          // Legacy compat
          bg: '#0A1628',
          panel: '#122240',
          card: '#1A3055',
          surface: '#234068',
          accent: '#4A90D9',
          glow: '#7DB8F0',
          gold: '#F5C842',
          success: '#22C55E',
        },
      },
      boxShadow: {
        'glow-purple': '0 0 24px rgba(74, 144, 217, 0.15), 0 0 60px rgba(74, 144, 217, 0.08)',
        'glow-gold': '0 0 20px rgba(245, 200, 66, 0.15), 0 0 60px rgba(245, 200, 66, 0.08)',
        'glow-orange': '0 0 20px rgba(255, 140, 66, 0.15)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.12)',
        'glow-blue': '0 0 20px rgba(78, 205, 196, 0.12)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.12)',
      },
      borderRadius: {
        'game-sm': '10px',
        'game-md': '16px',
        'game-lg': '22px',
        'game-xl': '30px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(74, 144, 217, 0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(74, 144, 217, 0.3), 0 0 60px rgba(74, 144, 217, 0.12)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
