import React from 'react'
import PropTypes from 'prop-types'

import Type from './Type.jsx'
import SelectedIndex from './SelectedIndex.jsx'

export default function Controls ({
  type,
  tifs,
  selectedIndex,
  handleTypeChange,
  handleSelectedIndexChange
}) {
  return (
    <div className='controls'>
      <Type
        type={type}
        handleChange={handleTypeChange}
      />









      <SelectedIndex
        tifs={tifs}
        selectedIndex={selectedIndex}
        handleChange={handleSelectedIndexChange}
      />
    </div>
  )
}

Controls.propTypes = {
  type: PropTypes.string.isRequired,
  tifs: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleSelectedIndexChange: PropTypes.func.isRequired
}
