const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

console.log(process.env.API)
console.log(process.env.DB_NAME)

module.exports = {
  // 1. [context]: src is the folder with all the
  // sources and so that webpack would watch all
  // the files in this folder, we write the 'context' field.

  // 2. [__dirname]: responsible for the absolute
  // path to the current folder.
  // In my case, this is the pureJsTemplate folder.
  context: path.resolve(__dirname, 'src'),
  mode: 'development',

  // 3. [entry]: entry point for the application.
  entry: './index.js',

  // The target: 'node' option tells webpack not to touch any built-in modules like fs or path
  // target: 'node',

  // 4. [output]: The path and file name where we
  // will add all our javascript code.
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },

  // cleaning dist catalogues from bundle.[hash].js
  // html plugin
  // .env binding
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: 'index.html'
    }),
    new webpack.DefinePlugin( {
      "process.env": JSON.stringify(dotenv.parsed)
    } )
  ]
}
