'use client';

import { Center, Container, Stack, Table, Text, Title, Tooltip } from '@mantine/core';
import { LocalModel } from './LocalModel';

export function LocalModelTable({ locals }: { locals: LocalModel[] }) {
  const formatNumber = (val: number | null) =>
    typeof val === 'number' ? `${val}` : <Text size="sm">N/A</Text>;

  function HeaderCell({ label }: { label: string }) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>{label}</span>
        <Tooltip label="Lower is better" withArrow>
          <span style={{ cursor: 'help', fontWeight: 600 }}>?</span>
        </Tooltip>
      </div>
    );
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
                <HeaderCell label="Privacy" />
              </Table.Th>
              <Table.Th>
                <HeaderCell label="Leakage Chance" />
              </Table.Th>
              <Table.Th>Noise</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {locals.map((lm) => (
              <Table.Tr key={lm.id}>
                <Table.Td>{lm.name ?? <Text size="sm">N/A</Text>}</Table.Td>
                <Table.Td>{formatNumber(lm.privacy)}</Table.Td>
                <Table.Td>{formatNumber(lm.leakage_chance)}</Table.Td>
                <Table.Td>{formatNumber(lm.noise)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Container>
  );
}
