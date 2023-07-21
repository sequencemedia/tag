import {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DB
} from './index.mjs'

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

export default function getMongoDBUri () {
  if (NODE_ENV === 'production') {
    return `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DB}`
  } else {
    if (NODE_ENV === 'development') {
      return `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`
    }
  }

  throw new Error('Parameter `NODE_ENV` is invalid')
}
