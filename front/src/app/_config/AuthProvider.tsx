import { StackProvider } from '@stackframe/stack';
import stackServerApp from '@/stack';

function AuthProviders({ children }: { children: React.ReactNode }) {
  return (
    <StackProvider app={stackServerApp}>
      {children}
    </StackProvider>
  );
}

export default AuthProviders;
