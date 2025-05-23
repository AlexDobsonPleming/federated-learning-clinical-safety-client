'use client';

import { IconBrain } from '@tabler/icons-react';
import { Card, Center, Stack, ThemeIcon, Title } from '@mantine/core';
import { FederatedModel } from '@/components/FederatedModelCard/FederatedModel';
import { TrafficLight } from '@/components/FederatedModelCard/TrafficLight/TrafficLight';
import { MetricLine } from './MetricLine';

export function FederatedModelCard({ model }: { model: FederatedModel }) {
  const accuracy = model.accuracy ?? 0;
  let status: 'red' | 'yellow' | 'green' = 'red';
  if (accuracy > 0.75) status = 'green';

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
        <MetricLine label="Generalisability" value={model.generalisability} />
        <MetricLine label="Privacy" value={model.privacy} />
        <MetricLine label="Leakage Chance" value={model.leakage_chance} />
      </Stack>
      <Center mt="sm">
        <TrafficLight status={status} size={16} />
      </Center>
    </Card>
  );
}
