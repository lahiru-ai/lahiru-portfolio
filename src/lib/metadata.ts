import { getSiteSettings, getProfile } from '@/lib/portfolioRepository';
import type { Metadata } from 'next';

export async function generateSiteMetadata(): Promise<Metadata> {
  const [settings, profile] = await Promise.all([
    getSiteSettings(),
    getProfile(),
  ]);

  const title = settings.site_title || `${profile.name} | AI & Web Developer`;
  const description = settings.meta_description || profile.headline;
  const canonical = settings.canonical_url || 'https://lahiru-ai.github.io';

  return {
    title,
    description,
    keywords: settings.keywords || ['Lahiru Madhushan Ranathunga', 'AI Developer', 'Web Developer'],
    authors: [{ name: profile.name, url: profile.social_github || 'https://github.com/lahiru-ai' }],
    creator: profile.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonical,
      title,
      description,
      siteName: `${profile.short_name} Portfolio`,
      images: settings.og_image_url ? [{ url: settings.og_image_url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: settings.twitter_handle || '@lahiru_ai',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
