import './globals.css';
import { Inter, Poppins, DM_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import ScrollToTop from './components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

// Google Font similar to Product Sans
const titleFont = DM_Sans({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-title',
});

export const metadata: Metadata = {
  title: 'Software Engineer Portfolio',
  description: 'Professional portfolio showcasing my work as a Software Engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable} ${titleFont.variable} bg-light dark:bg-dark text-dark dark:text-light`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
} 