import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import Tags from '#client/components/Tags/Tags'

const STYLE = {
  position: 'relative'
}

const Tif = forwardRef(({ tif, type, tags, handleClick, handleChange }, ref) => (
  <div className='tif' style={STYLE}>
    <img
      src={`/api/${tif}/${type}`}
      onClick={handleClick}
      ref={ref}
    />

    <Tags tags={tags} handleChange={handleChange} imgRef={ref} />
  </div>
))

export default Tif

Tif.displayName = 'Tif'

Tif.propTypes = {
  tif: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string
    })
  ),
  handleClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}
