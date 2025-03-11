// 0 = empty
// 1 = leaf
// 2 = tree
// 4 = shroom
// 5 = leaf + shroom
// 8 = player
// 9 = player + leaf
const world = [
	[9, 2, 1],
	[1, 4, 0],
	[0, 5, 0],
]

function add_foreground(div, class_name) {
	const fg = document.createElement('div')
	fg.classList.add(class_name)
	div.appendChild(fg)
}

function drawGrid() {
	const world_grid = document.querySelector('#world-grid')
	world_grid.style.gridTemplateColumns = `repeat(${world[0].length}, 50px)`
	world_grid.innerHTML = ''

	world.forEach((row, y) => {
		row.forEach((cell, x) => {
			const cell_div = document.createElement('div')
			cell_div.classList.add('cell')
			switch (cell) {
				case 0:
					break
				case 1:
					cell_div.classList.add('leaf')
					break
				case 2:
					cell_div.classList.add('tree')
					break
				case 4:
					cell_div.classList.add('shroom')
					break
				case 5:
					cell_div.classList.add('leaf')
					add_foreground(cell_div, 'shroom')
					break
				case 8:
					cell_div.classList.add('player')
					break
				case 9:
					cell_div.classList.add('leaf')
					add_foreground(cell_div, 'player')
					break
			}
			world_grid.appendChild(cell_div)
		})
	})
}

drawGrid()
