import { b_world } from "../backend/world.js"

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
			world_grid.appendChild(cell)
		}
	}
}

export { draw_empty_grid }
