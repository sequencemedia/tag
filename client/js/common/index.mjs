export function getEventTargetValue ({ target: { value = '' } }) {
  return value
}

export function getShowTagFor (currentTag) {
  return function showTag (tag) {
    tag.hasEditor = tag === currentTag
    return tag
  }
}

export function getHideTagFor (currentTag) {
  return function hideTag (tag) {
    tag.hasEditor = tag !== currentTag
    return tag
  }
}

export function hideTag (tag) {
  tag.hasEditor = false
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

export function getRenderedX (img, x) {
  const {
    complete
  } = img

  if (complete) {
    const {
      naturalWidth,
      width
    } = img

    const w = naturalWidth / width

    return Math.round(x / w)
  }

  return 0
}

export function getRenderedY (img, y) {
  const {
    complete
  } = img

  if (complete) {
    const {
      naturalHeight,
      height
    } = img

    const h = naturalHeight / height

    return Math.round(y / h)
  }

  return 0
}
