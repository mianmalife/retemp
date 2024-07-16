import { useEffect } from "react";
import useLatest from "./useLatest";

export default function useUnmount(fn) {
  const fnRef = useLatest(fn)
  useEffect(() => () => {
    fnRef.current()
  }, [])
}