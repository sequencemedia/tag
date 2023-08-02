import { useContext, useEffect } from 'react'
import {
  SocketContext
} from '#client/components/Socket/SocketProvider'

export default function useTag (tag) {
  const { isConnected, socket } = useContext(SocketContext)

  useEffect(() => {
    if (isConnected) {
      socket
        .emit('tag', tag)
    }
  }, [isConnected, socket, tag])

  return tag
}
