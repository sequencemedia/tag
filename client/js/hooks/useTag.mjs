import { useEffect } from 'react'
import useSocket from './useSocket.mjs'

export default function useTag (tag) {
  console.log('useTag')

  const { isConnected, socket } = useSocket()

  useEffect(() => {
    if (isConnected) {
      socket
        .emit('tag', tag)
    }
  })

  return tag
}
