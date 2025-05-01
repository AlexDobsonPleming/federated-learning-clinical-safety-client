import useSWR from 'swr'
import axios from 'axios'

const fetcher = async ([url, token]: [string, string]) => {
  const res = await axios.get(url, {
    headers: { Authorization: `Token ${token}` },
  })
  return res.data
}

export function useModels(token: string) {
  return useSWR(
      token ? ['http://127.0.0.1:8000/api/models/', token] : null,
      fetcher
  )
}

export function useModel(token: string, id?: number) {
  // only attempt to fetch once we have both token and id
  const key = token && id != null
      ? [`http://127.0.0.1:8000/api/models/${id}/`, token]
      : null

  return useSWR(key, fetcher)
}