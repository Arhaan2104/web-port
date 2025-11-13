# Arhaan Gupta Portfolio

A modern, matte black "digital obsidian" portfolio website with electric-blue accents, featuring liquid-glass UI components and smooth animations.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D Graphics:** React Three Fiber + Drei
- **Smooth Scroll:** Lenis

## Features

- 🌑 Matte black obsidian aesthetic with electric blue accents
- 💫 Interactive 3D orb with cursor tracking
- 🎨 Liquid glass UI components
- 📱 Fully responsive design
- ♿ Accessibility-first approach
- 🚀 Optimized performance with lazy loading
- 🎯 SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage
│   ├── work/              # Work/projects page
│   ├── about/             # About page
│   └── lab/               # Experiments page
├── components/            # React components
│   ├── nav/               # Navigation components
│   ├── hero/              # Hero section components
│   ├── featured/          # Featured projects
│   ├── sections/          # Page sections
│   ├── ui/                # Reusable UI components
│   └── providers/         # Context providers
├── lib/                   # Utilities and data
│   ├── motion.ts          # Animation variants
│   ├── projects.ts        # Project data
│   └── utils.ts           # Helper functions
├── styles/                # Global styles
│   └── globals.css        # Tailwind and custom CSS
└── public/                # Static assets
    └── images/            # Project images
```

## Customization

### Colors

Edit the color palette in `tailwind.config.ts`:

```js
colors: {
  obsidian: {
    base: '#0B0B0C',
    dark: '#0E121A',
  },
  electric: {
    DEFAULT: '#66A3FF',
    start: '#4DA8FF',
    end: '#7EC7FF',
  },
}
```

### Typography

The portfolio uses Neue Haas Grotesk as the primary font. To use custom fonts:

1. Add font files to `/fonts` directory
2. Import them in `app/layout.tsx` using `next/font/local`
3. Update the font configuration

### Adding Projects

Edit `lib/projects.ts` to add or modify projects:

```typescript
{
  id: 'project-id',
  title: 'Project Name',
  tag: 'Category',
  description: 'Brief description',
  image: '/images/project-cover.jpg',
  href: '/work/project-id',
  featured: true,
}
```

## Images

Add project cover images to `/public/images/`:
- Recommended size: 1600x1000px
- Format: JPG or WebP
- Naming: `projectname-cover.jpg`

## Performance Optimization

- Images are lazy loaded with Next.js Image component
- 3D components are dynamically imported
- Smooth scroll with Lenis
- Reduced motion support for accessibility

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with default settings

### Other Platforms

Build the project:
```bash
pnpm build
```

The output will be in the `.next` directory.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use this for your own portfolio!

## Credits

Designed and developed by Arhaan Gupta