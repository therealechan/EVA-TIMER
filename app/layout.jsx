import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/glitch.css';
import Script from 'next/script';

export const metadata = {
  title: 'EVA POMODORO | Evangelion-inspired Productivity Timer',
  description: 'A pomodoro timer inspired by Evangelion anime series. Enhance your productivity with this unique countdown timer featuring glitch effects.',
  keywords: 'pomodoro timer, evangelion timer, productivity tool, study timer, work timer, anime timer',
  authors: [{ name: 'Hagi' }],
  creator: 'Hagi',
  publisher: 'Hagi',
  metadataBase: new URL('https://eva.0xechan.xyz'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'EVA POMODORO | Evangelion-inspired Productivity Timer',
    description: 'A pomodoro timer inspired by Evangelion anime series. Enhance your productivity with this unique countdown timer featuring glitch effects.',
    url: 'https://eva.0xechan.xyz',
    siteName: 'EVA POMODORO',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'EVA POMODORO',
        type: 'image/webp',
      },
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EVA POMODORO',
        type: 'image/jpeg',
      },
      {
        url: '/screenshot.png',
        width: 1200,
        height: 630,
        alt: 'EVA POMODORO Screenshot',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EVA POMODORO | Evangelion-inspired Productivity Timer',
    description: 'A pomodoro timer inspired by Evangelion anime series. Enhance your productivity with this unique countdown timer.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EVA POMODORO',
      }
    ],
  },
  icons: {
    icon: [
      { url: '/eva_pomodoro.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: { url: '/eva_pomodoro.svg', type: 'image/svg+xml' }
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/eva_pomodoro.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* Schema.org structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "EVA POMODORO",
              "url": "https://eva.0xechan.xyz",
              "description": "A pomodoro timer inspired by Evangelion anime series. Enhance your productivity with this unique countdown timer featuring glitch effects.",
              "applicationCategory": "Productivity",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Hagi"
              }
            })
          }}
        />
      </head>
      <body>
        {children}
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-36RP6BDPCG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-36RP6BDPCG');
          `}
        </Script>
      </body>
    </html>
  );
} 