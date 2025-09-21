import { Spinner } from '@heroui/react';

export default function Loading() {
  return (
    <div className="w-full h-svh flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
