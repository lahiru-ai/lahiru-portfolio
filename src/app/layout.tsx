import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';

export const metadata: Metadata = {
  title: 'R. J. K. Lahiru Madhushan Ranathunga | AI & Web Developer',
  description:
    'Personal developer portfolio of R. J. K. Lahiru Madhushan Ranathunga — AI Developer, Web Developer, Undergraduate at Wayamba University of Sri Lanka, and IEEE Volunteer.',
  keywords: [
    'Lahiru Madhushan Ranathunga',
    'Lahiru Ranathunga',
    'AI Developer Sri Lanka',
    'Web Developer Sri Lanka',
    'Wayamba University of Sri Lanka',
    'IEEE Student Branch',
    'Next.js Developer',
    'React',
    'TypeScript',
    'Python',
    'Machine Learning',
  ],
  authors: [{ name: 'R. J. K. Lahiru Madhushan Ranathunga', url: 'https://github.com/lahiru-ai' }],
  creator: 'R. J. K. Lahiru Madhushan Ranathunga',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lahiru-ai.github.io',
    title: 'R. J. K. Lahiru Madhushan Ranathunga | AI & Web Developer',
    description:
      'AI Developer | Web Developer | Undergraduate | IEEE Volunteer based in Sri Lanka.',
    siteName: 'Lahiru Ranathunga Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'R. J. K. Lahiru Madhushan Ranathunga | AI & Web Developer',
    description:
      'AI Developer | Web Developer | Undergraduate | IEEE Volunteer based in Sri Lanka.',
    creator: '@lahiru_ai',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#070709',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#070709] text-zinc-100 antialiased selection:bg-blue-600/30 selection:text-white min-h-screen">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
