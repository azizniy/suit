
const run = require('./src/run.js')
const env = require('./src/env.js')

let checks = {
	// set env
	'extern' () {
		env.set('dev')
	},
	'watch' () {
		env.set('dev')
	},
	'build' () {
		env.set('build')
	},
	// client mode
	'client extern' () {
		pre.client.extern()
	},
	'client watch' () {
		pre.client.watch()
	},
	'client build' () {
		pre.client.build()
	},
	// server mode
	'server extern' () {
		pre.server.watch()
		pre.server.nodemon()
	},
	'server watch' () {
		pre.server.watch()
		pre.server.nodemon()
	},
	'server build' () {
		pre.server.build()
	},
	// electron
	'electron watch' () {
		pre.client.watch()
		// pre.server.watch()
		pre.electron.watch()
	},
	'electron build' () {
		let state = 0
		let pack = () => {if (++ state == 1) pre.electron.build()}
		// pre.server.build(pack)
		pre.client.build(pack)
	}
}

let pre = {
	client : {
		extern : () => run('cl', 'bgRed', 
			`./node_modules/.bin/webpack-dev-server 
			--config ${__dirname}/src/webpack.js 
			--env.target client 
			--env.mode extern`),
		watch : () => run('cl', 'bgRed', 
			`./node_modules/.bin/webpack-dev-server 
			--config ${__dirname}/src/webpack.js 
			--env.target client 
			--env.mode watch`),
		build : (onClose) => run('cl', 'bgRed',
			`./node_modules/.bin/webpack 
			--config ${__dirname}/src/webpack.js 
			--env.target client 
			--env.mode build 
			--progress`, onClose)
	},
	server : {
		nodemon : () => run('se', 'bgYellow', 
			`./node_modules/.bin/nodemon
			./server/build/index.js -q`),
		watch : () => run('se', 'bgGreen',
			`./node_modules/.bin/webpack 
			--config ${__dirname}/src/webpack.js 
			--env.target server 
			--env.mode watch`),
		build : (onClose) => run('se', 'bgGreen', 
			`./node_modules/.bin/webpack 
			--config ${__dirname}/src/webpack.js 
			--env.target server 
			--env.mode build 
			--progress`, onClose)
	},
	electron : {
		watch : () => run('el', 'bgBlue',
			`./node_modules/.bin/electron .`),
		build : () => run('el', 'bgBlue', 
			`./node_modules/.bin/electron-packager 
			. --out ./electron/build --overwrite`)
			// --platform=win32
			// --arch=x64
	}
}

for (let i in checks) if (env.is(i)) checks[i]()
