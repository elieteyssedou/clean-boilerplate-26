import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import './_config/globals.css';

import ClientProviders from '@/app/_config/ClientProviders';
import AuthProvider from '@/app/_config/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GenUI Components',
  description: 'Generate awesome React components with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
