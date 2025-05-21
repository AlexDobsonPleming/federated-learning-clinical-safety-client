import axios from 'axios';
import useSWR from 'swr';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = async ([url, token]: [string, string]) => {
  const res = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data;
};

/**
 * Fetch all LocalModel children for a given federated model.
 */
export function useLocalModels(token: string, modelId?: number) {
  const key = token && modelId != null ? [`${API_BASE}/models/${modelId}/locals/`, token] : null;

  return useSWR(key, fetcher);
}
