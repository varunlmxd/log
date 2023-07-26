const path = require('path');

module.exports = {
  exclude: ['**/dynamic*.js'],
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
    resolve: {
    fallback: {
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "constants": require.resolve("constants-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "path": require.resolve("path-browserify"),
      
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
