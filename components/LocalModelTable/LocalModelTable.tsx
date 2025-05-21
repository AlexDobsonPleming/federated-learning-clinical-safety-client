'use client';

import { Center, Container, Stack, Table, Text, Title } from '@mantine/core';
import { LocalModel } from './LocalModel';


export function LocalModelTable({ locals }: { locals: LocalModel[] }) {
  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        <Center>
          <Title order={2}>
            Local Models
          </Title>
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
              <Table.Th>Source</Table.Th>
              <Table.Th>Relatability</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {locals.map((lm) => (
              <Table.Tr key={lm.id}>
                <Table.Td>{lm.name}</Table.Td>
                <Table.Td>{lm.source}</Table.Td>
                <Table.Td>
                  {typeof lm.relatability === 'number' ? (
                    `${(lm.relatability * 100).toFixed(1)}%`
                  ) : (
                    <Text size="sm">N/A</Text>
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Container>
  );
}
