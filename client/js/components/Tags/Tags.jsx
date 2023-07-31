import React from 'react'
import PropTypes from 'prop-types'

import {
  getShowTagFor,
  hasText
} from '#client/common'

import TagEditor from './TagEditor.jsx'
import Tag from './Tag.jsx'

export default function Tags ({ tags, handleChange, imgRef }) {
  return tags.map((currentTag, index) => {
    const {
      edit
    } = currentTag

    return (
      edit
        ? <TagEditor
            key={index}
            imgRef={imgRef}
            tag={currentTag}
            handleChange={(text) => {
              currentTag.text = text

              const now = (
                tags
                  .map(getShowTagFor(currentTag))
                  .filter((tag) => tag !== currentTag)
                  .concat(currentTag)
                  .filter(hasText)
              )

              handleChange(now)
            }}
        />
        : <Tag
            key={index}
            imgRef={imgRef}
            tag={currentTag}
            handleClick={() => {
              const now = (
                tags
                  .map(getShowTagFor(currentTag))
                  .filter((tag) => tag !== currentTag)
                  .concat(currentTag)
                  .filter(hasText)
              )

              handleChange(now)
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
