import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import ScrollToTop from './components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} bg-light dark:bg-dark text-dark dark:text-light`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
} 