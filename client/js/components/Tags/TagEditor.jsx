import React from 'react'
import PropTypes from 'prop-types'

import useTag from '#client/hooks/useTag'

import {
  getEventTargetValue
} from '#client/common'

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

export default function TagEditor ({ tag, handleChange }) {
  const {
    x,
    y,
    text
  } = useTag(tag)

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
