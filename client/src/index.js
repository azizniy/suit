
import '../graphic/style.sass'
import electron from 'electron'
import {loop} from './helpers'
import {Widget} from './Widget'
import {ColorPicker} from './ColorPicker'
import {Pin} from './Pin'
import {Cords} from './Cords'

const ipcRenderer = electron.ipcRenderer

let pinList = []
let cords = Cords()

let pins = {
	lShoulder : 0, rShoulder : 0,
	lRibs     : 0, rRibs     : 0,
	lThigh    : 0, rThigh    : 0, 
	lFoot     : 0, rFoot     : 0 
}

for (let i in pins) {
	pins[i] = Pin ({
		position : i,
		onClick (e) {
			if (e.shiftKey) {
				if (pinList.length == Object.keys(pins).length)
					pinList = []
				if (pinList.indexOf(i) == -1) 
					pinList.push(i)
			} else {
				pinList = []
				pinList.push(i)
			}
			e.stopPropagation()
		}
	})
	pinList.push(i)
}

let colorPicker = ColorPicker({
	onColorChange (rgb) {
		pinList.forEach(i => pins[i].setColor(rgb))
	}
})

document.body.onclick = e => {
	pinList = []
	for (let i in pins) pinList.push(i)
}

colorPicker.setColor({r: 255, g: 255, b: 255})

let lFootWidget = Widget({position: 'lFoot'})
let rFootWidget = Widget({position: 'rFoot'})
let lHandWidget = Widget({position: 'lHand'})
let rHandWidget = Widget({position: 'rHand'})

loop(() => {
	lFootWidget.gyro.draw()
	lFootWidget.magn.draw()
	lFootWidget.acc.draw()
	cords.draw(pinList, pins, colorPicker.wheel)
})

ipcRenderer.on('update', (event, msg) => {
	for (let i in msg) {
		
		if (i == 'vibro') lFootWidget.vibro.setState(msg[i])
		
		if (i == 'gx') lFootWidget.gyro.x.record(msg[i])
		if (i == 'gy') lFootWidget.gyro.y.record(msg[i])
		if (i == 'gz') lFootWidget.gyro.z.record(msg[i])
		
		if (i == 'mx') lFootWidget.magn.x.record(msg[i])
		if (i == 'my') lFootWidget.magn.y.record(msg[i])
		if (i == 'mz') lFootWidget.magn.z.record(msg[i])
		
		if (i == 'ax') lFootWidget.acc.x.record(msg[i])
		if (i == 'ay') lFootWidget.acc.y.record(msg[i])
		if (i == 'az') lFootWidget.acc.z.record(msg[i])
		
		pinList.forEach(id => {
			if (i == id) {
				pins[id].setColor({})
				let set = false
				if (!set) {
					colorPicker.setColor({})
					set = true
				}
			}
		})
	}
})

ipcRenderer.send('ready')
