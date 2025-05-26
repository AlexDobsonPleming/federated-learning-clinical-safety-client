// components/FederatedModelCard/FederatedModelCard.tsx
'use client';

import React from 'react';
import { IconBrain } from '@tabler/icons-react';
import { Card, Center, Stack, Text, ThemeIcon, Title, Tooltip } from '@mantine/core';
import { FederatedModel } from '@/components/FederatedModelCard/FederatedModel';
import { FederatedModelUsabilityTrafficLight } from '@/components/FederatedModelCard/TrafficLight/FederatedModelUsabilityTrafficLight';

// 1. Define your global thresholds and reason generators
//    Now treat `generalisability` as a 0–1 decimal and format it as a percentage:
const globalCheckers = {
  accuracy: {
    isError: (v: number) => v < 0.75,
    isWarn:  (v: number) => v >= 0.75 && v < 0.85,
    reason:  (v: number) =>
        v < 0.75
            ? `Accuracy too low (${(v * 100).toFixed(1)}% < 75%)`
            : `Accuracy marginal (${(v * 100).toFixed(1)}% < 85%)`,
    format:  (v: number) => `${(v * 100).toFixed(1)}%`,
  },
  generalisability: {
    // thresholds: 10% → 0.10, 5% → 0.05
    isError: (v: number) => v > 0.10,
    isWarn:  (v: number) => v > 0.05 && v <= 0.10,
    reason:  (v: number) =>
        v > 0.10
            ? `Generalisability poor (${(v * 100).toFixed(1)}% > 10%)`
            : `Generalisability marginal (${(v * 100).toFixed(1)}% > 5%)`,
    format:  (v: number) => `${(v * 100).toFixed(1)}%`,
  },
  epsilon: {
    isError: (v: number) => v > 8,
    isWarn:  (v: number) => v > 1 && v <= 8,
    reason:  (v: number) =>
        v > 8
            ? `Privacy ε too high (${v.toFixed(2)} > 8)`
            : `Privacy ε marginal (${v.toFixed(2)} > 1)`,
    format:  (v: number) => v.toFixed(2),
  },
  delta: {
    isError: (v: number) => v > 1e-3,
    isWarn:  (v: number) => v > 1e-5 && v <= 1e-3,
    reason:  (v: number) =>
        v > 1e-3 ? `Privacy δ too high (${v} > 10⁻³)` : `Privacy δ marginal (${v} > 10⁻⁵)`,
    format:  (v: number) => v.toExponential(),
  },
} as const;

type CheckerKey = keyof typeof globalCheckers;

export function FederatedModelCard({ model }: { model: FederatedModel }) {
  // default fallbacks force 'error' if null
  const metrics: { key: CheckerKey; label: string; value: number | null }[] = [
    { key: 'accuracy',       label: 'Accuracy',        value: model.accuracy },
    { key: 'generalisability', label: 'Generalisability', value: model.generalisability },
    { key: 'epsilon',        label: 'Privacy (ε)',     value: model.privacy },
    { key: 'delta',          label: 'Leakage (δ)',     value: model.leakage_chance },
  ];

  const renderMetricLine = (key: CheckerKey, label: string, value: number | null) => {
    const checker = globalCheckers[key];
    if (value == null) {
      return (
          <Text size="sm" key={key}>
            {label}: N/A
          </Text>
      );
    }

    const isError = checker.isError(value);
    const isWarn  = !isError && checker.isWarn(value);
    const color   = isError ? 'red' : isWarn ? 'orange' : undefined;
    const text    = checker.format(value);
    const tooltip = isError || isWarn ? checker.reason(value) : undefined;

    const line = (
        <Text size="sm" key={key} style={color ? { color } : undefined}>
          {`${label}: ${text}`}
        </Text>
    );

    return tooltip ? <Tooltip label={tooltip}>{line}</Tooltip> : line;
  };

  return (
      <Card shadow="sm" radius="md" withBorder p="lg" style={{ textAlign: 'center' }}>
        <ThemeIcon size={60} variant="light" radius="xl" style={{ margin: '0 auto 1rem' }}>
          <IconBrain size={32} />
        </ThemeIcon>

        <Title order={4} mb="sm">
          {model.name}
        </Title>

        <Stack gap="xs">
          {metrics.map(({ key, label, value }) => renderMetricLine(key, label, value))}
        </Stack>

        <Center mt="sm">
          <FederatedModelUsabilityTrafficLight
              accuracy={model.accuracy}
              generalisability={model.generalisability}
              epsilon={model.privacy}
              delta={model.leakage_chance}
          />
        </Center>
      </Card>
  );
}
