import { init as editor_init, runCode } from './editor.js'
import { kara, setKaraActive, isKaraActive, initKaraButtons } from './kara.js'
import { compare_to_vec2 } from './vector.js'
import {
	world,
	leaf_positions, tree_positions, shroom_positions,
	findLeafIndex, findTreeIndex, findMushroomIndex,
} from './world.js'

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

function draw(): void{
	const cells = document.querySelectorAll('#board td')
	cells.forEach((el) => {
		el.innerHTML = ''
	})
	if (isKaraActive()) {
		const kpos = kara.getPosition()
		const kara_cell = document.querySelector(`#cell_${kpos.x}_${kpos.y}`)
		kara_cell.innerHTML = kara_to_arrow[kara.getOrientation()]
	}
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

const cellclick_handler = (cell, x: number, y: number): void => {
	if (is_edit_mode) {
		if (cell.innerHTML.includes(edit_val)){
			if (edit_type === 'kara') {
				setKaraActive(false)
			} else if (edit_type === 'leaf'){
				const idx = findLeafIndex(x, y)
				leaf_positions.splice(idx, 1)
			} else if (edit_type === 'tree'){
				const idx = findTreeIndex(x, y)
				tree_positions.splice(idx, 1)
			} else {
				const idx = findMushroomIndex(x, y)
				shroom_positions.splice(idx, 1)
			}
		} else {
			if (edit_type === 'kara') {
				setKaraActive(true)
				kara.setPosition(x, y)
				kara.setOrientation(1)
			} else if (edit_type === 'leaf'){
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
				} else if (compare_to_vec2(x, y, kara.getPosition())) {
					alert('cannot place tree on kara')
					return
				}
				tree_positions.push({ x:x, y:y })
			} else {
				if (world.isTree(x, y)) {
					alert('cannot place mushroom on a tree')
					return
				} else if (compare_to_vec2(x, y, kara.getPosition())) {
					alert('cannot place mushroom on kara')
					return
				}
				shroom_positions.push({ x:x, y:y })
			}
		}
		draw()
	}
}

const createBoardTable = (): void => {
	const wsize = world.getSize()
	for (let y = wsize.y - 1; y >= 0; y--){
		const row = document.createElement('tr')
		for (let x = 0; x < wsize.x; x++){
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

const placeKaraBtn = document.querySelector('#placeKara') as HTMLButtonElement
const placeLeafsBtn = document.querySelector('#placeLeafs') as HTMLButtonElement
const placeTreesBtn = document.querySelector('#placeTrees') as HTMLButtonElement
const placeShroomsBtn = document.querySelector('#placeShrooms') as HTMLButtonElement

function toggleEditMode(btn, type): void{
	if (btn.className === ''){
		placeKaraBtn.className = ''
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

function main(): void{
	placeKaraBtn.onclick = () => {
		toggleEditMode(placeKaraBtn, 'kara')
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

	initKaraButtons()
	editor_init()

	createBoardTable()
	kara.setPosition(1, 1)
}

main()

export { draw }