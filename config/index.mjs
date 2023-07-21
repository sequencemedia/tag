import args from './args.mjs'

import {
  DEFAULT_MONGODB_HOST,
  DEFAULT_MONGODB_PORT,
  DEFAULT_MONGODB_DB
} from './defaults.mjs'

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

let MONGODB_USERNAME
let MONGODB_PASSWORD
let MONGODB_HOST
let MONGODB_PORT

if (NODE_ENV === 'production') {
  if (!args.has('mongodb-username')) throw new Error('Parameter `mongodb-username` is required')
  MONGODB_USERNAME = args.get('mongodb-username')

  if (!args.has('mongodb-password')) throw new Error('Parameter `mongodb-password` is required')
  MONGODB_PASSWORD = args.get('mongodb-password')

  if (!args.has('mongodb-host')) throw new Error('Parameter `mongodb-host` is required')
  MONGODB_HOST = args.get('mongodb-host')
} else {
  if (NODE_ENV === 'development') {
    MONGODB_HOST = (
      args.has('mongodb-host')
        ? args.get('mongodb-host')
        : DEFAULT_MONGODB_HOST
    )

    MONGODB_PORT = (
      args.has('mongodb-port')
        ? args.get('mongodb-port')
        : DEFAULT_MONGODB_PORT
    )
  }
}

export {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT
}

export const MONGODB_DB = (
  args.has('mongodb-db')
    ? args.get('mongodb-db')
    : DEFAULT_MONGODB_DB
)
