const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    main: path.resolve(__dirname + '/src/index.js')
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'tab-scroll.js',
    libraryTarget: 'umd'
  },
  externals: {
    'better-scroll': 'better-scroll'
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
      test: /\.pug$/, 
      use: ['pug-plain-loader'] 
    }, {
      test: /\.less$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "less-loader" // compiles Less to CSS
      }]
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