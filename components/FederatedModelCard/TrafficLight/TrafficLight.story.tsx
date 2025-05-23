import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TrafficLight, TrafficLightProps } from './TrafficLight';

const meta: Meta<TrafficLightProps> = {
  title: 'Components/TrafficLight',
  component: TrafficLight,
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        height: '100vh',
      }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: ['red', 'yellow', 'green'],
    },
    size: { control: { type: 'number', min: 8, max: 128, step: 1 } },
  },
};

export default meta;
type Story = StoryObj<TrafficLightProps>;

export const Red: Story = {
  args: {
    status: 'red',
    size: 24,
  },
};

export const Yellow: Story = {
  args: {
    status: 'yellow',
    size: 24,
  },
};

export const Green: Story = {
  args: {
    status: 'green',
    size: 24,
  },
};