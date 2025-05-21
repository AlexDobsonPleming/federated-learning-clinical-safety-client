import { Text } from '@mantine/core';

interface MetricLineProps {
  label: string;
  value: number; // e.g. 0.95
}

export function MetricLine({ label, value }: MetricLineProps) {
  const percent = `${(value * 100).toFixed(1)}%`;
  return (
    <Text size="sm" data-testid={`metric-${label.toLowerCase()}`}>
      {`${label}: ${percent}`}
    </Text>
  );
}
