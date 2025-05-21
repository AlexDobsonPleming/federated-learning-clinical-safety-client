import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { AuthProvider } from '@/hooks/useAuth';
import { theme } from '@/theme';
import ClientShell from '../components/ClientShell/ClientShell';

export const metadata = {
  title: 'Federated Learning Clinical Safety',
  description: 'Dashboard for clinical-safety model metrics',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <ClientShell>{children}</ClientShell>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
