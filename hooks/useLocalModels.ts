import useSWR from 'swr';
import { createAuthClient } from '@/hooks/api';

const fetcher = async ([url, token]: [string, string]) => {
  const client = createAuthClient(token);
  const res = await client.get(url);
  return res.data;
};

/**
 * Fetch all LocalModel children for a given federated model.
 */
export function useLocalModels(token: string, modelId?: number) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;

  const key = token && modelId != null ? [`${base}/models/${modelId}/locals/`, token] : null;

  return useSWR(key, fetcher);
}
