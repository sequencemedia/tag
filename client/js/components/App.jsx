import React from 'react'

import SocketProvider from './Socket/SocketProvider.jsx'
import TifsProvider from './Tifs/TifsProvider.jsx'
import Tifs from './Tifs/Tifs.jsx'

export default function App () {
  return (
    <SocketProvider>
      <TifsProvider>
        <Tifs />
      </TifsProvider>
    </SocketProvider>
  )
}
