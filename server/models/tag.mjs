import mongoose from 'mongoose'
import schema from '#server/model-schemas/tag'

let MODEL

const config = {
  collection: 'tags',
  versionKey: false
}

export default function getTagModel () {
  if (MODEL) return MODEL
  const modelSchema = new mongoose.Schema(schema, config)

  MODEL = mongoose.model('Tag', modelSchema)

  return MODEL
}
