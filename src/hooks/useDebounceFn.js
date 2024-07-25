import { debounce } from "lodash-es"
import useLatest from "./useLatest"
import useUnmount from "./useUnmont"
import { useMemo } from "react"

export default function useDebounceFn(fn, options) {
  const wait = options?.wait ?? 1000
  const fnRef = useLatest(fn)
  const debounced = useMemo(() => debounce((...args) => fnRef.current(...args), wait, options), [])
  useUnmount(() => {
    debounced.cancel()
  })
  return {
    run: debounced,
    flush: debounced.flush,
    cancel: debounced.cancel
  }
}