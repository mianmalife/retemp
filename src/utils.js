export function animation(duration, from, to, onProgress) {
  const speed = (to - from) / duration
  let value = from
  const startTime = Date.now()
  const _run = () => {
    const now = Date.now()
    const time = now - startTime
    if (time >= duration) {
      value = to
      onProgress(value)
      return
    }
    let d = time * speed
    value = from + d
    onProgress(value)
    requestAnimationFrame(_run)
  }
  requestAnimationFrame(_run)
}