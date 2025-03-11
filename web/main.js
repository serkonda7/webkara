// 0 = empty
// 1 = leaf
// 2 = tree
// 4 = shroom
// 5 = leaf + shroom
// 8 = player
const world = [
	[8, 2, 1],
	[1, 4, 0],
	[0, 2, 0],
]

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
					console.log('TODO')
					// cell_div.classList.add('leaf')
					// cell_div.classList.add('shroom')
					break
				case 8:
					cell_div.classList.add('player')
					break
			}
			world_grid.appendChild(cell_div)
		})
	})
}

drawGrid()
