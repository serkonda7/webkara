import { throw_alert, KaraError } from "../common/error.js"
import { kara } from "../backend/kara.js"
import { world } from "../backend/world.js"
import { b_tools, tools, AbortExecution } from "../backend/tools.js"
import * as state from "./state.js"

const editor_div = document.querySelector('#code-editor')

function save_code() {
	const code = editor_div.innerText
	localStorage.setItem('usercode', code)
}

const FnConstructor = Object.getPrototypeOf(async function() {}).constructor

async function execute_code() {
	editor_div.setAttribute('contenteditable', 'false')
	save_code()

	b_tools.use_speed_slider_delay()
	b_tools.run_state = 'run'

	const user_fn = new FnConstructor('kara', 'world', 'tools', editor_div.innerText)
	try {
		await user_fn(kara, world, tools)
	} catch (e) {
		if (e instanceof KaraError) {
			// already handled
			return
		}

		if (e instanceof AbortExecution) {
			finish_execution()
			return
		}

		alert('Error: ' + e.message)
		console.error(e)
	}

	finish_execution()
}

function finish_execution() {
	editor_div.setAttribute('contenteditable', 'true')
	b_tools.clear_step_delay()
	b_tools.run_state = 'editor'
	state.save_world()
}

function init() {
	editor_div.innerText = localStorage.getItem('usercode') || '// Your code'
	setInterval(save_code, 10000)
}

export { init, execute_code }
