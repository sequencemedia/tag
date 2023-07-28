import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useSocket from '../../hooks/useSocket.mjs'

export const TifsContext = createContext({
  isConnected: false,
  tifs: []
})

export default function TifsProvider ({ children }) {
  const { isConnected, socket } = useSocket()
  const [tifs, setTifs] = useState([])

  useEffect(() => {
    socket
      .on('tifs', (tifs) => {
        setTifs(tifs)
      })
    return () => {
      socket
        .off('tifs')
    }
  })

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
