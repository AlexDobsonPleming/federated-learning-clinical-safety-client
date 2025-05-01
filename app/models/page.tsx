"use client";

import { ModelGrid } from '@/components/ModelGrid/ModelGrid';
import { useModels} from "@/hooks/useModels";
import { useCheckToken } from '@/hooks/useCheckToken';
import { useEffect, useState } from 'react';
import {ModelTable} from "@/components/ModelTable/ModelTable";

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
  return <ModelTable models={models} />;
}
