import React from 'react'
import PropTypes from 'prop-types'

export default function Reverse ({ disabled, handleClick }) {
  return (
    <div className='reverse'>
      <button
        disabled={disabled}
        onClick={handleClick}>
        Reverse
      </button>
    </div>
  )
}

Reverse.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}
