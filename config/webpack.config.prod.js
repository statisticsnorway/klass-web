require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src/js'),
  styles: path.resolve(__dirname, '../src/styles'),
  images: path.resolve(__dirname, '../src/images'),
  static: path.resolve(__dirname, '../src/static'),
  build: path.resolve(__dirname, '../build')
};

const plugins = [
  new CopyWebpackPlugin([
    {
      from: PATHS.images,
      to: 'images'
    },
    {
      from: PATHS.static,
      to: 'static'
    }
  ]),

  // This plugin moves all the CSS into a separate stylesheet
  new MiniCssExtractPlugin({
    filename: "css/[name].css"
  }),
];

module.exports = {
  entry: {
    app: path.resolve(PATHS.app, 'main.js'),
    vendor: ['babel-polyfill', 'react']
  },
  mode: "production",
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/klass-ssb-no/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    noParse: /\.min\.js$/,
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash]'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]?[hash]'
      }
    ]
  },
  plugins: plugins,
  optimization: {},
  devtool: 'source-map'
};
