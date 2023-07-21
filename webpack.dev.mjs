import {
  merge
} from 'webpack-merge'

import common from './webpack.common.mjs'

export default function development (...args) {
  return (
    merge(common(...args), {
      mode: 'development',
      devtool: false
    })
  )
}
