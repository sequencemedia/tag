import React from 'react'
import PropTypes from 'prop-types'

import TagEditor from './TagEditor.jsx'
import Tag from './Tag.jsx'

export default function Tags ({ tags, handleClick, handleChange, imgRef }) {
  return tags.map((currentTag, index) => {
    const {
      hasEditor = false
    } = currentTag

    return (
      hasEditor !== true
        ? <Tag
            key={index}
            imgRef={imgRef}
            tag={currentTag}
            handleClick={() => {
              handleClick(currentTag)
            }}
          />
        : <TagEditor
            key={index}
            imgRef={imgRef}
            tag={currentTag}
            handleChange={(text) => {
              handleChange(currentTag, text)
            }}
          />
    )
  })
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      text: PropTypes.string
    })
  ),
  handleChange: PropTypes.func.isRequired
}
