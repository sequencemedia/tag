import React from 'react'
import PropTypes from 'prop-types'

import {
  getEventTargetValue
} from '#client/common'

export default function Type ({ type, handleChange }) {
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
