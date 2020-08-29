const HtmlWebPackPlugin = require("html-webpack-plugin"); //to generate an html file to be used for servering
// bundled js file/files
const webpack = require("webpack")
const path = require('path') //require default path module to access file location

const SRC_DIR = path.resolve(__dirname, 'src')

module.exports = {
    entry: {
        index: ["babel-polyfill",SRC_DIR + '/index.js']
      },
        output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: 'bundle.js'
      },
      devtool: 'cheap-module-eval-source-map',
      node: {
        fs: "empty"
      },
      devServer: {
        contentBase: './build',
        hot: true,
        historyApiFallback: true
      },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ['babel-loader']
            },
            {
              test:/\.html$/,
              use: [ 'html-loader']
            },
            { 
              test: /\.css$/, 
              loader: "style-loader!css-loader" 
            }, 
            {
              test:/\.(png|svg|jpg|gif)$/,
              use: [ 'file-loader']
            },
            {
              test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
              use: [{
                  loader: 'file-loader',
                  options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                  }
              }]
          }  
          ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
          template: './public/index.html',
          filename: './index.html'
        })
      ],
}