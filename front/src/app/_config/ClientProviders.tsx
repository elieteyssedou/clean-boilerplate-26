'use client';

import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { StackTheme } from '@stackframe/stack';
import ApolloProviderWrapper from './ApolloProviderWrapper';

function ClientProviders({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <ApolloProviderWrapper>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" enableSystem>
          <StackTheme>
            {children}
          </StackTheme>
        </NextThemesProvider>
      </HeroUIProvider>
    </ApolloProviderWrapper>
  );
}

export default ClientProviders;
