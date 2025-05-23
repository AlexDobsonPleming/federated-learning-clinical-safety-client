'use client';

import { Center, Container, Stack, Table, Text, Title, Tooltip } from '@mantine/core';
import { LabelWithTooltip } from '@/components/LabelWithTooltip/LabelWithTooltip';
import { LocalModel } from './LocalModel';

// 1. Define your thresholds and tooltip generators in one place
const localThresholdCheckers = {
  privacy: {
    test: (v: number | null) => v != null && v > 1, // ε > 1 is unsafe
    tooltip: (v: number) => `Privacy ε too high (${v.toFixed(2)} > 1)`,
  },
  leakage_chance: {
    test: (v: number | null) => v != null && v > 1e-6, // δ > 1e-6 is unsafe
    tooltip: (v: number) => `Failure probability δ too high (${v} > 1e-6)`,
  },
  noise: {
    test: (v: number | null) => v != null && v < 1, // σ < 1 is unsafe
    tooltip: (v: number) => `Noise scale σ too low (${v.toFixed(2)} < 1)`,
  },
} as const;

type CheckerKey = keyof typeof localThresholdCheckers;

export function LocalModelTable({ locals }: { locals: LocalModel[] }) {
  const formatNumber = (val: number | null) => (typeof val === 'number' ? val : 'N/A');

  function HeaderCell({ label, tooltip }: { label: string; tooltip: string }) {
    return <LabelWithTooltip label={label} tooltip={tooltip} />;
  }

  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        <Center>
          <Title order={2}>Local Models</Title>
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
                <HeaderCell label="Privacy (ε)" tooltip="Lower ε ⇒ stronger privacy" />
              </Table.Th>
              <Table.Th>
                <HeaderCell label="Leakage (δ)" tooltip="Lower δ ⇒ lower breach risk" />
              </Table.Th>
              <Table.Th>
                <HeaderCell label="Noise (σ)" tooltip="Higher σ ⇒ more noise ⇒ stronger DP" />
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {locals.map((lm) => (
              <Table.Tr key={lm.id}>
                <Table.Td>{lm.name ?? <Text size="sm">N/A</Text>}</Table.Td>

                {/* Map over each metric so it’s DRY */}
                {(['privacy', 'leakage_chance', 'noise'] as CheckerKey[]).map((key) => {
                  const value = lm[key];
                  const { test, tooltip } = localThresholdCheckers[key];
                  const isDanger = test(value);
                  const display = formatNumber(value);

                  return (
                    <Table.Td key={key}>
                      {isDanger ? (
                        <Tooltip label={tooltip(value!)} withArrow>
                          <Text size="sm" c="red">
                            {display}
                          </Text>
                        </Tooltip>
                      ) : (
                        <Text size="sm">{display}</Text>
                      )}
                    </Table.Td>
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Container>
  );
}
