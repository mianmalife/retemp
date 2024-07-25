import { useMemo } from "react";
import useLatest from "./useLatest";
import { throttle } from "lodash-es";
import useUnmount from "./useUnmont";

export default function useThrottleFn(fn, options) {
  const wait = options?.wait ?? 1000
  const fnRef = useLatest(fn)
  const throttled = useMemo(() => throttle((...args) => fnRef.current(...args), wait, options), [])
  useUnmount(() => {
    throttled.cancel()
  })
  return {
    run: throttled,
    flush: throttled.flush,
    cancel: throttled.cancel,
  }
}