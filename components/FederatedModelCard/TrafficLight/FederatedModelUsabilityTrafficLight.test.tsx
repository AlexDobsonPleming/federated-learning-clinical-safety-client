import React from 'react';
import { render, screen } from '@testing-library/react';
import { FederatedModelUsabilityTrafficLight } from './FederatedModelUsabilityTrafficLight';

// Mock TrafficLight to test status prop
jest.mock('./TrafficLight', () => ({
  TrafficLight: ({ status }: { status: string }) => <div data-testid="traffic-light">{status}</div>,
}));

describe('FederatedModelUsabilityTrafficLight', () => {
  it('shows green when all metrics are within green thresholds', () => {
    render(
      <FederatedModelUsabilityTrafficLight
        accuracy={0.9}
        generalisability={3}
        epsilon={0.8}
        delta={1e-6}
      />
    );
    expect(screen.getByTestId('traffic-light')).toHaveTextContent('green');
  });

  it('shows yellow when any metric is marginal', () => {
    render(
      <FederatedModelUsabilityTrafficLight
        accuracy={0.8}
        generalisability={6}
        epsilon={2}
        delta={5e-5}
      />
    );
    expect(screen.getByTestId('traffic-light')).toHaveTextContent('yellow');
  });

  it('shows red when any metric is unsafe', () => {
    render(
      <FederatedModelUsabilityTrafficLight
        accuracy={0.7}
        generalisability={12}
        epsilon={10}
        delta={1e-2}
      />
    );
    expect(screen.getByTestId('traffic-light')).toHaveTextContent('red');
  });
});
