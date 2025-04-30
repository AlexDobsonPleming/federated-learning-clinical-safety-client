'use client';

import { IconBrain } from '@tabler/icons-react';
import { Card, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { Model } from '@/components/ModelCard/Model';
import { MetricLine } from './MetricLine';


export function ModelCard({ model }: { model: Model }) {
  return (
    <Card shadow="sm" radius="md" withBorder p="lg" style={{ textAlign: 'center' }}>
      <ThemeIcon size={60} variant="light" radius="xl" style={{ margin: '0 auto 1rem' }}>
        <IconBrain size={32} />
      </ThemeIcon>
      <Title order={4} mb="sm">
        {model.name}
      </Title>
      <Stack gap="xs">
        <MetricLine label="Accuracy" value={model.accuracy} />
        <MetricLine label="Precision" value={model.precision} />
        <MetricLine label="Cross-Validation" value={model.crossValidation} />
        <MetricLine label="Security" value={model.security} />
      </Stack>
    </Card>
  );
}