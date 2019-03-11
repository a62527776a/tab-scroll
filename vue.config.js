const webpack = require('webpack')
const path = require('path')

module.exports = {
  publicPath: process.env.BABEL_ENV === 'production' ? '/public/unsplash' : './',
  outputDir: 'demo-dist',
  configureWebpack: {
    entry: './demo/main.js'
  }
}