// const { resolve } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		host: 'localhost',
		port: 8080,
		stats: 'errors-only',
		clientLogLevel: 'silent',
		inline: true,
		compress: true,
		hot: true,
		proxy: {
			'/api/': {
				target: 'http://111.229.59.101:8080/',
				// target: 'https://dharma-staging-uk.herokuapp.com/',
				changeOrigin: true,
				timeout: 1000 * 60 * 2
			}
		}
	},
	plugins: [new HotModuleReplacementPlugin()]
})
