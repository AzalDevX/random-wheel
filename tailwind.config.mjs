/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		colors: {
		  beige: {
			50: '#fdf8f6',
			100: '#f2e8e5',
			200: '#eaddd7',
			300: '#e0cec7',
			400: '#d2bab0',
			500: '#bfa094',
			600: '#a18072',
			700: '#977669',
			800: '#846358',
			900: '#43302b',
		  },
		  chocolate: {
			50: '#faf5f0',
			100: '#f0e5d8',
			200: '#e1ccb4',
			300: '#d2b290',
			400: '#c3986c',
			500: '#b47e48',
			600: '#a66937',
			700: '#8b572d',
			800: '#704626',
			900: '#5a3820',
		  },
		},
		boxShadow: {
		  'beige-sm': '0 1px 2px 0 rgba(191, 160, 148, 0.05)',
		  'beige': '0 1px 3px 0 rgba(191, 160, 148, 0.1), 0 1px 2px 0 rgba(191, 160, 148, 0.06)',
		  'beige-md': '0 4px 6px -1px rgba(191, 160, 148, 0.1), 0 2px 4px -1px rgba(191, 160, 148, 0.06)',
		  'beige-lg': '0 10px 15px -3px rgba(191, 160, 148, 0.1), 0 4px 6px -2px rgba(191, 160, 148, 0.05)',
		  'chocolate-sm': '0 1px 2px 0 rgba(180, 126, 72, 0.05)',
		  'chocolate': '0 1px 3px 0 rgba(180, 126, 72, 0.1), 0 1px 2px 0 rgba(180, 126, 72, 0.06)',
		  'chocolate-md': '0 4px 6px -1px rgba(180, 126, 72, 0.1), 0 2px 4px -1px rgba(180, 126, 72, 0.06)',
		  'chocolate-lg': '0 10px 15px -3px rgba(180, 126, 72, 0.1), 0 4px 6px -2px rgba(180, 126, 72, 0.05)',
		},
	  },
	},
	plugins: [],
  }