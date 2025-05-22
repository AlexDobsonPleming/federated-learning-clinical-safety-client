// lib/api.ts
import axios, { AxiosHeaders, AxiosInstance } from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const SKIP_NGROK = process.env.NEXT_PUBLIC_SKIP_NGROK === 'true';

export function createBaseClient(): AxiosInstance {
  // Try to create a fresh instance; if mocked create() returns undefined, fall back to default axios
  const created = axios.create({ baseURL: API_BASE }) as AxiosInstance | undefined;
  const client = created ?? axios;

  if (SKIP_NGROK && client.interceptors?.request?.use) {
    client.interceptors.request.use((config) => {
      // Ensure we wrap existing headers in AxiosHeaders
      const headers = new AxiosHeaders(config.headers);
      headers.set('ngrok-skip-browser-warning', '69420');
      config.headers = headers;
      return config;
    });
  }

  return client;
}

export function createAuthClient(token: string): AxiosInstance {
  const client = createBaseClient();

  if (client.interceptors?.request?.use) {
    client.interceptors.request.use((config) => {
      const headers = new AxiosHeaders(config.headers);
      headers.set('Authorization', `Token ${token}`);
      config.headers = headers;
      return config;
    });
  }

  return client;
}
