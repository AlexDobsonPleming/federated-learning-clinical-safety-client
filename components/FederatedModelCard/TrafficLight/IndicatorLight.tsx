'use client';

import React from 'react';
import { Tooltip, useMantineTheme } from '@mantine/core';

interface TrafficLightProps {
  active: boolean;
  label?: string;
}

export const IndicatorLight: React.FC<TrafficLightProps> = ({ active, label }) => {
  const theme = useMantineTheme();

  const size = 16;
  const color = active ? theme.colors.green[6] : theme.colors.red[6];

  return (
    <Tooltip label={label ?? (active ? 'Good accuracy' : 'Needs improvement')}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
          margin: '0 auto',
        }}
      />
    </Tooltip>
  );
};
