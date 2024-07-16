import useMount from "./useMount";
import useUnmount from "./useUnmont";

export default function useEventListener(eventName, handler, options) {
  useMount(() => {
    if (options?.target) {
      if (typeof options.target === 'function') {
        options.target().addEventListener(eventName, handler, options)
      } else {
        options.target.addEventListener(eventName, handler, options)
      }
    } else {
      window.addEventListener(eventName, handler, options)
    }
  })

  useUnmount(() => {
    if (options?.target) {
      if (typeof options.target === 'function') {
        options.target().removeEventListener(eventName, handler, options)
      } else {
        options.target.removeEventListener(eventName, handler, options)
      }
    } else {
      window.removeEventListener(eventName, handler, options)
    }
  })
}