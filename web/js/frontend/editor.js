import { throw_alert, KaraError } from "../common/error.js"
import { kara } from "../backend/kara.js"
import { world } from "../backend/world.js"
import { tools } from "../backend/tools.js"

const editor_div = document.querySelector('#code-editor')

function save_code() {
	const code = editor_div.innerText
	localStorage.setItem('usercode', code)
}

const FnConstructor = Object.getPrototypeOf(function() {}).constructor

function execute_code() {
	save_code()

	const user_fn = new FnConstructor('kara', 'world', 'tools', editor_div.innerText)
	try {
		user_fn(kara, world, tools)
	} catch (e) {
		if (e instanceof KaraError) {
			// already handled
			return
		}

		throw_alert(e)
	}
}

function init() {
	editor_div.innerText = localStorage.getItem('usercode') || '// Your code'
	setInterval(save_code, 10000)
}

export { init, execute_code }
