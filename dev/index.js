
const run = require('./src/run.js')
const env = require('./src/env.js')

let checks = {
	'client extern' () {
		env.set('dev')
		pre.client.watch()
	},
	'client watch' () {
		env.set('dev')
		pre.client.watch()
	},
	'client build' () {
		env.set('prod')
		pre.client.build()
	},
	'server watch extern' () {
		env.set('dev')
		pre.server.watch()
		pre.server.nodemon()
	},
	'server build' () {
		env.set('prod')
		pre.server.build()
	},
	'electron watch' () {
		env.set('dev')
		pre.client.watch()
		pre.electron.watch()
	},
	'electron build' () {
		env.set('prod')
		pre.client.build(pre.electron.build)
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
			--progress`, onClose),
		nodemon : () => run('se', 'bgYellow', 
			`./node_modules/.bin/nodemon
			./server/build/index.js -q`)
	},
	electron : {
		watch : () => run('el', 'bgBlue',
			`./node_modules/.bin/electron .`),
		build : () => run('el', 'bgBlue', 
			`./node_modules/.bin/electron-packager 
			. --out ./build --overwrite`)
	}
}

for (let i in checks) if (env.is(i)) checks[i]()
