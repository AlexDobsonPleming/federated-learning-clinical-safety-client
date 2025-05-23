'use client';

import { useRouter } from 'next/navigation';
import { Center, Container, Stack, Table, Title } from '@mantine/core';
import { FederatedModel } from '@/components/FederatedModelCard/FederatedModel';

export function FederatedModelTable({ models }: { models: FederatedModel[] }) {
  const router = useRouter();

  function formatPercent(value: number | null | undefined): string {
    return value != null ? `${(value * 100).toFixed(1)}%` : 'N/A';
  }

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
              <Table.Th>Accuracy</Table.Th>
              <Table.Th>Generalisability</Table.Th>
              <Table.Th>Privacy</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {models.map((model) => (
              <Table.Tr
                key={model.id}
                onClick={() => router.push(`/models/${model.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <Table.Td>{model.name}</Table.Td>
                <Table.Td>{formatPercent(model.accuracy)}</Table.Td>
                <Table.Td>{formatPercent(model.generalisability)}</Table.Td>
                <Table.Td>{formatPercent(model.privacy)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Container>
  );
}
