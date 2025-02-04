const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/klass-ssb-no/'
  },
  devtool: 'source-map',
  public: 'klass-web.intern.test.ssb.no'
});
