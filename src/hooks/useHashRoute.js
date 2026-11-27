import { useEffect, useState } from 'react'

// The part of the address after "#", e.g. "#/projects/indicub".
// Hash addresses work on GitHub Pages without any server setup.
export default function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return hash
}

// Where the homepage was scrolled to when a project was opened,
// so the browser's back button can return to the same spot.
export const scrollMemory = { y: 0 }
