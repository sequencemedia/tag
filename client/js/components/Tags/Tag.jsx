import React from 'react'
import PropTypes from 'prop-types'

const DEFAULT_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0,
  fontSize: '16px',
  fontFamily: 'monospace',
  lineHeight: '16px',
  minHeight: '16px',
  minWidth: '250px',
  borderColor: 'white',
  borderRadius: '4px',
  backgroundColor: 'white',
  margin: 0,
  padding: '3px'
}

export default function Tag ({ tag, handleClick }) {
  const {
    x,
    y,
    text
  } = tag

  return (
    <pre
      style={{ ...DEFAULT_STYLE, left: x + 'px', top: y + 'px' }}
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
