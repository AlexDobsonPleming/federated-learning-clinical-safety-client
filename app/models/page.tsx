"use client";

import { FederatedModelGrid } from '@/components/FederatedModelGrid/FederatedModelGrid';
import { useModels} from "@/hooks/useModels";
import { useCheckToken } from '@/hooks/useCheckToken';
import { useEffect, useState } from 'react';
import {FederatedModelTable} from "@/components/FederatedModelTable/FederatedModelTable";

export default function HomePage() {
  const token = useCheckToken();
  if (!token) {return null;}

  const { data: models, error } = useModels(token);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (error) { return <div>Failed to load metrics</div>; }
  if (!models) { return <div>Loading…</div>; }
  return <FederatedModelTable models={models} />;
}
