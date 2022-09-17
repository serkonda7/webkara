import { saveCode, loadCode, runCode } from './editor.js'
import { kara } from './kara.js'
import { world } from './world.js'

const board = document.querySelector('#board')

function createBoardTable(){
	for (let h = world.height - 1; h >= 0; h--){
		const row = document.createElement('tr')
		for (let w = 0; w < world.width; w++){
			const cell = document.createElement('td')
			cell.id = `cell_${w}_${h}`
			cell.x = w
			cell.y = h
			cell.onclick = () => { cellclick_handler(cell)}
			row.appendChild(cell)
		}
		board.appendChild(row)
	}
}

function cellclick_handler(cell){
	if (is_edit_mode) {
		if (cell.innerHTML.includes(edit_val)){
			if (edit_type == 'leaf'){
				const lpos_idx = world.leaf_positions.findIndex(leaf => leaf.x == cell.x && leaf.y == cell.y)
				world.leaf_positions.splice(lpos_idx, 1)
			} else if(edit_type=='tree'){
				const idx = world.tree_positions.findIndex(tree => tree.x == cell.x && tree.y == cell.y)
				world.tree_positions.splice(idx, 1)
			}else{
				const idx = world.shroom_positions.findIndex(shroom => shroom.x == cell.x && shroom.y == cell.y)
				world.shroom_positions.splice(idx, 1)
			}
		}else{
			if (edit_type == 'leaf'){
				if (world.tree_positions.findIndex(tree => tree.x == cell.x && tree.y == cell.y) >= 0) {
					alert('cannot place leaf on a tree')
					return
				}
				world.leaf_positions.push({x:cell.x, y:cell.y})
			} else if(edit_type=='tree'){
				if (world.leaf_positions.findIndex(leaf => leaf.x == cell.x && leaf.y == cell.y) >= 0){
					alert('cannot place tree on a leaf')
					return
				} else if(world.shroom_positions.findIndex(shroom => shroom.x == cell.x && shroom.y == cell.y) >= 0)
				{
					alert('cannot place tree on a mushroom')
					return
				}
				world.tree_positions.push({x:cell.x, y:cell.y})
			}else{
				if (world.tree_positions.findIndex(tree => tree.x == cell.x && tree.y == cell.y) >= 0) {
					alert('cannot place mushroom on a tree')
					return
				}
				world.shroom_positions.push({x:cell.x, y:cell.y})
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
	cells.forEach((el)=>{
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

const placeLeafsBtn = document.querySelector('#placeLeafs')
const placeTreesBtn = document.querySelector('#placeTrees')
const placeShroomsBtn = document.querySelector('#placeShrooms')

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
	document.querySelector('#btnMove').onclick = ()=>{kara.move()}
	document.querySelector('#btnLeft').onclick = ()=>{kara.turnLeft()}
	document.querySelector('#btnRight').onclick = ()=>{kara.turnRight()}
	document.querySelector('#btnPut').onclick = ()=>{kara.putLeaf()}
	document.querySelector('#btnTake').onclick = ()=>{kara.takeLeaf()}

	placeLeafsBtn.onclick = ()=>{toggleEditMode(placeLeafsBtn, 'leaf')}
	placeTreesBtn.onclick = ()=>{toggleEditMode(placeTreesBtn, 'tree')}
	placeShroomsBtn.onclick = ()=>{toggleEditMode(placeShroomsBtn, 'shroom')}

	document.querySelector('#runBtn').onclick = ()=>{runCode()}

	loadCode();
    setInterval(saveCode, 15000);

	createBoardTable()
	kara.setPosition(1, 1)
}

main()

export {draw}
