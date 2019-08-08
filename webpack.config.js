const path = require('path');

module.exports = {
  entry: './examples/Electromagnetic/app.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/dist/',
    host: '127.0.0.1',
    port: 8080,
    open: true
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
};
