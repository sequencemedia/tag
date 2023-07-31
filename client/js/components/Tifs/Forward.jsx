import React from 'react'
import PropTypes from 'prop-types'

export default function Forward ({ disabled, handleClick }) {
  return (
    <div className='forward'>
      <button
        disabled={disabled}
        onClick={handleClick}>
        Forward
      </button>
    </div>
  )
}

Forward.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}
