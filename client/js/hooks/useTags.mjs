import { useReducer, useEffect, useMemo } from 'react'
import { nanoid } from 'nanoid'

import {
  getShowTagFor,
  hideTag,
  hasText
} from '#client/common'

import useSocket from './useSocket.mjs'

function handleCreateTag (state, { tif, x, y }) {
  return (
    state
      .map(hideTag)
      .filter(hasText)
      .concat({ key: nanoid(), tif, x, y, hasEditor: true })
  )
}

function handleChangeTags (state, { tags }) {
  return tags
}

function handleChangeTagText (state, { tag: currentTag, text }) {
  return (
    state
      .filter((tag) => tag !== currentTag)
      .concat({ ...currentTag, text })
  )
}

function handleHideEditTag (state) {
  return (
    state
      .map(hideTag)
      .filter(hasText)
  )
}

function handleShowEditTag (state, { tag: currentTag }) {
  return (
    state
      .map(getShowTagFor(currentTag))
      .filter((tag) => tag !== currentTag)
      .filter(hasText)
      .concat(currentTag)
  )
}

function reducer (state, action) {
  const { type } = action

  switch (type) {
    case 'CREATE_TAG':
      return handleCreateTag(state, action)

    case 'CHANGE_TAGS':
      return handleChangeTags(state, action)

    case 'CHANGE_TAG_TEXT':
      return handleChangeTagText(state, action)

    case 'HIDE_EDIT_TAG':
      return handleHideEditTag(state)

    case 'SHOW_EDIT_TAG':
      return handleShowEditTag(state, action)

    default:
      return state
  }
}

export default function useTags (tif) {
  const { isConnected, socket } = useSocket()
  const [tags, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    if (isConnected) {
      socket
        .on('tags', (tags) => {
          dispatch({ type: 'CHANGE_TAGS', tags })
        })
        .emit('tags', tif)
    }

    return () => {
      socket
        .off('tags')
    }
  }, [isConnected, tif])

  return useMemo(() => {
    return {
      isConnected,
      tags,
      createTag (tif, x, y) {
        dispatch({ type: 'CREATE_TAG', tif, x, y })
      },
      showEditTag (tag) {
        dispatch({ type: 'SHOW_EDIT_TAG', tag })
      },
      hideEditTag () {
        dispatch({ type: 'HIDE_EDIT_TAG' })
      },
      changeTagText (tag, text) {
        dispatch({ type: 'CHANGE_TAG_TEXT', tag, text })
      }
    }
  }, [tif, isConnected, tags])
}
