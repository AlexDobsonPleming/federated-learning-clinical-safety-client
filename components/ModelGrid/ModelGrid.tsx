"use client";
import { SimpleGrid, Container, Stack, Title } from '@mantine/core';
import { ModelCard } from '../ModelCard/ModelCard';

type Model = React.ComponentProps<typeof ModelCard>['model'];

export function ModelGrid({ models }: { models: Model[] }) {
  return (
    <Container size="xl" py="lg">
      <Stack gap="xl">
        <Title order={2} ta="center">
          Federated Models
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {models.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
