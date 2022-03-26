require('babel-polyfill');

const path = require('path');
const webpack = require('webpack');

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
  new webpack.optimize.CommonsChunkPlugin( {name:"vendor", filename:"js/vendor.bundle.js"}),
  // Avoid publishing files when compilation fails
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),
  new webpack.LoaderOptionsPlugin({
    debug: true
  })
];

module.exports = {
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
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: plugins,
  devtool: 'eval-source-map',
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
  },
};
