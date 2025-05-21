'use client';

import { FederatedModel } from '@/components/FederatedModelCard/FederatedModel';
import { FederatedModelGrid } from '@/components/FederatedModelGrid/FederatedModelGrid';
import { useCheckToken } from '@/hooks/useCheckToken';
import { useModels } from '@/hooks/useModels';

type ModelsClientProps = {
  _initialData: FederatedModel[];
};

export default function ModelsClient({ _initialData  }: ModelsClientProps) {
  const token = useCheckToken();
  if (!token) {
    return null;
  }

  const { data: models, error } = useModels(token);

  if (error) {
    return <div>Failed to load metrics</div>;
  }
  if (!models) {
    return <div>Loading…</div>;
  }

  return <FederatedModelGrid models={models} />;
}
