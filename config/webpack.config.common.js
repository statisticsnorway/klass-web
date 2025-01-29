const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(path.resolve(__dirname, '../src/js'), 'main.js'),
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  stats: {
    colors: true,
    reasons: true,
    orphanModules: false,
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname, '../src/js')
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset'
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../src/images'), to: "images" },
        { from: path.resolve(__dirname, '../src/static'), to: "static" },
      ],
    }),

    // This plugin moves all the CSS into a separate stylesheet
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),

    // Needed by counterpart
    new NodePolyfillPlugin({
        additionalAliases: ['process'],
    }), 

    // https://github.com/webpack-contrib/webpack-bundle-analyzer/blob/master/README.md
    new BundleAnalyzerPlugin({ analyzerMode: 'disabled' }) // default is 'server'

  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
};
