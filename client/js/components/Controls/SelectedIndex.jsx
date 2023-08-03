import React from 'react'
import PropTypes from 'prop-types'

import {
  getEventTargetValue
} from '#client/common'

export default function SelectedIndex ({ tifs, selectedIndex, handleChange }) {
  let index = 0
  const total = tifs.length
  const options = []
  for (index, total; index < total; index++) {
    options.push(
      <option selected={selectedIndex === index} value={index}>
        {index + 1}
      </option>
    )
  }

  return (
    <div className='selected-index' onChange={(event) => handleChange(Number(getEventTargetValue(event)))}>
      <label>
        <select>
          {options}
        </select>
        &nbsp;
        <span>of {total}</span>
      </label>
    </div>
  )
}

SelectedIndex.propTypes = {
  tifs: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
}
