import { useState, useEffect } from "react";

export default function useRequest(asynFn, option={}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState()
  const _run = (params) => {
    setLoading(true)
    asynFn(params).then(res => {
      setLoading(false)
      if (res.json) {
        res.json().then(json => {
          setData(json)
          option?.onSuccess(json)
        })
      } else {
        setData(res)
      }
    }).catch(err => {
      setError(err)
      setLoading(false)
      option?.onError(err)
    })
  }
  const _runAsync = (params) => {
    return new Promise((resolve, reject) => {
      setLoading(true)
      asynFn(params).then(res => {
        resolve(res)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        reject(err)
      })
    })
  }
  useEffect(() => {
    if (!option.manual) {
      _run(option.defaultParams)
    }
  }, [])
  return {
    loading,
    error,
    data,
    run: _run,
    runAsync: _runAsync
  }
}