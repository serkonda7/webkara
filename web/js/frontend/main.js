import { world } from '../backend/world.js'
import * as f_world from './f_world.js'
import * as state from './state.js'
import * as edit_mode from './edit_mode.js'
import { kara } from '../backend/kara.js'

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

function not_implemented() {
	alert('Not implemented')
}

function init_click_listeners() {
	// Group: Code execution
	btn_run.addEventListener('click', () => {
		not_implemented() // TODO
	})
	btn_pause.addEventListener('click', () => {
		not_implemented() // TODO
	})
	btn_stop.addEventListener('click', () => {
		not_implemented() // TODO
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
	})
	btn_cmd_turn_left.addEventListener('click', () => {
		not_implemented() // TODO
	})
	btn_cmd_turn_right.addEventListener('click', () => {
		not_implemented() // TODO
	})
	btn_cmd_put_leaf.addEventListener('click', () => {
		not_implemented() // TODO
	})
	btn_cmd_take_leaf.addEventListener('click', () => {
		not_implemented() // TODO
	})
}

function main() {
	restore_state()

	f_world.draw_empty_grid()
	f_world.draw_world_objects()

	init_click_listeners()
}

main()
