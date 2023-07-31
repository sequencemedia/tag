import mongoose from 'mongoose'

export default {
  key: {
    type: String,
    required: true,
    index: true
  },
  tif: {
    type: mongoose.Types.ObjectId,
    required: true,
    index: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    default: ''
  }
}
