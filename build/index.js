const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

const getSrcCssLoaders = importLoaders => [
	isProd ? MiniCssExtractPlugin.loader : 'style-loader',
	{
		loader: 'css-loader',
		options: {
			modules: {
				localIdentName: '[name]__[local]__[hash:base64:5]',
			},

			sourceMap: !isProd,
			importLoaders
		}
	},
	'postcss-loader'
]

const getCssLoaders = importLoaders => [
	isProd ? MiniCssExtractPlugin.loader : 'style-loader',
	{
		loader: 'css-loader',
		options: {
			sourceMap: !isProd,
			importLoaders
		}
	},
	'postcss-loader'
]

module.exports = {
	isProd,
	getCssLoaders,
	getSrcCssLoaders
}
