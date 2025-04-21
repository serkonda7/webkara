import { b_world } from "../backend/world.js"

const btn_obj_kara = document.querySelector('#obj-kara')
const btn_obj_leaf = document.querySelector('#obj-leaf')
const btn_obj_tree = document.querySelector('#obj-tree')
const btn_obj_shroom = document.querySelector('#obj-shroom')
const btn_obj_trash = document.querySelector('#obj-trash')

const world_grid = document.querySelector('#world-grid')

function init_click_listeners() {
	btn_obj_kara.addEventListener('click', edit_mode)
	btn_obj_leaf.addEventListener('click', edit_mode)
	btn_obj_tree.addEventListener('click', edit_mode)
	btn_obj_shroom.addEventListener('click', edit_mode)
	btn_obj_trash.addEventListener('click', () => {
		alert('Not implemented') // TODO
	})

	world_grid.addEventListener('click', world_grid_click)
}

let edit_mode_active = false
let edit_mode_selected = null
let edit_mode_obj = ""
let fun_b_world_placable = null
let fun_b_world_is_obj = null

function edit_mode(ev) {
	const target = ev.currentTarget

	if (edit_mode_active) {
		// Unselect current object button
		edit_mode_selected.classList.remove('selected')
		world_grid.classList.remove(`cursor-${edit_mode_selected.dataset.obj}`)

		// Disable edit mode
		if (edit_mode_selected.dataset.obj == target.dataset.obj) {
			edit_mode_active = false
			edit_mode_selected = null
			return
		}
	}

	// Enable edit mode or switch selected object
	edit_mode_active = true
	edit_mode_selected = target
	edit_mode_obj = target.dataset.obj

	switch (edit_mode_obj) {
		// TODO kara
		case 'leaf':
			fun_b_world_placable = (x, y) => b_world.is_leaf_placeable(x, y)
			fun_b_world_is_obj = (x, y) => b_world.is_leaf(x, y)
			break
		case 'tree':
			fun_b_world_placable = (x, y) => b_world.is_tree_placeable(x, y)
			fun_b_world_is_obj = (x, y) => b_world.is_tree(x, y)
			break
		case 'shroom':
			fun_b_world_placable = (x, y) => b_world.is_mushroom_placeable(x, y)
			fun_b_world_is_obj = (x, y) => b_world.is_mushroom(x, y)
			break
		// TODO trash
		default:
			break
	}

	world_grid.classList.add(`cursor-${target.dataset.obj}`)
	target.classList.add('selected')
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

	const x = parseInt(cell.dataset.x)
	const y = parseInt(cell.dataset.y)

	if (fun_b_world_is_obj(x, y)) {
		// TODO remove obj
	} else if (fun_b_world_placable(x, y)) {
		// TODO add obj
	}
}

export { init_click_listeners }
