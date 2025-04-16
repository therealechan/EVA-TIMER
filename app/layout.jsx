import '../styles/reset.css';
import '../styles/globals.css';
import '../styles/glitch.css';

export const metadata = {
  title: 'EVA TIMER',
  description: 'A countdown timer inspired by Evangelion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 