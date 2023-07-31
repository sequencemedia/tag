import React from 'react'
import PropTypes from 'prop-types'

import {
  getRenderedX,
  getRenderedY
} from '#client/common'

const DEFAULT_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0
}

export default function Tag ({ tag, handleClick, imgRef }) {
  const {
    x,
    y,
    text
  } = tag

  const {
    current: img
  } = imgRef

  const X = getRenderedX(img, x)
  const Y = getRenderedY(img, y)

  return (
    <pre
      className='tag'
      style={{ ...DEFAULT_STYLE, left: X + 'px', top: Y + 'px' }}
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
  handleClick: PropTypes.func.isRequired,
  imgRef: PropTypes.shape({
    current: PropTypes.shape().isRequired
  }).isRequired
}
