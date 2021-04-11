const baseSize = 16

function setRem() {
	const scale = document.documentElement.clientWidth / 1920
	const fs = baseSize * Math.min(scale, 2)
	let res = fs
	if (fs > baseSize) {
		res = baseSize
	}
	if (fs < 12) {
		res = 12
	}
	document.documentElement.style.fontSize = `${res}px`
}
setRem()

window.addEventListener('resize', () => {
	setRem()
})
