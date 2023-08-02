import React, { useState, useMemo, useContext, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import useTags from '#client/hooks/useTags'

import {
  getEventTargetValue
} from '#client/common'

import {
  TifsContext
} from './TifsProvider.jsx'

import Connecting from './Connecting.jsx'

import Reverse from './Reverse.jsx'
import Tif from './Tif.jsx'
import Forward from './Forward.jsx'

function Type ({ type, handleChange }) {
  return (
    <div className='type' onChange={(event) => handleChange(getEventTargetValue(event))}>
      <label>
        <input type="radio" name="type" checked={type === 'jpg'} value='jpg' />
        <span>JPG</span>
      </label>

      <label>
        <input type="radio" name="type" checked={type === 'png'} value='png' />
        <span>PNG</span>
      </label>
    </div>
  )
}

Type.propTypes = {
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

function Tifs ({ type, tifs, changeTifHasPaint, changeTifIsLoaded, changeTifHasError }) {
  const ref = useRef()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const total = tifs.length
  const index = Math.min(selectedIndex, total)
  const lastIndex = Math.max(0, total - 1)
  const isFirstSelected = index === 0
  const isLastSelected = index === lastIndex
  const { _id: tif } = tifs[index]

  const {
    tags,
    hideEditTag,
    createTag,
    changeTagText,
    showEditTag
  } = useTags(tif)

  const isLoaded = useMemo(() => tifs.some(({ _id: key, isLoaded = false }) => key === tif && isLoaded), [tifs, tif])
  const hasError = useMemo(() => tifs.some(({ _id: key, hasError = false }) => key === tif && hasError), [tifs, tif])

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

      hideEditTag()
    }}>
      <h2>{index + 1} of {total}</h2>
      <div className='tif-container'>
        <Reverse
          disabled={isFirstSelected}
          handleClick={handleReverseClick}
        />

        <Tif
          tif={tif}
          isLoaded={isLoaded}
          hasError={hasError}
          type={type}
          tags={tags}
          handleTifPaint={(tif) => {
            changeTifHasPaint(tif)
          }}
          handleTifLoad={(tif) => {
            changeTifIsLoaded(tif)
          }}
          handleTifError={(tif) => {
            changeTifHasError(tif)
          }}
          handleTifClick={({ tif, x, y }) => {
            createTag(tif, x, y)
          }}
          handleChange={(currentTag, text) => {
            changeTagText(currentTag, text)
          }}
          handleTagClick={(currentTag) => {
            showEditTag(currentTag)
          }}
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
  tifs: PropTypes.array.isRequired,
  changeTifHasPaint: PropTypes.func.isRequired,
  changeTifIsLoaded: PropTypes.func.isRequired,
  changeTifHasError: PropTypes.func.isRequired
}

export default function TifsGroup () {
  const [type, setType] = useState('png')
  const {
    isConnected,
    tifs,
    changeTifHasPaint,
    changeTifIsLoaded,
    changeTifHasError
  } = useContext(TifsContext)

  if (isConnected) {
    if (tifs.length) {
      return (
        <div className='tifs-group'>
          <Type type={type} handleChange={setType} />

          <Tifs
            type={type}
            tifs={tifs}
            changeTifHasPaint={changeTifHasPaint}
            changeTifIsLoaded={changeTifIsLoaded}
            changeTifHasError={changeTifHasError}
          />
        </div>
      )
    }
  }

  return (
    <Connecting />
  )
}
