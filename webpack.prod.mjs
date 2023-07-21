import {
  merge
} from 'webpack-merge'

import TerserPlugin from 'terser-webpack-plugin'

import common from './webpack.common.mjs'

export default function production (...args) {
  return (
    merge(common(...args), {
      mode: 'production',
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            minify: TerserPlugin.uglifyJsMinify,
            terserOptions: {
              compress: true,
              mangle: true
            }
          })
        ]
      }
    })
  )
}
