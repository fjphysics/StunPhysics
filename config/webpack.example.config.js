const path = require('path');

module.exports = {  
  //entry: './examples/linearMotion/app.ts',
  //entry: './examples/HarmonicMotion/app.ts',
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
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'app.js',    
    //path: path.resolve(__dirname, '../examples/linearMotion')
    //path: path.resolve(__dirname, '../examples/HarmonicMotion')
    path: path.resolve(__dirname, '../examples/Electromagnetic')
  }
};