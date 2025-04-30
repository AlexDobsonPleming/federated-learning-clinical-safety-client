// components/ModelsClient/ModelsClient.tsx
'use client';

import { useCheckToken } from '@/hooks/useCheckToken';
import { useModels } from '@/hooks/useFlModels';
import { ModelGrid } from '../ModelGrid/ModelGrid';
import { Model } from '@/components/ModelCard/Model';

type ModelsClientProps = {
  initialData: Model[];
};

export default function ModelsClient({ initialData }: ModelsClientProps) {
  // 1️⃣ Redirect if no token
  const token = useCheckToken();
  if (!token) {return null;}

  // 2️⃣ useModels hook now takes an initialData argument
  const { data: models, error } = useModels(token, initialData);

  if (error) {return <div>Failed to load metrics</div>;}
  if (!models) {return <div>Loading…</div>;}

  return <ModelGrid models={models} />;
}
