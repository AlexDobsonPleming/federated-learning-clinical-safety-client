import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { theme } from '@/theme';
import ClientShell from '../components/ClientShell/ClientShell';
import { AuthProvider } from '@/hooks/useAuth';

export const metadata = {
  title: 'Federated Learning Clinical Safety',
  description: 'Dashboard for clinical-safety model metrics',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </head>
    <body>
      <MantineProvider theme={theme} >
        <AuthProvider>
          <ClientShell>
            {children}
          </ClientShell>
        </AuthProvider>
      </MantineProvider>
    </body>
    </html>
  );
}
