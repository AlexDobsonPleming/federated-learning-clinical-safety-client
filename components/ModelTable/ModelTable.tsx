'use client';

import { useRouter } from 'next/navigation';
import { Container, Stack, Title, Table } from '@mantine/core';
import { Model } from '@/components/ModelCard/Model';

export function ModelTable({ models }: { models: Model[] }) {
    const router = useRouter();

    return (
        <Container size="xl" py="lg">
            <Stack spacing="xl">
                <Title order={2} align="center">
                    Federated Models
                </Title>

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
                            <Table.Th>Precision</Table.Th>
                            <Table.Th>Cross-Validation</Table.Th>
                            <Table.Th>Security</Table.Th>
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
                                <Table.Td>{(model.accuracy * 100).toFixed(1)}%</Table.Td>
                                <Table.Td>{(model.precision * 100).toFixed(1)}%</Table.Td>
                                <Table.Td>{(model.cross_validation * 100).toFixed(1)}%</Table.Td>
                                <Table.Td>{(model.security * 100).toFixed(1)}%</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Stack>
        </Container>
    );
}
