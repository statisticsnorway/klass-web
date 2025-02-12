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
    open: true,
    port: 3000,
    allowedHosts: ['klass-web.intern.test.ssb.no', 'klass-web.intern.ssb.no'],
    proxy: [
      {
      '/': {
        target: 'http://localhost:3001', // Your backend API URL
        changeOrigin: true,  // This allows the proxy to work across different origins
        secure: false,       // Set to false if your backend doesn't use HTTPS
        pathRewrite: {
          '^/': '', // Optional: rewrite the URL before forwarding it to the backend
        },
      },
    },
  ]
  }
});
