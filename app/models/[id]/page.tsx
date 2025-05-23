'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Center } from '@mantine/core';
import { FederatedModelCard } from '@/components/FederatedModelCard/FederatedModelCard';
import { LocalModelTable } from '@/components/LocalModelTable/LocalModelTable';
import { useCheckToken } from '@/hooks/useCheckToken';
import { useLocalModels } from '@/hooks/useLocalModels';
import { useModel } from '@/hooks/useModels';

export default function FederatedModelPage() {
  const router = useRouter();
  const { id } = useParams();
  const token = useCheckToken();
  const [mounted, setMounted] = useState(false);

  // Normalize `id` to a single string
  const rawId = Array.isArray(id) ? id[0] : id;
  // Now rawId is either string or undefined
  const modelId = rawId ? parseInt(rawId, 10) : undefined;

  const safeToken = token ?? '';

  const { data: model, error, isValidating: isLoading } = useModel(safeToken, modelId);
  const {
    data: locals,
    error: localsError,
    isValidating: isLoadingLocals,
  } = useLocalModels(safeToken, modelId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && token && modelId != null && !isLoading && !model) {
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
        <Center mt="md">No local models found.</Center>
      )}
    </>
  );
}
