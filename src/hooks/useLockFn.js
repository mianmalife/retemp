import { useCallback } from "react";
import { useRef } from "react";

export default function useLockFn(fn) {
  const lockRef = useRef(false)
  return useCallback(async (...args) => {
    if (lockRef.current) return
    lockRef.current = true
    try {
      const res = await fn(...args)
      return res
    } catch (error) {
      throw error
    } finally {
      lockRef.current = false
    }
  }, [fn])
}