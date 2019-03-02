const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    main: path.resolve(__dirname + '/src/index.js')
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: "vue-loader"
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: path.resolve(__dirname + '/src')
    }, {
      test: /\.css$/,
      loader: 'style!css!autoprefixer'
    }, {
      test: /\.less$/,
      loader: 'style!less'
    }, { 
      test: /\.pug$/, 
      use: ['pug-plain-loader'] 
    }]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false
      }
    }),
    new VueLoaderPlugin()
  ]
}