import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/glitch.css';

export const metadata = {
  title: 'EVA TIMER',
  description: 'A countdown timer inspired by Evangelion',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' }
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
} 