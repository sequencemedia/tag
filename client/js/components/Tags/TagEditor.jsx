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
    x: X,
    y: Y,
    text,
    setText
  } = useTag(tag)

  const {
    current: img
  } = imgRef

  const x = getRenderedX(img, X)
  const y = getRenderedY(img, Y)

  return (
    <textarea
      className='tag-editor'
      style={{ ...DEFAULT_STYLE, left: x + 'px', top: y + 'px' }}
      onClick={(event) => {
        event.stopPropagation()
      }}
      onChange={(event) => {
        const text = getEventTargetValue(event)

        setText(text)

        handleChange(text)
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
