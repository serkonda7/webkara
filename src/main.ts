import { init as editor_init, runCode } from './editor.js'
import { kara } from './kara.js'
import { world } from './world.js'

const board = document.querySelector('#board')

function createBoardTable(){
	for (let y = world.size.y - 1; y >= 0; y--){
		const row = document.createElement('tr')
		for (let x = 0; x < world.size.x; x++){
			const cell = document.createElement('td')
			cell.id = `cell_${x}_${y}`
			cell.onclick = () => { cellclick_handler(cell, x, y)}
			row.appendChild(cell)
		}
		board.appendChild(row)
	}
}

function cellclick_handler(cell, x, y){
	if (is_edit_mode) {
		if (cell.innerHTML.includes(edit_val)){
			if (edit_type == 'leaf'){
				const lpos_idx = world.leaf_positions.findIndex((leaf) => {return leaf.x == x && leaf.y == y})
				world.leaf_positions.splice(lpos_idx, 1)
			} else if (edit_type=='tree'){
				const idx = world.tree_positions.findIndex((tree) => {return tree.x == x && tree.y == y})
				world.tree_positions.splice(idx, 1)
			} else {
				const idx = world.shroom_positions.findIndex((shroom) => {return shroom.x == x && shroom.y == y})
				world.shroom_positions.splice(idx, 1)
			}
		} else {
			if (edit_type == 'leaf'){
				if (world.tree_positions.findIndex((tree) => {return tree.x == x && tree.y == y}) >= 0) {
					alert('cannot place leaf on a tree')
					return
				}
				world.leaf_positions.push({ x:x, y:y })
			} else if (edit_type=='tree'){
				if (world.leaf_positions.findIndex((leaf) => {return leaf.x == x && leaf.y == y}) >= 0){
					alert('cannot place tree on a leaf')
					return
				} else if (world.shroom_positions.findIndex((shroom) => {return shroom.x == x && shroom.y == y}) >= 0)
				{
					alert('cannot place tree on a mushroom')
					return
				}
				world.tree_positions.push({ x:x, y:y })
			} else {
				if (world.tree_positions.findIndex((tree) => {return tree.x == x && tree.y == y}) >= 0) {
					alert('cannot place mushroom on a tree')
					return
				}
				world.shroom_positions.push({ x:x, y:y })
			}
		}
		draw()
	}
}

const kara_to_arrow = {
	0: '&#8679;',
	1: '&#8680;',
	2: '&#8681;',
	3: '&#8678;',
}

function draw(){
	const cells = document.querySelectorAll('#board td')
	cells.forEach((el) => {
		el.innerHTML=''
	})
	const kara_cell = document.querySelector(`#cell_${kara.x}_${kara.y}`)
	kara_cell.innerHTML = kara_to_arrow[kara.lookOrientation]
	world.leaf_positions.forEach((val) => {
		document.querySelector(`#cell_${val.x}_${val.y}`).innerHTML += '&#9752;'
	})
	world.tree_positions.forEach((val) => {
		document.querySelector(`#cell_${val.x}_${val.y}`).innerHTML += '&#9820;'
	})
	world.shroom_positions.forEach((val) => {
		document.querySelector(`#cell_${val.x}_${val.y}`).innerHTML += '&#9730;'
	})
}

const placeLeafsBtn = document.querySelector('#placeLeafs') as HTMLButtonElement
const placeTreesBtn = document.querySelector('#placeTrees') as HTMLButtonElement
const placeShroomsBtn = document.querySelector('#placeShrooms') as HTMLButtonElement

let is_edit_mode = false
let edit_val = ''
let edit_type = ''

function toggleEditMode(btn, type){
	if (btn.className == ''){
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
	(document.querySelector('#btnMove') as HTMLButtonElement).onclick = () => {kara.move()}
	(document.querySelector('#btnLeft') as HTMLButtonElement).onclick = () => {kara.turnLeft()}
	(document.querySelector('#btnRight') as HTMLButtonElement).onclick = () => {kara.turnRight()}
	(document.querySelector('#btnPut') as HTMLButtonElement).onclick = () => {kara.putLeaf()}
	(document.querySelector('#btnTake') as HTMLButtonElement).onclick = () => {kara.takeLeaf()}

	placeLeafsBtn.onclick = () => {toggleEditMode(placeLeafsBtn, 'leaf')}
	placeTreesBtn.onclick = () => {toggleEditMode(placeTreesBtn, 'tree')}
	placeShroomsBtn.onclick = () => {toggleEditMode(placeShroomsBtn, 'shroom')}

	(document.querySelector('#runBtn') as HTMLButtonElement).onclick = () => {runCode()}

	editor_init()

	createBoardTable()
	kara.setPosition(1, 1)
}

main()

export { draw }
