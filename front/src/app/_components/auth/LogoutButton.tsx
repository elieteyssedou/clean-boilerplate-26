'use client';

import React from 'react';
import { Button } from '@heroui/react';
import { useUser } from '@stackframe/stack';

function LogoutButton() {
  const user = useUser();

  if (!user) {
    return null;
  }

  return (
    <Button onClick={() => { user.signOut(); }}>
      Log Out
    </Button>
  );
}

export default LogoutButton;
