// components/FederatedModelCard/FederatedModelTable.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Center,
  Container,
  Stack,
  Table,
  Title,
  Tooltip,
  Text,
} from '@mantine/core';
import { LabelWithTooltip } from '@/components/LabelWithTooltip/LabelWithTooltip';
import { FederatedModel } from '@/components/FederatedModelCard/FederatedModel';

// reuse the same thresholds & formatters as in FederatedModelCard, but
// treat generalisability as a 0–1 decimal formatted as percentage
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
    // now comparing decimal values: >0.10 (10%), >0.05 (5%)
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
} as const;

// only those three metrics appear in this table
type CheckerKey = 'accuracy' | 'generalisability' | 'epsilon';

export function FederatedModelTable({ models }: { models: FederatedModel[] }) {
  const router = useRouter();

  const renderMetricCell = (key: CheckerKey, raw: number | null) => {
    const checker = globalCheckers[key];
    if (raw == null) {
      return <Text size="sm">N/A</Text>;
    }

    const isError = checker.isError(raw);
    const isWarn  = !isError && checker.isWarn(raw);
    const color   = isError ? 'red' : isWarn ? 'orange' : undefined;
    const label   = checker.format(raw);
    const tip     = isError || isWarn ? checker.reason(raw) : undefined;

    const cellContent = (
        <Text size="sm" style={color ? { color } : undefined}>
          {label}
        </Text>
    );

    return tip ? <Tooltip label={tip}>{cellContent}</Tooltip> : cellContent;
  };

  return (
      <Container size="xl" py="lg">
        <Stack gap="xl">
          <Center mt="xl">
            <Title order={2}>Federated Models</Title>
          </Center>

          <Table
              highlightOnHover
              striped
              withTableBorder
              withColumnBorders
              horizontalSpacing="lg"
              verticalSpacing="sm"
              style={{ textAlign: 'center' }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>
                  <LabelWithTooltip
                      label="Accuracy"
                      tooltip="Model accuracy (higher ⇒ better)."
                  />
                </Table.Th>
                <Table.Th>
                  <LabelWithTooltip
                      label="Generalisability"
                      tooltip="Difference between local & global performance as a percentage (lower ⇒ better)."
                  />
                </Table.Th>
                <Table.Th>
                  <LabelWithTooltip
                      label="Privacy (ε)"
                      tooltip="Differential privacy parameter ε (lower ⇒ stronger privacy)."
                  />
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {models.map((m) => (
                  <Table.Tr
                      key={m.id}
                      onClick={() => router.push(`/models/${m.id}`)}
                      style={{ cursor: 'pointer' }}
                  >
                    <Table.Td>{m.name}</Table.Td>
                    <Table.Td>{renderMetricCell('accuracy', m.accuracy ?? null)}</Table.Td>
                    <Table.Td>
                      {renderMetricCell('generalisability', m.generalisability ?? null)}
                    </Table.Td>
                    <Table.Td>{renderMetricCell('epsilon', m.privacy ?? null)}</Table.Td>
                  </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Container>
  );
}
