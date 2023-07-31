import { useState, useEffect, useMemo } from 'react'
import useSocket from './useSocket.mjs'

export default function useTags (tif) {
  const { isConnected, socket } = useSocket()
  const [tags, setTags] = useState([])

  useEffect(() => {
    if (isConnected) {
      socket
        .on('tags', (tags) => {
          setTags(tags)
        })
        .emit('tags', tif)
    }

    return () => {
      socket
        .off('tags')
    }
  }, [isConnected, tif])

  return useMemo(() => {
    return {
      isConnected,
      tags,
      setTags
    }
  }, [tif, isConnected, tags])
}
