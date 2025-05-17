function throw_alert(msg) {
	alert(`Error: ${msg}`)
	throw new Error(msg)
}

export { throw_alert }
