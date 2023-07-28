import { useState, useEffect, useCallback } from 'react'
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

  return {
    isConnected,
    tags,
    setTags: useCallback((tags) => {
      if (id) socket.emit('tags', { id, tags })
    }, [id])
  }
}
