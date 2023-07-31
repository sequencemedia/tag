import { useState, useEffect, useMemo } from 'react'

export default function useSocket () {
  const [isConnected, setIsConnected] = useState(false)
  const socket = useMemo(() => (
    io({
      transports: [
        'websocket'
      ]
    })
  ), [])

  useEffect(() => {
    socket
      .on('connect', () => {
        setIsConnected(true)
      })
      .on('disconnect', () => {
        setIsConnected(false)
      })
    return () => {
      socket
        .off('connect')
        .off('disconnect')
    }
  }, [])

  return useMemo(() => {
    return {
      isConnected,
      socket
    }
  }, [isConnected, socket])
}
