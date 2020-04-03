import { useRef, useEffect } from 'react'

export function usePrevious(data) {
  const prevData = useRef()

  useEffect(() => {
    prevData.current = data
  })

  return prevData.current
}
