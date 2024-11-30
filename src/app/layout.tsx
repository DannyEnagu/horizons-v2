import type { Metadata } from "next";
import "./globals.css";
import { Inter, Space_Grotesk } from 'next/font/google';
import AppProvider from "@/context/AppProvider";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter'
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spaceGrotesk'
});

export const metadata: Metadata = {
  title: "Horizons",
  description: "Horizons Jobs - A modern job board built with Next.js, offering a seamless user experience for job seekers and employers. Key features include advanced search, job alerts, employer dashboard, and more. #Nextjs #React #Nodejs #JavaScript #JobBoard #Career #Employment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen background-light850_dark100 text-dark-100 dark:text-light-900`}
      >
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: 'bg-[#14A800] text-slate-100 hover:bg-[#14A800]/80 !shadow-none',
              footerActionLink:
                'active-theme'
            }
          }}
        >
          <AppProvider>
            {children}
          </AppProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
