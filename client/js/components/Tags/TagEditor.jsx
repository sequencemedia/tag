import React from 'react'
import PropTypes from 'prop-types'

import useTag from '#client/hooks/useTag'

import {
  getEventTargetValue,
  getRenderedX,
  getRenderedY
} from '#client/common'

const DEFAULT_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0
}

export default function TagEditor ({ tag, handleChange, imgRef }) {
  const {
    x,
    y,
    text,
    setText
  } = useTag(tag)

  const {
    current: img
  } = imgRef

  const X = getRenderedX(img, x)
  const Y = getRenderedY(img, y)

  return (
    <textarea
      className='tag-editor'
      style={{ ...DEFAULT_STYLE, left: X + 'px', top: Y + 'px' }}
      onClick={(event) => { event.stopPropagation() }}
      onChange={(event) => {
        const text = getEventTargetValue(event)

        setText(text)

        handleChange(text) // getEventTargetValue(event))
      }}
      value={text ?? ''}
      data-gramm="false"
    />
  )
}

TagEditor.propTypes = {
  tag: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired,
  imgRef: PropTypes.shape({
    current: PropTypes.shape().isRequired
  }).isRequired
}
