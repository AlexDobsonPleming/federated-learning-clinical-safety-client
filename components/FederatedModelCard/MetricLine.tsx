import { Text } from '@mantine/core';

interface MetricLineProps {
  label: string;
  value: number | null;
}

export function MetricLine({ label, value }: MetricLineProps) {
  // If value is null or undefined, show "N/A"
  if (value == null) {
    return (
      <Text size="sm" data-testid={`metric-${label.toLowerCase()}`}>
        {`${label}: N/A`}
      </Text>
    );
  }

  const percent = `${(value * 100).toFixed(1)}%`;
  return (
    <Text size="sm" data-testid={`metric-${label.toLowerCase()}`}>
      {`${label}: ${percent}`}
    </Text>
  );
}
