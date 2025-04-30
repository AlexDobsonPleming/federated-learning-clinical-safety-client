'use client';

import React from 'react';
import {
  AppShell,
  Container,
  Group,
  ThemeIcon,
  Text,
  Menu,
  UnstyledButton,
  Avatar,
} from '@mantine/core';
import { IconBrain, IconChevronDown } from '@tabler/icons-react';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <Container size="xl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Group gap="sm">
            <ThemeIcon size="lg" radius="md" variant="light">
              <IconBrain size={20} />
            </ThemeIcon>
            <Text size="lg" fw={700}>
              AI.Care-Fed - Clinical Safety Dashboard
            </Text>
          </Group>
          <Menu withArrow position="bottom-end" transitionProps={{ transition: 'pop-top-right', duration: 150 }}>
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar radius="xl" size={30} />
                  <IconChevronDown size={16} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Profile</Menu.Item>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red">Log out</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
