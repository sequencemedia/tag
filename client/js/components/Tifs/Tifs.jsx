import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import {
  TifsContext
} from './TifsProvider.jsx'

function Type ({ type, handleChange }) {
  return (
    <div onChange={({ target: { value } }) => handleChange(value)}>
      <input type="radio" name="type" checked={type === 'jpg'} value='jpg' />
      <input type="radio" name="type" checked={type === 'png'} value='png' />
    </div>
  )
}

Type.propTypes = {
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

function Tifs ({ type, tifs }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const total = tifs.length
  const index = Math.min(selectedIndex, total)
  const lastIndex = Math.max(0, total - 1)
  const isFirstSelected = index === 0
  const isLastSelected = index === lastIndex
  const { _id: id } = tifs[index]

  return (
    <div className='tifs'>
      <h2>{index + 1} of {total}</h2>
      <div className='tif-container'>
        <div className='reverse'>
          <button disabled={isFirstSelected} onClick={() => {
            const now = Math.max(0, index - 1)

            if (now !== index) setSelectedIndex(now)
          }}>Reverse</button>
        </div>

        <div className='tif'>
          <img src={`/api/${id}/${type}`} />
        </div>

        <div className='forward'>
          <button disabled={isLastSelected} onClick={() => {
            const now = Math.min(lastIndex, index + 1)

            if (now !== index) setSelectedIndex(now)
          }}>Forward</button>
        </div>
      </div>
    </div>
  )
}

Tifs.propTypes = {
  type: PropTypes.string.isRequired,
  tifs: PropTypes.array.isRequired
}

export default function TifsGroup () {
  const [type, setType] = useState('png')
  const {
    isConnected,
    tifs
  } = useContext(TifsContext)

  if (isConnected) {
    if (tifs.length) {
      return (
        <div className='tifs-group'>
          <Type type={type} handleChange={setType} />
          <Tifs type={type} tifs={tifs} />
        </div>
      )
    }
  }

  return null
}
