const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      url: require.resolve('url/'),
      zlib: require.resolve('browserify-zlib'),
      vm: require.resolve('vm-browserify'),
      // async_hooks: require.resolve('async_hooks-browserify'),
      querystring: require.resolve('querystring-es3')
    }
  },
  node: {
    // fs: 'empty',
    // net: 'empty',
    // http: 'empty'
  }
}
