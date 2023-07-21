import { useState, useEffect } from 'react'

export default function useSocket ({
  uri
}) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = io(uri, {
      transports: [
        'websocket'
      ]
    })

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
  }, [uri])

  return {
    isConnected
  }
}
