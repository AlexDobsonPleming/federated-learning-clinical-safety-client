'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCheckToken } from '@/hooks/useCheckToken';
import { useModel } from '@/hooks/useModels';
import { useLocalModels } from '@/hooks/useLocalModels';
import { FederatedModelCard } from '@/components/FederatedModelCard/FederatedModelCard';
import { LocalModelTable } from '@/components/LocalModelTable/LocalModelTable';
import { Text } from '@mantine/core';

export default function FederatedModelPage() {
  const router = useRouter();
  const { id } = useParams();
  const token = useCheckToken();
  const [mounted, setMounted] = useState(false);

  const modelId = id ? parseInt(id, 10) : undefined;

  const { data: model, error, isValidating: isLoading } =
    useModel(token, modelId!);

  const {
    data: locals,
    error: localsError,
    isValidating: isLoadingLocals,
  } = useLocalModels(token, modelId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      mounted &&
      token &&
      modelId != null &&
      !isLoading &&
      !model
    ) {
      router.replace('/404');
    }
  }, [mounted, token, modelId, isLoading, model, router]);

  if (!mounted || !token) {
    return null;
  }

  if (!modelId) {
    return <div>Invalid model ID</div>;
  }

  if (isLoading) {
    return <div>Loading…</div>;
  }

  if (error) {
    return <div>Error loading model</div>;
  }

  if (!model) {
    return null;
  }

  return (
    <>
      <FederatedModelCard model={model} />

      {isLoadingLocals ? (
        <div>Loading local models…</div>
      ) : localsError ? (
        <div>Error loading local models</div>
      ) : locals && locals.length > 0 ? (
        <LocalModelTable locals={locals} />
      ) : (
        <Text align="center" size="sm" mt="md">
          No local models found.
        </Text>
      )}
    </>
  );
}
