import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ModelCard } from './ModelCard';

type Model = {
  id: number;
  name: string;
  accuracy: number;
  precision: number;
  crossValidation: number;
  security: number;
};

const mockModel: Model = {
  id: 1,
  name: 'Test Model',
  accuracy: 0.95,
  precision: 0.9,
  crossValidation: 0.92,
  security: 0.85,
};

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MantineProvider>
      {ui}
    </MantineProvider>
  );
}

describe('ModelCard component', () => {
  test('renders model name', () => {
    renderWithProviders(<ModelCard model={mockModel} />);
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Test Model');
  });

  test('renders metric lines', () => {
    renderWithProviders(<ModelCard model={mockModel} />);
    expect(screen.getByTestId('metric-accuracy')).toBeInTheDocument();
    expect(screen.getByTestId('metric-precision')).toBeInTheDocument();
    expect(
      screen.getByTestId('metric-cross-validation')
    ).toBeInTheDocument();
    expect(screen.getByTestId('metric-security')).toBeInTheDocument();
  });


  test('renders an icon (svg)', () => {
    const { container } = renderWithProviders(<ModelCard model={mockModel} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
