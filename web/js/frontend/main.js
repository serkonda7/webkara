import { world } from '../backend/world.js'
import * as f_world from './f_world.js'
import * as state from './state.js'
import * as edit_mode from './edit_mode.js'
import { kara } from '../backend/kara.js'
import * as editor from './editor.js'
import { b_tools } from '../backend/tools.js'

const btn_run = document.querySelector('#run-btn')
const btn_pause = document.querySelector('#pause-btn')
const btn_stop = document.querySelector('#stop-btn')

const btn_apply_world_size = document.querySelector('#apply-world-size')
const inp_world_width = document.querySelector('#world-width')
const inp_world_height = document.querySelector('#world-height')

const btn_cmd_move = document.querySelector('#cmd-move')
const btn_cmd_turn_left = document.querySelector('#cmd-turn-left')
const btn_cmd_turn_right = document.querySelector('#cmd-turn-right')
const btn_cmd_put_leaf = document.querySelector('#cmd-put-leaf')
const btn_cmd_take_leaf = document.querySelector('#cmd-take-leaf')

function restore_state() {
	state.load_world()
	const size = world.get_size()
	inp_world_width.value = size.width
	inp_world_height.value = size.height
}

function init_click_listeners() {
	// Group: Code execution
	btn_run.addEventListener('click', async () => {
		if (b_tools.run_state == 'pause') {
			if (b_tools.resume_callback) {
				b_tools.resume_callback()
				b_tools.resume_callback = null
				b_tools.run_state = 'run'
				btn_run.disabled = true
				btn_pause.disabled = false
			}

			return
		}

		btn_run.disabled = true
		btn_pause.disabled = false
		btn_stop.disabled = false

		await editor.execute_code()

		btn_run.disabled = false
		btn_pause.disabled = true
		btn_stop.disabled = true
	})
	btn_pause.addEventListener('click', () => {
		b_tools.run_state = 'pause'
		btn_pause.disabled = true
		btn_run.disabled = false
	})
	btn_stop.addEventListener('click', () => {
		b_tools.run_state = 'stop'
		if (b_tools.resume_callback) {
			b_tools.resume_callback()
			b_tools.resume_callback = null
		}
	})

	// Group: World settings
	btn_apply_world_size.addEventListener('click', () => {
		const w = parseInt(inp_world_width.value)
		const h = parseInt(inp_world_height.value)
		world.set_size(w, h)
		state.save_world()
	})

	// Group: World objects and context menu
	edit_mode.init_click_listeners()

	// Group: Kara controls
	btn_cmd_move.addEventListener('click', () => {
		kara.move()
		state.save_world()
	})

	btn_cmd_turn_left.addEventListener('click', () => {
		kara.turn_left()
		state.save_world()
	})

	btn_cmd_turn_right.addEventListener('click', () => {
		kara.turn_right()
		state.save_world()
	})

	btn_cmd_put_leaf.addEventListener('click', () => {
		kara.put_leaf()
		state.save_world()
	})
	btn_cmd_take_leaf.addEventListener('click', () => {
		kara.take_leaf()
		state.save_world()
	})
}

function main() {
	restore_state()

	f_world.draw_empty_grid()
	f_world.draw_world_objects()

	init_click_listeners()
	editor.init()
}

main()
