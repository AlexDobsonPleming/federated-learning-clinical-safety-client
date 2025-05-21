import axios from 'axios';
import useSWR from 'swr';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = async ([url, token]: [string, string]) => {
  const res = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data;
};

export function useModels(token: string) {
  return useSWR(token ? [`${API_BASE}/models/`, token] : null, fetcher);
}

export function useModel(token: string, id?: number) {
  // only attempt to fetch once we have both token and id
  const key = token && id != null ? [`${API_BASE}/models/${id}/`, token] : null;

  return useSWR(key, fetcher);
}
