class KaraError extends Error {
	constructor(message) {
		super(message)
		this.name = 'KaraError'
	}
}

function throw_alert(msg) {
	console.error(msg)
	alert(`Error: ${msg}`)
	throw new KaraError(msg)
}

export { throw_alert, KaraError }
