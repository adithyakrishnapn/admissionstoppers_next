import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://admissionstopper.com';

  const staticPages = [
    '',
    '/about',
    '/courses',
    '/courses/diploma',
    '/courses/engineering',
    '/courses/medical',
    '/courses/ug',
    '/courses/ugparamedical',
    '/colleges',
    '/colleges/bangalore',
    '/colleges/kerala',
    '/colleges/mangalore',
    '/colleges/tamilnadu',
    '/blog',
    '/contact',
    '/free-counselling',
    '/faq',
    '/privacy',
    '/terms',
  ];

  const sitemapEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as "weekly" | "monthly",
    priority: route === '' ? 1.0 : route.includes('/courses') || route.includes('/colleges') ? 0.9 : 0.8,
  }));

  return sitemapEntries;
}
