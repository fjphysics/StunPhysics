const path = require('path');

module.exports = {
  entry: './src/StunPhysics.ts',
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
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'StunPhysics.min.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
};