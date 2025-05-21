process.env.NEXT_PUBLIC_API_BASE_URL = 'http://test-api';

import React from 'react';
import { useRouter } from 'next/navigation';
import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import useSWR from 'swr';
// Import your hooks & provider *after* mocks
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { useCheckToken } from '@/hooks/useCheckToken';
import { useLocalModels } from '@/hooks/useLocalModels';
import { useModel, useModels } from '@/hooks/useModels';

// Ensure our env var is set
process.env.NEXT_PUBLIC_API_BASE_URL = 'http://test-api';

// Mocks
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('swr');
const mockedSWR = useSWR as jest.Mock;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
const mockedUseRouter = useRouter as jest.Mock;

describe('AuthProvider & useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedAxios.post.mockReset();
  });

  it('reads initial token from localStorage', () => {
    localStorage.setItem('token', 'stored-token');
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    expect(result.current.token).toBe('stored-token');
  });

  it('login() stores token in state and localStorage', async () => {
    mockedAxios.post.mockResolvedValue({ data: { token: 'abc123' } });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(async () => {
      await result.current.login('user', 'pass');
    });

    expect(result.current.token).toBe('abc123');
    expect(localStorage.getItem('token')).toBe('abc123');
  });

  it('logout() clears token from state and localStorage', () => {
    localStorage.setItem('token', 'toBeCleared');
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.token).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});

describe('useCheckToken', () => {
  it('redirects to /login when no token', () => {
    const replaceMock = jest.fn();
    mockedUseRouter.mockReturnValue({ replace: replaceMock });

    localStorage.removeItem('token');
    renderHook(() => useCheckToken(), { wrapper: AuthProvider });
    expect(replaceMock).toHaveBeenCalledWith('/login');
  });

  it('does not redirect when token exists', () => {
    const replaceMock = jest.fn();
    mockedUseRouter.mockReturnValue({ replace: replaceMock });

    localStorage.setItem('token', 'valid-token');
    renderHook(() => useCheckToken(), { wrapper: AuthProvider });
    expect(replaceMock).not.toHaveBeenCalled();
  });
});

describe('SWR hooks', () => {
  beforeEach(() => {
    mockedSWR.mockReset();
  });

  it('useModels calls useSWR with [base/models/, token]', () => {
    useModels('tok');
    expect(mockedSWR).toHaveBeenCalledWith(
      ['http://test-api/models/', 'tok'],
      expect.any(Function)
    );
  });

  it('useModel returns null key when id missing', () => {
    useModel('tok');
    expect(mockedSWR).toHaveBeenCalledWith(null, expect.any(Function));
  });

  it('useModel with id calls useSWR correctly', () => {
    useModel('tok', 42);
    expect(mockedSWR).toHaveBeenCalledWith(
      ['http://test-api/models/42/', 'tok'],
      expect.any(Function)
    );
  });

  it('useLocalModels returns null key without modelId', () => {
    useLocalModels('tok');
    expect(mockedSWR).toHaveBeenCalledWith(null, expect.any(Function));
  });

  it('useLocalModels with modelId calls useSWR correctly', () => {
    useLocalModels('tok', 7);
    expect(mockedSWR).toHaveBeenCalledWith(
      ['http://test-api/models/7/locals/', 'tok'],
      expect.any(Function)
    );
  });
});
