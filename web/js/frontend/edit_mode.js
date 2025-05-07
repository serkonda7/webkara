import { b_world, world } from "../backend/world.js"
import { b_kara } from "../backend/kara.js"
import * as state from './state.js'

const world_grid = document.querySelector('#world-grid')

const btn_obj_kara = document.querySelector('#obj-kara')
const btn_obj_leaf = document.querySelector('#obj-leaf')
const btn_obj_tree = document.querySelector('#obj-tree')
const btn_obj_shroom = document.querySelector('#obj-mushroom')
const btn_obj_trash = document.querySelector('#obj-trash')

const world_context_menu = document.querySelector('#world-context')
const ctx_clear_world = document.querySelector('#ctx-clear-world')
let ctx_menu_visible = false

function show_world_context_menu(ev) {
	if (ctx_menu_visible) {
		hide_context_menu()
		return
	}

	ctx_menu_visible = true
	ev.preventDefault()

	world_context_menu.style.top = `${ev.clientY}px`
	world_context_menu.style.left = `${ev.clientX}px`
	world_context_menu.classList.remove('hidden')
}

function hide_context_menu() {
	world_context_menu.classList.add('hidden')
	ctx_menu_visible = false
}

function clear_world() {
	disable_edit_mode()
	world.clear()
	state.save_world()
	hide_context_menu()
}

function init_click_listeners() {
	btn_obj_kara.addEventListener('click', edit_mode)
	btn_obj_leaf.addEventListener('click', edit_mode)
	btn_obj_tree.addEventListener('click', edit_mode)
	btn_obj_shroom.addEventListener('click', edit_mode)
	btn_obj_trash.addEventListener('click', edit_mode)

	world_grid.addEventListener('contextmenu', show_world_context_menu)
	ctx_clear_world.addEventListener('click', clear_world)

	// Hide context menu on click outside
	document.addEventListener('click', hide_context_menu)

	world_grid.addEventListener('mousedown', (ev) => {
		if (!edit_mode_active || ev.button !== 0) {
			return
		}

		is_drag_edit = true
		world_grid_click(ev)
	})

	// Disable drag edit on mouseup (anywhere)
	document.addEventListener('mouseup', () => {
		is_drag_edit = false
	})

	// Prevent default object drag that conflicts with our drag edit
	world_grid.addEventListener('dragstart', (ev) => {
		ev.preventDefault()
	})
}

let edit_mode_active = false
let is_drag_edit = false
let selected_obj_btn = null
let edit_mode_obj_class = ""
let current_edit_mode = {
	placable_fn: null,
	is_obj_fn: null,
	add_obj_fn: null,
	remove_obj_fn: null,
	edit_action_fn: null,
}

const EDIT_MODE_STATES = {
	'leaf': {
		placable_fn: (x, y) => b_world.is_leaf_placeable(x, y),
		is_obj_fn: (x, y) => b_world.is_leaf(x, y),
		add_obj_fn: (x, y) => b_world.add_leaf(x, y),
		remove_obj_fn: (x, y) => b_world.remove_leaf(x, y),
		edit_action_fn: (cell) => { toggle_cell_object(cell) },
	},
	'tree': {
		placable_fn: (x, y) => b_world.is_tree_placeable(x, y),
		is_obj_fn: (x, y) => b_world.is_tree(x, y),
		add_obj_fn: (x, y) => b_world.add_tree(x, y),
		remove_obj_fn: (x, y) => b_world.remove_tree(x, y),
		edit_action_fn: (cell) => { toggle_cell_object(cell) },
	},
	'mushroom': {
		placable_fn: (x, y) => b_world.is_mushroom_placeable(x, y),
		is_obj_fn: (x, y) => b_world.is_mushroom(x, y),
		add_obj_fn: (x, y) => b_world.add_mushroom(x, y),
		remove_obj_fn: (x, y) => b_world.remove_mushroom(x, y),
		edit_action_fn: (cell) => { toggle_cell_object(cell) },
	},
	'kara': {
		placable_fn: (x, y) => b_kara.is_kara_placable(x, y),
		is_obj_fn: (x, y) => {
			const pos = b_kara.get_position()
			return pos.x == x && pos.y == y
		},
		remove_obj_fn: (x, y) => {
			b_kara.in_world = false
		},
		add_obj_fn: (x, y) => {
			document.querySelector('.cell.kara')?.classList.remove('kara')
			b_kara.set_position(x, y)
		},
		edit_action_fn: (cell) => { toggle_cell_object(cell) },
	},
	'trash': {
		edit_action_fn: (cell) => { clear_cell(cell) },
	},
	'null': {
		placable_fn: null,
		is_obj_fn: null,
		add_obj_fn: null,
		remove_obj_fn: null,
		edit_action_fn: null,
	},
}

function edit_mode(ev) {
	const target = ev.currentTarget

	if (edit_mode_active) {
		disable_edit_mode()

		// No need to reenable if same button is clicked
		if (edit_mode_obj_class == target.dataset.obj) {
			return
		}
	}

	// Enable edit mode or switch selected object
	edit_mode_active = true
	selected_obj_btn = target
	edit_mode_obj_class = target.dataset.obj


	current_edit_mode = EDIT_MODE_STATES[target.dataset.obj] || EDIT_MODE_STATES['null']

	world_grid.classList.add(`cursor-${target.dataset.obj}`)
	target.classList.add('selected')
}

function disable_edit_mode() {
	if (!edit_mode_active) {
		return
	}

	// Unselect current object button
	selected_obj_btn.classList.remove('selected')
	world_grid.classList.remove(`cursor-${selected_obj_btn.dataset.obj}`)

	// Disable edit mode
	edit_mode_active = false
	selected_obj_btn = null
}

function world_grid_click(ev) {
	if (!edit_mode_active) {
		return
	}

	const cell = ev.target.closest('.cell')
	// Click in the gap between cells
	if (!cell) {
		return
	}

	current_edit_mode.edit_action_fn(cell)
	state.save_world()
}


function handle_drag_cell_enter(ev) {
	if (!is_drag_edit) {
		return
	}

	current_edit_mode.edit_action_fn(ev.target)
	state.save_world()
}

function toggle_cell_object(cell) {
	const x = parseInt(cell.dataset.x)
	const y = parseInt(cell.dataset.y)

	// Remove or add object
	if (current_edit_mode.is_obj_fn(x, y)) {
		current_edit_mode.remove_obj_fn(x, y)
		cell.classList.remove(edit_mode_obj_class)
	} else if (current_edit_mode.placable_fn(x, y)) {
		current_edit_mode.add_obj_fn(x, y)
		cell.classList.add(edit_mode_obj_class)
	}
}

function clear_cell(cell) {
	const x = parseInt(cell.dataset.x)
	const y = parseInt(cell.dataset.y)

	b_world.clear_cell(x, y)
	cell.classList.remove('leaf')
	cell.classList.remove('tree')
	cell.classList.remove('mushroom')

	state.save_world()
}

export { init_click_listeners, handle_drag_cell_enter }
