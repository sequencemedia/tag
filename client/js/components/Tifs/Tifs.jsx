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

export default function Tifs () {
  const [type, setType] = useState('png')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const {
    isConnected,
    tifs
  } = useContext(TifsContext)

  if (isConnected) {
    if (tifs.length) {
      const index = Math.min(selectedIndex, tifs.length)
      const { _id: id } = tifs[index]
      const isFirstSelected = index === 0
      const isLastSelected = index === tifs.length - 1

      return (
        <div>
          <Type type={type} handleChange={setType} />
          <div className='tifs'>
            <h2>{index + 1} of {tifs.length}</h2>
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
                  const now = Math.min(tifs.length - 1, index + 1)

                  if (now !== index) setSelectedIndex(now)
                }}>Forward</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return null
}
