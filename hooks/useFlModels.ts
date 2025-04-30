import useSWR from 'swr'
import axios from 'axios'

export function useModels(token: string) {
  const fetcher = async ([url, token]: [string, string]) => {
    const res = await axios.get(url, {
      headers: { Authorization: `Token ${token}` }
    })
    return res.data
  }

  return useSWR(
    token ? ['http://127.0.0.1:8000/api/models/', token] : null,
    fetcher
  )
}