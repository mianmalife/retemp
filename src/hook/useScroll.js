import { useState, useEffect } from 'react'
import { throttle } from 'lodash-es'

export default function useScroll() {
  const [scrollTop, setScrollTop] = useState(0)
 
  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollTop(document.documentElement.scrollTop)
    }, 300)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return scrollTop
}