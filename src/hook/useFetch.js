import { useEffect, useState } from "react";

export default function useFetch(url, options) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  options = options || {}
  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      if (url) {
        try {
          setLoading(true)
          const response = await fetch(url, {...options, signal: controller.signal})
          if (response.ok) {
            const resp = await response.json()
            setData(resp)
          } else {
            setError(response)
          }
        } catch (error) {
          console.warn(error)
          if (error !== 'cancle ask') {
            setError(error)
          }
        } finally {
          setLoading(false)
        }
      }
    }
    fetchData()
    return () => {
      controller.abort('cancle ask')
    }
  }, [url])
  return {
    loading,
    data,
    error
  }
}