/*
 * @Description: string
 * @Author: klisit
 * @Date: 2021-04-11 15:58:23
 * @LastEditTime: 2021-04-18 02:14:49
 * @LastEditors: klisit
 */
// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { existsSync } = require('fs')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const notifier = require('node-notifier')
const icon = path.join(__dirname, 'public/favicon.ico')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const isDevMode = process.env.NODE_ENV == 'development'
/** start load ENV */
const defaultEnvFilePath = path.join(__dirname, '.env')
const addEnvFilePath = path.join(__dirname, `.env.${process.env.NODE_ENV}`)
let defaultEnv = {}
if (existsSync(defaultEnvFilePath)) {
  defaultEnv = require('dotenv').config({ path: defaultEnvFilePath }).parsed
}
let addEnv = {}
if (existsSync(addEnvFilePath) && addEnvFilePath != defaultEnvFilePath) {
  addEnv = require('dotenv').config({ path: addEnvFilePath }).parsed
}
/** stop load ENV */

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, process.env.VUE_APP_DIST || 'dist'),
    filename: isDevMode ? 'js/[name].[chunkhash:6].js' : 'js/[name].js',
  },
  devServer: {
    open: process.env.VUE_APP_DEV_AUTO_OPEN == '1' ? true : false,
    host: process.env.VUE_APP_DEV_HOST || 'localhost',
    port: process.env.VUE_APP_DEV_PORT || 4396,
    historyApiFallback: process.env.VUE_APP_ROUTER_HISTORY == '1' ? true : false,
  },
  plugins: [
    new webpack.DefinePlugin({
      // ?????????????????????
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: process.env.NODE_ENV == 'development' ? true : false,
      'process.env': JSON.stringify(Object.assign(defaultEnv, addEnv)),
    }),
    new HtmlWebpackPlugin({
      title: process.env.VUE_APP_NAME || 'Webpack App',
      favicon: process.env.VUE_APP_ICON || '',
      template: 'public/index.html',
      chunks: ['main'],
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        notifier.notify({
          title: 'webpack ???????????????~',
          message: `${severity} ${errors[0].name}`,
          subtitle: errors[0].file || '',
          icon,
        })
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: !isDevMode,
    }),
    new StyleLintPlugin({
      files: ['**/*.{html,vue,css,sass,scss}'],
      fix: false,
      cache: true,
      emitErrors: true,
      failOnError: false,
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevMode ? 'css/[name].[chunkhash:6].css' : 'css/[name].css',
    }),
    // Add your plugins here
    // Learn more obout plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: [isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'cache-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8224,
            fallback: {
              loader: 'file-loader',
              options: {
                name: isDevMode ? 'img/[name].[hash:6].[ext]' : 'img/[name].[ext]',
              },
            },
          },
        },
      },
      {
        test: /\.(mp4|ogg|mp3|wav)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8224,
            fallback: {
              loader: 'file-loader',
              options: {
                name: isDevMode ? 'img/[name].[hash:6].[ext]' : 'img/[name].[ext]',
              },
            },
          },
        },
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: !isDevMode,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        extractComments: isDevMode,
        terserOptions: {
          module: true,
        },
      }),
    ],
  },
}
