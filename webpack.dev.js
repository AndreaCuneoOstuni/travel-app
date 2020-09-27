
const path = require('path')// The path module provides utilities for working with file and directory paths.

const webpack = require('webpack')

const HtmlWebPackPlugin = require('html-webpack-plugin')// simplifies creation of HTML files to serve your webpack bundles.

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'source-map',
  stats: "verbose",
  output: {
      libraryTarget: 'var',
      library: 'Client'
  },
  module: {
    rules: [
        {
          test: '/\.js$/',
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.scss$/,
           use: [
                'style-loader',
                'css-loader',
                'sass-loader'
             ]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                        disable: true,
                    },
                 },
             ],
         }

      ],
  },
  plugins: [
    new CleanWebpackPlugin({
        // Simulate the removal of files
        dry: true,
        // Write Logs to Console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
    }),
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    })
  ],
};


