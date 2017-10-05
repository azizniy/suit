
const webpack = require('webpack')
const fs	  = require('fs')

let config = {
	output  : {filename : '[name]'},
	devtool : 'source-map',
	module  : {
		loaders	: [{
			// es6
			test	: /\.(js)$/,
			loader	: 'babel-loader',
			query	: {presets: [['es2015', {'modules': false}]]},
			exclude	: /node_modules/
		}]
	},
	plugins : []
}

if (0) config.resolve = {
	alias : {
		fw : '/Users/antonkluev/Desktop/Dev/web/libs/fw/src/'
	}
}

module.exports = env => {
	// client
	if (env.target == 'client') {
		config.entry = {
			'./client/build/index.js' : 
			'./client/src/index.js'}
		// sass
		config.module.loaders = config.module.loaders.concat([{
			test    : /\.(sass)$/,
			loaders : ['style-loader', 'css-loader', 'sass-loader?sourceMap'],
			exclude	: /node_modules/
		},{
			test: /\.(ttf|svg)$/,
			loader: 'file-loader?name=./graphic/[name].[ext]'
		},{
			test: /\.(jpg|png|svg)$/, 
			loader: 'url-loader'
		}])
		// watch
		if (env.mode == 'watch' || env.mode == 'extern')
			Object.assign(config, {
				plugins   : [new webpack.HotModuleReplacementPlugin()],
				devServer : {
					contentBase : './',
					stats       : 'errors-only',
					inline      : true,
					hot         : true,
					port        : 8000
				}
			})
		// extern
		if (env.mode == 'extern') 
			config.devServer.host = require('ip').address()
		// adjustments
		config.plugins
			.push(new webpack.ExternalsPlugin('commonjs', ['electron']))
	}
	// server
	else if (env.target == 'server') {
		config.entry = {
			'./server/build/index.js' : 
			'./server/src/index.js'}
		// watch
		if (env.mode == 'watch') 
			config.watch = true
		// adjustments
		var modules = {}
		fs.readdirSync('node_modules')
			.filter(x => ['.bin'].indexOf(x) === -1)
		  	.forEach(mod => modules[mod] = `commonjs ${mod}`)
		Object.assign(config, {
			target    : 'node',
			externals : modules
		})
	}
	// build
	if (env.mode == 'build') config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			output    : {comments : false},
			sourceMap : true
		}))
	// lib
	if (env.target == 'lib') config.output = {
		filename      : '[name]',
		libraryTarget : 'umd',
		library       : 'fw'
	}
	return config
}
