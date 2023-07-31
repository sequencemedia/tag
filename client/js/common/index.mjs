export function getEventTargetValue ({ target: { value = '' } }) {
  return value
}

export function getShowTagFor (currentTag) {
  return function showTag (tag) {
    tag.edit = tag === currentTag
    return tag
  }
}

export function getHideTagFor (currentTag) {
  return function hideTag (tag) {
    tag.edit = tag !== currentTag
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

export function getNaturalX (x, {
  parentElement: {
    offsetLeft
  },
  naturalWidth,
  width
}, {
  scrollLeft
}) {
  const w = naturalWidth / width

  return Math.round(((x - offsetLeft) + scrollLeft) * w)
}

export function getNaturalY (y, {
  parentElement: {
    offsetTop
  },
  naturalHeight,
  height
}, {
  scrollTop
}) {
  const h = naturalHeight / height

  return Math.round(((y - offsetTop) + scrollTop) * h)
}

export function getRenderedX ({ naturalWidth, width }, x) {
  const w = naturalWidth / width

  return Math.round(x / w)
}

export function getRenderedY ({ naturalHeight, height }, y) {
  const h = naturalHeight / height

  return Math.round(y / h)
}
