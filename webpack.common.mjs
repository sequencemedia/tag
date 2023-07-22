import path from 'path'

import {
  CleanWebpackPlugin
} from 'clean-webpack-plugin'

import Webpack from 'webpack'

const {
  env: {
    NODE_ENV = 'production'
  }
} = process

const {
  EnvironmentPlugin,
  SourceMapDevToolPlugin
} = Webpack

const CLIENT_PATH = path.resolve('./client/js')
const PUBLIC_PATH = path.resolve('./public/js')

export default function common (env, { mode = NODE_ENV } = {}) {
  return {
    mode,
    entry: {
      app: {
        import: path.join(CLIENT_PATH, 'app.jsx'),
        dependOn: 'vendors'
      },
      vendors: [
        'react',
        'prop-types'
      ]
    },
    output: {
      path: PUBLIC_PATH,
      publicPath: '/assets',
      filename: '[name].js'
    },
    optimization: {
      runtimeChunk: 'single'
    },
    stats: {
      colors: true
    },
    module: {
      rules: [
        {
          test: /\.mjs$|\.cjs$|\.mts$|\.cts$|\.jsx$|\.tsx$/,
          use: {
            loader: 'babel-loader'
          },
          exclude: /node_modules/ //  Required!
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: false,
        cleanOnceBeforeBuildPatterns: [
          path.join(PUBLIC_PATH, '*.js'),
          path.join(PUBLIC_PATH, '*.js.LICENSE.txt'),
          path.join(PUBLIC_PATH, '*.js.map')
        ]
      }),
      new EnvironmentPlugin({ NODE_ENV }),
      new SourceMapDevToolPlugin({ filename: '[name].js.map' })
    ],
    experiments: {
      backCompat: false
    }
  }
}
