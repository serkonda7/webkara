import { b_world } from "../backend/world.js"
import * as f_world from "./f_world.js"

const btn_run = document.querySelector('#run-btn')
const btn_pause = document.querySelector('#pause-btn')
const btn_stop = document.querySelector('#stop-btn')

const btn_apply_world_size = document.querySelector('#apply-world-size')
const inp_world_width = document.querySelector('#world-width')
const inp_world_height = document.querySelector('#world-height')

const btn_obj_kara = document.querySelector('#obj-kara')
const btn_obj_leaf = document.querySelector('#obj-leaf')
const btn_obj_tree = document.querySelector('#obj-tree')
const btn_obj_shroom = document.querySelector('#obj-shroom')
const btn_obj_trash = document.querySelector('#obj-trash')

function not_implemented() {
	alert('Not implemented')
}

function main() {
	f_world.draw_empty_grid()

	btn_run.addEventListener('click', () => {
		not_implemented()
	})
	btn_pause.addEventListener('click', () => {
		not_implemented()
	})
	btn_stop.addEventListener('click', () => {
		not_implemented()
	})

	btn_apply_world_size.addEventListener('click', () => {
		b_world.size.width = parseInt(inp_world_width.value)
		b_world.size.height = parseInt(inp_world_height.value)
		f_world.draw_empty_grid()
	})

	btn_obj_kara.addEventListener('click', () => {
		not_implemented()
	})
	btn_obj_leaf.addEventListener('click', () => {
		not_implemented()
	})
	btn_obj_tree.addEventListener('click', () => {
		not_implemented()
	})
	btn_obj_shroom.addEventListener('click', () => {
		not_implemented()
	})
	btn_obj_trash.addEventListener('click', () => {
		not_implemented()
	})
}

main()
