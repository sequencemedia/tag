import React, { useContext } from 'react'

import { TifsContext } from './TifsProvider.jsx'

export default function Tifs () {
  const tifs = useContext(TifsContext)

  return (
    tifs
      ? <h1>Has Tifs</h1>
      : <h1>Does not have Tifs</h1>
  )
}
