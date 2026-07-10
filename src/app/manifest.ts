import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Krishidhi Fgen Private Limited',
    short_name: 'Krishidhi Fgen',
    description: 'Autonomous Agronomy & F2C Marketplace powered by AI',
    start_url: '/',
    display: 'standalone',
    background_color: '#04060a',
    theme_color: '#10b981',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
