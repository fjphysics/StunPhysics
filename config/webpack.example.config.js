const path = require('path');

module.exports = {  
  //entry: './examples/CircularMotion/app.ts',
  //entry: './examples/ProjectileMotion/app.ts',
  entry: './examples/Pendulum/app.ts',
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
    //path: path.resolve(__dirname, '../examples/CircularMotion')
    //path: path.resolve(__dirname, '../examples/ProjectileMotion')
    path: path.resolve(__dirname, '../examples/Pendulum')
  }
};