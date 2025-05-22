'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FederatedModelTable } from '@/components/FederatedModelTable/FederatedModelTable';
import { useCheckToken } from '@/hooks/useCheckToken';
import { useModels } from '@/hooks/useModels';

export default function HomePage() {
  // 1) All hooks first, unconditionally:
  const token = useCheckToken();
  const { data: models, error } = useModels(token ?? '');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // 2) Effects next:
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Optional: if you want to redirect to login instead of silent null:
  useEffect(() => {
    if (token === null) {
      router.replace('/login');
    }
  }, [token, router]);

  // 3) Then your conditional renders:
  if (!token || !isMounted) {
    // still checking auth or waiting for mount
    return null;
  }
  if (error) {
    return <div>Failed to load metrics</div>;
  }
  if (!models) {
    return <div>Loading…</div>;
  }

  // 4) Finally, the real UI
  return <FederatedModelTable models={models} />;
}
