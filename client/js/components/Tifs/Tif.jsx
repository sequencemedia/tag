import React, { forwardRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  getNaturalX,
  getNaturalY
} from '#client/common'

import Tags from '#client/components/Tags/Tags'

const STYLE = {
  position: 'relative'
}

function TifError () {
  return (
    <div className='tif-error'>
      Error
    </div>
  )
}

const Tif = forwardRef(({
  tif,
  type,
  tags,
  isLoaded,
  hasError,
  handleTifPaint,
  handleTifLoad,
  handleTifError,
  handleTifClick,
  handleTagClick,
  handleChange
}, ref) => {
  const {
    current
  } = ref

  useEffect(() => {
    let resizeObserver

    if (current) {
      resizeObserver = new ResizeObserver(() => {
        handleTifPaint(tif)
      })

      resizeObserver.observe(current)
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [current])

  return (
    <div className='tif' style={STYLE}>
      <img
        src={`/api/${tif}/${type}`}
        onLoad={() => {
          handleTifLoad(tif)
        }}
        onError={() => {
          handleTifError(tif)
        }}
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

          handleTifClick({ tif, x, y })
        }}
        ref={ref}
      />

      {isLoaded && <Tags tags={tags} handleClick={handleTagClick} handleChange={handleChange} imgRef={ref} />}
      {hasError && <TifError />}
    </div>
  )
})

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
