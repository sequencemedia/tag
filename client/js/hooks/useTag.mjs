import { useEffect } from 'react'
import useSocket from './useSocket.mjs'

export default function useTag (tag) {
  const { isConnected, socket } = useSocket()

  useEffect(() => {
    if (isConnected) {
      socket
        .emit('tag', tag)
    }
  }, [isConnected, tag])

  return tag
}
