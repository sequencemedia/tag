import React from 'react'
import PropTypes from 'prop-types'

import {
  getShowTagFor,
  hideTag,
  hasText
} from '#client/common'

const DEFAULT_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0,
  fontSize: '16px',
  fontFamily: 'monospace',
  lineHeight: '16px',
  minHeight: '48px',
  minWidth: '250px',
  borderColor: 'white',
  borderRadius: '4px',
  backgroundColor: 'white'
}

function getEventTargetValue ({ target: { value = '' } }) {
  return value
}

function TagEditor ({ tag, handleChange }) {
  const {
    x,
    y,
    text
  } = tag

  return (
    <textarea
      style={{ ...DEFAULT_STYLE, left: x + 'px', top: y + 'px' }}
      onClick={(event) => { event.stopPropagation() }}
      onChange={(event) => {
        event.stopPropagation()

        handleChange(getEventTargetValue(event))
      }}
      value={text ?? ''}
    />
  )
}

TagEditor.propTypes = {
  tag: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired
}

function Tag ({ tag, handleClick }) {
  const {
    x,
    y,
    text
  } = tag

  return (
    <pre
      style={{ ...DEFAULT_STYLE, left: x + 'px', top: y + 'px', minHeight: '16px', margin: 0, padding: '3px 3px' }}
      onClick={(event) => {
        event.stopPropagation()

        handleClick()
      }}>
      {text}
    </pre>
  )
}

Tag.propTypes = {
  tag: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string
  }),
  handleClick: PropTypes.func.isRequired
}

export default function Tags ({ tags, handleChange }) {
  return tags.map((currentTag, index) => {
    const {
      edit
    } = currentTag

    return (
      edit
        ? <TagEditor key={index} tag={currentTag} handleChange={(text) => {
          currentTag.text = text

          const now = (
            tags
              .map(getShowTagFor(currentTag))
              .filter((tag) => tag !== currentTag)
              .concat(currentTag)
              .filter(hasText)
          )

          handleChange(now)
        }} />
        : <Tag key={index} tag={currentTag} handleClick={() => {
          const now = (
            tags
              .map(hideTag)
              .filter((tag) => tag !== currentTag)
              .concat(currentTag)
              .filter(hasText)
          )

          currentTag.edit = true

          handleChange(now)
        }} />
    )
  })
}
