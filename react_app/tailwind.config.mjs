/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          mint: '#0FBF9F',
          blue: '#0891B2',
          cream: '#F5F5F0',
          dark: '#1A2A2A',
          dark2: '#253535',
          mid: '#4A5A5A',
          light: '#9ABBAA',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0FBF9F 0%, #0891B2 100%)',
        'soft-panel': 'linear-gradient(180deg, #F5F5F0 0%, #EEF3F1 100%)',
        'hero-radial': 'radial-gradient(circle at 80% 20%, rgba(15,191,159,0.08) 0%, rgba(8,145,178,0.02) 70%)',
      },
      boxShadow: {
        soft: '0 12px 30px rgba(0,0,0,0.08)',
        feature: '0 20px 35px -12px rgba(0,0,0,0.15)',
        mint: '0 8px 20px rgba(15,191,159,0.25)',
        'mint-hover': '0 14px 28px rgba(15,191,159,0.35)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      maxWidth: {
        shell: '1280px',
      },
      fontFamily: {
        sans: ['Geomanist', 'DM Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
