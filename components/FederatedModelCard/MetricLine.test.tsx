import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MetricLine } from './MetricLine';

describe('MetricLine', () => {
  function renderWithMantine(ui: React.ReactElement) {
    return render(
      <MantineProvider>
        {ui}
      </MantineProvider>
    );
  }

  it('renders the label and formatted percentage', () => {
    renderWithMantine(<MetricLine label="Accuracy" value={0.95} />);
    const el = screen.getByTestId('metric-accuracy');
    expect(el).toHaveTextContent('Accuracy: 95.0%');
  });

  it('works with arbitrary labels', () => {
    renderWithMantine(<MetricLine label="Foo" value={0.1234} />);
    const el = screen.getByTestId('metric-foo');
    expect(el).toHaveTextContent('Foo: 12.3%');
  });
});
