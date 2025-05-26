'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  Alert,
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  // 1) detect demo mode from your env flag
  const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  // 2) grab the demo creds (or default to empty string)
  const demoUsername = demoMode ? (process.env.NEXT_PUBLIC_DEMO_USERNAME ?? '') : '';
  const demoPassword = demoMode ? (process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? '') : '';

  // 3) initialize your inputs with them if demoMode
  const [username, setUsername] = useState<string>(demoUsername);
  const [password, setPassword] = useState<string>(demoPassword);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(username, password);
      router.push('/');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Paper withBorder shadow="md" radius="md" p="xl" maw={400} w="100%">
        <Stack gap="lg">
          <Title order={2} ta="center">
            Sign in
          </Title>

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" title="Authentication Failed">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label="Username"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                required
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />

              <Button fullWidth type="submit">
                Log in
              </Button>
            </Stack>
          </form>

          <Text size="sm" ta="center" c="dimmed">
            Don’t have an account?{' '}
            <Text component="a" href="/register" variant="link">
              Register here
            </Text>
          </Text>
        </Stack>
      </Paper>
    </Center>
  );
}
