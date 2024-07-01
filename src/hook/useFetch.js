import { useEffect, useState, useRef } from "react";

export default function useFetch(url) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useRef({})
  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url, {...params.current, signal: controller.signal})
        if (response.ok) {
          const resp = await response.json()
          setData(resp)
          setError(null)
        } else {
          setError(response)
        }
      } catch (error) {
        console.warn(error)
        if (error.name !== 'AbortError') {
          setError(error)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      !loading && controller.abort()
    }
  }, [url])
  return {
    loading,
    setParams: p => params.current = p,
    data,
    error
  }
}