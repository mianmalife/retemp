import { useRef, useEffect } from "react"

export default function LottieSpin({ path }) {
  const lottieRef = useRef()
  const animateRef = useRef()
  useEffect(() => {
    animateRef.current = bodymovin.loadAnimation({
      container: lottieRef.current,
      path,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    })
    return () => {
      animateRef.current.destroy()
    }
  }, [])
  return <div ref={lottieRef} className="w-[120px] h-[120px]"></div>
}