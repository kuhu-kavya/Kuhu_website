import { useEffect, useState } from 'react'

const QUERY = '(max-width: 767px)'

// true when the screen is phone-sized (narrower than 768px)
export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
