import axios from 'axios';
import useSWR from 'swr';


const fetcher = async ([url, token]: [string, string]) => {
  const res = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data;
};

export function useModels(token: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  return useSWR(token ? [`${base}/models/`, token] : null, fetcher);
}

export function useModel(token: string, id?: number) {
  // only attempt to fetch once we have both token and id
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  const key = token && id != null ? [`${base}/models/${id}/`, token] : null;

  return useSWR(key, fetcher);
}
