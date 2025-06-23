import { throw_alert, KaraError } from "../common/error.js"
import { kara } from "../backend/kara.js"
import { world } from "../backend/world.js"
import { b_tools, tools, AbortExecution } from "../backend/tools.js"
import * as state from "./state.js"

const editor_div = document.querySelector('#code-editor')
const btn_toggle_nav = document.querySelector('#toggle-editor-nav')
const editor_nav = document.querySelector('#editor-nav')
const main_div = document.querySelector('#main-content')

let nav_open = false

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

function toggle_editor_nav() {

	if (nav_open) {
		editor_nav.classList.remove('expanded')
		editor_nav.style.width = 'var(--sidenav-min-width)'
		main_div.style.marginLeft = 'var(--sidenav-min-width)'
		nav_open = false
		return
	}

	editor_nav.classList.add('expanded')
	editor_nav.style.width = '200px'
	main_div.style.marginLeft = '200px'
	nav_open = true
}

function init() {
	// editor_div.innerText = localStorage.getItem('usercode') || '// Your code'
	// setInterval(save_code, 10000)

	btn_toggle_nav.addEventListener('click', toggle_editor_nav)
}

export { init, execute_code }
