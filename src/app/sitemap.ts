import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://krishidhi.com';
  
  const routes = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
    { path: '/about', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/careers', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/products', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/pillars', changeFrequency: 'monthly' as const, priority: 0.8 },
  ];
  
  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
