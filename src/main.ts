import { init as editor_init, runCode } from './editor.js'
import { kara, kara_pos, kara_orientation } from './kara.js'
import { world, leaf_positions, tree_positions, shroom_positions } from './world.js'

const board = document.querySelector('#board')

let is_edit_mode = false
let edit_val = ''
let edit_type = ''

const kara_to_arrow = {
	0: '&#8679;',
	1: '&#8680;',
	2: '&#8681;',
	3: '&#8678;',
}

function draw(){
	const cells = document.querySelectorAll('#board td')
	cells.forEach((el) => {
		el.innerHTML = ''
	})
	const kara_cell = document.querySelector(`#cell_${kara_pos.x}_${kara_pos.y}`)
	kara_cell.innerHTML = kara_to_arrow[kara_orientation]
	leaf_positions.forEach((val) => {
		document.querySelector(`#cell_${val.x}_${val.y}`).innerHTML += '&#9752;'
	})
	tree_positions.forEach((val) => {
		document.querySelector(`#cell_${val.x}_${val.y}`).innerHTML += '&#9820;'
	})
	shroom_positions.forEach((val) => {
		document.querySelector(`#cell_${val.x}_${val.y}`).innerHTML += '&#9730;'
	})
}

const cellclick_handler = (cell, x: number, y: number) => {
	if (is_edit_mode) {
		if (cell.innerHTML.includes(edit_val)){
			if (edit_type === 'leaf'){
				const lpos_idx = leaf_positions.findIndex((leaf) => {
					return leaf.x === x && leaf.y === y
				})
				leaf_positions.splice(lpos_idx, 1)
			} else if (edit_type === 'tree'){
				const idx = tree_positions.findIndex((tree) => {
					return tree.x === x && tree.y === y
				})
				tree_positions.splice(idx, 1)
			} else {
				const idx = shroom_positions.findIndex((shroom) => {
					return shroom.x === x && shroom.y === y
				})
				shroom_positions.splice(idx, 1)
			}
		} else {
			if (edit_type === 'leaf'){
				if (world.isTree(x, y)) {
					alert('cannot place leaf on a tree')
					return
				}
				leaf_positions.push({ x:x, y:y })
			} else if (edit_type === 'tree'){
				if (world.isLeaf(x, y)){
					alert('cannot place tree on a leaf')
					return
				} else if (world.isMushroom(x, y)) {
					alert('cannot place tree on a mushroom')
					return
				}
				tree_positions.push({ x:x, y:y })
			} else {
				if (world.isTree(x, y)) {
					alert('cannot place mushroom on a tree')
					return
				}
				shroom_positions.push({ x:x, y:y })
			}
		}
		draw()
	}
}

const createBoardTable = () => {
	for (let y = world.getSizeY() - 1; y >= 0; y--){
		const row = document.createElement('tr')
		for (let x = 0; x < world.getSizeX(); x++){
			const cell = document.createElement('td')
			cell.id = `cell_${x}_${y}`
			cell.onclick = () => {
				cellclick_handler(cell, x, y)
			}
			row.appendChild(cell)
		}
		board.appendChild(row)
	}
}

const placeLeafsBtn = document.querySelector('#placeLeafs') as HTMLButtonElement
const placeTreesBtn = document.querySelector('#placeTrees') as HTMLButtonElement
const placeShroomsBtn = document.querySelector('#placeShrooms') as HTMLButtonElement

function toggleEditMode(btn, type){
	if (btn.className === ''){
		placeLeafsBtn.className = ''
		placeTreesBtn.className = ''
		placeShroomsBtn.className = ''
		btn.className = 'toggleActive'

		is_edit_mode = true
		edit_val = btn.innerText
		edit_type = type
	} else {
		btn.className = ''

		is_edit_mode = false
	}
}

function main(){
	(document.querySelector('#btnMove') as HTMLButtonElement).onclick = () => {
		kara.move()
	}
	(document.querySelector('#btnLeft') as HTMLButtonElement).onclick = () => {
		kara.turnLeft()
	}
	(document.querySelector('#btnRight') as HTMLButtonElement).onclick = () => {
		kara.turnRight()
	}
	(document.querySelector('#btnPut') as HTMLButtonElement).onclick = () => {
		kara.putLeaf()
	}
	(document.querySelector('#btnTake') as HTMLButtonElement).onclick = () => {
		kara.takeLeaf()
	}

	placeLeafsBtn.onclick = () => {
		toggleEditMode(placeLeafsBtn, 'leaf')
	}
	placeTreesBtn.onclick = () => {
		toggleEditMode(placeTreesBtn, 'tree')
	}
	placeShroomsBtn.onclick = () => {
		toggleEditMode(placeShroomsBtn, 'shroom')
	}

	(document.querySelector('#runBtn') as HTMLButtonElement).onclick = () => {
		runCode()
	}

	editor_init()

	createBoardTable()
	kara.setPosition(1, 1)
}

main()

export { draw }
