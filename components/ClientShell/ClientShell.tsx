'use client';

import React from 'react';
import { IconBrain, IconChevronDown } from '@tabler/icons-react';
import {
  AppShell,
  Avatar,
  Container,
  Group,
  Menu,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();              // clears token in state & localStorage
    router.push('/login'); // or wherever your login page lives
  };

  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Container
          size="xl"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Group gap="sm">
            <ThemeIcon size="lg" radius="md" variant="light">
              <IconBrain size={20} />
            </ThemeIcon>
            <Text size="lg" fw={700}>
              AI.Care-Fed - Clinical Safety Dashboard
            </Text>
          </Group>
          <Menu
            withArrow
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right', duration: 150 }}
          >
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar radius="xl" size={30} />
                  <IconChevronDown size={16} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              {/*<Menu.Item onClick={() => router.push('/profile')}>Profile</Menu.Item>*/}
              {/*<Menu.Item onClick={() => router.push('/settings')}>Settings</Menu.Item>*/}
              {/*<Menu.Divider />*/}
              <Menu.Item color="red" onClick={handleLogout}>
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Container>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
