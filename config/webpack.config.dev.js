const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: "development",
  output: {
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../src'),
    },
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
  }
});
