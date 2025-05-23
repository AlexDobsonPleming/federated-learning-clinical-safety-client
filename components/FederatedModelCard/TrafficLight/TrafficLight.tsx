'use client';

import React from 'react';
import { Tooltip, useMantineTheme } from '@mantine/core';

interface TrafficLightProps {
  status: 'red' | 'yellow' | 'green';
  size?: number;
}

export const TrafficLight: React.FC<TrafficLightProps> = ({ status, size = 24 }) => {
  const theme = useMantineTheme();

  const colors = {
    red: theme.colors.red[6],
    yellow: theme.colors.yellow[6],
    green: theme.colors.green[6],
    off: theme.colors.gray[4],
  };

  const getColor = (light: 'red' | 'yellow' | 'green') =>
    status === light ? colors[light] : colors.off;

  return (
    <Tooltip label={`Status: ${status}`}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          backgroundColor: theme.colors.dark[7],
          borderRadius: size * 0.3,
          width: size * 1.2,
        }}
      >
        {(['red', 'yellow', 'green'] as const).map((light) => (
          <div
            key={light}
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: getColor(light),
              margin: 2,
              transition: 'background-color 0.3s ease',
            }}
          />
        ))}
      </div>
    </Tooltip>
  );
};