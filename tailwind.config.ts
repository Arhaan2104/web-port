import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  		extend: {
  			colors: {
  				obsidian: {
  					base: '#0B0B0C',
  					dark: '#0E121A'
  				},
  				ink: '#EDEDED',
  				content: {
  					primary: 'var(--content-primary)',
  					secondary: 'var(--content-secondary)',
  					tertiary: 'var(--content-tertiary)',
  					muted: 'var(--content-muted)',
  					subtle: 'var(--content-subtle)',
  					faint: 'var(--content-faint)',
  					quiet: 'var(--content-quiet)',
  					meta: 'var(--content-meta-label)'
  				},
  				surface: {
  					'1': 'var(--surface-1)',
  					'2': 'var(--surface-2)',
  					'3': 'var(--surface-3)',
  					elevated: 'var(--surface-elevated)'
  				},
  				line: {
  					subtle: 'var(--line-subtle)',
  					DEFAULT: 'var(--line-default)',
  					strong: 'var(--line-strong)',
  					electric: 'var(--line-electric)'
  				},
  				muted: {
  					DEFAULT: 'hsl(var(--muted))',
  					foreground: 'hsl(var(--muted-foreground))'
  				},
  			electric: {
  				DEFAULT: '#66A3FF',
  				start: '#4DA8FF',
  				end: '#7EC7FF',
  				dim: 'rgba(102, 163, 255, 0.1)',
  				glow: 'rgba(102, 163, 255, 0.2)'
  			},
  			border: 'hsl(var(--border))',
  			'border-hover': 'rgba(255, 255, 255, 0.12)',
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'Helvetica Neue',
  				'Arial',
  				'sans-serif'
  			],
  			urbanist: [
  				'var(--font-urbanist)',
  				'system-ui',
  				'sans-serif'
  			],
  			geist: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'2xs': [
  				'0.625rem',
  				{
  					lineHeight: '0.875rem'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'8xl': [
  				'6rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'9xl': [
  				'8rem',
  				{
  					lineHeight: '1'
  				}
  			]
  		},
  		boxShadow: {
  			glass: 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.05), 0 4px 16px 0 rgba(0, 0, 0, 0.1)',
  			'glass-hover': 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.08), 0 8px 24px 0 rgba(0, 0, 0, 0.15)',
  			glow: '0 0 20px rgba(102, 163, 255, 0.3)',
  			'glow-lg': '0 0 40px rgba(102, 163, 255, 0.4)'
  		},
  		backgroundImage: {
  			'electric-gradient': 'linear-gradient(135deg, #4DA8FF, #7EC7FF)',
  			'obsidian-gradient': 'linear-gradient(180deg, #0B0B0C, #0E121A)',
  			'radial-glow': 'radial-gradient(ellipse at center, rgba(102, 163, 255, 0.15), transparent 70%)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-out',
  			'fade-up': 'fadeUp 0.5s ease-out',
  			'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			float: 'float 6s ease-in-out infinite',
  			shimmer: 'shimmer 1.5s ease-in-out infinite',
  			'ripple-expand': 'rippleExpand 600ms ease-out forwards'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			pulseRing: {
  				'0%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'50%': {
  					transform: 'scale(1.2)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1.2)',
  					opacity: '0'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			},
  			rippleExpand: {
  				'0%': {
  					transform: 'scale(0)',
  					opacity: '0.35'
  				},
  				'100%': {
  					transform: 'scale(4)',
  					opacity: '0'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		transitionTimingFunction: {
  			smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
