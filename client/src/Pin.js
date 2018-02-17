
import {map} from './helpers'

export let Pin = ({
	parent   = document.body,
	position = 'center',
	onClick  = e => {}
} = {}) => {
	// body
	let pin = document.createElement('div')
	pin.classList.add('pin', position)
	parent.appendChild(pin)
	// event
	pin.onmousedown = onClick
	let rgb = {r: 0, g: 0, b: 0}
	// interface
	return {
		pin,
		get rgb() {return rgb},
		setColor ({
			r = rgb.r,
			g = rgb.g,
			b = rgb.b
		}){
			rgb = {r,g,b}
			pin.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
		}
	}
}
