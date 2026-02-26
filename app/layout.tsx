import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Edward Joseph Fernandez — Mid Software Developer',
    template: '%s | Edward Joseph Fernandez',
  },
  description:
    'Mid Software Developer specializing in React, Angular, .NET Core, TypeScript, and modern web architecture. Building high-performance products with clean code and exceptional UX.',
  keywords: [
    'Full Stack Engineer',
    'Software Developer',
    'Next.js',
    'TypeScript',
    'React',
    'Portfolio',
    'Web Development',
  ],
  authors: [{ name: 'Edward Joseph Fernandez' }],
  creator: 'Edward Joseph Fernandez',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Edward Joseph Fernandez — Mid Software Developer',
    description:
      'Building innovative and robust web applications with scalable architecture and exceptional user experience.',
    siteName: 'Edward Fernandez Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Edward Joseph Fernandez — Mid Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edward Joseph Fernandez — Mid Software Developer',
    description: 'Building high-performance web applications with clean architecture.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="dark bg-background text-text-primary font-body" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
