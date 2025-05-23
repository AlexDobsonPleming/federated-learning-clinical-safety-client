import { Text, Tooltip } from '@mantine/core';

interface LabelWithTooltipProps {
  label: string;
  tooltip: string;
}

export function LabelWithTooltip({ label, tooltip }: LabelWithTooltipProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <span>{label}</span>
      <Tooltip label={tooltip} withArrow>
        <Text span c="dimmed" fw={600} style={{ cursor: 'help' }}>
          ?
        </Text>
      </Tooltip>
    </div>
  );
}
