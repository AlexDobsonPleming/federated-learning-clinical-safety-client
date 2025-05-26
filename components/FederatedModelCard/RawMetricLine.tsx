import { Text, Tooltip } from '@mantine/core';
import {ReactNode} from "react";

interface RawMetricLineProps {
  label: string;
  value: number | null;
  tooltip?: string;
}

export function RawMetricLine({ label, value, tooltip }: RawMetricLineProps) {
  const content = (
    <Text size="sm" data-testid={`metric-${label.toLowerCase()}`}>
      {`${label}: ${value != null ? value : 'N/A'}`}
    </Text>
  ) as ReactNode;

  return tooltip ? <Tooltip label={tooltip}>{content}</Tooltip> : content;
}
