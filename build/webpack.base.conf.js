const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { isProd, getCssLoaders, getSrcCssLoaders } = require('.')

module.exports = {
	entry: {
		index: resolve(__dirname, '../src/index.tsx')
	},
	output: {
		filename: `js/[name].[hash:8].js`,
		path: resolve(__dirname, '../dist')
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.json'],
		alias: {
			Src: resolve(__dirname, '../src'),
			Components: resolve(__dirname, '../src/components'),
			Utils: resolve(__dirname, '../src/utils'),
			Views: resolve(__dirname, '../src/views'),
			Less: resolve(__dirname, '../src/less')
		}
	},
	externals: {
		optimization: {
			splitChunks: {
				chunks: 'all',
				name: true
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.(tsx?|js)$/,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				exclude: /node_modules|antd\.css/,
				use: getCssLoaders(1)
			},
			{
				test: /\.less$/,
				include: /src/,
				use: [
					...getSrcCssLoaders(2),
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								sourceMap: !isProd,
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: /\.less$/,
				exclude: /src/,
				use: [
					...getCssLoaders(2),
					{
						loader: 'less-loader',
						options: {
							lessOptions: {
								sourceMap: !isProd,
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10 * 1024,
							name: '[name].[contenthash:8].[ext]',
							outputPath: 'assets/images'
						}
					}
				]
			},
			{
				test: /\.(ttf|woff|woff2|eot|otf|ttc)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[contenthash:8].[ext]',
							outputPath: 'assets/fonts'
						}
					}
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: resolve(__dirname, '../public/index.ejs'),
			filename: 'index.html',
			env: isProd
		}),
		new WebpackBar({
			name: isProd ? 'packaging' : 'running',
			color: '#fa8c16'
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				configFile: resolve(__dirname, '../tsconfig.json')
			}
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/assets/icon/font-awesome/css/all.min.css', to: 'assets/icon/font-awesome/css/' },
				{ from: 'src/assets/icon/font-awesome/webfonts/', to: 'assets/icon/font-awesome/webfonts/' },
				{ from: 'src/less/theme.less', to: 'css/' }
			]
		})
	]
}
