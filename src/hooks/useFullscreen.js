import { useState } from "react"
import useEventListener from "./useEventListener"

export default function useFullscreen(target, options = {}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)
  function fullError(e) {
    console.warn('full screen error', e)
    setIsEnabled(false)
  }
  useEventListener('fullscreenerror', fullError)
  const enterFullscreen = async () => {
    if (!isFullscreen) {
      const ele = target()
      await ele.requestFullscreen(options)
      setIsFullscreen(true)
      options?.onEnter?.()
    }
  }
  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      options?.onExit?.()
      setIsFullscreen(false)
    }
  }
  const toggleFullscreen = async () => {
    const ele = target()
    if (isFullscreen) {
      await document.exitFullscreen()
      options?.onExit?.()
      setIsFullscreen(false)
    } else {
      await ele.requestFullscreen(options)
      setIsFullscreen(true)
      options?.onEnter?.()
    }
  }
  return [
    isFullscreen,
    {
      enterFullscreen,
      exitFullscreen,
      toggleFullscreen,
      isEnabled
    }
  ]
}