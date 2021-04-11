module.exports = {
	plugins: [
		require('postcss-flexbugs-fixes'),
		require('postcss-preset-env')({
			autoprefixer: {
				grid: true,
				flexbox: 'no-2009'
			},
			stage: 3
		}),
		require('postcss-pxtorem')({
			rootValue: 16,
			propList: ['*'],
			unitPrecision: 5,
			minPixelValue: 2
		}),
		require('postcss-normalize')
	]
}
