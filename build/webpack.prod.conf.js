const { merge } = require('webpack-merge')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
	mode: 'production',
	output: {
		filename: `js/[name].[hash:8].js`,
		path: resolve(__dirname, '../dist'),
		publicPath: '/dharma/'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
			ignoreOrder: false
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					compress: { pure_funcs: ['console.log'] }
				}
			}),
			new OptimizeCssAssetsPlugin()
		].filter(Boolean)
	}
})
