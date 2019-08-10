const path = require('path');
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  //entry: './examples/HarmonicMotion/app.ts',  //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
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
    filename: 'app.js',  // 输出文件名
    //path: path.resolve(__dirname, './examples/HarmonicMotion') 
    path: path.resolve(__dirname, './examples/Electromagnetic')  // 输出目录
  }
};
