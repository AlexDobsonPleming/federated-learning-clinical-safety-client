'use client';

import { useCheckToken } from '@/hooks/useCheckToken';
import { useModels } from '@/hooks/useModels';
import { ModelGrid } from '../ModelGrid/ModelGrid';
import { Model } from '@/components/ModelCard/Model';

type ModelsClientProps = {
  initialData: Model[];
};

export default function ModelsClient({ initialData }: ModelsClientProps) {

  const token = useCheckToken();
  if (!token) {return null;}

  const { data: models, error } = useModels(token, initialData);

  if (error) {return <div>Failed to load metrics</div>;}
  if (!models) {return <div>Loading…</div>;}

  return <ModelGrid models={models} />;
}
