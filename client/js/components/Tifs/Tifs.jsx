import React, { useState, useContext, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  nanoid
} from 'nanoid'

import {
  getNaturalX,
  getNaturalY,
  hideTag,
  hasText
} from '#client/common'

import useTags from '#client/hooks/useTags'

import {
  TifsContext
} from './TifsProvider.jsx'

import Reverse from './Reverse.jsx'
import Tif from './Tif.jsx'
import Forward from './Forward.jsx'

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
  const ref = useRef()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const total = tifs.length
  const index = Math.min(selectedIndex, total)
  const lastIndex = Math.max(0, total - 1)
  const isFirstSelected = index === 0
  const isLastSelected = index === lastIndex
  const { _id: tif } = tifs[index]

  const { tags, setTags } = useTags(tif)

  const handleReverseClick = useCallback(() => {
    const now = Math.max(0, index - 1)

    if (now !== index) setSelectedIndex(now)
  }, [index, setSelectedIndex])

  const handleForwardClick = useCallback(() => {
    const now = Math.min(lastIndex, index + 1)

    if (now !== index) setSelectedIndex(now)
  }, [index, lastIndex, setSelectedIndex])

  return (
      <div className='tifs' onClick={(event) => {
        event.stopPropagation()

        const now = (
          tags
            .map(hideTag)
            .filter(hasText)
        )

        setTags(now)
      }}>
        <h2>{index + 1} of {total}</h2>
        <div className='tif-container'>
          <Reverse
            disabled={isFirstSelected}
            handleClick={handleReverseClick}
          />

          <Tif
            tif={tif}
            type={type}
            tags={tags}
            handleClick={(event) => {
              event.stopPropagation()

              const key = nanoid()

              const {
                clientX: x,
                clientY: y,
                target: img
              } = event

              const {
                scrollingElement
              } = document

              const X = getNaturalX(x, img, scrollingElement)
              const Y = getNaturalY(y, img, scrollingElement)

              const now = (
                tags
                  .map(hideTag)
                  .filter(hasText)
                  .concat({ key, tif, x: X, y: Y, edit: true })
              )

              setTags(now)
            }}
            handleChange={setTags}
            ref={ref}
          />

          <Forward
            disabled={isLastSelected}
            handleClick={handleForwardClick}
          />
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
