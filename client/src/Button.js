
export let Button = ({
	parent = document.body,
	name   = 'Vibration',
	onPress   = () => {},
	onRelease = () => {},
	onClick   = () => {},
} = {}) => {
	let button = document.createElement('div')
	button.classList.add('button')
	parent.appendChild(button)
	// events
	button.onmousedown = onPress
	button.onclick     = onClick
	button.onmouseup   = onRelease
	// label
	button.innerHTML   = name
	return {
		setState(v) {
			button.classList[v? 'add': 'remove']('active')
		}
	}
}
