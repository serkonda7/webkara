import { world } from './world.js'
import { kara } from './kara.js'
import { compile } from './jsbait.js'

// 0 = empty
// 1 = leaf
// 2 = tree
// 4 = shroom
// 5 = leaf + shroom
// 8 = player
// 9 = player + leaf
const worldLayout = [
	[0, 0, 0, 0],
	[0, 8, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	//
	// [9, 2, 1],
	// [1, 4, 0],
	// [0, 5, 0],
]

function add_foreground(div, class_name) {
	const fg = document.createElement('div')
	fg.classList.add(class_name)
	div.appendChild(fg)
}

const world_grid = document.querySelector('#world-grid')

function initWorld() {
	world.size.x = worldLayout[0].length
	world.size.y = worldLayout.length

	world_grid.style.gridTemplateColumns = `repeat(${world.size.x}, 50px)`
	world_grid.innerHTML = ''

	worldLayout.forEach((row, y) => {
		row.forEach((cell, x) => {
			const cell_div = document.createElement('div')
			cell_div.classList.add('cell')
			cell_div.id = `c_${x}_${y}`
			world_grid.appendChild(cell_div)

			switch (cell) {
				case 0:
					break
				case 1:
					world.leafs.push({ x, y })
					break
				case 2:
					world.trees.push({ x, y })
					break
				case 4:
					world.mushrooms.push({ x, y })
					break
				case 5:
					world.leafs.push({ x, y })
					world.mushrooms.push({ x, y })
					break
				case 8:
					kara.pos = { x, y }
					break
				case 9:
					world.leafs.push({ x, y })
					kara.pos = { x, y }
					break
			}
		})
	})

	draw()
}

// TODO delay between moves
function draw() {
	const cells = document.querySelectorAll('.cell')
	cells.forEach(cell => {
		cell.innerHTML = ''
	})

	const kara_cell = document.querySelector(`#c_${kara.pos.x}_${kara.pos.y}`)
	add_foreground(kara_cell, 'player')
	kara_cell.classList.add(kara.dir_to_class())

	// TODO draw leafs, trees, mushrooms
}

const editor = document.querySelector('#editor')
const run_btn = document.querySelector('#run')

const FuncConstructor = Object.getPrototypeOf(function() {}).constructor

function execute_code(){
	run_btn.disabled = true
	run_btn.innerText = 'Running...'

	const code = editor.value
	const user_js_code = compile(code)

	try {
		const user_func = new FuncConstructor('kara', user_js_code)
		user_func(kara)
	} catch (e) {
		console.error(e)
		console.log(user_js_code)
	}

	run_btn.innerText = 'Run Code'
	run_btn.disabled = false
}

function main() {
	editor.value = localStorage.getItem('editorContent') || ''
	editor.addEventListener('input', () => {
		localStorage.setItem('editorContent', editor.value)
	})

	document.querySelector('#run').addEventListener('click', execute_code)

	initWorld()
}

main()

export { draw }
