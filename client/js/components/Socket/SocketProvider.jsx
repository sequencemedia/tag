import React, { createContext } from 'react'
import PropTypes from 'prop-types'

import useSocket from '#client/hooks/useSocket'

export const SocketContext = createContext({
  isConnected: false,
  socket: null
})

export default function SocketProvider ({ children }) {
  const { isConnected, socket } = useSocket()

  return (
    <SocketContext.Provider value={{
      isConnected,
      socket
    }}>
      {children}
    </SocketContext.Provider>
  )
}

SocketProvider.propTypes = {
  children: PropTypes.node
}
