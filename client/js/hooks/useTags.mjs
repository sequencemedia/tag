import { useState, useEffect, useMemo } from 'react'
import useSocket from './useSocket.mjs'

export default function useTags (id) {
  const { isConnected, socket } = useSocket()
  const [tags, setTags] = useState([])

  useEffect(() => {
    socket
      .on('tags', (tags) => {
        setTags(tags)
      })
    return () => {
      socket
        .off('tags')
    }
  }, [])

  return useMemo(() => {
    return {
      isConnected,
      tags,
      setTags (tags) {
        if (id) socket.emit('tags', { id, tags })
      }
    }
  }, [id, isConnected, tags])
}
