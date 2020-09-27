const path = require('path')// The path module provides utilities for working with file and directory paths.

const webpack = require('webpack')

const HtmlWebPackPlugin = require('html-webpack-plugin')// simplifies creation of HTML files to serve your webpack bundles.

const MiniCssExtractPlugin = require('mini-css-extract-plugin')// This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps

const TerserPlugin = require('terser-webpack-plugin')

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//A Webpack plugin to optimize \ minimize CSS assets.

const WorkboxPlugin = require('workbox-webpack-plugin')// Offline workers

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: './src/client/index.js',
  mode: 'production',
  output: {
      libraryTarget: 'var',
      library: 'Client'
  },
  optimization: {
      minimizer: [
          new TerserPlugin({}),
          new OptimizeCssAssetsPlugin({})
      ]
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
               MiniCssExtractPlugin.loader,
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
                        bypassOnDebug: true, // webpack@1.x
                        disable: true, // webpack@2.x and newer
                    },
                 },
             ],
         }

      ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
        template: "./src/client/views/index.html",
        filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    }),
    new WorkboxPlugin.GenerateSW()
  ],
};
