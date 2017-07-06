require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

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
  // Shared code
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

const sassLoaders = [
  'style-loader',
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?outputStyle=expanded'
];

var config = {
  env : process.env.NODE_ENV,
  entry: {
    app: path.resolve(PATHS.app, 'main.js'),
    vendor: ['babel-polyfill', 'react']
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: sassLoaders.join('!')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: plugins,
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
	historyApiFallback: true,
    port: 3000
	// proxy: {
	// 	'/api/*': {
	// 		// secure: false,
	// 		// target: 'http://localhost:3001',
	//     	rewrite: function(req) {
	//       		req.url = req.url.replace(/^\/api/, '');
	//     	}
	// 	}
	// }
  },debug:true,
  devtool: 'eval-source-map'
};

module.exports = config;
