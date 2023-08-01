import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import {
  getNaturalX,
  getNaturalY
} from '#client/common'

import Tags from '#client/components/Tags/Tags'

const STYLE = {
  position: 'relative'
}

const Tif = forwardRef(({ tif, type, tags, handleTifClick, handleTagClick, handleChange }, ref) => (
  <div className='tif' style={STYLE}>
    <img
      src={`/api/${tif}/${type}`}
      onClick={(event) => {
        event.stopPropagation()

        const {
          clientX: X,
          clientY: Y,
          target: img
        } = event

        const {
          scrollingElement
        } = document

        const x = getNaturalX(X, img, scrollingElement)
        const y = getNaturalY(Y, img, scrollingElement)

        handleTifClick({ x, y })
      }}
      ref={ref}
    />

    <Tags tags={tags} handleClick={handleTagClick} handleChange={handleChange} imgRef={ref} />
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
  handleTifClick: PropTypes.func.isRequired,
  handleTagClick: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}
