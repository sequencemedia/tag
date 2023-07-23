import {
  access,
  writeFile,
  constants
} from 'node:fs/promises'

const REMOTE_HOST = 'http://localhost:3001'

async function getFor (id) {
  const response = await fetch(`${REMOTE_HOST}/${id}`)
  return (
    await response.arrayBuffer()
  )
}

async function getTypeFor (id, type) {
  const response = await fetch(`${REMOTE_HOST}/${id}/${type}`)
  return (
    await response.arrayBuffer()
  )
}

export function getFileNameMiddleware (req, res, next) {
  const {
    params: {
      id,
      type = 'tif'
    },
    locals = {}
  } = req

  locals.fileName = `${id}.${type}`

  req.locals = locals

  next()
}

export function getFilePathMiddleware (req, res, next) {
  const {
    locals: {
      fileName,
      ...locals
    } = {}
  } = req

  const filePath = `.cache/${fileName}`
  req.locals = {
    ...locals,
    fileName,
    filePath
  }

  next()
}

export async function fileMiddleware (req, res, next) {
  const {
    locals: {
      filePath
    }
  } = req

  try {
    await access(filePath, constants.R_OK)
  } catch {
    const {
      params: {
        id
      }
    } = req

    const fileBuffer = Buffer.from(
      await getFor(id)
    )

    await writeFile(filePath, fileBuffer)
  }

  next()
}

export async function fileTypeMiddleware (req, res, next) {
  const {
    locals: {
      filePath
    }
  } = req

  try {
    await access(filePath, constants.R_OK)
  } catch {
    const {
      params: {
        id,
        type
      }
    } = req

    const fileBuffer = Buffer.from(
      await getTypeFor(id, type)
    )

    await writeFile(filePath, fileBuffer)
  }

  next()
}
