require('babel-register')({
	presets: ['es2015', 'react']
})
require.extensions['.scss'] = () => ({
})
require.extensions['.css'] = () => ({
})
require('./server.js')
