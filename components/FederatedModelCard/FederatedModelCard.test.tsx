// components/FederatedModelCard/FederatedModelCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { FederatedModel } from './FederatedModel';
import { FederatedModelCard } from './FederatedModelCard';

const mockModel: FederatedModel = {
  id: 1,
  name: 'Test Model',
  accuracy: 0.95,
  generalisability: 0.9,
  privacy: 0.85,
};

function renderWithProviders(ui: React.ReactElement) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe('FederatedModelCard component', () => {
  test('renders model name', () => {
    renderWithProviders(<FederatedModelCard model={mockModel} />);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Test Model');
  });

  test('renders the three metric lines', () => {
    renderWithProviders(<FederatedModelCard model={mockModel} />);
    expect(screen.getByTestId('metric-accuracy')).toBeInTheDocument();
    expect(screen.getByTestId('metric-generalisability')).toBeInTheDocument();
    expect(screen.getByTestId('metric-privacy')).toBeInTheDocument();
  });

  test('renders an icon (svg)', () => {
    const { container } = renderWithProviders(<FederatedModelCard model={mockModel} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('renders "Privacy: N/A" when privacy is null', () => {
    const modelNoPrivacyy = { ...mockModel, privacy: null };
    renderWithProviders(<FederatedModelCard model={modelNoPrivacyy} />);
    expect(screen.getByText(/Privacy: N\/A/)).toBeInTheDocument();
  });
});
