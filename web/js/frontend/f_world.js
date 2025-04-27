import { b_world } from "../backend/world.js"
import { handle_drag_cell_enter } from "./edit_mode.js"

const world_grid = document.querySelector('#world-grid')

function draw_empty_grid() {
	world_grid.style.gridTemplateColumns = `repeat(${b_world.size.width}, 28px)`
	world_grid.innerHTML = ''

	for (let y = b_world.size.height - 1; y >= 0; y--) {
		for (let x = 0; x < b_world.size.width; x++) {
			const cell = document.createElement('div')
			cell.dataset.x = x
			cell.dataset.y = y
			cell.classList.add('cell')
			cell.addEventListener('mouseover', handle_drag_cell_enter)
			world_grid.appendChild(cell)
		}
	}
}

function draw_world_objects() {
	for (const leaf of b_world.leafs) {
		const cell = world_grid.querySelector(`[data-x="${leaf.x}"][data-y="${leaf.y}"]`)
		cell.classList.add('leaf')
	}

	for (const tree of b_world.trees) {
		const cell = world_grid.querySelector(`[data-x="${tree.x}"][data-y="${tree.y}"]`)
		cell.classList.add('tree')
	}

	for (const mushroom of b_world.mushrooms) {
		const cell = world_grid.querySelector(`[data-x="${mushroom.x}"][data-y="${mushroom.y}"]`)
		cell.classList.add('mushroom')
	}
}

export { draw_empty_grid, draw_world_objects }
