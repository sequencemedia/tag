export function getEventTargetValue ({ target: { value = '' } }) {
  return value
}

export function getShowTagFor (currentTag) {
  return function showTag (tag) {
    tag.edit = tag === currentTag
    return tag
  }
}

export function hideTag (tag) {
  tag.edit = false
  return tag
}

export function hasText ({ text }) {
  return !!text
}
