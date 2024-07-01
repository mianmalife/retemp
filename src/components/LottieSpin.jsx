import { useRef, useEffect } from "react"
import loadData from './loading'

export default function LottieSpin() {
  const lottieRef = useRef()
  const animateRef = useRef()
  useEffect(() => {
    // eslint-disable-next-line no-undef
    animateRef.current = bodymovin.loadAnimation({
      container: lottieRef.current,
      animationData: loadData,
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