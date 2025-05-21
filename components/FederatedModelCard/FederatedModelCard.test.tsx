// components/FederatedModelCard/FederatedModelCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { FederatedModelCard } from './FederatedModelCard';
import { FederatedModel } from './FederatedModel';

const mockModel: FederatedModel = {
  id: 1,
  name: 'Test Model',
  accuracy: 0.95,
  generalisability: 0.9,
  security: 0.85,
};

function renderWithProviders(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('FederatedModelCard component', () => {
  test('renders model name', () => {
    renderWithProviders(<FederatedModelCard model={mockModel} />);
    expect(screen.getByRole('heading', { level: 4 }))
      .toHaveTextContent('Test Model');
  });

  test('renders the three metric lines', () => {
    renderWithProviders(<FederatedModelCard model={mockModel} />);
    expect(screen.getByTestId('metric-accuracy')).toBeInTheDocument();
    expect(screen.getByTestId('metric-generalisability')).toBeInTheDocument();
    expect(screen.getByTestId('metric-security')).toBeInTheDocument();
  });

  test('renders an icon (svg)', () => {
    const { container } = renderWithProviders(<FederatedModelCard model={mockModel} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('renders "Security: N/A" when security is null', () => {
    const modelNoSecurity = { ...mockModel, security: null };
    renderWithProviders(<FederatedModelCard model={modelNoSecurity} />);
    expect(screen.getByText(/Security: N\/A/)).toBeInTheDocument();
  });
});
