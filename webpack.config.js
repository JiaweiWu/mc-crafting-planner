const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
	app: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist'),
	node_modules: path.join(__dirname, 'node_modules'),
	template: path.join(__dirname, 'src', 'index.html'),
};

const VENDOR_LIBS = [
	'react', 'redux', 'react-redux', 'react-dom',
	'redux-thunk', 'axios', 'react-router-dom',
];

const commonConfig = merge([
	{
		entry: {
			bundle: PATHS.app,
		},
		output: {
			path: PATHS.build,
			filename: '[name].[chunkhash].js',
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: PATHS.template,
			}),
		],
	},
	parts.babel({ exclude: PATHS.node_modules }),
	parts.loadImages({ 
		options: {
			limit: 15000,
			name: '[name].[ext]',
		},
	}),
	parts.loadFonts({
		options: {
			name: '[name].[ext]',
		}
	}),
]);

const productionConfig = merge([
	{
		entry: {
			vendor: VENDOR_LIBS,
		},

		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: ['vendor', 'manifest'],
			}),
		],
	},
	parts.extractCSS({ use: 'css-loader?modules,localIdentName="[name]-[local]-[hash:base64:6]"'}),
]);

const developmentConfig = merge([
	parts.devServer({
		host: process.env.HOST,
		port: process.env.PORT,
	}),
	parts.loadCSS(),
]);

module.exports = (env) => {
	if (env === 'production') {
		return merge(commonConfig, productionConfig);
	}

	return merge(commonConfig, developmentConfig);
}