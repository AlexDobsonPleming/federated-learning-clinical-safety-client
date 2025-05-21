'use client';

import { IconBrain, IconChevronDown } from '@tabler/icons-react';
import {
  Avatar,
  Box,
  Container,
  Group,
  Menu,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';

export default function AppHeader() {
  return (
    <Box component="header" style={() => ({ height: 60, borderBottom: '1px solid #eaeaea' })}>
      <Container
        size="xl"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Group gap="sm">
          <ThemeIcon size="lg" radius="md" variant="light">
            <IconBrain size={20} />
          </ThemeIcon>
          <Text size="lg" fw={700}>
            Clinical Safety
          </Text>
        </Group>

        <Menu
          withArrow
          position="bottom-end"
          transitionProps={{ transition: 'pop-top-right', duration: 200 }}
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
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red">Log out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Container>
    </Box>
  );
}
