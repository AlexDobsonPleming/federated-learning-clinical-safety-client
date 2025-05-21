import useSWR from 'swr';
import axios from 'axios';

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
  const key =
    token && modelId != null
      ? [`http://127.0.0.1:8000/api/models/${modelId}/locals/`, token]
      : null;

  return useSWR(key, fetcher);
}
