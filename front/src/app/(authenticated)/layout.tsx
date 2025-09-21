'use client';

import NavBar from '@/app/_components/navigation/NavBar';
import ApolloProviderUpdateAuth from '@/app/_config/ApolloProviderUpdateAuth';
import { useUser } from '@stackframe/stack';

export default function AuthenticatedLayout({ children }:
Readonly<{ children: React.ReactNode; }>) {
  useUser({ or: 'redirect' });

  return (
    <ApolloProviderUpdateAuth>
      <main className="w-full h-svh flex flex-row">
        <NavBar />

        <section className="w-full overflow-x-auto min-h-screen flex flex-col items-start justify-start">
          {children}
        </section>
      </main>
    </ApolloProviderUpdateAuth>
  );
}
