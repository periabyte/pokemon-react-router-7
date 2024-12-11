import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
	safelist: [
		'bg-fire',
		'bg-water',
		'bg-grass',
		'bg-electric',
		'bg-ice',
		'bg-fighting',
		'bg-poison',
		'bg-ground',
		'bg-flying',
		'bg-psychic',
		'bg-bug',
		'bg-rock',
		'bg-ghost',
		'bg-dragon',
		'bg-dark',
		'bg-steel',
		'bg-fairy'
	],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Inter',
					'ui-sans-serif',
					'system-ui',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol',
					'Noto Color Emoji'
				]
			},
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					light: '#FFD733',
					dark: '#C7A008',
					foreground: 'hsl(var(--primary-foreground))'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},

				fire: 'hsl(var(--fire))',
				water: 'hsl(var(--water))',
				grass: 'hsl(var(--grass))',
				electric: 'hsl(var(--primary))',
				ice: 'hsl(var(--ice))',
				fighting: 'hsl(var(--fighting))',
				poison: 'hsl(var(--poison))',
				ground: 'hsl(var(--ground))',
				flying: 'hsl(var(--flying))',
				psychic: 'hsl(var(--psychic))',
				bug: 'hsl(var(--bug))',
				rock: 'hsl(var(--rock))',
				ghost: 'hsl(var(--ghost))',
				dragon: 'hsl(var(--dragon))',
				dark: 'hsl(var(--dark))',
				steel: 'hsl(var(--steel))',
				fairy: 'hsl(var(--fairy))'
				
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		},
		
	},
	plugins: [require("tailwindcss-animate")],
	
} satisfies Config;
