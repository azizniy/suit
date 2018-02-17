
import electron from 'electron'
const ipcRenderer = electron.ipcRenderer

import {GraphXYZ} from './Graph'
import {Button} from './Button'

export let Widget = ({
	parent = document.body,
	position = 'center',
	title = 'widget'
} = {}) => {
	// body
	let widget = document.createElement('div')
	widget.classList.add('widget', position)
	parent.appendChild(widget)
	widget.innerHTML = `<div class='title'>${title}<div>`
	widget.onclick = e => e.stopPropagation()
	// imu's
	let gyro = GraphXYZ({parent: widget, type : 'gyroscope'})
	let magn = GraphXYZ({parent: widget, type : 'compass'})
	let acc  = GraphXYZ({parent: widget, type : 'accelerometer'})
	// button
	let vibro = Button({
		parent: widget, 
		name : 'Vibrate',
		onPress   () {ipcRenderer.send('ui', {vibro: 1})},
		onRelease () {ipcRenderer.send('ui', {vibro: 0})},
	})
	// interface
	return {
		vibro, gyro, magn, acc,
		draw () {
			gyro.draw()
			magn.draw()
			acc.draw()
		}
	}
}

