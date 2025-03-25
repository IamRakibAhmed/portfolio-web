import './globals.css';
import { Inter, Poppins, DM_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import ScrollToTop from './components/ScrollToTop';
import { AppProvider } from './utils/AppContext';
import SchemaScript from './components/SchemaScript';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Rakib Ahmed | Senior Software Engineer | Java, Spring Boot, React',
  description: 'Senior Software Engineer specializing in Java, Spring Boot, Microservices, React, and Cloud technologies with experience in banking software and NLP projects.',
  keywords: 'software engineer, full stack developer, Java developer, Spring Boot, React, Microservices, Docker, Kubernetes, banking software, NLP, machine learning, Bangladesh developer',
  authors: [{ name: 'Rakib Ahmed' }],
  creator: 'Rakib Ahmed',
  openGraph: {
    title: 'Rakib Ahmed | Senior Software Engineer',
    description: 'Senior Software Engineer with expertise in Java, Spring Boot, Microservices & React. View my portfolio and projects.',
    url: 'https://rakibahmed.com',
    siteName: 'Rakib Ahmed Portfolio',
    images: [
      {
        url: '/images/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Rakib Ahmed - Software Engineer',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rakib Ahmed | Senior Software Engineer',
    description: 'Java, Spring Boot, Microservices & React specialist. View my projects and experience.',
    images: ['/images/profile.jpg'],
    creator: '@iamrakibahmed',
    site: '@iamrakibahmed',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://rakibahmed.com',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your Google verification code when available
  },
  other: {
    'facebook-domain-verification': 'your-facebook-domain-verification',  // Replace with your Facebook verification code when available
    'linkedin:author': 'https://linkedin.com/in/iamrakibahmed',
    'profile:username': 'iamrakibahmed',
    'profile:first_name': 'Rakib',
    'profile:last_name': 'Ahmed',
    'profile:gender': 'male',
    'og:email': 'rakibofficial@gmail.com',
    'og:country-name': 'Bangladesh',
    'og:locality': 'Dhaka',
    'og:see_also': [
      'https://github.com/IamRakibAhmed',
      'https://linkedin.com/in/iamrakibahmed',
    ],
    // Custom social metadata
    'social:github': 'https://github.com/IamRakibAhmed',
    'social:linkedin': 'https://linkedin.com/in/iamrakibahmed',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${poppins.variable} ${titleFont.variable} bg-light dark:bg-dark text-dark dark:text-light`}>
        <AppProvider>
          {children}
          <ScrollToTop />
          <SchemaScript />
        </AppProvider>
      </body>
    </html>
  );
} 