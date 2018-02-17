
import {map} from './helpers'

let Graph = (cv, ct, color) => {
	let padding = 4
	let buffer = []
	let value  = 0
	let min    = 0
	let max    = 0
	return {
		record (v) {
			value = v
			if (min > v) min = v
			if (max < v) max = v
		},
		draw () {
			buffer.push(value)
			buffer = buffer.slice(-60)
			// draw stuff
			ct.beginPath()
			buffer.forEach((value, i) => {
				ct[i == 0? 'moveTo': 'lineTo'](
					i * cv.width / (buffer.length - 1),
					map(value, min, max, padding, cv.height-padding))
			})
			ct.strokeStyle = color
			ct.lineWidth   = 1
			ct.stroke()
		}
	}
}

export let GraphXYZ = ({
	parent = document.body,
	type   = 'gyroscope'
} = {}) => {
	// container
	let device = document.createElement('div')
	device.classList.add('device')
	parent.appendChild(device)
	// icon
	let icon = document.createElement('div')
	icon.classList.add('icon')
	icon.style.backgroundImage = `url('./graphic/${type}.png')`
	device.appendChild(icon)
	// canvas
	var cv = document.createElement('canvas')
	var ct = cv.getContext('2d')
	device.appendChild(cv)
	// settings
	cv.width  = 100
	cv.height = 30
	let x = Graph(cv, ct, 'hsl(330,100%,50%)')
	let y = Graph(cv, ct, 'hsl(77,100%,50%)')
	let z = Graph(cv, ct, 'hsl(169,100%,50%)')
	// interface
	return {
		x,y,z,
		draw() {
			ct.clearRect(0, 0, cv.width, cv.height)
			x.draw()
			y.draw()
			z.draw()
		}
	}
}
