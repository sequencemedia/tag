import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import useTags from '../../hooks/useTags.mjs'

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

const DEFAULT_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0,
  fontSize: '16px',
  fontFamily: 'monospace',
  lineHeight: '16px',
  minHeight: '48px',
  minWidth: '250px',
  borderColor: 'white',
  borderRadius: '4px',
  backgroundColor: 'white'
}

function getEventTargetValue ({ target: { value = '' } }) {
  return value
}

function TagEditor ({ tag, handleChange }) {
  const {
    x,
    y,
    text
  } = tag

  return (
    <textarea
      style={{ ...DEFAULT_STYLE, left: x + 'px', top: y + 'px' }}
      onClick={(event) => { event.stopPropagation() }}
      onChange={(event) => {
        event.stopPropagation()

        handleChange(getEventTargetValue(event))
      }}
      value={text ?? ''}
    />
  )
}

TagEditor.propTypes = {
  tag: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired
}

function Tag ({ tag, handleClick }) {
  const {
    x,
    y,
    text
  } = tag

  return (
    <pre
      style={{ ...DEFAULT_STYLE, left: x + 'px', top: y + 'px', minHeight: '16px', margin: 0, padding: '3px 3px' }}
      onClick={(event) => {
        event.stopPropagation()

        handleClick()
      }}>
      {text}
    </pre>
  )
}

Tag.propTypes = {
  tag: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string
  }),
  handleClick: PropTypes.func.isRequired
}

function hideTag (tag) {
  tag.edit = false
  return tag
}

function getShowTagFor (currentTag) {
  return function showTag (tag) {
    tag.edit = tag === currentTag
    return tag
  }
}

function hasText ({ text }) {
  return !!text
}

function Tifs ({ type, tifs }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const total = tifs.length
  const index = Math.min(selectedIndex, total)
  const lastIndex = Math.max(0, total - 1)
  const isFirstSelected = index === 0
  const isLastSelected = index === lastIndex
  const { _id: id } = tifs[index]

  const { tags, setTags } = useTags(id)

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
          <div className='reverse'>
            <button
              disabled={isFirstSelected}
              onClick={() => {
                const now = Math.max(0, index - 1)

                if (now !== index) setSelectedIndex(now)
              }}>
              Reverse
            </button>
          </div>

          <div className='tif' style={{ position: 'relative' }}>
            <img
              src={`/api/${id}/${type}`}
              onClick={(event) => {
                event.stopPropagation()

                const {
                  clientX,
                  clientY,
                  target: {
                    parentElement: {
                      offsetLeft,
                      offsetTop
                    },
                    naturalWidth,
                    naturalHeight,
                    width,
                    height
                  }
                } = event

                const w = naturalWidth / width
                const h = naturalHeight / height
                const x = Math.round((clientX - offsetLeft) * w)
                const y = Math.round((clientY - offsetTop) * h)

                const now = (
                  tags
                    .map(hideTag)
                    .filter(hasText)
                    .concat({ x, y, tid: id, edit: true })
                )

                setTags(now)
              }}
            />
            {tags.map((currentTag) => {
              const {
                edit
              } = currentTag

              function handleClick () {
                const now = (
                  tags
                    .map(hideTag)
                    .filter((tag) => tag !== currentTag)
                    .concat(currentTag)
                    .filter(hasText)
                )

                currentTag.edit = true

                setTags(now)
              }

              function handleChange (text) {
                currentTag.text = text

                const now = (
                  tags
                    .map(getShowTagFor(currentTag))
                    .filter((tag) => tag !== currentTag)
                    .concat(currentTag)
                    .filter(hasText)
                )

                setTags(now)
              }

              return (
                edit
                  ? <TagEditor tag={currentTag} handleChange={handleChange} />
                  : <Tag tag={currentTag} handleClick={handleClick} />
              )
            })}
          </div>

          <div className='forward'>
            <button
              disabled={isLastSelected}
              onClick={() => {
                const now = Math.min(lastIndex, index + 1)

                if (now !== index) setSelectedIndex(now)
              }}>
              Forward
            </button>
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
