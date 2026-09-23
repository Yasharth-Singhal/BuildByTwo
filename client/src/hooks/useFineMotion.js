import { useEffect, useState } from 'react'

// Start conservatively: touch devices and reduced-motion users never opt into effects.
export default function useFineMotion(minWidth = 0) {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${minWidth}px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)`)
    const update = () => setEnabled(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [minWidth])
  return enabled
}
