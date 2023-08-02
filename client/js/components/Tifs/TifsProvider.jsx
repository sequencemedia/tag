import React, { createContext, useContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  SocketContext
} from '#client/components/Socket/SocketProvider'

export const TifsContext = createContext({
  isConnected: false,
  tifs: []
})

function handleChangeTifs (state, { tifs }) {
  return tifs
}

function handleChangeTifHasPaint (state, { tif: currentKey }) {
  return (
    state
      .map((tif) => {
        const {
          _id: key
        } = tif

        if (key === currentKey) {
          return { ...tif, hasPaint: true }
        }

        return tif
      }, [])
  )
}

function handleChangeTifIsLoaded (state, { tif: currentKey }) {
  return (
    state
      .map((tif) => {
        const {
          _id: key
        } = tif

        if (key === currentKey) {
          return { ...tif, isLoaded: true }
        }

        return tif
      }, [])
  )
}

function handleChangeTifHasError (state, { tif: currentKey }) {
  return (
    state
      .map((tif) => {
        const {
          _id: key
        } = tif

        if (key === currentKey) {
          return { ...tif, hasError: true }
        }

        return tif
      }, [])
  )
}

function reducer (state, action) {
  const { type } = action

  switch (type) {
    case 'CHANGE_TIFS':
      return handleChangeTifs(state, action)

    case 'CHANGE_TIF_HAS_PAINT':
      return handleChangeTifHasPaint(state, action)

    case 'CHANGE_TIF_IS_LOADED':
      return handleChangeTifIsLoaded(state, action)

    case 'CHANGE_TIF_HAS_ERROR':
      return handleChangeTifHasError(state, action)

    default:
      return state
  }
}

export default function TifsProvider ({ children }) {
  const { isConnected, socket } = useContext(SocketContext)
  const [tifs, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    if (socket) {
      socket
        .on('tifs', (tifs) => {
          dispatch({ type: 'CHANGE_TIFS', tifs })
        })
    }

    return () => {
      if (socket) socket.off('tifs')
    }
  }, [socket])

  return (
    <TifsContext.Provider value={{
      isConnected,
      tifs,
      changeTifHasPaint (tif) {
        dispatch({ type: 'CHANGE_TIF_HAS_PAINT', tif })
      },
      changeTifIsLoaded (tif) {
        dispatch({ type: 'CHANGE_TIF_IS_LOADED', tif })
      },
      changeTifHasError (tif) {
        dispatch({ type: 'CHANGE_TIF_HAS_ERROR', tif })
      }
    }}>
      {children}
    </TifsContext.Provider>
  )
}

TifsProvider.propTypes = {
  children: PropTypes.node
}
