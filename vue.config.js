const webpack = require('webpack')
const path = require('path')

module.exports = {
  publicPath: './',
  outputDir: 'demo-dist',
  configureWebpack: {
    entry: './demo/main.js'
  }
}