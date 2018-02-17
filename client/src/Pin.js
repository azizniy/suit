
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
	pin.onclick = onClick
	let rgb = {r: 0, g: 0, b: 0}
	// interface
	return {
		pin,
		setColor ({
			r = rgb.r,
			g = rgb.g,
			b = rgb.b
		}){
			// update
			rgb = {r,g,b}
			// stylize
			let sylize = c => c//parseInt(map(c, 0, 255, 20, 150))
			pin.style.backgroundColor = `rgb(
				${sylize(rgb.r)}, 
				${sylize(rgb.g)}, 
				${sylize(rgb.b)})`
		}
	}
}
