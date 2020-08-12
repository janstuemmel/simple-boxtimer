import { useEffect, useRef } from 'react'

export function useInterval(callback, delay) {
  
  const savedCallback = useRef()

  useEffect(() => {
    
    savedCallback.current = callback
  
  }, [callback])

  useEffect(() => {

    function tick() {
      
      savedCallback.current()
    }

    if (delay !== null) {
      
      let id = setInterval(tick, delay)
      
      return () => clearInterval(id)
    }

  }, [delay])
}

export function secondsToMinutes(seconds) {
  return new Date(seconds * 1000).toISOString().substr(14, 5)
}
