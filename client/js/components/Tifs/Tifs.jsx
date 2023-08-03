import React, { useState, useMemo, useContext, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import useTags from '#client/hooks/useTags'

import Type from '#client/components/Controls/Type'
import SelectedIndex from '#client/components/Controls/SelectedIndex'
import Reverse from '#client/components/Controls/Reverse'
import Forward from '#client/components/Controls/Forward'

import {
  TifsContext
} from './TifsProvider.jsx'

import Connecting from './Connecting.jsx'
import Tif from './Tif.jsx'

function Tifs ({ type, tifs, selectedIndex, handleChange }) {
  const ref = useRef()

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

    if (now !== index) handleChange(now)
  }, [index, handleChange])

  const handleForwardClick = useCallback(() => {
    const now = Math.min(lastIndex, index + 1)

    if (now !== index) handleChange(now)
  }, [index, lastIndex, handleChange])

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
          handleTifClick={createTag}
          handleChange={changeTagText}
          handleTagClick={showEditTag}
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
  selectedIndex: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default function TifsGroup () {
  const [type, setType] = useState('png')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const {
    isConnected,
    tifs
  } = useContext(TifsContext)

  if (isConnected) {
    if (tifs.length) {
      return (
        <div className='tifs-group'>
          <div className='controls'>
            <Type
              type={type}
              handleChange={setType}
            />

            <SelectedIndex
              tifs={tifs}
              selectedIndex={selectedIndex}
              handleChange={setSelectedIndex}
            />
          </div>

          <Tifs
            type={type}
            tifs={tifs}
            selectedIndex={selectedIndex}
            handleChange={setSelectedIndex}
          />
        </div>
      )
    }
  }

  return (
    <Connecting />
  )
}
