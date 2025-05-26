// components/FederatedModelCard/FederatedModelCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { FederatedModel } from './FederatedModel';
import { FederatedModelCard } from './FederatedModelCard';

const mockModel: FederatedModel = {
  id: 1,
  name: 'Test Model',
  time_produced: Date.now(),
  accuracy: 0.95,
  generalisability: 0.9,
  privacy: 0.85,
  leakage_chance: 0.8,
};

function renderWithProviders(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('FederatedModelCard component', () => {
  test('renders model name', () => {
    renderWithProviders(<FederatedModelCard model={mockModel} />);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Test Model');
  });

  test('renders an icon (svg)', () => {
    const { container } = renderWithProviders(<FederatedModelCard model={mockModel} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
