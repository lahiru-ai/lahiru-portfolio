import type { Metadata, Viewport } from 'next';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { generateSiteMetadata } from '@/lib/metadata';
import { getSynchronizedPortfolioData } from '@/lib/portfolioSync';

export async function generateMetadata(): Promise<Metadata> {
  return await generateSiteMetadata();
}

export const viewport: Viewport = {
  themeColor: '#070709',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialData = await getSynchronizedPortfolioData();

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#070709] text-zinc-100 antialiased selection:bg-blue-600/30 selection:text-white">
        <PortfolioProvider initialData={initialData}>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
