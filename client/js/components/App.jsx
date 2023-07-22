import React from 'react'

import TifsProvider from './Tifs/TifsProvider.jsx'
import Tifs from './Tifs/Tifs.jsx'

export default function App () {
  return (
    <TifsProvider>
      <Tifs />
    </TifsProvider>
  )
}
