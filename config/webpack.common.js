const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const PATH_DIR = path.resolve(__dirname, '../');
const PATH_SRC = path.resolve(__dirname, '../src');
const PATH_BUILD = path.resolve(PATH_DIR, 'build');
const PATH_ENTRY = path.resolve(__dirname, 'index.tsx');

module.exports = (env, argv) => {
  const mode = process.env.NODE_ENV;
  const isDevMode = mode !== 'production';

  /** @type {import('webpack').Configuration} */

  return {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
      filename: "[name].[hash].js",
      path: PATH_BUILD,
      publicPath: "/",
      clean: true
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }],
                 '@babel/preset-typescript',
                  '@babel/preset-react'
                ]
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$|\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /\.module\.\w+$/,
                  localIdentName: '[local]__[hash:base64:5]',
                },
              },
            },
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    "postcss-preset-env",
                    "autoprefixer"
                  ],
                  values: true,
                },
              },
            },
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(PATH_SRC, 'index.html'),
        filename: "index.html",
        publicPath: '/'
      }),
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: 'css/[name].[contenthash:8].css'
      })
    ]
  }
}