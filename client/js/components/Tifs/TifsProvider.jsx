import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const TifsContext = createContext({
  isConnected: false,
  tifs: undefined
})

export default function TifsProvider ({ children }) {
  const [isConnected, setIsConnected] = useState(false)
  const [tifs] = useState()

  useEffect(() => {
    const socket = io({
      transports: [
        'websocket'
      ]
    })

    socket
      .on('connect', () => {
        setIsConnected(true)
      })
      .on('insert', (data) => console.log('insert', data))
      .on('update', (data) => console.log('update', data))
      .on('disconnect', () => {
        setIsConnected(false)
      })
    return () => {
      socket
        .off('connect')
        .off('disconnect')
    }
  }, [])

  return (
    <TifsContext.Provider value={{
      isConnected,
      tifs
    }}>
      {children}
    </TifsContext.Provider>
  )
}

TifsProvider.propTypes = {
  children: PropTypes.node
}
